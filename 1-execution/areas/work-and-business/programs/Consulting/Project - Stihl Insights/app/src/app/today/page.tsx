import Link from "next/link";
import {
  launchRadar,
  marketPulse,
  newsFeed,
  quickPulse,
  quickStats,
  stihlWorkspace,
  tariffSignals,
} from "@/lib/stihl-data";
import {
  ActionLink,
  ListItem,
  MetricCard,
  PageHeader,
  Panel,
  Tag,
} from "@/components/StihlUI";

export default function StihlTodayPage() {
  return (
    <div className="h-full overflow-y-auto bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.14),transparent_32%),linear-gradient(180deg,#09090b_0%,#09090b_100%)] p-6 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          eyebrow="STIHL USA"
          title={stihlWorkspace.name}
          description={stihlWorkspace.summary}
          updatedAt={stihlWorkspace.updatedAt}
          cta={
            <Link
              href="/artifacts"
              className="inline-flex rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm font-medium text-white transition hover:border-orange-300/30 hover:text-orange-100"
            >
              View example deliverables
            </Link>
          }
        />

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Panel
            title="What matters now"
          >
            <div className="space-y-4">
              <ListItem
                kicker="Top signal"
                title={quickPulse.topSignal}
              />
              <ListItem
                kicker="Action item"
                title={quickPulse.actionItem}
              />
              <ListItem
                kicker="Peer snapshot"
                title={quickPulse.peerSnapshot}
              />
            </div>
          </Panel>

          <Panel
            title="Start here"
            accent="blue"
          >
            <div className="grid gap-3">
              <ActionLink
                href="/competitors"
                label="Competitor watch"
                detail="Open the peer matrix, financial pulse, and current launch posture."
              />
              <ActionLink
                href="/digital"
                label="Digital review"
                detail="Browse, search, marketplace, and social signal audit."
              />
              <ActionLink
                href="/artifacts"
                label="Artifact examples"
                detail="Browse board-ready examples including Kantar-style one-pagers and memos."
              />
              <ActionLink
                href="/requests"
                label="Request something"
                detail="Capture a fresh ask without forcing a full chat workflow."
              />
            </div>
          </Panel>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {quickStats.map((item) => (
            <MetricCard
              key={item.label}
              label={item.label}
              value={item.value}
              detail={item.detail}
            />
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Panel
            title="News feed"
          >
            <div className="space-y-4">
              {newsFeed.map((item) => (
                <div key={`${item.source}-${item.headline}`} className="rounded-2xl border border-white/8 bg-black/15 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag tone="orange">{item.source}</Tag>
                    <Tag>{item.time}</Tag>
                  </div>
                  <div className="mt-3 text-sm font-semibold text-white">{item.headline}</div>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{item.implication}</p>
                </div>
              ))}
            </div>
          </Panel>

          <div className="space-y-6">
            <Panel
              title="Financial watch"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {marketPulse.map((item) => (
                  <div key={item.ticker} className="rounded-2xl border border-white/8 bg-black/15 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-white">{item.label}</div>
                        <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                          {item.ticker}
                        </div>
                      </div>
                      <Tag tone={item.move.startsWith("+") ? "green" : "blue"}>{item.move}</Tag>
                    </div>
                    <div className="mt-3 text-lg font-semibold text-white">{item.price}</div>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{item.note}</p>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel
              title="Tariff watch"
              accent="orange"
            >
              <div className="grid gap-3">
                {tariffSignals.map((item) => (
                  <MetricCard
                    key={item.label}
                    label={item.label}
                    value={item.value}
                    detail={item.detail}
                  />
                ))}
              </div>
            </Panel>
          </div>
        </div>

        <div className="mt-6">
          <Panel
            title="New launches"
            accent="blue"
          >
            <div className="grid gap-4 lg:grid-cols-3">
              {launchRadar.map((item) => (
                <ListItem
                  key={`${item.source}-${item.headline}`}
                  kicker={item.source}
                  title={item.headline}
                  body={item.implication}
                />
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
