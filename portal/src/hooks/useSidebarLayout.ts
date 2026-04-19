import { useState, useCallback, useEffect } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import type { ProjectNav } from "@/lib/nav-types";

const STORAGE_KEY = "sidebar-nav-order";

interface NavLayout {
  version: 1;
  order: string[]; // flat order of all slugs
  assignments: Record<string, string | null>; // slug → groupId or null (ungrouped)
  starred: string[]; // slugs pinned to top
}

function readLayout(): NavLayout | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as NavLayout) : null;
  } catch {
    return null;
  }
}

function writeLayout(layout: NavLayout) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...layout, starred: layout.starred ?? [] }));
}

export function useSidebarLayout(
  allProjects: ProjectNav[],
  userSlugs: string[],
  staticGroups: Array<{ id: string; slugs: string[] }>
) {
  const [order, setOrder] = useState<string[]>([]);
  const [assignments, setAssignments] = useState<Record<string, string | null>>({});
  const [starred, setStarred] = useState<string[]>([]);

  useEffect(() => {
    const layout = readLayout();
    if (layout?.order?.length) setOrder(layout.order);
    if (layout?.assignments) setAssignments(layout.assignments);
    if (layout?.starred) setStarred(layout.starred);
  }, []);

  const accessible = allProjects.filter((p) => userSlugs.includes(p.slug));

  // Resolve which group a slug belongs to (override → static → null)
  function effectiveGroup(slug: string): string | null {
    if (slug in assignments) return assignments[slug];
    return staticGroups.find((g) => g.slugs.includes(slug))?.id ?? null;
  }

  // Items sorted by saved order, with unsaved items appended
  function sortedSubset(slugs: string[]): ProjectNav[] {
    const items = accessible.filter((p) => slugs.includes(p.slug));
    const result: ProjectNav[] = [];
    for (const s of order) {
      const p = items.find((p) => p.slug === s);
      if (p) result.push(p);
    }
    for (const p of items) {
      if (!result.find((r) => r.slug === p.slug)) result.push(p);
    }
    return result;
  }

  // All accessible slugs (for one global SortableContext)
  const allSlugs = accessible.map((p) => p.slug);

  function getUngroupedItems(): ProjectNav[] {
    return sortedSubset(allSlugs.filter((s) => effectiveGroup(s) === null));
  }

  function getGroupItems(groupId: string): ProjectNav[] {
    return sortedSubset(allSlugs.filter((s) => effectiveGroup(s) === groupId));
  }

  const move = useCallback(
    (activeSlug: string, overSlug: string) => {
      if (activeSlug === overSlug) return;

      setOrder((prevOrder) => {
        const current = [
          ...prevOrder.filter((s) => allSlugs.includes(s)),
          ...allSlugs.filter((s) => !prevOrder.includes(s)),
        ];
        const from = current.indexOf(activeSlug);
        const to = current.indexOf(overSlug);
        if (from === -1 || to === -1) return prevOrder;
        const newOrder = arrayMove(current, from, to);

        setAssignments((prevAssign) => {
          // Move active item to the same group as the over item
          const targetGroup = (() => {
            if (overSlug in prevAssign) return prevAssign[overSlug];
            return staticGroups.find((g) => g.slugs.includes(overSlug))?.id ?? null;
          })();

          const currentGroup = (() => {
            if (activeSlug in prevAssign) return prevAssign[activeSlug];
            return staticGroups.find((g) => g.slugs.includes(activeSlug))?.id ?? null;
          })();

          const nextAssign =
            targetGroup !== currentGroup
              ? { ...prevAssign, [activeSlug]: targetGroup }
              : prevAssign;

          writeLayout({ version: 1, order: newOrder, assignments: nextAssign, starred });
          return nextAssign;
        });

        return newOrder;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allSlugs.join(","), staticGroups]
  );

  const toggleStar = useCallback((slug: string) => {
    setStarred((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      setOrder((o) => { writeLayout({ version: 1, order: o, assignments, starred: next }); return o; });
      return next;
    });
  }, [assignments]);

  const resetLayout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setOrder([]);
    setAssignments({});
    setStarred([]);
  }, []);

  const starredItems = accessible.filter((p) => starred.includes(p.slug));

  return { allSlugs, starredItems, starred, toggleStar, getUngroupedItems, getGroupItems, move, resetLayout };
}
