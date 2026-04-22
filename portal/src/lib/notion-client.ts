import "server-only";

import { Client } from "@notionhq/client";
import { cache } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProp = any;

export function makeNotionClient() {
  const auth = process.env.NOTION_API_KEY;
  if (!auth) throw new Error("NOTION_API_KEY is not set");
  return new Client({ auth });
}

export function extractTitle(prop: AnyProp): string {
  if (!prop || prop.type !== "title") return "";
  return (prop.title ?? [])
    .map((t: { plain_text: string }) => t.plain_text)
    .join("")
    .trim();
}

export function extractRichText(prop: AnyProp): string {
  if (!prop || prop.type !== "rich_text") return "";
  return (prop.rich_text ?? [])
    .map((t: { plain_text: string }) => t.plain_text)
    .join("");
}

export function extractSelect(prop: AnyProp): string | null {
  if (!prop) return null;
  if (prop.type === "select") return prop.select?.name ?? null;
  if (prop.type === "status") return prop.status?.name ?? null;
  return null;
}

export function extractMultiSelect(prop: AnyProp): string[] {
  if (!prop || prop.type !== "multi_select") return [];
  return (prop.multi_select ?? []).map((s: { name: string }) => s.name);
}

export function extractDate(prop: AnyProp): string | null {
  if (!prop || prop.type !== "date") return null;
  return prop.date?.start ?? null;
}

export function extractLastEdited(page: AnyProp): string | null {
  return page.last_edited_time ?? null;
}

export type NotionRow = {
  id: string;
  title: string;
  status: string | null;
  tags: string[];
  lastEdited: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
};

export const queryDataSource = cache(
  async (
    dataSourceId: string,
    options: {
      filter?: AnyProp;
      sorts?: AnyProp;
      pageSize?: number;
      titleProp?: string;
      statusProp?: string;
      tagsProp?: string;
    } = {},
  ): Promise<NotionRow[]> => {
    const notion = makeNotionClient();
    const titleProp = options.titleProp ?? "Name";
    const statusProp = options.statusProp ?? "Status";
    const tagsProp = options.tagsProp ?? "Tags";

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      page_size: options.pageSize ?? 100,
      filter: options.filter,
      sorts: options.sorts,
    });

    return response.results.map((page) => {
      const p = page as AnyProp;
      const props = p.properties ?? {};
      return {
        id: p.id,
        title: extractTitle(props[titleProp]),
        status: extractSelect(props[statusProp]),
        tags: extractMultiSelect(props[tagsProp]),
        lastEdited: extractLastEdited(p),
        raw: p,
      };
    });
  },
);
