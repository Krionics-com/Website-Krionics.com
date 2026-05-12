import { Link } from 'react-router-dom'
import styles from './Hero.module.css'

const metrics = [
  { label: 'MEETINGS BOOKED', value: '—' },
  { label: 'REPLY RATE', value: '—' },
  { label: 'EMAILS SENT', value: '—' },
  { label: 'COST PER MEETING', value: '—' },
]

function DashCard() {
  return (
    <div className={styles.dashCard}>
      <div className={styles.dashCardHeader}>
        <div className={styles.dashCardHeaderLeft}>
          <span className={styles.liveDot} />
          <span className={styles.liveLabel}>LIVE DASHBOARD</span>
        </div>
        <span className={styles.dayLabel}>Day 15 of program</span>
      </div>
      <div className={styles.metricsGrid}>
        {metrics.map((m) => (
          <div key={m.label} className={styles.metricTile}>
            <span className={styles.metricLabel}>{m.label}</span>
            <span className={styles.metricValue}>{m.value}</span>
          </div>
        ))}
      </div>
      <p className={styles.dashNote}>Your real numbers appear here on day 15.</p>
    </div>
  )
}

export function Hero() {
  return (
    <section style={{ paddingTop: 80, paddingBottom: 96 }}>
      <div className="container-wide">
        <div className={`${styles.heroGrid} grid-hero`} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)', gap: 80, alignItems: 'center' }}>
          <div>
            <span className="eyebrow-2 rise rise-d1" style={{ marginBottom: 32, display: 'inline-flex' }}>
              B2B pipeline systems · Bengaluru
            </span>
            <h1 className="mega rise rise-d2" style={{ marginTop: 28 }}>
              Your next 12 clients are in someone else's <em>pipeline.</em>
            </h1>
            <p className="rise rise-d3" style={{ fontSize: 19, lineHeight: 1.55, marginTop: 40, maxWidth: '52ch', color: 'var(--text)' }}>
              While you're tweaking sequences and warming domains, your competitors are booking the meetings you should be in. We build and run the entire outbound system — you show up to qualified calls.
            </p>
            <div className={`rise rise-d4 ${styles.ctaRow}`}>
              <Link to="/book" className="btn btn-primary" style={{ padding: '16px 26px', fontSize: 16 }}>
                Book a call <span className="arrow">→</span>
              </Link>
              <a className="btn btn-ghost" href="#roi" style={{ padding: '16px 22px', fontSize: 16 }}>
                See the math
              </a>
            </div>
            <div className={`rise rise-d5 ${styles.trustStrip}`}>
              <span className={styles.trustItem}>14-DAY SETUP</span>
              <span className={styles.divider} />
              <span className={styles.trustItem}>MONTH-TO-MONTH AFTER MINIMUM</span>
              <span className={styles.divider} />
              <span className={styles.trustItem}>YOU OWN EVERYTHING WE BUILD</span>
            </div>
          </div>
          <div className="rise rise-d3">
            <DashCard />
          </div>
        </div>
      </div>
    </section>
  )
}
