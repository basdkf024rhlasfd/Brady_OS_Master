"use client";

import type { ActionItem, KidId } from "@/lib/school-hub-types";
import { KIDS } from "@/lib/school-hub-data";
import { Check, Clock, Pause } from "lucide-react";

interface ActionItemRowProps {
  item: ActionItem;
  onToggleStatus: (id: string) => void;
  onSnooze: (id: string) => void;
}

const categoryLabels: Record<ActionItem["category"], string> = {
  forms: "Form / Permission",
  supplies: "Supplies",
  fees: "Fee / Payment",
  volunteer: "Volunteer",
  other: "Other",
};

export function ActionItemRow({ item, onToggleStatus, onSnooze }: ActionItemRowProps) {
  const isDone = item.status === "done";
  const isSnoozed = item.status === "snoozed";

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border transition-colors ${
        isDone
          ? "bg-card/50 border-white/[0.04] opacity-60"
          : isSnoozed
          ? "bg-amber-500/5 border-amber-500/20"
          : "bg-card border-white/[0.08]"
      }`}
    >
      {/* Status toggle */}
      <button
        onClick={() => onToggleStatus(item.id)}
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
          isDone
            ? "bg-emerald-500 border-emerald-500 text-white"
            : "border-white/20 hover:border-white/40"
        }`}
      >
        {isDone && <Check className="h-3 w-3" />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className={`text-sm font-medium ${isDone ? "line-through text-muted-foreground" : "text-foreground"}`}>
            {item.title}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Kid dots */}
          {item.kidIds.map((kidId) => (
            <span key={kidId} className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: KIDS[kidId]?.color }}
              />
              {KIDS[kidId]?.name}
            </span>
          ))}

          {/* Category */}
          <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-white/[0.06] text-muted-foreground">
            {categoryLabels[item.category]}
          </span>

          {/* Due date */}
          {item.dueDate && (
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Clock className="h-2.5 w-2.5" />
              {new Date(item.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          )}
        </div>

        {item.notes && (
          <p className="text-xs text-muted-foreground mt-1">{item.notes}</p>
        )}
      </div>

      {/* Snooze */}
      {!isDone && (
        <button
          onClick={() => onSnooze(item.id)}
          className={`shrink-0 p-1.5 rounded-md transition-colors ${
            isSnoozed
              ? "text-amber-400 hover:text-amber-300"
              : "text-muted-foreground hover:text-foreground"
          }`}
          title={isSnoozed ? "Un-snooze" : "Snooze"}
        >
          <Pause className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
