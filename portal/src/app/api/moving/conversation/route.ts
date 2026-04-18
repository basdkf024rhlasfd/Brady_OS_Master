import { NextRequest, NextResponse } from 'next/server'
import { processMessage, getOrCreateSession, getEstimateData, getUsageLogs } from '@/lib/moving/conversation-engine'

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY is not set')
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY is not configured' }, { status: 500 })
  }

  try {
    const { sessionId, message, action, panelState, panelChanges } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId required' }, { status: 400 })
    }

    // Handle get state action
    if (action === 'getState') {
      const state = getOrCreateSession(sessionId)
      const estimateData = getEstimateData(sessionId)
      return NextResponse.json({ state, estimateData })
    }

    // Handle usage logs action
    if (action === 'getUsage') {
      const logs = getUsageLogs(sessionId)
      const totalInput = logs.reduce((s, l) => s + l.total_input_tokens, 0)
      const totalOutput = logs.reduce((s, l) => s + l.total_output_tokens, 0)
      return NextResponse.json({
        logs,
        totals: { input_tokens: totalInput, output_tokens: totalOutput, turns: logs.length }
      })
    }

    // Process conversation message
    if (!message) {
      return NextResponse.json({ error: 'message required' }, { status: 400 })
    }

    const result = await processMessage(sessionId, message, panelChanges, panelState)

    // Include estimate data if we have enough info
    const estimateData = getEstimateData(sessionId)

    const usageLogs = getUsageLogs(sessionId)
    const latestUsage = usageLogs[usageLogs.length - 1]

    return NextResponse.json({
      response: result.response,
      panelView: result.panelView,
      state: result.state,
      extractedData: result.state.extractedData,
      usage: latestUsage ? {
        input_tokens: latestUsage.total_input_tokens,
        output_tokens: latestUsage.total_output_tokens,
        model: latestUsage.model,
        latency_ms: latestUsage.latency_ms
      } : null,
      estimateData
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('Conversation API error:', message, error)
    return NextResponse.json(
      { error: message || 'Failed to process message' },
      { status: 500 }
    )
  }
}
