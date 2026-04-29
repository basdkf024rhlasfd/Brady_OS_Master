'use client'

import { useState } from 'react'
import { ORLANDO_FAQ_CHIPS, type OrlandoFAQChip } from '@/lib/moving/orlando-faq-chips'
import { ORLANDO_NEIGHBORHOODS } from '@/lib/moving/orlando-neighborhoods'

interface Props {
  onSendToChat?: (message: string) => void
}

const CATEGORY_LABELS: Record<OrlandoFAQChip['category'], string> = {
  cost: 'Cost',
  neighborhoods: 'Neighborhoods',
  schools: 'Schools',
  risk: 'Risk',
  process: 'Process',
  lifestyle: 'Lifestyle',
}

const CATEGORY_COLORS: Record<OrlandoFAQChip['category'], string> = {
  cost: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
  neighborhoods: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
  schools: 'bg-violet-50 text-violet-700 hover:bg-violet-100',
  risk: 'bg-amber-50 text-amber-700 hover:bg-amber-100',
  process: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
  lifestyle: 'bg-pink-50 text-pink-700 hover:bg-pink-100',
}

const SOURCES = [
  'ORRA (Orlando Regional Realtor Association)',
  'Redfin',
  'Zillow',
  'FEMA',
  'Orlando Economic Partnership',
  'Florida Realtors',
  'County Property Appraisers',
]

export default function OrlandoPanel({ onSendToChat }: Props) {
  const [showSources, setShowSources] = useState(false)

  const handleChipClick = (chip: OrlandoFAQChip) => {
    onSendToChat?.(chip.prompt)
  }

  const handleNeighborhoodClick = (hint: string) => {
    onSendToChat?.(hint)
  }

  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-lg p-4">
        <p className="text-xs font-semibold text-orange-800 uppercase tracking-wide mb-1">
          Orlando data loaded
        </p>
        <p className="text-sm text-slate-700">
          50+ neighborhoods, full cost-of-ownership stack, hurricane and insurance reality, schools, financing programs, buying process. Verified Feb 2026.
        </p>
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Quick questions
        </p>
        <div className="flex flex-wrap gap-1.5">
          {ORLANDO_FAQ_CHIPS.map(chip => (
            <button
              key={chip.label}
              onClick={() => handleChipClick(chip)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${CATEGORY_COLORS[chip.category]}`}
              title={`${CATEGORY_LABELS[chip.category]} — ${chip.prompt}`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Neighborhoods
        </p>
        <div className="grid grid-cols-1 gap-1.5">
          {ORLANDO_NEIGHBORHOODS.map(n => (
            <button
              key={n.name}
              onClick={() => handleNeighborhoodClick(n.promptHint)}
              className="text-left bg-white border border-slate-200 rounded-lg p-3 hover:border-blue-300 hover:bg-blue-50/40 transition-colors"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0">
                  <p className="font-medium text-slate-800 text-sm">{n.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.vibe}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-semibold text-slate-700">{n.medianPrice}</p>
                  {n.yoyGrowth && (
                    <p className="text-[10px] text-emerald-600">{n.yoyGrowth} YoY</p>
                  )}
                </div>
              </div>
              <div className="flex gap-1.5 mt-2 flex-wrap">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                  Schools: {n.schoolGrade}
                </span>
                {n.hasCDD && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700">
                    CDD
                  </span>
                )}
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-50 text-slate-500">
                  {n.bestFor}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
        <p className="text-xs font-semibold text-amber-800 mb-1">Florida-specific risks worth asking about</p>
        <ul className="text-xs text-amber-900 space-y-0.5">
          <li>• Hurricane wind zones &amp; insurance availability</li>
          <li>• FEMA flood zone designation (X / AE / VE)</li>
          <li>• Sinkhole risk by zip code</li>
          <li>• CDD fees (often $1,500&ndash;$3,000/yr in newer communities)</li>
          <li>• Property tax reset on resale (homestead cap doesn&rsquo;t transfer)</li>
        </ul>
      </div>

      <div className="border-t border-slate-100 pt-3">
        <button
          onClick={() => setShowSources(s => !s)}
          className="text-xs text-slate-500 hover:text-slate-700 font-medium"
        >
          {showSources ? '▼' : '▶'} Data sources &amp; verification
        </button>
        {showSources && (
          <div className="mt-2 space-y-1">
            {SOURCES.map(s => (
              <p key={s} className="text-xs text-slate-500">• {s}</p>
            ))}
            <p className="text-[10px] text-slate-400 mt-2 italic">
              Verified February 2026. Estimates based on industry averages and Orlando market data; actual costs vary by property and lender.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
