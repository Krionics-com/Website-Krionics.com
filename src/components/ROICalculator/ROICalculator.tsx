import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ROICalculator.module.css'

interface SliderProps {
  label: string
  value: number
  setValue: (v: number) => void
  min: number
  max: number
  step: number
  format: (v: number) => string
}

function ROISlider({ label, value, setValue, min, max, step, format }: SliderProps) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
        <span className="eyebrow-2" style={{ fontSize: 11 }}>{label}</span>
        <span className="serif" style={{ fontSize: 28, lineHeight: 1, color: 'var(--primary)', letterSpacing: '-0.01em' }}>{format(value)}</span>
      </div>
      <input
        type="range"
        className="slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-2)' }}>
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  )
}

interface OutProps {
  label: string
  value: string
  sub?: string
  highlight?: boolean
}

function ROIOut({ label, value, sub, highlight = false }: OutProps) {
  return (
    <div>
      <span className="eyebrow-2" style={{ fontSize: 11 }}>{label}</span>
      <div className="serif" style={{ fontSize: 40, lineHeight: 1, marginTop: 8, color: highlight ? 'var(--primary)' : 'var(--text)', letterSpacing: '-0.02em' }}>
        {value}
      </div>
      {sub && <span className="mono" style={{ fontSize: 11, color: 'var(--text-2)', display: 'block', marginTop: 6 }}>{sub}</span>}
    </div>
  )
}

export function ROICalculator() {
  const [acv, setAcv] = useState(24000)
  const [closeRate, setCloseRate] = useState(20)
  const [meetings, setMeetings] = useState(12)

  const annualMtgs = meetings * 12
  const newCustomers = (annualMtgs * closeRate) / 100
  const newARR = newCustomers * acv
  const krionicsCost = 2500 * 12 + 2000
  const roi = newARR / krionicsCost
  const costPerMissedMeeting = (acv * closeRate) / 100
  const monthlyLoss = costPerMissedMeeting * meetings

  const honestAnswer =
    roi >= 5
      ? "At these numbers, every month you wait costs you more than our entire annual fee. The decision is simple."
      : roi >= 2
      ? "The math works comfortably. The only risk is waiting another quarter to start."
      : "Even at conservative inputs, the system pays for itself. Book the call — we'll pressure-test these assumptions together."

  return (
    <section id="roi" style={{ background: 'var(--bg-elev)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '120px 0', marginTop: 100 }}>
      <div className="container">
        <div className={`${styles.grid} grid-2col`} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.55fr) minmax(0, 1fr)', gap: 80, alignItems: 'start' }}>
          <div>
            <span className="eyebrow-2 reveal">03 / The math doesn't lie</span>
            <h2 className="h1 reveal" style={{ margin: '20px 0 0', letterSpacing: '-0.02em' }}>
              What's inaction <em style={{ fontStyle: 'italic' }}>actually</em> costing you?
            </h2>
            <p className="muted reveal" style={{ marginTop: 24, fontSize: 16, maxWidth: '32ch' }}>
              Slide these to your numbers. Watch what you're leaving on the table every single month.
            </p>
            <div className={`reveal ${styles.lossStat}`}>
              <span className="mono" style={{ fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Monthly revenue you're not capturing</span>
              <div className="serif" style={{ fontSize: 44, lineHeight: 1, marginTop: 8, color: 'var(--primary)', letterSpacing: '-0.02em' }}>
                ${Math.round(monthlyLoss).toLocaleString()}
              </div>
              <span className="mono" style={{ fontSize: 11, color: 'var(--text-2)', display: 'block', marginTop: 6 }}>per month of inaction</span>
            </div>
          </div>

          <div className="reveal" style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: 36, borderRadius: 8 }}>
            <ROISlider label="Your average contract value" value={acv} setValue={setAcv} min={5000} max={150000} step={1000} format={(v) => `$${v.toLocaleString()}`} />
            <ROISlider label="Meeting → closed-won rate" value={closeRate} setValue={setCloseRate} min={5} max={50} step={1} format={(v) => `${v}%`} />
            <ROISlider label="Meetings we'd book you / month" value={meetings} setValue={setMeetings} min={4} max={30} step={1} format={(v) => `${v}`} />

            <hr style={{ height: 1, background: 'var(--border)', border: 0, margin: '32px 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <ROIOut label="New ARR / year" value={`$${Math.round(newARR / 1000).toLocaleString()}k`} highlight />
              <ROIOut label="Return on spend (your numbers)" value={`${roi.toFixed(1)}×`} />
              <ROIOut label="Krionics annual cost" value={`$${krionicsCost.toLocaleString()}`} sub="setup + 12 months" />
              <ROIOut label="Net new revenue" value={`$${Math.round((newARR - krionicsCost) / 1000).toLocaleString()}k`} sub="after our cost" />
            </div>

            <div style={{ marginTop: 32, padding: 20, background: 'var(--ink)', borderRadius: 6, color: 'var(--cream-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', color: 'rgba(245,241,232,0.6)', textTransform: 'uppercase' }}>Bottom line</span>
                <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--cream-2)', maxWidth: '44ch' }}>{honestAnswer}</p>
              </div>
              <Link to="/book" className="btn btn-primary" style={{ flexShrink: 0 }}>
                Book the call <span className="arrow">→</span>
              </Link>
            </div>

            <p style={{ marginTop: 16, fontSize: 13, color: 'var(--text-2)', textAlign: 'center', maxWidth: 500, margin: '16px auto 0', lineHeight: 1.55 }}>
              How the math works: meetings/month × close rate × ACV = new ARR. Minus Krionics annual cost = net new revenue. Adjust the sliders to your numbers — bring the result to the call.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
