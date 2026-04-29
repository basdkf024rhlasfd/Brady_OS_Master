'use client'

import { useState } from 'react'
import { THURMAN_CONFIG } from '@/lib/moving/thurman-config'

interface Props {
  onConnect: () => void
}

function initials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

function AgentAvatar({ name, photo }: { name: string; photo: string }) {
  const [errored, setErrored] = useState(false)
  return (
    <div
      className="w-11 h-11 rounded-full border-2 border-slate-800 bg-slate-600 flex items-center justify-center overflow-hidden text-xs font-semibold"
      title={name}
    >
      {errored ? (
        initials(name)
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setErrored(true)}
        />
      )}
    </div>
  )
}

export default function ThurmanCard({ onConnect }: Props) {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl shadow-sm border border-slate-700 overflow-hidden mb-3">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex -space-x-2">
            {THURMAN_CONFIG.agents.map(agent => (
              <AgentAvatar key={agent.name} name={agent.name} photo={agent.photo} />
            ))}
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wide text-orange-300 font-semibold">
              Local Orlando agents
            </p>
            <p className="text-sm font-semibold truncate">
              Ana &amp; Brandon Thurman
            </p>
            <p className="text-[10px] text-slate-400">
              Thurman Advisory Group · {THURMAN_CONFIG.brokerage.name}
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-300 mb-3 leading-relaxed">
          {THURMAN_CONFIG.tagline}
        </p>
        <button
          onClick={onConnect}
          className="w-full py-2 bg-orange-500 hover:bg-orange-400 text-slate-900 rounded-lg text-sm font-semibold transition-colors"
        >
          Connect with the Thurmans &rarr;
        </button>
        <div className="flex justify-center gap-3 mt-2">
          {THURMAN_CONFIG.agents.map(agent =>
            agent.linkedinUrl ? (
              <a
                key={agent.name}
                href={agent.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-slate-400 hover:text-orange-300 transition-colors"
              >
                {agent.name.split(' ')[0]} on LinkedIn ↗
              </a>
            ) : null
          )}
        </div>
      </div>
    </div>
  )
}
