"use client";

import { useState, useEffect } from "react";
import { PageHeader, Panel, Tag } from "@/components/stihl/briefing-components";
import { requestCategories, examplePrompts } from "@/lib/stihl-data";
import type { Request } from "@/lib/stihl-types";

export default function RequestsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [urgency, setUrgency] = useState<string>("Standard");
  const [description, setDescription] = useState<string>("");
  const [requests, setRequests] = useState<Request[]>([]);

  // Load requests from localStorage on mount
  useEffect(() => {
    const savedRequests = localStorage.getItem("stihl-requests");
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    }
  }, []);

  // Save requests to localStorage when changed
  useEffect(() => {
    localStorage.setItem("stihl-requests", JSON.stringify(requests));
  }, [requests]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !description) return;

    const newRequest: Request = {
      id: Date.now().toString(),
      category: selectedCategory,
      urgency,
      description,
      timestamp: new Date().toISOString(),
    };

    setRequests([newRequest, ...requests]);
    setSelectedCategory("");
    setUrgency("Standard");
    setDescription("");
  };

  const handlePromptClick = (prompt: string) => {
    setDescription(prompt);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Request Intake"
        title="Requests"
        description="Submit intelligence requests for custom analysis, reports, or research."
        updatedAt="Mar 14, 2026"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Request Form */}
        <Panel title="New Request" accent="orange">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selector */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Category
              </p>
              <div className="flex flex-wrap gap-2">
                {requestCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/[0.04] text-muted-foreground hover:bg-white/[0.08] hover:text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Urgency Selector */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Urgency
              </p>
              <div className="flex gap-2">
                {["Standard", "Priority", "Urgent"].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setUrgency(level)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      urgency === level
                        ? level === "Urgent"
                          ? "bg-stihl-red text-white"
                          : level === "Priority"
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-primary text-primary-foreground"
                        : "bg-white/[0.04] text-muted-foreground hover:bg-white/[0.08] hover:text-foreground"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Description
              </p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what you need..."
                className="w-full h-32 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>

            {/* Example Prompts */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Example Prompts
              </p>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handlePromptClick(prompt)}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.08] text-xs text-muted-foreground hover:bg-white/[0.04] hover:text-foreground transition-colors text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!selectedCategory || !description}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Request
            </button>
          </form>
        </Panel>

        {/* Submitted Requests */}
        <Panel title="Your Requests" subtitle="Recent submissions" accent="blue">
          {requests.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-muted-foreground">
                No requests submitted yet.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Use the form to submit your first request.
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Tag tone="orange">{request.category}</Tag>
                    <Tag
                      tone={
                        request.urgency === "Urgent"
                          ? "red"
                          : request.urgency === "Priority"
                          ? "blue"
                          : "neutral"
                      }
                    >
                      {request.urgency}
                    </Tag>
                  </div>
                  <p className="text-sm text-foreground mb-2 leading-relaxed">
                    {request.description}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {new Date(request.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}
