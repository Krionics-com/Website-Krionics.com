import * as admin from 'firebase-admin'
import * as crypto from 'crypto'
import { onRequest } from 'firebase-functions/v2/https'
import { defineSecret } from 'firebase-functions/params'
import Groq from 'groq-sdk'
import type { Request, Response } from 'express'

admin.initializeApp()
const db = admin.firestore()

const groqApiKey = defineSecret('GROQ_API_KEY')
const resendApiKey = defineSecret('RESEND_API_KEY')
const calWebhookSecret = defineSecret('CAL_WEBHOOK_SECRET')
const slackWebhookUrl = defineSecret('SLACK_WEBHOOK_URL')
const ALLOWED_ORIGINS = new Set([
  'https://krionics.com',
  'https://www.krionics.com',
  'https://krionics-39060.firebaseapp.com',
  'https://krionics-39060.web.app',
  'http://localhost:5173',
  'http://localhost:5174',
])

const applyCors = (req: Request, res: Response) => {
  const origin = req.get('origin')
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Max-Age', '3600')
}
function notifySlack(webhookUrl: string, text: string): void {
  fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  }).catch((err) => console.warn('Slack notify failed:', err))
}

type ChatRole = 'system' | 'user' | 'assistant'
type ChatMessage = { role: ChatRole; content: string }

// ─────────────────────────────────────────────────────────────────────────────
// System prompt — everything the LLM needs to know about Krionics
// ─────────────────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `
You are the Krionics AI — a knowledgeable, direct representative for Krionics, a B2B pipeline agency based in Bengaluru that builds and operates AI-powered cold outbound and voice agent systems.

Your job:
1. Answer any question about Krionics accurately and confidently
2. Understand the visitor's sales situation quickly
3. Qualify them naturally (ACV, company stage, pipeline challenge)
4. When they're a good fit or show booking intent, include exactly [BOOK_NOW] at the end of your response

---

## What Krionics builds

### Service A — AI Cold Outbound System
We build your sending infrastructure, source and verify prospect lists, write and optimize sequences, monitor deliverability daily, and hand you qualified meetings. You don't manage the system — we operate it.

Deliverables:
- ICP definition + account tier mapping
- 1,500–3,000 verified, enriched contacts per month (Apollo + Clay)
- 5 dedicated sending inboxes with 14-day warmup
- Claude API personalization layer — custom context written per prospect
- 3-step email sequence + subject line A/B tests
- n8n automation: positive replies routed to CRM + Calendly instantly
- Live reporting dashboard (goes live on day 15 of program)
- Monthly list + sequence performance review

Tools: Apollo, Clay, Instantly, Claude API, n8n, LinkedIn Sales Navigator

### Service B — AI Voice Agent (inbound qualification + booking)
We build and operate a voice agent that handles inbound calls 24/7 — qualifies leads, answers objections from your custom script, and books directly into your calendar.

Deliverables:
- Call-flow workshop + script development
- Vapi agent with 5–10 call path variations
- 24/7 inbound coverage — no voicemail gaps ever
- ElevenLabs voice (client chooses the voice profile)
- Twilio number provisioning + routing rules
- CRM integration + lead qualification tagging
- Direct calendar booking via Calendly or Cal.com
- Post-call follow-up automation via n8n
- 30-day hypercare window after launch

Tools: Vapi, ElevenLabs, Twilio, Claude Sonnet, n8n

---

## Pricing

### Service A — Cold Outbound (3 tiers)

**GROWTH — $2,500/mo + $2,000 one-time setup**
Cold email only. Best for: 1–15 person teams, proven offer, zero cold outbound today.
Includes: infrastructure (domains, inboxes), ICP list builds, sequence writing, daily operation, deliverability monitoring, weekly reports, Slack access. 3-month minimum → month-to-month.

**SYSTEMATIZE — $4,500/mo + $5,000 setup** ← most popular
Cold email + LinkedIn. Best for: $1M+ ARR, dedicated sales, ready to go multi-channel.
Includes: everything in Growth + LinkedIn connection/message sequences, Clay enrichment pipelines, multi-channel unified dashboard, CRM sync, monthly ICP refinement, dedicated account lead.

**OUTPACE — $7,500/mo + $7,500 setup**
Full system + intent data. Best for: Series A+, $5M+ ARR, pipeline is strategic priority.
Includes: everything in Systematize + intent data (G2/Bombora), custom signal tracking (job posts, funding, news), parallel sequence architecture, weekly strategy call, quarterly system rebuild, priority SLA.

**Service B — AI Voice Agent: $7,500 setup + $2,000/mo**

All tools, domains, inboxes, and infrastructure are included in the monthly fee. No surprise add-ons.
Minimum commitment: 3 months, then month-to-month with 30 days notice.
Everything we build is yours to keep if we stop working together.

---

## Key numbers

- US fully-loaded SDR cost: ~$8,500/mo (base $6,000 + benefits $1,320 + tools $700 + manager $480)
- Krionics vs SDR: ~70% less ($2,500/mo vs $8,500/mo)
- Annual savings vs SDR: $72,000
- Time to first live sequence: 14 days from contract
- Typical meetings booked: 8–18/month (depends on ACV, ICP quality, offer)
- Team location: Bengaluru, IST — daily US-overlap hours 9am–7pm ET

---

## FAQ

**What ACV is the right fit?**
Cold outbound works when ACV > $10,000. Best results at $15,000–$100,000+. Below $10K, the math doesn't pencil (cost per meeting exceeds deal economics).

**Do you guarantee meetings?**
We don't promise a specific number — no honest system can. We guarantee a built, monitored, optimized system running every business day. Clients typically see 8–18 booked meetings/month.

**What if I already have an SDR or in-house team?**
We can run alongside them (feeding them a fuller pipe) or replace the need entirely. Many clients use us as the infrastructure layer their closers work off.

**Do you only do cold email?**
Service A covers cold email + optional LinkedIn. Service B is inbound voice. Many clients run both.

**Can I see a dashboard preview?**
Yes — there's a live preview at the website. Real client data populates from day 15 of the program.

**What tools do you use?**
Outbound: Apollo, Clay, Instantly, Claude API, n8n, LinkedIn Sales Navigator.
Voice: Vapi, ElevenLabs, Twilio, Claude Sonnet, n8n.

**How do you handle deliverability?**
Deliverability monitoring is a daily task — domain reputation, inbox rotation, bounce rates, spam placement. We catch problems before they become crises.

**Who are the founders?**
Three engineers from Scaler School of Technology, Bengaluru — Aryan (Delivery Lead), Vishwas (Systems), Avishkar (Engineering). Young, hands-on, and fast.

**How do I cancel?**
After the 3-month minimum: 30 days written notice, no fees. Everything we built transfers to you.

**What makes you different from other agencies?**
We don't set up and disappear — we operate it daily like infrastructure. We publish pricing upfront. You own every deliverable. 14-day launch guarantee. Math-first approach.

**Do you have current availability?**
We keep cohorts small to maintain quality. First 5 charter clients get special pricing. Current availability — ask on the call.

**Can I reach the team directly?**
Yes — hello@krionics.com or book a 15-minute call.

---

## Tone and behavior rules

1. Keep responses concise — 2–4 sentences for most answers. No walls of text.
2. Never use: "revolutionize", "cutting-edge", "transform", "10x", "unlock", "leverage", "game-changer", "AI-powered" (yes, even though we use AI)
3. Plain English. Confident. Direct. Math-driven.
4. If you don't know something specific, say so and offer: "Our team can answer that — hello@krionics.com"
5. Never invent case studies, metrics, or client results
6. Never promise specific meeting counts
7. Ask only ONE question at a time when qualifying
8. If asked something outside Krionics scope (coding help, unrelated topics), politely redirect

---

## When to include [BOOK_NOW]

Include the exact string [BOOK_NOW] at the very end of your response when ANY of these are true:

1. Visitor explicitly asks to book a call, get started, or see pricing in context of buying
2. Visitor identifies as a decision-maker (founder, CEO, VP Sales, Head of Sales, CRO) AND has described a real pipeline problem
3. Their company appears to be B2B with ACV > $10K and they're actively exploring solutions
4. They ask "what are next steps?" or "how does this work?"

When triggering [BOOK_NOW], phrase it naturally — don't be robotic:
- "Based on what you've described, this sounds like a strong fit. Let me connect you with the team — I'll open up a quick booking flow now. [BOOK_NOW]"
- "That's exactly the situation we work best with. Fastest path forward is a 15-minute call. [BOOK_NOW]"
- "Sounds like the math works here. Want to run through the details on a call? [BOOK_NOW]"

The booking UI will open automatically — you don't need to explain it.
`.trim()

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/chat — streaming LLM response
// ─────────────────────────────────────────────────────────────────────────────

export const chat = onRequest(
  {
    cors: false,
    secrets: [groqApiKey],
    timeoutSeconds: 60,
    region: 'us-central1',
    memory: '256MiB',
  },
  async (req: Request, res: Response) => {
    applyCors(req, res)
    if (req.method === 'OPTIONS') {
      res.status(204).end()
      return
    }
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' })
      return
    }

    const { messages } = req.body as {
      messages: Array<{ role: string; content: string }>
    }

    if (!messages?.length) {
      res.status(400).json({ error: 'Missing messages' })
      return
    }

    // Sanitise: only keep role + content, cap at last 20 turns
    const history: ChatMessage[] = messages
      .slice(-20)
      .map(({ role, content }) => ({
        role: role === 'assistant' ? 'assistant' : 'user',
        content: content.slice(0, 2000),
      }))

    const requestMessages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history,
    ]

    const groq = new Groq({ apiKey: groqApiKey.value() })

    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('X-Accel-Buffering', 'no')
    res.flushHeaders()

    try {
      const stream = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: requestMessages,
        stream: true,
        max_tokens: 450,
        temperature: 0.65,
      })

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content ?? ''
        if (delta) {
          res.write(`data: ${JSON.stringify({ delta })}\n\n`)
        }
      }

      res.write('data: [DONE]\n\n')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      res.write(`data: ${JSON.stringify({ error: msg })}\n\n`)
    }

    res.end()
  }
)

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/lead — save booking / lead data to Firestore
// ─────────────────────────────────────────────────────────────────────────────

export const saveLead = onRequest(
  {
    cors: false,
    region: 'us-central1',
    secrets: [slackWebhookUrl],
  },
  async (req: Request, res: Response) => {
    applyCors(req, res)
    if (req.method === 'OPTIONS') {
      res.status(204).end()
      return
    }
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' })
      return
    }

    try {
      const { name, company, role, website, acv, challenge, currentMeetings, time, sessionId, source } =
        req.body as Record<string, string>

      if (!company) {
        res.status(400).json({ error: 'Missing required fields' })
        return
      }

      const docRef = await db.collection('leads').add({
        name: name ?? '',
        company,
        role: role ?? '',
        website: website ?? '',
        acv: acv ?? '',
        challenge: challenge ?? '',
        currentMeetings: currentMeetings ?? '',
        time: time ?? '',
        sessionId: sessionId ?? '',
        source: source ?? 'chat_widget',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      })

      // Notify Slack for book-page leads (highest intent)
      if (source === 'book_page') {
        notifySlack(
          slackWebhookUrl.value(),
          `🎯 *New lead — about to book*\n*${company}* | ${role || '—'}\nACV: ${acv || '—'} | Challenge: ${challenge || '—'}${currentMeetings ? `\nCurrent meetings/mo: ${currentMeetings}` : ''}`,
        )
      }

      res.status(200).json({ success: true, id: docRef.id })
    } catch (err) {
      console.error('saveLead error:', err)
      res.status(500).json({ error: 'Failed to save lead' })
    }
  }
)

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/contact — save contact form submission + email team via Resend
// ─────────────────────────────────────────────────────────────────────────────

export const saveContact = onRequest(
  {
    cors: false,
    region: 'us-central1',
    secrets: [resendApiKey],
    invoker: 'public',
  },
  async (req: Request, res: Response) => {
    applyCors(req, res)
    if (req.method === 'OPTIONS') {
      res.status(204).end()
      return
    }
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' })
      return
    }

    try {
      const { name, email, company, reason, message } = req.body as Record<string, string>

      if (!name || !email || !message) {
        res.status(400).json({ error: 'Missing required fields' })
        return
      }

      await db.collection('contacts').add({
        name,
        email,
        company: company ?? '',
        reason: reason ?? '',
        message,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      })

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey.value()}`,
        },
        body: JSON.stringify({
          from: 'Krionics Website <onboarding@resend.dev>',
          to: ['hello@krionics.com'],
          subject: `New contact: ${reason || 'General'} — ${company || name}`,
          text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || '—'}\nReason: ${reason || '—'}\n\n${message}`,
        }),
      })

      res.status(200).json({ success: true })
    } catch (err) {
      console.error('saveContact error:', err)
      res.status(500).json({ error: 'Failed to save contact' })
    }
  }
)

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/updateLead — enrich a lead doc with Cal.com booking data
// ─────────────────────────────────────────────────────────────────────────────

export const updateLead = onRequest(
  {
    cors: false,
    region: 'us-central1',
    secrets: [slackWebhookUrl],
    invoker: 'public',
  },
  async (req: Request, res: Response) => {
    applyCors(req, res)
    if (req.method === 'OPTIONS') {
      res.status(204).end()
      return
    }
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' })
      return
    }

    try {
      const { id, bookerName, bookerEmail, bookedTime, bookingUid } = req.body as Record<string, string>

      if (!id) {
        res.status(400).json({ error: 'Missing lead ID' })
        return
      }

      await db.collection('leads').doc(id).update({
        bookerName: bookerName ?? '',
        bookerEmail: bookerEmail ?? '',
        bookedTime: bookedTime ?? '',
        bookingUid: bookingUid ?? '',
        status: 'booked',
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      })

      // Fetch qualification data to include in the Slack message
      const leadSnap = await db.collection('leads').doc(id).get()
      const lead = leadSnap.data() ?? {}
      const timeStr = bookedTime ? new Date(bookedTime).toUTCString().replace(' GMT', ' UTC') : '—'
      notifySlack(
        slackWebhookUrl.value(),
        `✅ *Call booked!*\n*${bookerName || 'Unknown'}* (${bookerEmail || '—'}) · *${lead.company || '—'}*\n📅 ${timeStr}\nACV: ${lead.acv || '—'} | Challenge: ${lead.challenge || '—'}`,
      )

      res.status(200).json({ success: true })
    } catch (err) {
      console.error('updateLead error:', err)
      res.status(500).json({ error: 'Failed to update lead' })
    }
  }
)

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/cal-webhook — receives Cal.com booking lifecycle events
// ─────────────────────────────────────────────────────────────────────────────

type CalPayload = {
  triggerEvent: string
  payload: {
    uid: string
    startTime?: string
    rescheduleUid?: string
    attendees?: Array<{ name?: string; email?: string }>
  }
}

export const calWebhook = onRequest(
  {
    cors: false,
    region: 'us-central1',
    secrets: [calWebhookSecret, slackWebhookUrl],
    invoker: 'public',
  },
  async (req: Request, res: Response) => {
    if (req.method !== 'POST') {
      res.status(405).end()
      return
    }

    // Verify HMAC-SHA256 signature from Cal.com
    const signature = req.get('X-Cal-Signature-256') ?? ''
    const rawBody = (req as Request & { rawBody?: Buffer }).rawBody
    const bodyForHmac = rawBody ?? Buffer.from(JSON.stringify(req.body))
    const expected = crypto.createHmac('sha256', calWebhookSecret.value()).update(bodyForHmac).digest('hex')

    let sigValid = false
    try {
      sigValid = signature.length === expected.length &&
        crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expected, 'hex'))
    } catch {
      sigValid = false
    }

    if (!sigValid) {
      console.warn('calWebhook: invalid signature')
      res.status(401).json({ error: 'Invalid signature' })
      return
    }

    const { triggerEvent, payload } = req.body as CalPayload

    try {
      if (triggerEvent === 'BOOKING_CANCELLED') {
        const snap = await db.collection('leads').where('bookingUid', '==', payload.uid).limit(1).get()
        if (!snap.empty) {
          const lead = snap.docs[0].data()
          await snap.docs[0].ref.update({
            status: 'cancelled',
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          })
          notifySlack(
            slackWebhookUrl.value(),
            `❌ *Booking cancelled*\n${lead.bookerName || lead.bookerEmail || 'Unknown'} from *${lead.company || '—'}* cancelled their call`,
          )
        }
      } else if (triggerEvent === 'BOOKING_RESCHEDULED') {
        // rescheduleUid = old uid, payload.uid = new uid
        const lookupUid = payload.rescheduleUid ?? payload.uid
        const snap = await db.collection('leads').where('bookingUid', '==', lookupUid).limit(1).get()
        if (!snap.empty) {
          const lead = snap.docs[0].data()
          const newTimeStr = payload.startTime ? new Date(payload.startTime).toUTCString().replace(' GMT', ' UTC') : '—'
          await snap.docs[0].ref.update({
            bookingUid: payload.uid,
            bookedTime: payload.startTime ?? '',
            status: 'rescheduled',
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          })
          notifySlack(
            slackWebhookUrl.value(),
            `📅 *Rescheduled*\n${lead.bookerName || lead.bookerEmail || 'Unknown'} from *${lead.company || '—'}* moved their call\n📅 New time: ${newTimeStr}`,
          )
        }
      } else if (triggerEvent === 'BOOKING_CREATED') {
        // Fallback: enrich by attendee email if updateLead didn't fire (e.g. user closed tab)
        const attendee = payload.attendees?.[0]
        if (attendee?.email) {
          const snap = await db.collection('leads')
            .where('bookerEmail', '==', attendee.email)
            .where('bookingUid', '==', '')
            .limit(1).get()
          if (!snap.empty) {
            const lead = snap.docs[0].data()
            const timeStr = payload.startTime ? new Date(payload.startTime).toUTCString().replace(' GMT', ' UTC') : '—'
            await snap.docs[0].ref.update({
              bookingUid: payload.uid,
              bookedTime: payload.startTime ?? '',
              bookerName: attendee.name ?? '',
              status: 'booked',
              updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            })
            notifySlack(
              slackWebhookUrl.value(),
              `✅ *Call booked!* (via webhook fallback)\n*${attendee.name || 'Unknown'}* (${attendee.email}) · *${lead.company || '—'}*\n📅 ${timeStr}`,
            )
          }
        }
      }

      res.status(200).json({ ok: true })
    } catch (err) {
      console.error('calWebhook error:', err)
      res.status(500).json({ error: 'Internal error' })
    }
  }
)
