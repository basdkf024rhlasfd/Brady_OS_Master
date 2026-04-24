"use client";

import { useState } from "react";

interface IntakeFormProps {
  projectSlug: string;
  source?: string;
}

export function IntakeForm({ projectSlug, source = "portal" }: IntakeFormProps) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim(), source, projectSlug }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask a question, flag a blocker, or surface something that needs attention."
        rows={3}
        maxLength={2000}
        disabled={status === "sending" || status === "sent"}
        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 disabled:opacity-50"
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={!message.trim() || status === "sending" || status === "sent"}
          className="rounded-md bg-gray-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === "sending" ? "Sending…" : "Send"}
        </button>
        {status === "sent" && (
          <span className="text-sm text-green-400">Sent — Brady will see this in his next sweep.</span>
        )}
        {status === "error" && (
          <span className="text-sm text-red-400">Failed to send. Try again.</span>
        )}
      </div>
    </form>
  );
}
