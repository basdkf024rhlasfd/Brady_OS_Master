'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import LiveEstimatePanel from '@/components/moving/LiveEstimatePanel'
import ThurmanCard from '@/components/moving/ThurmanCard'
import ThurmanLeadForm from '@/components/moving/ThurmanLeadForm'
import { calculateEstimate, EstimateResult } from '@/lib/moving/national-data'
import { isOrlandoMetro } from '@/lib/moving/orlando-detector'
import type { ExtractedData, PanelView } from '@/lib/moving/types'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function MovingChat() {
  const [sessionId] = useState(() => uuidv4())
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey! I'm here to help you figure out what your move should cost. I use industry pricing data and averages to give you a solid estimate — not some generic range.\n\nHere's what I can help with:\n• Cost estimate based on your specific route, home size, and timing\n• Company recommendations (who's legit, what to watch out for)\n• Quote comparison — paste a quote and I'll tell you if it's fair\n• Moving checklist, tipping guide, storage & vehicle shipping info\n\nYou can also use the calculator on the right to plug in details directly. Where are you moving from and to?"
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [extractedData, setExtractedData] = useState<ExtractedData>({})
  const [panelView, setPanelView] = useState<PanelView>('calculator')
  const [thurmanFormOpen, setThurmanFormOpen] = useState(false)
  const pendingPanelChanges = useRef<Partial<ExtractedData>>({})

  const isOrlando = useMemo(
    () => isOrlandoMetro(extractedData.destinationCity),
    [extractedData.destinationCity]
  )

  // Auto-jump to Orlando tab when destination is detected for the first time
  const prevIsOrlando = useRef(false)
  useEffect(() => {
    if (isOrlando && !prevIsOrlando.current) {
      setPanelView('orlando')
    }
    prevIsOrlando.current = isOrlando
  }, [isOrlando])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Calculate estimate in real-time based on extracted data
  const estimate: EstimateResult | null = useMemo(() => {
    const hasAnyData = extractedData.originCity || extractedData.destinationCity || extractedData.homeSize
    if (!hasAnyData) return null

    return calculateEstimate({
      origin: extractedData.originCity,
      destination: extractedData.destinationCity,
      homeSize: extractedData.homeSize,
      moveMonth: extractedData.moveDate ? new Date(extractedData.moveDate).toLocaleString('en-US', { month: 'long' }).toLowerCase() : undefined,
      specialItems: extractedData.specialItems,
      flexibility: extractedData.flexibility
    })
  }, [extractedData])

  // Auto-focus input after loading completes
  const prevLoading = useRef(false)
  useEffect(() => {
    if (prevLoading.current && !loading) {
      inputRef.current?.focus()
    }
    prevLoading.current = loading
  }, [loading])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const changes = { ...pendingPanelChanges.current }
      pendingPanelChanges.current = {}

      const response = await fetch('/api/moving/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: userMessage,
          panelChanges: Object.keys(changes).length > 0 ? changes : undefined,
          panelState: {
            ...extractedData,
            estimate: estimate ? { low: estimate.range.low, high: estimate.range.high, confidence: estimate.confidence } : null
          }
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `Server error (${response.status})`)
      }

      if (data.response) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
      }

      // Update extracted data for real-time estimate
      if (data.extractedData) {
        setExtractedData(prev => {
          const incoming = Object.fromEntries(
            Object.entries(data.extractedData).filter(([, v]) => v !== null && v !== undefined && v !== '')
          )

          // New-move detection: if both origin and destination changed, replace instead of merge
          const incomingOrigin = (incoming.originCity || incoming.originZip) as string | undefined
          const incomingDest = (incoming.destinationCity || incoming.destinationZip) as string | undefined
          const currentOrigin = prev.originCity || prev.originZip
          const currentDest = prev.destinationCity || prev.destinationZip

          const isNewMove = incomingOrigin && incomingDest && currentOrigin && currentDest
            && incomingOrigin.toLowerCase() !== currentOrigin.toLowerCase()
            && incomingDest.toLowerCase() !== currentDest.toLowerCase()

          if (isNewMove) {
            return incoming as ExtractedData
          }

          return { ...prev, ...incoming }
        })
      }

      if (data.panelView) {
        setPanelView(data.panelView)
      }
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error)
      console.error('Error:', errMsg)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Sorry, something went wrong: ${errMsg}`
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleSendToChat = (message: string) => {
    if (loading) return
    setInput(message)
    setTimeout(() => {
      setInput('')
      setMessages(prev => [...prev, { role: 'user', content: message }])
      const doSend = async () => {
        setLoading(true)
        try {
          const changes = { ...pendingPanelChanges.current }
          pendingPanelChanges.current = {}
          const response = await fetch('/api/moving/conversation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sessionId,
              message,
              panelChanges: Object.keys(changes).length > 0 ? changes : undefined
            })
          })
          const data = await response.json()
          if (!response.ok) throw new Error(data.error || `Server error (${response.status})`)
          if (data.response) setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
          if (data.extractedData) {
            setExtractedData(prev => {
              const incoming = Object.fromEntries(
                Object.entries(data.extractedData).filter(([, v]) => v !== null && v !== undefined && v !== '')
              )
              return { ...prev, ...incoming }
            })
          }
          if (data.panelView) setPanelView(data.panelView)
        } catch (error) {
          const errMsg = error instanceof Error ? error.message : String(error)
          setMessages(prev => [...prev, { role: 'assistant', content: `Sorry, something went wrong: ${errMsg}` }])
        } finally {
          setLoading(false)
          setTimeout(() => inputRef.current?.focus(), 0)
        }
      }
      doSend()
    }, 100)
  }

  // Get the last AI message for "Copy from Chat"
  const lastAIMessage = [...messages].reverse().find(m => m.role === 'assistant')?.content

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Moving Cost Calculator</h1>
        <p className="text-slate-500 text-sm">Industry pricing data & estimates • Know if your quote is fair</p>
      </header>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Chat Panel - 3 cols */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col" style={{ height: 'calc(100vh - 200px)', minHeight: '500px' }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-slate-100 text-slate-800 rounded-bl-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 p-4">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Tell me about your move..."
                className="flex-1 px-4 py-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={loading}
                autoFocus
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors text-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Estimate Panel - 2 cols */}
        <div
          className="lg:col-span-2 flex flex-col gap-3"
          style={{ height: 'calc(100vh - 200px)', minHeight: '500px' }}
        >
          {isOrlando && <ThurmanCard onConnect={() => setThurmanFormOpen(true)} />}
          <div className="flex-1 min-h-0">
            <LiveEstimatePanel
              extractedData={extractedData}
              estimate={estimate}
              panelView={panelView}
              isOrlando={isOrlando}
              onDataChange={(update) => {
                setExtractedData(prev => ({ ...prev, ...update }))
                pendingPanelChanges.current = { ...pendingPanelChanges.current, ...update }
              }}
              onSendToChat={handleSendToChat}
              lastAIMessage={lastAIMessage}
            />
          </div>
        </div>
      </div>

      <ThurmanLeadForm
        open={thurmanFormOpen}
        onClose={() => setThurmanFormOpen(false)}
        extractedData={extractedData}
        recentMessages={messages}
      />
    </div>
  )
}
