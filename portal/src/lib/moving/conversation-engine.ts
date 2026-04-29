import Anthropic from '@anthropic-ai/sdk'
import { readFileSync } from 'fs'
import { join } from 'path'
import { calculateEstimate, NATIONAL_COMPANIES, SEASONAL_MULTIPLIERS } from './national-data'
import { isOrlandoMetro } from './orlando-detector'
import { loadKBFiles } from '@/lib/chat/kb-loader'
import { getChatConfig } from '@/lib/chat/chat-config'

const client = new Anthropic()

// ============ TOKEN USAGE LOGGING ============
export interface TurnUsageLog {
  turn_number: number
  system_prompt_tokens_est: number
  conversation_history_tokens_est: number
  user_message_tokens_est: number
  total_input_tokens: number
  total_output_tokens: number
  model: string
  latency_ms: number
  timestamp: string
}

const sessionUsageLogs = new Map<string, TurnUsageLog[]>()

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}

export function getUsageLogs(sessionId: string): TurnUsageLog[] {
  return sessionUsageLogs.get(sessionId) || []
}

export interface ConversationState {
  sessionId: string
  messages: Array<{ role: 'user' | 'assistant'; content: string }>
  extractedData: {
    originCity?: string
    destinationCity?: string
    originZip?: string
    destinationZip?: string
    homeSize?: string
    moveDate?: string
    specialItems: string[]
    flexibility?: 'locked' | 'flexible'
  }
  stage: 'gathering' | 'estimating' | 'detailed' | 'complete'
  isPaid: boolean
  runningSummary?: string
}

// In-memory session store (would be Redis/DB in production)
const sessions = new Map<string, ConversationState>()

export function getOrCreateSession(sessionId: string): ConversationState {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      sessionId,
      messages: [],
      extractedData: { specialItems: [] },
      stage: 'gathering',
      isPaid: true // Portal users get full access
    })
  }
  return sessions.get(sessionId)!
}

export function updateSession(sessionId: string, updates: Partial<ConversationState>) {
  const session = getOrCreateSession(sessionId)
  Object.assign(session, updates)
  sessions.set(sessionId, session)
}

// ============ CONVERSATION SUMMARIZATION ============
const RECENT_WINDOW = 4 // Keep last 2 exchanges (4 messages) verbatim
const SUMMARIZE_THRESHOLD = 6 // Start summarizing after 3 exchanges (6 messages)

async function updateRunningSummary(
  currentSummary: string | undefined,
  newUserMsg: string,
  newAssistantMsg: string
): Promise<string> {
  const prompt = currentSummary
    ? `Current summary: ${currentSummary}\n\nNew exchange:\nUser: ${newUserMsg}\nAssistant: ${newAssistantMsg}\n\nUpdate the summary to include new info. One paragraph, under 100 words. Facts only.`
    : `Summarize this exchange:\nUser: ${newUserMsg}\nAssistant: ${newAssistantMsg}\n\nOne paragraph, under 60 words. Capture: origin, destination, home size, special items, preferences. Facts only.`

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 150,
    messages: [{ role: 'user', content: prompt }]
  })

  const text = response.content.find(b => b.type === 'text')
  return text && text.type === 'text' ? text.text.trim() : (currentSummary || '')
}

function buildMessages(
  allMessages: Array<{ role: 'user' | 'assistant'; content: string }>,
  runningSummary?: string
): Array<{ role: 'user' | 'assistant'; content: string }> {
  if (allMessages.length <= SUMMARIZE_THRESHOLD) {
    return allMessages.map(m => ({ role: m.role, content: m.content }))
  }

  const recentMessages = allMessages.slice(-RECENT_WINDOW)
  const result: Array<{ role: 'user' | 'assistant'; content: string }> = []

  if (runningSummary) {
    result.push({ role: 'user', content: `[Previous conversation: ${runningSummary}]` })
    result.push({ role: 'assistant', content: 'Understood, I have the context from our earlier conversation.' })
  }

  result.push(...recentMessages.map(m => ({ role: m.role, content: m.content })))
  return result
}

const SYSTEM_PROMPT = `Moving cost estimator. Be conversational, concise.

Your estimates are based on industry-average pricing models (cost per mile by home size, seasonal multipliers, special item surcharges). Be transparent that these are estimates based on industry data, not quotes from specific companies.

STRICT RULES:
1. Ask exactly ONE question per response. Never two. Never three. One.
2. The KNOWN section lists answered fields — NEVER re-ask or seek clarification on these.
3. If the user volunteers extra info beyond what you asked, acknowledge it and extract it, but still only ask ONE new question.
4. If PANEL_UPDATES is present, the user changed those fields via the calculator. Briefly acknowledge the change (e.g. "June — peak season, good to know") then continue with your next question.

Collect (in this order, skip what's already KNOWN): origin, destination, home size (studio/1BR/2BR/3BR/4BR/house), move month, special items, date flexibility.
If user gives one city, ask if it's origin or destination. For vague answers, offer specific options.
If the user describes a completely different move (different cities), treat it as a new query — ignore all previously extracted data and start fresh.
Once you have origin + destination + home size, you can give an estimate. Flag peak season (May-Aug +15-25%).
If a CALCULATED ESTIMATE is provided, always use that exact range — never invent your own numbers.
The user can also fill in details via the estimate panel on the right side of the screen. Treat panel inputs as equivalent to chat answers — they are already KNOWN.

PANEL VIEW RULES — set "panelView" to control what the user sees on the right:
- "calculator" — default during data gathering
- "companies" — when origin + destination + home size are all known and you're discussing movers or the estimate is ready
- "checklist" — when the user asks about planning, timeline, or preparation
- "tipping" — when the user asks about tipping movers
- "storage" — when discussing storage needs
- "vehicles" — when discussing vehicle/auto shipping

Respond with raw JSON only (no markdown, no code fences):
{"message":"your response","extracted":{"originCity":null,"destinationCity":null,"originZip":null,"destinationZip":null,"homeSize":null,"moveDate":null,"specialItems":[],"flexibility":null},"stage":"gathering","readyForEstimate":false,"panelView":"calculator"}`

interface PanelState {
  originCity?: string
  destinationCity?: string
  homeSize?: string
  moveDate?: string
  specialItems?: string[]
  flexibility?: string
  estimate?: { low: number; high: number; confidence: number } | null
}

export async function processMessage(
  sessionId: string,
  userMessage: string,
  panelChanges?: Record<string, unknown>,
  panelState?: PanelState
): Promise<{ response: string; panelView?: string; state: ConversationState }> {
  const session = getOrCreateSession(sessionId)

  // Merge panel changes into session data before processing
  let panelUpdateContext = ''
  if (panelChanges && Object.keys(panelChanges).length > 0) {
    const descriptions: string[] = []
    for (const [key, value] of Object.entries(panelChanges)) {
      if (value !== null && value !== undefined && value !== '') {
        (session.extractedData as Record<string, unknown>)[key] = value
        descriptions.push(`${key}→${Array.isArray(value) ? value.join(',') : value}`)
      }
    }
    if (descriptions.length > 0) {
      panelUpdateContext = `\nPANEL_UPDATES (user changed via calculator): ${descriptions.join(', ')}`
    }
  }

  // Add user message to history
  session.messages.push({ role: 'user', content: userMessage })

  // Build compact context about what we already know
  const ed = session.extractedData
  let knownParts: string[] = []

  const origin = ed.originCity || ed.originZip
  const destination = ed.destinationCity || ed.destinationZip
  if (origin) knownParts.push(`from:${origin}`)
  if (destination) knownParts.push(`to:${destination}`)
  if (ed.homeSize) knownParts.push(`size:${ed.homeSize}`)
  if (ed.moveDate) knownParts.push(`date:${ed.moveDate}`)
  if (ed.specialItems.length > 0) knownParts.push(`items:${ed.specialItems.join(',')}`)
  if (ed.flexibility) knownParts.push(`flex:${ed.flexibility}`)

  // Merge panel state into extractedData so we know what the user has entered in the sidebar
  if (panelState) {
    if (panelState.originCity && !ed.originCity) ed.originCity = panelState.originCity
    if (panelState.destinationCity && !ed.destinationCity) ed.destinationCity = panelState.destinationCity
    if (panelState.homeSize && !ed.homeSize) ed.homeSize = panelState.homeSize
    if (panelState.moveDate && !ed.moveDate) ed.moveDate = panelState.moveDate
    if (panelState.flexibility && !ed.flexibility) ed.flexibility = panelState.flexibility as 'locked' | 'flexible'
    if (panelState.specialItems?.length && ed.specialItems.length === 0) ed.specialItems = panelState.specialItems

    // Re-derive knownParts with merged data
    knownParts = []
    const mergedOrigin = ed.originCity || ed.originZip
    const mergedDest = ed.destinationCity || ed.destinationZip
    if (mergedOrigin) knownParts.push(`from:${mergedOrigin}`)
    if (mergedDest) knownParts.push(`to:${mergedDest}`)
    if (ed.homeSize) knownParts.push(`size:${ed.homeSize}`)
    if (ed.moveDate) knownParts.push(`date:${ed.moveDate}`)
    if (ed.specialItems.length > 0) knownParts.push(`items:${ed.specialItems.join(',')}`)
    if (ed.flexibility) knownParts.push(`flex:${ed.flexibility}`)
  }

  let dataContext = ''
  if (knownParts.length > 0) {
    dataContext = `\nKNOWN (already answered, NEVER re-ask): ${knownParts.join(' | ')}`
  }

  // If the panel has a calculated estimate, tell the AI to use it
  if (panelState?.estimate) {
    dataContext += `\nCALCULATED ESTIMATE (use this exact range, do NOT invent your own numbers): $${panelState.estimate.low.toLocaleString()} – $${panelState.estimate.high.toLocaleString()} (confidence: ${panelState.estimate.confidence}%)`
  }

  // Compute next missing field and tell the model what to ask
  const collectOrder: Array<keyof typeof ed> = ['originCity', 'destinationCity', 'homeSize', 'moveDate', 'specialItems', 'flexibility']
  const fieldLabels: Record<string, string> = {
    originCity: 'where they are moving FROM',
    destinationCity: 'where they are moving TO',
    homeSize: 'home size (studio/1BR/2BR/3BR/4BR/house)',
    moveDate: 'what month they plan to move',
    specialItems: 'any special items (piano, antiques, etc.)',
    flexibility: 'whether their dates are flexible or locked in'
  }
  const missing = collectOrder.filter(f => {
    if (f === 'specialItems') return ed.specialItems.length === 0
    return !ed[f]
  })
  if (missing.length > 0) {
    dataContext += `\nASK ABOUT: ${fieldLabels[missing[0]]}`
  }

  // Add panel update context if user changed calculator fields
  if (panelUpdateContext) {
    dataContext += panelUpdateContext
  }

  // ============ ORLANDO MODE ============
  // When destination is Orlando metro, layer in KB content + Orlando-specific system prompt addendum
  let orlandoAddendum = ''
  const destinationForDetection = ed.destinationCity || (panelState?.destinationCity ?? '')
  const isOrlando = isOrlandoMetro(destinationForDetection)
  if (isOrlando) {
    try {
      const promptPath = join(process.cwd(), 'src/lib/chat/project-prompts/moving-orlando.md')
      const orlandoPrompt = readFileSync(promptPath, 'utf-8')
      const kbConfig = getChatConfig('moving-orlando').kb
      const kbContent = kbConfig?.enabled
        ? loadKBFiles(userMessage, kbConfig, knownParts.join(' '))
        : ''
      orlandoAddendum = `\n\n=== ORLANDO MODE ===\n${orlandoPrompt}`
      if (kbContent) {
        orlandoAddendum += `\n\n=== KNOWLEDGE_BASE (Orlando RE — verified Feb 2026) ===\n${kbContent}\n=== END KNOWLEDGE_BASE ===`
      }
    } catch (err) {
      console.warn('[ORLANDO_MODE] Failed to load Orlando prompt or KB:', err)
    }
  }

  // Add formula-based estimate context if we have route info
  if (origin && destination) {
    const est = calculateEstimate({
      origin,
      destination,
      homeSize: ed.homeSize,
      moveMonth: ed.moveDate ? new Date(ed.moveDate).toLocaleString('en-US', { month: 'long' }).toLowerCase() : undefined,
      specialItems: ed.specialItems,
      flexibility: ed.flexibility
    })
    if (est) {
      dataContext += `\nESTIMATE: $${est.range.low.toLocaleString()}-$${est.range.high.toLocaleString()} (confidence ${est.confidence}%)`
      const appliedFactors = est.factors.filter(f => f.applied).map(f => `${f.label}: ${f.impact}`).join(', ')
      if (appliedFactors) dataContext += `. Factors: ${appliedFactors}`
      if (est.warnings.length > 0) dataContext += `. Warnings: ${est.warnings.join('; ')}`
    }
  }

  // Build message history with sliding window + summary
  const conversationHistory = buildMessages(session.messages, session.runningSummary)

  try {
    const fullSystemPrompt = SYSTEM_PROMPT + dataContext + orlandoAddendum
    const turnNumber = Math.ceil(session.messages.length / 2)
    const startTime = Date.now()

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: fullSystemPrompt,
      messages: conversationHistory
    })

    const latencyMs = Date.now() - startTime

    // Log token usage
    const historyText = conversationHistory.map(m => m.content).join(' ')
    const usageLog: TurnUsageLog = {
      turn_number: turnNumber,
      system_prompt_tokens_est: estimateTokens(fullSystemPrompt),
      conversation_history_tokens_est: estimateTokens(historyText),
      user_message_tokens_est: estimateTokens(userMessage),
      total_input_tokens: response.usage.input_tokens,
      total_output_tokens: response.usage.output_tokens,
      model: 'claude-sonnet-4-20250514',
      latency_ms: latencyMs,
      timestamp: new Date().toISOString()
    }
    const logs = sessionUsageLogs.get(sessionId) || []
    logs.push(usageLog)
    sessionUsageLogs.set(sessionId, logs)
    console.log(`[TOKEN USAGE] Turn ${turnNumber}: input=${response.usage.input_tokens} output=${response.usage.output_tokens} latency=${latencyMs}ms system_est=${usageLog.system_prompt_tokens_est} history_est=${usageLog.conversation_history_tokens_est}`)

    const textContent = response.content.find(b => b.type === 'text')
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response')
    }

    // Parse the JSON response - strip markdown code fences aggressively
    let parsed
    let rawText = textContent.text.trim()

    // Strip markdown code fences aggressively (handle ```json, ``` json, ```JSON, etc.)
    rawText = rawText.replace(/^```\s*(?:json|JSON)?\s*\n?/g, '')
    rawText = rawText.replace(/\n?\s*```\s*$/g, '')
    rawText = rawText.trim()

    try {
      parsed = JSON.parse(rawText)
    } catch {
      // If JSON parsing fails, try to extract the message field manually
      const messageMatch = rawText.match(/"message"\s*:\s*"((?:[^"\\]|\\.)*)"/);
      if (messageMatch) {
        const extractedMessage = messageMatch[1]
          .replace(/\\n/g, '\n')
          .replace(/\\"/g, '"')
          .replace(/\\\\/g, '\\')
        parsed = {
          message: extractedMessage,
          extracted: {},
          stage: session.stage,
          readyForEstimate: false
        }
      } else {
        parsed = {
          message: rawText,
          extracted: {},
          stage: session.stage,
          readyForEstimate: false
        }
      }
    }

    // Final safety check: if message still looks like it contains JSON structure, clean it
    if (parsed.message && (parsed.message.startsWith('{') || parsed.message.includes('"message"'))) {
      try {
        const innerJson = JSON.parse(parsed.message)
        if (innerJson.message) {
          parsed.message = innerJson.message
        }
      } catch {
        const innerMatch = parsed.message.match(/"message"\s*:\s*"((?:[^"\\]|\\.)*)"/);
        if (innerMatch) {
          parsed.message = innerMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"')
        }
      }
    }

    // Ensure we have a message string
    if (!parsed.message || typeof parsed.message !== 'string') {
      parsed.message = rawText
    }

    // Update session with extracted data - detect new move queries and reset when needed
    if (parsed.extracted) {
      const newData = Object.fromEntries(
        Object.entries(parsed.extracted).filter(([, v]) => v !== null && v !== '' && v !== undefined)
      )

      // New-move detection: if BOTH origin and destination changed, treat as a fresh query
      const incomingOrigin = (newData.originCity || newData.originZip) as string | undefined
      const incomingDest = (newData.destinationCity || newData.destinationZip) as string | undefined
      const currentOrigin = session.extractedData.originCity || session.extractedData.originZip
      const currentDest = session.extractedData.destinationCity || session.extractedData.destinationZip

      const isNewMove = incomingOrigin && incomingDest && currentOrigin && currentDest
        && incomingOrigin.toLowerCase() !== currentOrigin.toLowerCase()
        && incomingDest.toLowerCase() !== currentDest.toLowerCase()

      if (isNewMove) {
        const freshItems = parsed.extracted.specialItems?.filter(Boolean) || []
        session.extractedData = {
          ...newData,
          specialItems: freshItems,
        } as typeof session.extractedData
        session.runningSummary = undefined
      } else {
        session.extractedData = {
          ...session.extractedData,
          ...newData,
          specialItems: [
            ...session.extractedData.specialItems,
            ...(parsed.extracted.specialItems || [])
          ].filter((v: string, i: number, a: string[]) => v && a.indexOf(v) === i)
        }
      }
    }

    if (parsed.stage) {
      session.stage = parsed.stage
    }

    // Add assistant response to history
    session.messages.push({ role: 'assistant', content: parsed.message })

    // Update running summary if conversation is getting long
    if (session.messages.length > SUMMARIZE_THRESHOLD) {
      const oldestInWindow = session.messages.length - RECENT_WINDOW
      if (oldestInWindow >= 2) {
        const oldUser = session.messages[oldestInWindow - 2]
        const oldAssistant = session.messages[oldestInWindow - 1]
        if (oldUser && oldAssistant) {
          try {
            session.runningSummary = await updateRunningSummary(
              session.runningSummary,
              oldUser.content,
              oldAssistant.content
            )
            console.log(`[SUMMARY] Updated running summary (${session.runningSummary.length} chars)`)
          } catch (err) {
            console.error('[SUMMARY] Failed to update summary:', err)
          }
        }
      }
    }

    sessions.set(sessionId, session)

    const validPanelViews = ['orlando', 'calculator', 'companies', 'checklist', 'tipping', 'storage', 'vehicles']
    const panelView = validPanelViews.includes(parsed.panelView) ? parsed.panelView : undefined

    return {
      response: parsed.message,
      panelView,
      state: session
    }
  } catch (error: unknown) {
    const status = (error as { status?: string })?.status || 'unknown'
    const msg = error instanceof Error ? error.message : String(error)
    const errType = error?.constructor?.name || typeof error
    console.error(`[CONV_ENGINE_ERROR] type=${errType} status=${status} message=${msg}`)
    throw new Error(`${errType}: ${msg}`)
  }
}

export function getEstimateData(sessionId: string) {
  const session = getOrCreateSession(sessionId)
  const { originCity, destinationCity, originZip, destinationZip, homeSize, moveDate, specialItems } = session.extractedData

  const origin = originZip || originCity
  const destination = destinationZip || destinationCity

  if (!origin || !destination) {
    return null
  }

  const moveMonth = moveDate ? new Date(moveDate).toLocaleString('en-US', { month: 'long' }).toLowerCase() : undefined
  const seasonalMultiplier = moveMonth ? (SEASONAL_MULTIPLIERS[moveMonth] || 1.0) : 1.0

  const est = calculateEstimate({
    origin,
    destination,
    homeSize,
    moveMonth,
    specialItems,
  })

  const recommended = NATIONAL_COMPANIES.filter(c => c.redFlags.length === 0)
  const warningExamples = NATIONAL_COMPANIES.filter(c => c.redFlags.length > 0)

  return {
    route: { origin, destination },
    stats: est ? {
      adjustedRange: est.range
    } : null,
    seasonalMultiplier,
    isPeakSeason: seasonalMultiplier > 1.1,
    companies: {
      recommended: recommended.map(c => ({
        name: c.name,
        specialties: c.specialties,
        priceTier: c.priceTier
      })),
      avoid: warningExamples.map(c => ({
        name: c.name,
        redFlags: c.redFlags,
        fictional: c.fictional
      }))
    },
    specialItemNotes: specialItems.map(item => {
      if (item.toLowerCase().includes('piano')) {
        return { item: 'Piano', note: 'Requires specialist movers. Budget extra $200-600. Companies with piano specialty: ' + recommended.filter(c => c.specialties.includes('piano')).map(c => c.name).join(', ') }
      }
      if (item.toLowerCase().includes('antique')) {
        return { item: 'Antiques', note: 'Request blanket wrap and custom crating. Get itemized insurance.' }
      }
      return { item, note: 'May require special handling - confirm with mover' }
    })
  }
}
