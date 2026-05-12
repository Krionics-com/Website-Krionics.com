import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './BookPage.module.css'

type Step = 1 | 2 | 3 | 4

interface FormData {
  company: string
  role: string
  website: string
  acv: string
  currentMeetings: string
  biggestChallenge: string
  hearAboutUs: string
  time: string
}

const TIMES = [
  'Mon 9am ET', 'Mon 1pm ET', 'Mon 3pm ET',
  'Tue 9am ET', 'Tue 1pm ET', 'Tue 3pm ET',
  'Wed 9am ET', 'Wed 1pm ET',
  'Thu 9am ET', 'Thu 11am ET', 'Thu 3pm ET',
  'Fri 9am ET', 'Fri 11am ET',
]

const CHALLENGES = [
  'No consistent pipeline',
  'SDR keeps quitting',
  'Tools but no system',
  'Agency that didn\'t deliver',
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
    hearAboutUs: '',
    time: '',
  })

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const stepValid = (s: Step) => {
    if (s === 1) return form.company && form.role && form.website
    if (s === 2) return form.acv && form.biggestChallenge
    if (s === 3) return !!form.time
    return true
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

        <div style={{ maxWidth: 560 }}>
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
                <button className="btn btn-primary" onClick={() => stepValid(2) && setStep(3)} style={{ opacity: stepValid(2) ? 1 : 0.4 }}>
                  Continue <span className="arrow">→</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <h1 className="serif" style={{ fontSize: 36, letterSpacing: '-0.02em', margin: '0 0 8px' }}>Pick a time.</h1>
              <p className="muted" style={{ fontSize: 15, margin: '0 0 40px' }}>15 minutes. All times are Eastern. We'll send a calendar invite immediately.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {TIMES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setForm((f) => ({ ...f, time: t }))}
                    style={{
                      padding: '12px 8px',
                      background: form.time === t ? 'var(--ink)' : 'var(--bg-elev)',
                      border: '1px solid ' + (form.time === t ? 'var(--ink)' : 'var(--border)'),
                      color: form.time === t ? 'var(--cream-2)' : 'var(--text)',
                      fontFamily: 'var(--mono)',
                      fontSize: 12,
                      cursor: 'pointer',
                      letterSpacing: '0.04em',
                      transition: 'all 0.15s',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
                <button className="btn btn-ghost" onClick={() => setStep(2)}>← Back</button>
                <button className="btn btn-primary" onClick={() => stepValid(3) && setStep(4)} style={{ opacity: stepValid(3) ? 1 : 0.4 }}>
                  Confirm booking <span className="arrow">→</span>
                </button>
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
                <strong style={{ color: 'var(--text)' }}>{form.time}</strong> · 15 minutes · Google Meet link incoming
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
