import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Cal, { getCalApi } from '@calcom/embed-react'
import styles from './BookPage.module.css'

// Set VITE_CALCOM_LINK in .env.local to your Cal.com event link, e.g. "krionics/discovery"
const CALCOM_LINK = (import.meta.env.VITE_CALCOM_LINK as string | undefined) ?? 'krionics/15-min-discovery-call'
const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? ''

type Step = 1 | 2 | 3 | 4

interface FormData {
  company: string
  role: string
  website: string
  acv: string
  currentMeetings: string
  biggestChallenge: string
}

const CHALLENGES = [
  'No consistent pipeline',
  "SDR keeps quitting",
  'Tools but no system',
  "Agency that didn't deliver",
  'Scaling beyond founder-led sales',
  'Other',
]

export function BookPage() {
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<FormData>({
    company: '',
    role: '',
    website: '',
    acv: '',
    currentMeetings: '',
    biggestChallenge: '',
  })

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const stepValid = (s: Step) => {
    if (s === 1) return form.company && form.role && form.website
    if (s === 2) return form.acv && form.biggestChallenge
    return true
  }

  // Initialize Cal.com embed and listen for booking completion when on Step 3
  useEffect(() => {
    if (step !== 3) return
    let mounted = true;
    (async () => {
      const cal = await getCalApi({ namespace: 'booking' })
      if (!mounted) return
      cal('ui', {
        theme: 'light',
        cssVarsPerTheme: {
          light: {
            'cal-brand': '#B85C38',
            'cal-bg': '#FBF9F4',
            'cal-bg-muted': '#F5F1E8',
            'cal-text': '#1A1F1B',
            'cal-text-subtle': '#6B6B6B',
            'cal-border': '#E8E2D5',
            'cal-border-emphasis': '#D4CCB8',
          },
          dark: {
            'cal-brand': '#B85C38',
            'cal-bg': '#FBF9F4',
            'cal-bg-muted': '#F5F1E8',
            'cal-text': '#1A1F1B',
            'cal-text-subtle': '#6B6B6B',
            'cal-border': '#E8E2D5',
            'cal-border-emphasis': '#D4CCB8',
          },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
      cal('on', {
        action: 'bookingSuccessful',
        callback: () => {
          if (mounted) setStep(4)
        },
      })
    })()
    return () => { mounted = false }
  }, [step])

  // Save qualification lead to Firestore when moving from Step 2 → 3
  function handleStep2Continue() {
    if (!stepValid(2)) return
    fetch(`${API_BASE}/api/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company: form.company,
        role: form.role,
        website: form.website,
        acv: form.acv,
        challenge: form.biggestChallenge,
        currentMeetings: form.currentMeetings,
        source: 'book_page',
      }),
    }).catch(() => {}) // fire-and-forget — never block the user
    setStep(3)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '16px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--text)', textDecoration: 'none', letterSpacing: '-0.01em' }}>
            Krionics
          </Link>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.08em' }}>
            BOOK A CALL
          </span>
        </div>
      </div>

      <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '60px var(--gutter)' }}>
        {/* Progress */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 48, alignItems: 'center' }}>
          {([1, 2, 3, 4] as Step[]).map((s) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: step >= s ? 'var(--ink)' : 'var(--bg-elev)',
                border: '1px solid ' + (step >= s ? 'var(--ink)' : 'var(--border)'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--mono)',
                fontSize: 11,
                color: step >= s ? 'var(--cream-2)' : 'var(--text-2)',
              }}>
                {s}
              </div>
              {s < 4 && <div style={{ width: 32, height: 1, background: step > s ? 'var(--ink)' : 'var(--border)' }} />}
            </div>
          ))}
          <span style={{ marginLeft: 12, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.06em' }}>
            {step === 1 ? 'About you' : step === 2 ? 'Diagnostic' : step === 3 ? 'Pick a time' : 'Confirmed'}
          </span>
        </div>

        <div style={{ maxWidth: step === 3 ? 900 : 560 }}>
          {/* Step 1 */}
          {step === 1 && (
            <div>
              <h1 className="serif" style={{ fontSize: 36, letterSpacing: '-0.02em', margin: '0 0 8px' }}>Tell us about yourself.</h1>
              <p className="muted" style={{ fontSize: 15, margin: '0 0 40px' }}>We read this before the call. No surprises on either side.</p>

              <div className={styles.fields}>
                <label className={styles.field}>
                  <span className={styles.label}>Company name</span>
                  <input className={styles.input} type="text" placeholder="Acme Corp" value={form.company} onChange={set('company')} />
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>Your role</span>
                  <input className={styles.input} type="text" placeholder="Head of Sales, CEO, etc." value={form.role} onChange={set('role')} />
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>Website</span>
                  <input className={styles.input} type="text" placeholder="yourcompany.com" value={form.website} onChange={set('website')} />
                </label>
              </div>

              <button className="btn btn-primary" onClick={() => stepValid(1) && setStep(2)} style={{ marginTop: 32, opacity: stepValid(1) ? 1 : 0.4 }}>
                Continue <span className="arrow">→</span>
              </button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <h1 className="serif" style={{ fontSize: 36, letterSpacing: '-0.02em', margin: '0 0 8px' }}>Quick diagnostic.</h1>
              <p className="muted" style={{ fontSize: 15, margin: '0 0 40px' }}>Two questions. This determines whether we can actually help you.</p>

              <div className={styles.fields}>
                <label className={styles.field}>
                  <span className={styles.label}>Average contract value (ACV)</span>
                  <select className={styles.input} value={form.acv} onChange={set('acv')}>
                    <option value="">Select a range</option>
                    <option value="under5k">Under $5,000</option>
                    <option value="5k-25k">$5,000 – $25,000</option>
                    <option value="25k-100k">$25,000 – $100,000</option>
                    <option value="over100k">Over $100,000</option>
                  </select>
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>Biggest pipeline challenge right now</span>
                  <select className={styles.input} value={form.biggestChallenge} onChange={set('biggestChallenge')}>
                    <option value="">Select one</option>
                    {CHALLENGES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>Current booked meetings per month (optional)</span>
                  <input className={styles.input} type="text" placeholder="e.g. 4–6, or 0" value={form.currentMeetings} onChange={set('currentMeetings')} />
                </label>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
                <button className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
                <button
                  className="btn btn-primary"
                  onClick={handleStep2Continue}
                  style={{ opacity: stepValid(2) ? 1 : 0.4 }}
                >
                  Continue <span className="arrow">→</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Cal.com inline embed */}
          {step === 3 && (
            <div>
              <h1 className="serif" style={{ fontSize: 36, letterSpacing: '-0.02em', margin: '0 0 8px' }}>Pick a time.</h1>
              <p className="muted" style={{ fontSize: 15, margin: '0 0 32px' }}>
                15 minutes. We'll read your answers before the call.
              </p>
              <Cal
                namespace="booking"
                calLink={CALCOM_LINK}
                style={{ width: '100%', height: '660px', overflow: 'scroll', borderRadius: 8, border: '1px solid var(--border)' }}
                config={{ layout: 'month_view' }}
              />
              <div style={{ marginTop: 16 }}>
                <button className="btn btn-ghost" onClick={() => setStep(2)}>← Back</button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmed */}
          {step === 4 && (
            <div style={{ textAlign: 'center', paddingTop: 40 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', fontFamily: 'var(--mono)', fontSize: 20, color: 'var(--cream-2)' }}>
                ✓
              </div>
              <h1 className="serif" style={{ fontSize: 40, letterSpacing: '-0.02em', margin: '0 0 16px' }}>You're booked.</h1>
              <p className="muted" style={{ fontSize: 16, margin: '0 0 8px' }}>
                Check your inbox — a calendar invite is on its way.
              </p>
              <p className="muted" style={{ fontSize: 15, margin: '0 0 40px', maxWidth: '40ch', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.65 }}>
                We'll read your answers before the call. Come with your real numbers — we'll pressure-test them together.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/" className="btn btn-ghost">← Back to site</Link>
                <Link to="/dashboard" className="btn btn-ghost">Preview dashboard →</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
