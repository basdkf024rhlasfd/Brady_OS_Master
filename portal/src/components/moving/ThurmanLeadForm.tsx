'use client'

import { useState } from 'react'
import { THURMAN_CONFIG } from '@/lib/moving/thurman-config'
import { ORLANDO_NEIGHBORHOODS } from '@/lib/moving/orlando-neighborhoods'
import type { ExtractedData } from '@/lib/moving/types'

interface Props {
  open: boolean
  onClose: () => void
  extractedData: ExtractedData
  recentMessages: Array<{ role: 'user' | 'assistant'; content: string }>
}

const TIMELINES = [
  { value: '0-30', label: 'Within 30 days' },
  { value: '30-90', label: '30-90 days' },
  { value: '90-180', label: '3-6 months' },
  { value: '180+', label: '6+ months / exploring' },
]

const BUDGETS = [
  { value: 'under-400', label: 'Under $400K' },
  { value: '400-600', label: '$400K - $600K' },
  { value: '600-900', label: '$600K - $900K' },
  { value: '900-1500', label: '$900K - $1.5M' },
  { value: '1500+', label: '$1.5M+' },
  { value: 'unsure', label: 'Not sure yet' },
]

export default function ThurmanLeadForm({ open, onClose, extractedData, recentMessages }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [timeline, setTimeline] = useState('')
  const [familySize, setFamilySize] = useState('')
  const [budget, setBudget] = useState('')
  const [neighborhoods, setNeighborhoods] = useState<string[]>([])
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  if (!open) return null

  const toggleNeighborhood = (n: string) => {
    setNeighborhoods(prev =>
      prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) {
      setError('Name and email are required')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/moving/orlando-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          timeline,
          familySize,
          budget,
          neighborhoods,
          notes,
          extractedData,
          recentMessages: recentMessages.slice(-8),
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || `Submission failed (${res.status})`)
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Connect with {THURMAN_CONFIG.groupName}</h2>
              <p className="text-xs text-slate-500 mt-1">{THURMAN_CONFIG.serviceArea}</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 text-xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {submitted ? (
            <div className="py-6 text-center space-y-3">
              <div className="text-4xl">✓</div>
              <p className="text-base font-semibold text-slate-800">You&rsquo;re connected.</p>
              <p className="text-sm text-slate-600">
                Brandon and Ana will reach out shortly with next steps. They&rsquo;ll have your move details and Orlando preferences in hand.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Timeline</label>
                  <select
                    value={timeline}
                    onChange={e => setTimeline(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select…</option>
                    {TIMELINES.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Family size</label>
                  <input
                    type="text"
                    value={familySize}
                    onChange={e => setFamilySize(e.target.value)}
                    placeholder="e.g. 2 adults, 3 kids"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Budget range</label>
                <select
                  value={budget}
                  onChange={e => setBudget(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select…</option>
                  {BUDGETS.map(b => (
                    <option key={b.value} value={b.value}>{b.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Neighborhoods of interest
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ORLANDO_NEIGHBORHOODS.map(n => {
                    const selected = neighborhoods.includes(n.name)
                    return (
                      <button
                        type="button"
                        key={n.name}
                        onClick={() => toggleNeighborhood(n.name)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                          selected
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {n.name}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Anything Brandon &amp; Ana should know?
                </label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Schools, commute, must-haves, deal-breakers…"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg p-2">
                  {error}
                </p>
              )}

              <p className="text-[10px] text-slate-400 italic">
                Your move details and chat context will be shared with Ana and Brandon so they arrive pre-briefed.
              </p>
              <div className="text-[10px] text-slate-500 border-t border-slate-100 pt-2 mt-2 leading-relaxed">
                <p>
                  <strong className="text-slate-700">Ana Thurman</strong> &middot; Realtor at {THURMAN_CONFIG.brokerage.name}
                </p>
                <p>{THURMAN_CONFIG.brokerage.address} &middot; {THURMAN_CONFIG.brokerage.phone}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2 bg-orange-500 text-slate-900 rounded-lg text-sm font-semibold hover:bg-orange-400 disabled:opacity-50"
                >
                  {submitting ? 'Sending…' : 'Connect me'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
