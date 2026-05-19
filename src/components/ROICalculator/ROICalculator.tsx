import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ROICalculator.module.css'

function ROISlider({
  label, value, setValue, min, max, step,
  format,
}: {
  label: string; value: number; setValue: (v: number) => void;
  min: number; max: number; step: number; format: (v: number) => string;
}) {
  return (
    <div className={styles.sliderBlock}>
      <div className={styles.sliderTop}>
        <span className={styles.sliderLabel}>{label}</span>
        <span className="serif" style={{ fontSize: 26, lineHeight: 1, color: 'var(--primary)', letterSpacing: '-0.01em' }}>{format(value)}</span>
      </div>
      <input
        type="range"
        className="slider"
        min={min} max={max} step={step} value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <div className={styles.sliderRange}>
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
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
  const monthlyOpportunityCost = ((acv * closeRate) / 100) * meetings

  const verdict =
    roi >= 5
      ? "Every month you wait costs more than our entire annual fee. The decision is simple."
      : roi >= 2
      ? "The math works comfortably. The only risk is waiting another quarter to start."
      : "Even at conservative inputs, the system pays for itself. Book the call — we'll pressure-test these assumptions together."

  return (
    <section id="roi" style={{ background: 'var(--bg-elev)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '96px 0' }}>
      <div className="container">
        <div style={{ marginBottom: 56 }}>
          <span className="eyebrow-2 reveal">06 / The math doesn't lie</span>
          <h2 className="h1 reveal" style={{ margin: '20px 0 0', letterSpacing: '-0.02em' }}>
            What's inaction <em style={{ fontStyle: 'italic' }}>actually</em> costing you?
          </h2>
        </div>

        <div className={styles.layout}>
          {/* Left: loss stat + description */}
          <div className={styles.leftCol}>
            <div className="reveal" style={{ marginBottom: 32 }}>
              <span className="mono" style={{ fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>You're leaving on the table</span>
              <div className="serif" style={{ fontSize: 52, lineHeight: 1, marginTop: 10, color: 'var(--primary)', letterSpacing: '-0.03em' }}>
                ${Math.round(monthlyOpportunityCost).toLocaleString()}
              </div>
              <span className="mono" style={{ fontSize: 12, color: 'var(--text-2)', display: 'block', marginTop: 8 }}>per month of inaction</span>
            </div>

            <div className="reveal" style={{ borderTop: '1px solid var(--border)', paddingTop: 28 }}>
              <div className={styles.outRow}>
                <span className="eyebrow" style={{ fontSize: 10 }}>New ARR / year</span>
                <div className="serif" style={{ fontSize: 40, lineHeight: 1, color: 'var(--primary)', letterSpacing: '-0.02em' }}>
                  ${Math.round(newARR / 1000).toLocaleString()}k
                </div>
              </div>
              <div className={styles.outRow} style={{ marginTop: 20 }}>
                <span className="eyebrow" style={{ fontSize: 10 }}>Return on Krionics spend</span>
                <div className="serif" style={{ fontSize: 40, lineHeight: 1, color: 'var(--text)', letterSpacing: '-0.02em' }}>
                  {roi.toFixed(1)}×
                </div>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-2)', fontFamily: 'var(--mono)', marginTop: 20, lineHeight: 1.6 }}>
                Krionics costs ${krionicsCost.toLocaleString()} for a full year (setup + 12 months). The rest is yours.
              </p>
            </div>
          </div>

          {/* Right: sliders + verdict */}
          <div className={`reveal ${styles.rightCol}`}>
            <p className="muted" style={{ margin: '0 0 32px', fontSize: 15 }}>
              Slide these to your numbers — bring the output to the call.
            </p>

            <ROISlider
              label="Average contract value"
              value={acv} setValue={setAcv}
              min={5000} max={150000} step={1000}
              format={(v) => `$${v.toLocaleString()}`}
            />
            <ROISlider
              label="Meeting → closed-won rate"
              value={closeRate} setValue={setCloseRate}
              min={5} max={50} step={1}
              format={(v) => `${v}%`}
            />
            <ROISlider
              label="Meetings we'd book / month"
              value={meetings} setValue={setMeetings}
              min={4} max={30} step={1}
              format={(v) => `${v}`}
            />

            <div className={styles.verdict}>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--cream-2)' }}>{verdict}</p>
              <Link to="/book" className="btn btn-primary" style={{ marginTop: 16, alignSelf: 'flex-start' }}>
                Book a call <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
