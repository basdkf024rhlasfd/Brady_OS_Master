import { Client } from "@notionhq/client";

const SCRAPE_META_KEY = "__scrape_meta__";

export type ItemMeta = { remaining: number | null; comments: string };
export type ItemMetaMap = Record<string, ItemMeta>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProp = any;

function makeClient() {
  const auth = process.env.NOTION_API_KEY;
  if (!auth) throw new Error("NOTION_API_KEY is not set");
  return new Client({ auth });
}

function getDbId() {
  const id = process.env.NOTION_GROCERY_DB_ID;
  if (!id) throw new Error("NOTION_GROCERY_DB_ID is not set");
  return id;
}

function extractTitle(prop: AnyProp): string {
  if (!prop || prop.type !== "title") return "";
  return (prop.title ?? []).map((t: { plain_text: string }) => t.plain_text).join("").trim();
}

function extractRichText(prop: AnyProp): string {
  if (!prop || prop.type !== "rich_text") return "";
  return (prop.rich_text ?? []).map((t: { plain_text: string }) => t.plain_text).join("");
}

function extractNumber(prop: AnyProp): number | null {
  if (!prop || prop.type !== "number") return null;
  return prop.number ?? null;
}

export async function getItemMeta(): Promise<{
  items: ItemMetaMap;
  lastScrapedAt: string | null;
}> {
  const notion = makeClient();
  const dbId = getDbId();

  const response = await notion.dataSources.query({
    data_source_id: dbId,
    page_size: 100,
  });

  const items: ItemMetaMap = {};
  let lastScrapedAt: string | null = null;

  for (const page of response.results) {
    const p = page as AnyProp;
    if (!p.properties) continue;

    const name = extractTitle(p.properties["Name"]);
    if (!name) continue;

    const comments = extractRichText(p.properties["Comments"]);

    if (name === SCRAPE_META_KEY) {
      lastScrapedAt = comments || null;
    } else {
      items[name] = {
        remaining: extractNumber(p.properties["Remaining"]),
        comments,
      };
    }
  }

  return { items, lastScrapedAt };
}

export async function upsertItemMeta(
  name: string,
  patch: { remaining?: number | null; comments?: string }
): Promise<void> {
  const notion = makeClient();
  const dbId = getDbId();

  const existing = await notion.dataSources.query({
    data_source_id: dbId,
    filter: { property: "Name", title: { equals: name } } as AnyProp,
    page_size: 1,
  });

  const properties: AnyProp = {
    Name: { title: [{ type: "text", text: { content: name } }] },
  };

  if (patch.remaining !== undefined) {
    properties["Remaining"] = { number: patch.remaining };
  }
  if (patch.comments !== undefined) {
    properties["Comments"] = {
      rich_text: patch.comments
        ? [{ type: "text", text: { content: patch.comments } }]
        : [],
    };
  }

  if (existing.results.length > 0) {
    await notion.pages.update({
      page_id: (existing.results[0] as AnyProp).id,
      properties,
    });
  } else {
    await notion.pages.create({
      parent: { database_id: dbId },
      properties,
    });
  }
}

export async function updateScrapeTimestamp(): Promise<void> {
  return upsertItemMeta(SCRAPE_META_KEY, {
    comments: new Date().toISOString(),
  });
}
