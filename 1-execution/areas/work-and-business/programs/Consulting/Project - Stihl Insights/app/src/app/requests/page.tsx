import { RequestInbox } from "@/components/RequestInbox";
import { PageHeader, Panel } from "@/components/StihlUI";
import { stihlWorkspace } from "@/lib/stihl-data";

export default function StihlRequestsPage() {
  return (
    <div className="h-full overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.1),transparent_30%),linear-gradient(180deg,#09090b_0%,#09090b_100%)] p-6 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          eyebrow="Requests"
          title="Simple feedback and intake"
          description="Submit a request and we'll have it ready for your next meeting."
          updatedAt={stihlWorkspace.updatedAt}
        />

        <RequestInbox />

      </div>
    </div>
  );
}
