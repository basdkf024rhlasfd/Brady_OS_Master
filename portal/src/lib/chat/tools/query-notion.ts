import { tool } from "ai";
import { z } from "zod";
import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

const MAX_PAGE_CONTENT_LENGTH = 3000;

/**
 * Factory: returns an AI SDK tool for querying Notion databases and pages,
 * or null if credentials are not configured.
 */
export function createNotionTool(params?: Record<string, string>) {
  const notionKey = process.env.NOTION_API_KEY;
  if (!notionKey) return null;

  const notion = new Client({ auth: notionKey });
  const defaultDatabaseId = params?.databaseId;
  const defaultPageId = params?.pageId;

  const inputSchema = z.object({
    action: z.enum(["query-database", "read-page"]).describe(
      "query-database: search/filter a Notion database. read-page: get the content of a specific page."
    ),
    databaseId: z
      .string()
      .optional()
      .describe(
        `Notion database ID to query. Defaults to ${defaultDatabaseId ?? "none"}`
      ),
    pageId: z
      .string()
      .optional()
      .describe(
        `Notion page ID to read. Defaults to ${defaultPageId ?? "none"}`
      ),
    query: z
      .string()
      .optional()
      .describe("Text to search for in database entries (title match)"),
    filterProperty: z
      .string()
      .optional()
      .describe("Property name to filter on (e.g., 'Type', 'Status')"),
    filterValue: z
      .string()
      .optional()
      .describe("Value to filter for in the specified property"),
    maxResults: z
      .number()
      .optional()
      .default(10)
      .describe("Maximum number of results to return (default 10)"),
  });

  return tool({
    description:
      "Query Notion databases or read Notion pages. Use this for looking up family rules, preferences, streaming notes, or project data stored in Notion.",
    inputSchema,
    execute: async (input: z.infer<typeof inputSchema>) => {
      try {
        if (input.action === "query-database") {
          const dbId = input.databaseId ?? defaultDatabaseId;
          if (!dbId) return { error: "No database ID provided or configured" };

          const filter =
            input.filterProperty && input.filterValue
              ? {
                  property: input.filterProperty,
                  select: { equals: input.filterValue },
                }
              : undefined;

          const response = await notion.dataSources.query({
            data_source_id: dbId,
            filter: filter as Parameters<typeof notion.dataSources.query>[0]["filter"],
            page_size: input.maxResults ?? 10,
          });

          const results = response.results.map((page: { id: string; properties?: Record<string, unknown> }) => {
            if (!page.properties) return { id: page.id };
            const props: Record<string, string> = {};
            for (const [key, val] of Object.entries(page.properties)) {
              props[key] = extractPropertyValue(val);
            }
            return { id: page.id, properties: props };
          });

          // Client-side title search if query specified
          const filtered = input.query
            ? results.filter((r: { id: string; properties?: Record<string, string> }) => {
                if (!r.properties) return false;
                const title = Object.values(r.properties).join(" ").toLowerCase();
                return title.includes(input.query!.toLowerCase());
              })
            : results;

          return {
            databaseId: dbId,
            count: filtered.length,
            results: filtered.slice(0, input.maxResults ?? 10),
          };
        }

        if (input.action === "read-page") {
          const pid = input.pageId ?? defaultPageId;
          if (!pid) return { error: "No page ID provided or configured" };

          const page = await notion.pages.retrieve({ page_id: pid });
          const title =
            "properties" in page
              ? extractPageTitle((page as PageObjectResponse).properties)
              : "Untitled";

          const blocks = await notion.blocks.children.list({
            block_id: pid,
            page_size: 50,
          });

          const content = blocks.results
            .map((block) => extractBlockText(block as BlockObjectResponse))
            .filter(Boolean)
            .join("\n");

          return {
            pageId: pid,
            title,
            content: content.slice(0, MAX_PAGE_CONTENT_LENGTH),
            truncated: content.length > MAX_PAGE_CONTENT_LENGTH,
          };
        }

        return { error: `Unknown action: ${input.action}` };
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return { error: `Notion query failed: ${message}` };
      }
    },
  });
}

// ─── Helpers ───

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractPropertyValue(prop: any): string {
  const type = prop.type as string;
  switch (type) {
    case "title":
      return (prop.title ?? []).map((t: { plain_text: string }) => t.plain_text).join("");
    case "rich_text":
      return (prop.rich_text ?? []).map((t: { plain_text: string }) => t.plain_text).join("");
    case "select":
      return prop.select?.name ?? "";
    case "multi_select":
      return (prop.multi_select ?? []).map((s: { name: string }) => s.name).join(", ");
    case "date":
      return prop.date?.start ?? "";
    case "checkbox":
      return String(prop.checkbox ?? false);
    case "number":
      return String(prop.number ?? "");
    case "status":
      return prop.status?.name ?? "";
    case "url":
      return prop.url ?? "";
    default:
      return "";
  }
}

function extractPageTitle(
  properties: PageObjectResponse["properties"]
): string {
  for (const prop of Object.values(properties)) {
    if (prop.type === "title") {
      return (prop.title ?? []).map((t) => t.plain_text).join("");
    }
  }
  return "Untitled";
}

function extractBlockText(block: BlockObjectResponse): string {
  const type = block.type;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = (block as any)[type];
  if (!data) return "";

  const richText = data.rich_text as { plain_text: string }[] | undefined;
  if (!richText) return "";

  const text = richText.map((t) => t.plain_text).join("");

  switch (type) {
    case "heading_1":
      return `# ${text}`;
    case "heading_2":
      return `## ${text}`;
    case "heading_3":
      return `### ${text}`;
    case "bulleted_list_item":
      return `- ${text}`;
    case "numbered_list_item":
      return `1. ${text}`;
    case "to_do": {
      const checked = data.checked ? "x" : " ";
      return `- [${checked}] ${text}`;
    }
    case "toggle":
      return `> ${text}`;
    default:
      return text;
  }
}
