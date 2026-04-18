'use client'

import { useState } from 'react'
import CityAutocomplete from '@/components/moving/CityAutocomplete'
import {
  EstimateResult,
  SPECIAL_ITEM_COSTS,
  SEASONAL_MULTIPLIERS,
  NATIONAL_COMPANIES,
  TIPPING_GUIDE,
  STORAGE_COSTS,
  VEHICLE_SHIPPING,
  MOVING_CHECKLIST,
  QUESTIONS_FOR_MOVERS,
  generateRFQEmail,
  CompanyProfile
} from '@/lib/moving/national-data'
import type { ExtractedData, PanelView } from '@/lib/moving/types'

interface Props {
  extractedData: ExtractedData
  estimate: EstimateResult | null
  onDataChange: (data: Partial<ExtractedData>) => void
  panelView?: PanelView
  onSendToChat?: (message: string) => void
  lastAIMessage?: string
}

const HOME_SIZES = [
  { key: 'studio', label: 'Studio' },
  { key: '1BR', label: '1 BR' },
  { key: '2BR', label: '2 BR' },
  { key: '3BR', label: '3 BR' },
  { key: '4BR', label: '4 BR' },
  { key: '5BR+', label: '5 BR+' },
  { key: 'house', label: 'House' },
]

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const SPECIAL_ITEMS = Object.keys(SPECIAL_ITEM_COSTS)

function getMonthFromDate(dateStr?: string): string | null {
  if (!dateStr) return null
  try {
    const d = new Date(dateStr)
    return MONTHS[d.getMonth()] || null
  } catch {
    return null
  }
}

function getSeasonalTag(month: string): { label: string; color: string } | null {
  const m = SEASONAL_MULTIPLIERS[month.toLowerCase()]
  if (!m) return null
  if (m >= 1.2) return { label: 'Peak', color: 'text-red-600 bg-red-50' }
  if (m >= 1.1) return { label: 'High', color: 'text-orange-600 bg-orange-50' }
  if (m <= 0.85) return { label: 'Low', color: 'text-green-600 bg-green-50' }
  if (m <= 0.92) return { label: 'Off-peak', color: 'text-green-600 bg-green-50' }
  return null
}

const tabs: { id: PanelView; label: string; icon: string }[] = [
  { id: 'calculator', label: 'Estimate', icon: '📊' },
  { id: 'companies', label: 'Movers', icon: '🏢' },
  { id: 'checklist', label: 'Checklist', icon: '✅' },
  { id: 'tipping', label: 'Tipping', icon: '💵' },
  { id: 'storage', label: 'Storage', icon: '📦' },
  { id: 'vehicles', label: 'Vehicles', icon: '🚗' },
]

export default function LiveEstimatePanel({ extractedData, estimate, onDataChange, panelView, onSendToChat, lastAIMessage }: Props) {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<CompanyProfile | null>(null)
  const [showQuoteCheck, setShowQuoteCheck] = useState(false)
  const [userQuote, setUserQuote] = useState('')
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)
  const [originDraft, setOriginDraft] = useState<{ value: string; sourceValue?: string } | null>(null)
  const [destDraft, setDestDraft] = useState<{ value: string; sourceValue?: string } | null>(null)
  const [tabOverride, setTabOverride] = useState<{ tab: PanelView; sourcePanelView?: PanelView } | null>(null)

  const sendToChatMessages: Record<PanelView, string> = {
    calculator: 'Here are my move details so far — what do you think?',
    companies: 'Which of these moving companies would you recommend for my move?',
    checklist: 'Can you help me plan my moving timeline?',
    tipping: 'How much should I tip my movers?',
    storage: 'I might need storage — what are my options?',
    vehicles: 'I need to ship a vehicle too. What should I know?',
  }

  const handleCopyFromChat = () => {
    if (!lastAIMessage) return
    navigator.clipboard.writeText(lastAIMessage)
    setCopiedToClipboard(true)
    setTimeout(() => setCopiedToClipboard(false), 2000)
  }

  const renderTabActions = () => (
    <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
      {onSendToChat && (
        <button
          onClick={() => onSendToChat(sendToChatMessages[activeTab])}
          className="flex-1 py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-medium transition-colors"
        >
          Send to Chat &rarr;
        </button>
      )}
      {lastAIMessage && (
        <button
          onClick={handleCopyFromChat}
          className="flex-1 py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-xs font-medium transition-colors"
        >
          {copiedToClipboard ? 'Copied!' : 'Copy from Chat'}
        </button>
      )}
    </div>
  )

  const originInput =
    originDraft?.sourceValue === extractedData.originCity
      ? (originDraft?.value ?? '')
      : (extractedData.originCity || '')
  const destInput =
    destDraft?.sourceValue === extractedData.destinationCity
      ? (destDraft?.value ?? '')
      : (extractedData.destinationCity || '')
  const activeTab =
    tabOverride?.sourcePanelView === panelView
      ? (tabOverride?.tab ?? 'calculator')
      : (panelView ?? tabOverride?.tab ?? 'calculator')

  const handleTabClick = (tab: PanelView) => {
    setTabOverride({ tab, sourcePanelView: panelView })
  }

  const selectedMonth = getMonthFromDate(extractedData.moveDate)

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

  const handleMonth = (month: string) => {
    const monthIndex = MONTHS.indexOf(month)
    const year = new Date().getFullYear()
    const nextYear = monthIndex < new Date().getMonth() ? year + 1 : year
    onDataChange({ moveDate: new Date(nextYear, monthIndex, 15).toISOString() })
  }

  const handleSpecialItem = (item: string) => {
    const current = extractedData.specialItems || []
    if (current.includes(item)) {
      onDataChange({ specialItems: current.filter(i => i !== item) })
    } else {
      onDataChange({ specialItems: [...current, item] })
    }
  }

  const getMonthCostIndicator = (month: string) => {
    const m = SEASONAL_MULTIPLIERS[month.toLowerCase()]
    if (!m) return null
    if (m >= 1.2) return '$$$$'
    if (m >= 1.1) return '$$$'
    if (m <= 0.85) return '$'
    if (m <= 0.95) return '$$'
    return '$$'
  }

  // Company data
  const recommendedCompanies = NATIONAL_COMPANIES
    .filter(c => c.redFlags.length === 0)

  const redFlagCompanies = NATIONAL_COMPANIES.filter(c => c.redFlags.length > 0)

  const handleCopyRFQ = (company: CompanyProfile) => {
    if (!extractedData.originCity || !extractedData.destinationCity || !extractedData.homeSize) return
    const email = generateRFQEmail({
      origin: extractedData.originCity,
      destination: extractedData.destinationCity,
      homeSize: extractedData.homeSize,
      moveDate: extractedData.moveDate || 'Flexible',
      specialItems: extractedData.specialItems,
      companyName: company.name
    })
    navigator.clipboard.writeText(email)
    setCopiedEmail(true)
    setSelectedCompany(company)
    setTimeout(() => setCopiedEmail(false), 3000)
  }

  // Quote comparison
  const quoteComparison = () => {
    if (!estimate || !userQuote) return null
    const quote = parseFloat(userQuote.replace(/[$,]/g, ''))
    if (isNaN(quote)) return null
    const { low, high } = estimate.range
    if (quote < low * 0.8) return { verdict: 'suspicious', message: 'This quote is significantly below market. Watch for bait-and-switch tactics.', color: 'red' }
    if (quote < low) return { verdict: 'good', message: "Great price! Below the typical range. Make sure it's a binding estimate.", color: 'green' }
    if (quote <= high) return { verdict: 'fair', message: 'Fair price. Within the expected range for your move.', color: 'blue' }
    if (quote <= high * 1.2) return { verdict: 'high', message: 'Slightly high. You may be able to negotiate or find better rates.', color: 'yellow' }
    return { verdict: 'expensive', message: 'Above market rate. Get more quotes before committing.', color: 'red' }
  }

  // ============ TAB RENDERERS ============

  const renderCalculator = () => (
    <div className="space-y-5">
      {/* Route */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Route</label>
        <div className="flex items-center gap-2">
          <CityAutocomplete
            value={originInput}
            onChange={(value) => setOriginDraft({ value, sourceValue: extractedData.originCity })}
            onSelect={(city) => {
              setOriginDraft({ value: city, sourceValue: extractedData.originCity })
              if (city.trim() && city.trim() !== extractedData.originCity) {
                onDataChange({ originCity: city.trim() })
              }
            }}
            onBlur={(city) => {
              if (city !== extractedData.originCity) {
                onDataChange({ originCity: city })
              }
            }}
            placeholder="From city"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="text-slate-400 text-sm">&rarr;</span>
          <CityAutocomplete
            value={destInput}
            onChange={(value) => setDestDraft({ value, sourceValue: extractedData.destinationCity })}
            onSelect={(city) => {
              setDestDraft({ value: city, sourceValue: extractedData.destinationCity })
              if (city.trim() && city.trim() !== extractedData.destinationCity) {
                onDataChange({ destinationCity: city.trim() })
              }
            }}
            onBlur={(city) => {
              if (city !== extractedData.destinationCity) {
                onDataChange({ destinationCity: city })
              }
            }}
            placeholder="To city"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Home Size */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Home Size</label>
        <div className="flex flex-wrap gap-1.5">
          {HOME_SIZES.map(s => (
            <button
              key={s.key}
              onClick={() => onDataChange({ homeSize: s.key })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                extractedData.homeSize?.toLowerCase().replace('-', '').replace(' ', '') === s.key.toLowerCase().replace('-', '').replace(' ', '')
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Move Month */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Move Month
          {selectedMonth && getSeasonalTag(selectedMonth) && (
            <span className={`ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold ${getSeasonalTag(selectedMonth)!.color}`}>
              {getSeasonalTag(selectedMonth)!.label}
            </span>
          )}
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {MONTHS.map(month => {
            const isSelected = selectedMonth === month
            const tag = getSeasonalTag(month)
            return (
              <button
                key={month}
                onClick={() => handleMonth(month)}
                className={`py-1.5 rounded-lg text-xs font-medium transition-colors relative ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{month.slice(0, 3)}</span>
                {!isSelected && tag && (
                  <span className={`block text-[9px] ${tag.label === 'Peak' || tag.label === 'High' ? 'text-red-400' : 'text-green-500'}`}>
                    {getMonthCostIndicator(month)}
                  </span>
                )}
              </button>
            )
          })}
        </div>
        <p className="text-[10px] text-slate-400 mt-1">$ = cheaper &middot; $$$$ = peak season pricing</p>
      </div>

      {/* Flexibility */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Date Flexibility</label>
        <div className="flex gap-2">
          <button
            onClick={() => onDataChange({ flexibility: 'locked' })}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
              extractedData.flexibility === 'locked'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Fixed Date
          </button>
          <button
            onClick={() => onDataChange({ flexibility: 'flexible' })}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
              extractedData.flexibility === 'flexible'
                ? 'bg-green-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Flexible +/-2 weeks
          </button>
        </div>
      </div>

      {/* Special Items */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Special Items
          {(extractedData.specialItems?.length || 0) > 0 && (
            <span className="ml-2 text-blue-600">({extractedData.specialItems!.length} selected)</span>
          )}
        </label>
        <div className="flex flex-wrap gap-1.5">
          {SPECIAL_ITEMS.map(item => {
            const isSelected = extractedData.specialItems?.includes(item)
            const cost = SPECIAL_ITEM_COSTS[item]
            return (
              <button
                key={item}
                onClick={() => handleSpecialItem(item)}
                className={`px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                title={`$${cost.low}–$${cost.high}: ${cost.note}`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                {isSelected && <span className="ml-1 opacity-75">+${cost.low}–${cost.high}</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Cost Breakdown */}
      {estimate && estimate.factors.filter(f => f.applied).length > 0 && (
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Cost Breakdown</p>
          <div className="space-y-1.5">
            {estimate.factors.filter(f => f.applied).map((f, i) => (
              <div key={i} className="flex justify-between items-center text-xs">
                <span className="text-slate-600">{f.label}</span>
                <span className="font-medium text-slate-800">{f.impact}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quote comparison */}
      {estimate && (
        <div className="border-t pt-4">
          <button
            onClick={() => setShowQuoteCheck(!showQuoteCheck)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            {showQuoteCheck ? '▼' : '▶'} Got a quote? Check if it&apos;s fair
          </button>
          {showQuoteCheck && (
            <div className="mt-3 space-y-3">
              <input
                type="text"
                value={userQuote}
                onChange={(e) => setUserQuote(e.target.value)}
                placeholder="Enter quote (e.g. $5,200)"
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
              {quoteComparison() && (
                <div className={`p-3 rounded-lg text-sm ${
                  quoteComparison()?.color === 'green' ? 'bg-green-50 text-green-800' :
                  quoteComparison()?.color === 'red' ? 'bg-red-50 text-red-800' :
                  quoteComparison()?.color === 'yellow' ? 'bg-yellow-50 text-yellow-800' :
                  'bg-blue-50 text-blue-800'
                }`}>
                  <p className="font-medium capitalize">{quoteComparison()?.verdict}</p>
                  <p>{quoteComparison()?.message}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )

  const renderCompanies = () => (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-green-600 font-medium uppercase mb-2">Recommended Companies</p>
        <div className="space-y-2">
          {recommendedCompanies.map((co, i) => (
            <div key={i} className="bg-white border rounded-lg p-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-slate-800">{co.name}</p>
                  <p className="text-xs text-slate-500">{co.specialties.slice(0, 3).join(' · ')}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  co.priceTier === 'premium' ? 'bg-purple-50 text-purple-700' :
                  co.priceTier === 'mid' ? 'bg-blue-50 text-blue-700' :
                  'bg-green-50 text-green-700'
                }`}>
                  {co.priceTier}
                </span>
              </div>
              <button
                onClick={() => handleCopyRFQ(co)}
                className="mt-2 w-full py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded text-xs font-medium transition-colors"
              >
                {copiedEmail && selectedCompany?.name === co.name ? 'Email Copied!' : 'Copy Quote Request Email'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-red-600 font-medium uppercase mb-2">Warning Signs to Watch For</p>
        <div className="space-y-2">
          {redFlagCompanies.map((co, i) => (
            <div key={i} className="bg-red-50 border border-red-100 rounded-lg p-3">
              <ul className="text-xs text-red-700 space-y-1">
                {co.redFlags.map((flag, j) => (
                  <li key={j}>• {flag}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800 text-white rounded-lg p-4">
        <p className="text-xs uppercase tracking-wide mb-3 text-slate-300">Questions to Ask Movers</p>
        <ul className="text-sm space-y-2">
          {QUESTIONS_FOR_MOVERS.slice(0, 5).map((q, i) => (
            <li key={i}>
              <p className="font-medium">{q.question}</p>
              <p className="text-xs text-slate-400">{q.why}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  const renderChecklist = () => (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {Object.entries(MOVING_CHECKLIST).map(([period, items]) => (
        <div key={period} className="bg-white border rounded-lg p-3">
          <p className="font-medium text-slate-800 mb-2">
            {period.replace(/_/g, ' ').replace(/(\d+)/, '$1 ')}
          </p>
          <ul className="space-y-1">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <input type="checkbox" className="mt-1 rounded" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )

  const renderTipping = () => (
    <div className="space-y-4">
      <div className="bg-green-50 border border-green-100 rounded-lg p-4">
        <p className="font-medium text-green-800 mb-2">Local Move Tipping</p>
        <p className="text-sm text-green-700">{TIPPING_GUIDE.local.standard}</p>
        <p className="text-xs text-green-600 mt-1">Exceptional service: {TIPPING_GUIDE.local.exceptional}</p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <p className="font-medium text-blue-800 mb-2">Long-Distance Tipping</p>
        <p className="text-sm text-blue-700">Loading crew: {TIPPING_GUIDE.longDistance.loadingCrew}</p>
        <p className="text-sm text-blue-700">Unloading crew: {TIPPING_GUIDE.longDistance.unloadingCrew}</p>
        <p className="text-sm text-blue-700">Driver/foreman: {TIPPING_GUIDE.longDistance.driver}</p>
        <p className="text-xs text-blue-600 mt-2">{TIPPING_GUIDE.longDistance.note}</p>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
        <p className="font-medium text-amber-800 mb-2">When to Tip</p>
        <p className="text-sm text-amber-700">{TIPPING_GUIDE.timing}</p>
      </div>

      <div className="border rounded-lg p-4">
        <p className="font-medium text-slate-800 mb-2">Factors That Warrant Higher Tips</p>
        <ul className="text-sm text-slate-600 space-y-1">
          {TIPPING_GUIDE.local.factors.map((f, i) => (
            <li key={i}>• {f}</li>
          ))}
        </ul>
      </div>
    </div>
  )

  const renderStorage = () => (
    <div className="space-y-4">
      <div className="bg-white border rounded-lg p-4">
        <p className="font-medium text-slate-800 mb-3">Storage Costs (Monthly)</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {Object.entries(STORAGE_COSTS.selfStorage).map(([size, data]) => (
            <div key={size} className="bg-slate-50 rounded p-2">
              <p className="font-medium">{size}</p>
              <p className="text-slate-600">${data.low}-${data.high}</p>
              <p className="text-xs text-slate-400">{data.description}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-2">{STORAGE_COSTS.climateControlled}</p>
      </div>
    </div>
  )

  const renderVehicles = () => (
    <div className="space-y-4">
      <div className="bg-white border rounded-lg p-4">
        <p className="font-medium text-slate-800 mb-3">Vehicle Shipping (Open Transport)</p>
        <div className="space-y-2 text-sm">
          {Object.entries(VEHICLE_SHIPPING.openTransport).map(([dist, range]) => (
            <div key={dist} className="flex justify-between">
              <span className="text-slate-600">{dist.replace('under', '< ').replace('over', '> ')} miles</span>
              <span className="font-medium">${range.low}-${range.high}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-2">{VEHICLE_SHIPPING.enclosedTransport}</p>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
        <p className="font-medium text-amber-800 mb-2">Prep Your Vehicle</p>
        <ul className="text-sm text-amber-700 space-y-1">
          {VEHICLE_SHIPPING.preparation.map((p, i) => (
            <li key={i}>• {p}</li>
          ))}
        </ul>
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[500px]">
      {/* Estimate display at top */}
      <div className="bg-slate-800 text-white p-5">
        {estimate ? (
          <div className="text-center">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Estimated Cost</p>
            <p className="text-3xl font-bold">
              {formatCurrency(estimate.range.low)} – {formatCurrency(estimate.range.high)}
            </p>
            {estimate.warnings.length > 0 && (
              <div className="mt-3 text-left">
                {estimate.warnings.map((w, i) => (
                  <p key={i} className="text-amber-300 text-xs">⚠️ {w}</p>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Estimated Cost</p>
            <p className="text-2xl font-bold text-slate-500">$2,500 – $7,500</p>
            <p className="text-xs text-slate-500 mt-1">Fill in details below to narrow down</p>
          </div>
        )}
      </div>

      {/* Tab bar */}
      <div className="flex border-b overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`flex-1 min-w-0 py-2.5 px-1 text-xs font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <span className="block text-sm">{tab.icon}</span>
            <span className="truncate text-[10px]">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'calculator' && renderCalculator()}
        {activeTab === 'companies' && renderCompanies()}
        {activeTab === 'checklist' && renderChecklist()}
        {activeTab === 'tipping' && renderTipping()}
        {activeTab === 'storage' && renderStorage()}
        {activeTab === 'vehicles' && renderVehicles()}
        {renderTabActions()}
      </div>
    </div>
  )
}
