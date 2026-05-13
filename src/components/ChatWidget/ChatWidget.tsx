import React, {
  useReducer,
  useRef,
  useEffect,
  useCallback,
  useState,
} from 'react'
import styles from './ChatWidget.module.css'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
}

interface BookingData {
  name: string
  company: string
  role: string
  website: string
  acv: string
  challenge: string
  time: string
}

type BookingStep = 0 | 1 | 2 | 3 | 4

interface State {
  isOpen: boolean
  messages: Message[]
  input: string
  isStreaming: boolean
  bookingMode: boolean
  bookingStep: BookingStep
  bookingData: Partial<BookingData>
  submitted: boolean
  hasUnread: boolean
}

type Action =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'SET_INPUT'; payload: string }
  | { type: 'ADD_USER_MSG'; payload: Message }
  | { type: 'BEGIN_STREAM'; payload: Message }
  | { type: 'APPEND_STREAM'; payload: { id: string; delta: string } }
  | { type: 'END_STREAM'; payload: string }
  | { type: 'TRIGGER_BOOKING' }
  | { type: 'BOOKING_NEXT'; payload: Partial<BookingData> }
  | { type: 'SET_TIME'; payload: string }
  | { type: 'SUBMIT_BOOKING' }

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const ACV_OPTIONS = ['Under $5,000', '$5K – $25K', '$25K – $100K', 'Over $100K']

const CHALLENGE_OPTIONS = [
  'No consistent pipeline',
  'SDR keeps quitting',
  'Tools but no system',
  'Agency that didn\'t deliver',
  'Scaling beyond founder sales',
  'Other',
]

const TIME_SLOTS = [
  'Mon 9am ET', 'Mon 1pm ET', 'Mon 3pm ET',
  'Tue 9am ET', 'Tue 1pm ET', 'Tue 3pm ET',
  'Wed 9am ET', 'Wed 1pm ET',
  'Thu 9am ET', 'Thu 11am ET', 'Thu 3pm ET',
  'Fri 9am ET', 'Fri 11am ET',
]

const QUICK_REPLIES = [
  'What do you build?',
  'How much does it cost?',
  'How fast can you launch?',
  'Is this right for me?',
]

const WELCOME: Message = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi — I'm the Krionics AI.\n\nI can answer anything about our pipeline systems, pricing, or process. Or if you're ready, I can help you book a 15-minute call with the team right here.\n\nWhat brings you here today?",
}

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? ''

const uid = () => Math.random().toString(36).slice(2, 9)

// ─────────────────────────────────────────────────────────────────────────────
// Reducer
// ─────────────────────────────────────────────────────────────────────────────

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'OPEN':
      return { ...state, isOpen: true, hasUnread: false }
    case 'CLOSE':
      return { ...state, isOpen: false }
    case 'SET_INPUT':
      return { ...state, input: action.payload }
    case 'ADD_USER_MSG':
      return { ...state, messages: [...state.messages, action.payload], input: '' }
    case 'BEGIN_STREAM':
      return { ...state, messages: [...state.messages, action.payload], isStreaming: true }
    case 'APPEND_STREAM': {
      const msgs = state.messages.map((m) =>
        m.id === action.payload.id
          ? { ...m, content: m.content + action.payload.delta }
          : m
      )
      return { ...state, messages: msgs }
    }
    case 'END_STREAM': {
      const hasBookNow = action.payload.includes('[BOOK_NOW]')
      const clean = action.payload.replace('[BOOK_NOW]', '').trim()
      const msgs = state.messages.map((m) =>
        m.isStreaming ? { ...m, content: clean, isStreaming: false } : m
      )
      const hasUnread = !state.isOpen
      return {
        ...state,
        messages: msgs,
        isStreaming: false,
        hasUnread,
        bookingMode: hasBookNow ? true : state.bookingMode,
        bookingStep: hasBookNow && !state.bookingMode ? 0 : state.bookingStep,
      }
    }
    case 'TRIGGER_BOOKING':
      return { ...state, bookingMode: true, bookingStep: 0 }
    case 'BOOKING_NEXT': {
      const newData = { ...state.bookingData, ...action.payload }
      const next = (state.bookingStep + 1) as BookingStep
      return { ...state, bookingData: newData, bookingStep: next }
    }
    case 'SET_TIME':
      return { ...state, bookingData: { ...state.bookingData, time: action.payload } }
    case 'SUBMIT_BOOKING':
      return { ...state, bookingStep: 4, submitted: true }
    default:
      return state
  }
}

const INITIAL: State = {
  isOpen: false,
  messages: [WELCOME],
  input: '',
  isStreaming: false,
  bookingMode: false,
  bookingStep: 0,
  bookingData: {},
  submitted: false,
  hasUnread: false,
}

// ─────────────────────────────────────────────────────────────────────────────
// Text renderer — safe basic markdown
// ─────────────────────────────────────────────────────────────────────────────

function renderText(text: string): React.ReactNode[] {
  return text.split('\n').map((line, li) => {
    if (!line) return <br key={li} />
    const parts: React.ReactNode[] = []
    const boldRe = /\*\*(.*?)\*\*/g
    let last = 0
    let m: RegExpExecArray | null
    while ((m = boldRe.exec(line)) !== null) {
      if (m.index > last) parts.push(line.slice(last, m.index))
      parts.push(<strong key={`b${m.index}`}>{m[1]}</strong>)
      last = m.index + m[0].length
    }
    parts.push(line.slice(last))
    return (
      <span key={li} style={{ display: 'block', minHeight: '1.4em' }}>
        {parts}
      </span>
    )
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// Typing indicator
// ─────────────────────────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className={styles.msgBot}>
      <div className={styles.avatar}>K</div>
      <div className={`${styles.bubble} ${styles.bubbleBot}`}>
        <div className={styles.typingDots}>
          <span /><span /><span />
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Message bubble
// ─────────────────────────────────────────────────────────────────────────────

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user'
  return (
    <div className={isUser ? styles.msgUser : styles.msgBot}>
      {!isUser && <div className={styles.avatar}>K</div>}
      <div className={isUser ? styles.bubbleUser : styles.bubbleBot}>
        {renderText(msg.content)}
        {msg.isStreaming && <span className={styles.cursor} />}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Booking panel — 4 steps, embedded in chat
// ─────────────────────────────────────────────────────────────────────────────

interface BookingPanelProps {
  step: BookingStep
  data: Partial<BookingData>
  submitted: boolean
  onNext: (d: Partial<BookingData>) => void
  onSetTime: (t: string) => void
  onSubmit: () => void
  onBack: () => void
}

function BookingPanel({ step, data, submitted, onNext, onSetTime, onSubmit, onBack }: BookingPanelProps) {
  const [name, setName] = useState(data.name ?? '')
  const [company, setCompany] = useState(data.company ?? '')
  const [role, setRole] = useState(data.role ?? '')
  const [website, setWebsite] = useState(data.website ?? '')
  const [acv, setAcv] = useState(data.acv ?? '')
  const [challenge, setChallenge] = useState(data.challenge ?? '')

  if (submitted || step === 4) {
    return (
      <div className={styles.bookingConfirm}>
        <div className={styles.confirmCircle}>✓</div>
        <p className={styles.confirmTitle}>You're booked.</p>
        <p className={styles.confirmSub}>
          <strong>{data.time}</strong> · 15 minutes · ET<br />
          A calendar invite + Google Meet link is on its way to your inbox.
        </p>
        <p className={styles.confirmNote}>
          We'll review your details before the call. Come with real numbers.
        </p>
        <button className={styles.backBtn} onClick={onBack}>
          ← Back to chat
        </button>
      </div>
    )
  }

  const STEPS = ['Your info', 'Situation', 'Pick a time', 'Confirm']

  return (
    <div className={styles.bookingWrap}>
      {/* Progress */}
      <div className={styles.bookingHeader}>
        <button className={styles.backBtn} style={{ padding: '0' }} onClick={onBack}>
          ← Back
        </button>
        <div className={styles.stepPills}>
          {STEPS.map((label, i) => (
            <div
              key={label}
              className={`${styles.stepPill} ${step === i ? styles.stepActive : ''} ${step > i ? styles.stepDone : ''}`}
            >
              {step > i ? '✓' : i + 1}
            </div>
          ))}
        </div>
        <span className={styles.stepLabel}>{STEPS[step]}</span>
      </div>

      <div className={styles.bookingBody}>
        {/* Step 0 — name, company, role, website */}
        {step === 0 && (
          <div className={styles.bookingStep}>
            <p className={styles.bookingQ}>Tell us a bit about yourself.</p>
            <div className={styles.fields}>
              <label className={styles.fieldLabel}>Your name</label>
              <input
                className={styles.fieldInput}
                placeholder="Alex Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
              <label className={styles.fieldLabel}>Company</label>
              <input
                className={styles.fieldInput}
                placeholder="Acme Corp"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <label className={styles.fieldLabel}>Your role</label>
              <input
                className={styles.fieldInput}
                placeholder="Head of Sales, CEO, etc."
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <label className={styles.fieldLabel}>Website</label>
              <input
                className={styles.fieldInput}
                placeholder="yourcompany.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <button
              className={styles.nextBtn}
              disabled={!name || !company}
              onClick={() => onNext({ name, company, role, website })}
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 1 — ACV + challenge chips */}
        {step === 1 && (
          <div className={styles.bookingStep}>
            <p className={styles.bookingQ}>Quick diagnostic.</p>
            <label className={styles.fieldLabel}>Average contract value (ACV)</label>
            <div className={styles.chips}>
              {ACV_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  className={`${styles.chip} ${acv === opt ? styles.chipActive : ''}`}
                  onClick={() => setAcv(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
            <label className={styles.fieldLabel} style={{ marginTop: 20 }}>
              Biggest pipeline challenge right now
            </label>
            <div className={styles.chips}>
              {CHALLENGE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  className={`${styles.chip} ${challenge === opt ? styles.chipActive : ''}`}
                  onClick={() => setChallenge(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button
              className={styles.nextBtn}
              disabled={!acv || !challenge}
              onClick={() => onNext({ acv, challenge })}
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 2 — time picker */}
        {step === 2 && (
          <div className={styles.bookingStep}>
            <p className={styles.bookingQ}>Pick a time. 15 minutes, all Eastern.</p>
            <div className={styles.timeGrid}>
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  className={`${styles.timeSlot} ${data.time === slot ? styles.timeSlotActive : ''}`}
                  onClick={() => onSetTime(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
            <p className={styles.timeNote}>
              Our team is in Bengaluru (IST) — these are our daily US-overlap windows.
            </p>
            <button
              className={styles.nextBtn}
              disabled={!data.time}
              onClick={() => onNext({})}
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 3 — confirm */}
        {step === 3 && (
          <div className={styles.bookingStep}>
            <p className={styles.bookingQ}>Looks good. Confirm your booking.</p>
            <div className={styles.confirmSummary}>
              {[
                ['Name', data.name],
                ['Company', data.company],
                ['Role', data.role || '—'],
                ['ACV', data.acv || '—'],
                ['Challenge', data.challenge || '—'],
                ['Time', data.time],
              ].map(([k, v]) => (
                <div key={k} className={styles.confirmRow}>
                  <span className={styles.confirmKey}>{k}</span>
                  <span className={styles.confirmVal}>{v}</span>
                </div>
              ))}
            </div>
            <button className={styles.nextBtn} onClick={onSubmit}>
              Confirm booking →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main ChatWidget
// ─────────────────────────────────────────────────────────────────────────────

export function ChatWidget() {
  const [state, dispatch] = useReducer(reducer, INITIAL)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [state.messages.length, state.isStreaming, state.bookingStep])

  // Focus input on open
  useEffect(() => {
    if (state.isOpen && !state.bookingMode) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [state.isOpen, state.bookingMode])

  const callAPI = useCallback(
    async (history: Array<{ role: string; content: string }>) => {
      const streamId = uid()
      dispatch({
        type: 'BEGIN_STREAM',
        payload: { id: streamId, role: 'assistant', content: '', isStreaming: true },
      })

      try {
        const res = await fetch(`${API_BASE}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
        })

        if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`)

        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let full = ''
        let buf = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buf += decoder.decode(value, { stream: true })
          const lines = buf.split('\n')
          buf = lines.pop() ?? ''

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            const raw = line.slice(6).trim()
            if (raw === '[DONE]') {
              dispatch({ type: 'END_STREAM', payload: full })
              return
            }
            try {
              const parsed = JSON.parse(raw) as { delta?: string; error?: string }
              if (parsed.error) throw new Error(parsed.error)
              if (parsed.delta) {
                full += parsed.delta
                dispatch({ type: 'APPEND_STREAM', payload: { id: streamId, delta: parsed.delta } })
              }
            } catch {
              // malformed chunk — skip
            }
          }
        }
        dispatch({ type: 'END_STREAM', payload: full })
      } catch {
        dispatch({
          type: 'END_STREAM',
          payload:
            "I'm having trouble connecting right now. You can reach the team directly at **hello@krionics.com** or book at krionics.com/book.",
        })
      }
    },
    []
  )

  const handleSend = useCallback(async () => {
    const text = state.input.trim()
    if (!text || state.isStreaming) return

    const userMsg: Message = { id: uid(), role: 'user', content: text }
    dispatch({ type: 'ADD_USER_MSG', payload: userMsg })

    const history = [...state.messages, userMsg]
      .filter((m) => !m.isStreaming)
      .map(({ role, content }) => ({ role, content }))

    await callAPI(history)
  }, [state.input, state.messages, state.isStreaming, callAPI])

  const handleQuickReply = useCallback(
    async (text: string) => {
      if (state.isStreaming) return
      const userMsg: Message = { id: uid(), role: 'user', content: text }
      dispatch({ type: 'ADD_USER_MSG', payload: userMsg })
      const history = [...state.messages, userMsg]
        .filter((m) => !m.isStreaming)
        .map(({ role, content }) => ({ role, content }))
      await callAPI(history)
    },
    [state.messages, state.isStreaming, callAPI]
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleBookingNext = (data: Partial<BookingData>) => {
    dispatch({ type: 'BOOKING_NEXT', payload: data })
  }

  const handleSetTime = (t: string) => {
    dispatch({ type: 'SET_TIME', payload: t })
  }

  const handleSubmitBooking = async () => {
    dispatch({ type: 'SUBMIT_BOOKING' })
    try {
      await fetch(`${API_BASE}/api/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...state.bookingData,
          sessionId: uid(),
        }),
      })
    } catch {
      // Lead save failed silently — booking confirmation still shows
    }
  }

  const handleBackFromBooking = () => {
    dispatch({ type: 'CLOSE' })
    setTimeout(() => dispatch({ type: 'OPEN' }), 10)
  }

  const isOnlyWelcome = state.messages.length === 1

  return (
    <>
      {/* ── Floating bubble ─────────────────────────────────── */}
      <button
        className={styles.bubble}
        onClick={() => dispatch({ type: state.isOpen ? 'CLOSE' : 'OPEN' })}
        aria-label={state.isOpen ? 'Close chat' : 'Open chat'}
      >
        {state.isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {state.hasUnread && <span className={styles.unreadDot} />}
          </>
        )}
      </button>

      {/* ── Chat panel ──────────────────────────────────────── */}
      {state.isOpen && (
        <div className={styles.panel}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <span className={styles.statusDot} />
              <div>
                <div className={styles.headerTitle}>Krionics AI</div>
                <div className={styles.headerSub}>Typically replies in seconds</div>
              </div>
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => dispatch({ type: 'CLOSE' })}
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Body: booking vs chat */}
          {state.bookingMode ? (
            <BookingPanel
              step={state.bookingStep}
              data={state.bookingData}
              submitted={state.submitted}
              onNext={handleBookingNext}
              onSetTime={handleSetTime}
              onSubmit={handleSubmitBooking}
              onBack={handleBackFromBooking}
            />
          ) : (
            <>
              {/* Messages */}
              <div className={styles.messages} role="log" aria-live="polite">
                {state.messages.map((m) => (
                  <MessageBubble key={m.id} msg={m} />
                ))}
                {state.isStreaming && !state.messages[state.messages.length - 1]?.isStreaming && (
                  <TypingDots />
                )}

                {/* Quick replies — only show after welcome when no other messages */}
                {isOnlyWelcome && (
                  <div className={styles.quickReplies}>
                    {QUICK_REPLIES.map((q) => (
                      <button
                        key={q}
                        className={styles.quickChip}
                        onClick={() => handleQuickReply(q)}
                        disabled={state.isStreaming}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {/* Book a call nudge after a few messages */}
                {!isOnlyWelcome && !state.bookingMode && state.messages.length >= 5 && (
                  <div className={styles.bookNudge}>
                    <button
                      className={styles.bookNudgeBtn}
                      onClick={() => dispatch({ type: 'TRIGGER_BOOKING' })}
                    >
                      Book a 15-min call →
                    </button>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className={styles.inputRow}>
                <input
                  ref={inputRef}
                  className={styles.input}
                  type="text"
                  placeholder="Ask anything about Krionics…"
                  value={state.input}
                  onChange={(e) => dispatch({ type: 'SET_INPUT', payload: e.target.value })}
                  onKeyDown={handleKeyDown}
                  maxLength={400}
                  disabled={state.isStreaming}
                  aria-label="Chat input"
                />
                <button
                  className={styles.sendBtn}
                  onClick={handleSend}
                  disabled={!state.input.trim() || state.isStreaming}
                  aria-label="Send"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
