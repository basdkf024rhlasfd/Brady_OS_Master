export type ContentStatus = "Idea" | "Drafting" | "Ready" | "Published";
export type Channel = "LinkedIn" | "Substack";
export type Series =
  | "The COO Who Quit"
  | "AI for the Rest of Us"
  | "Building with ADHD"
  | "Dad Journal"
  | "Arm the Rebels";
export type DraftFormat =
  | "Opinion Post"
  | "Story Post"
  | "Proof Post"
  | "Origin Essay"
  | "Case Study"
  | "Thought Leadership"
  | "Raw-to-Draft"
  | "Repurpose";

export interface ContentPiece {
  id: string;
  title: string;
  series: Series;
  channels: Channel[];
  priority: "High" | "Medium" | "Low";
  status: ContentStatus;
  sourceText: string;
  draft?: string;
  publishedUrl?: string;
  publishedAt?: string;
}
