import { NextRequest, NextResponse } from 'next/server'
import { THURMAN_CONFIG } from '@/lib/moving/thurman-config'

const STREAMING_NOTES_DB = '2e9ed43b-89c5-80f4-8c21-000b4cfe812e'
const NOTION_VERSION = '2022-06-28'
const MAX_BLOCK_CHARS = 1900

interface LeadPayload {
  name?: string
  email?: string
  phone?: string
  timeline?: string
  familySize?: string
  budget?: string
  neighborhoods?: string[]
  notes?: string
  extractedData?: {
    originCity?: string
    destinationCity?: string
    homeSize?: string
    moveDate?: string
    specialItems?: string[]
    flexibility?: string
  }
  recentMessages?: Array<{ role: 'user' | 'assistant'; content: string }>
}

function chunkText(text: string, max: number): string[] {
  if (text.length <= max) return [text]
  const chunks: string[] = []
  let i = 0
  while (i < text.length) {
    chunks.push(text.slice(i, i + max))
    i += max
  }
  return chunks
}

function buildPreBrief(p: LeadPayload): string {
  const lines: string[] = []
  lines.push('# Orlando Moving Calculator — Lead Pre-Brief')
  lines.push('')
  lines.push('## Lead identity')
  lines.push(`- Name: ${p.name ?? '—'}`)
  lines.push(`- Email: ${p.email ?? '—'}`)
  lines.push(`- Phone: ${p.phone || '—'}`)
  lines.push(`- Timeline: ${p.timeline || '—'}`)
  lines.push(`- Family size: ${p.familySize || '—'}`)
  lines.push(`- Budget: ${p.budget || '—'}`)
  lines.push('')

  lines.push('## Moving context')
  const ed = p.extractedData ?? {}
  lines.push(`- Origin: ${ed.originCity ?? '—'}`)
  lines.push(`- Destination: ${ed.destinationCity ?? '—'}`)
  lines.push(`- Home size: ${ed.homeSize ?? '—'}`)
  lines.push(`- Move date: ${ed.moveDate ?? '—'}`)
  lines.push(`- Date flexibility: ${ed.flexibility ?? '—'}`)
  if (ed.specialItems && ed.specialItems.length > 0) {
    lines.push(`- Special items: ${ed.specialItems.join(', ')}`)
  }
  lines.push('')

  lines.push('## Orlando intent')
  if (p.neighborhoods && p.neighborhoods.length > 0) {
    lines.push(`- Neighborhoods of interest: ${p.neighborhoods.join(', ')}`)
  } else {
    lines.push('- Neighborhoods of interest: (not specified)')
  }
  if (p.notes) {
    lines.push(`- Notes from lead: ${p.notes}`)
  }
  lines.push('')

  if (p.recentMessages && p.recentMessages.length > 0) {
    lines.push('## Recent chat (last messages)')
    for (const m of p.recentMessages) {
      const who = m.role === 'user' ? 'User' : 'Assistant'
      const oneLine = m.content.replace(/\s+/g, ' ').slice(0, 240)
      lines.push(`- **${who}:** ${oneLine}`)
    }
    lines.push('')
  }

  lines.push('## Routing')
  lines.push(`- Partner: ${THURMAN_CONFIG.groupName}`)
  lines.push(`- Website: ${THURMAN_CONFIG.websiteUrl}`)
  lines.push('- Action: Brady review → hand off to Brandon & Ana Thurman with this pre-brief attached')

  return lines.join('\n')
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LeadPayload

    if (!body.name || !body.email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const token = process.env.NOTION_TOKEN
    if (!token) {
      return NextResponse.json({ error: 'Notion not configured' }, { status: 500 })
    }

    const dest = body.extractedData?.destinationCity || 'Orlando'
    const timestamp = new Date().toISOString()
    const name = `Orlando Lead: ${body.name} → ${dest}`
    const preBrief = buildPreBrief(body)

    const children = chunkText(preBrief, MAX_BLOCK_CHARS).map(chunk => ({
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ text: { content: chunk } }],
      },
    }))

    const notionBody = {
      parent: { database_id: STREAMING_NOTES_DB },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        Type: { select: { name: 'Note' } },
        Status: { status: { name: 'Not Started' } },
        Priority: { select: { name: 'Should' } },
        Source: { select: { name: 'Execution' } },
        'Next Action': {
          rich_text: [
            {
              text: {
                content: 'Brady review — route to Brandon & Ana Thurman (Thurman Advisory Group)',
              },
            },
          ],
        },
      },
      children,
    }

    const notionRes = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Notion-Version': NOTION_VERSION,
      },
      body: JSON.stringify(notionBody),
    })

    if (!notionRes.ok) {
      const err = await notionRes.text()
      console.error('Notion API error:', err)
      return NextResponse.json({ error: 'Failed to write lead' }, { status: 500 })
    }

    return NextResponse.json({ success: true, submitted: timestamp })
  } catch (err) {
    console.error('orlando-lead route error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
