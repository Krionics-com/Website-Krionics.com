import { Link } from 'react-router-dom'
import styles from './Hero.module.css'

const metrics = [
  { label: 'MEETINGS BOOKED', value: '12' },
  { label: 'REPLY RATE', value: '4.2%' },
  { label: 'EMAILS SENT', value: '2,847' },
  { label: 'COST PER MTG', value: '$208' },
]

function DashCard() {
  return (
    <div className={styles.cardOuter}>
      <div className={styles.badgeMeeting}>
        <span className={styles.badgeDot} />
        <div>
          <span className={styles.badgeLabel}>New meeting booked</span>
          <span className={styles.badgeSub}>Sarah Kim · Acme Corp</span>
        </div>
      </div>

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
        <div className={styles.chartMini}>
          {[30, 45, 35, 60, 50, 70, 42, 80, 58, 72, 48, 88, 65, 92].map((h, i) => (
            <div key={i} className={styles.chartBar} style={{ height: `${h}%`, opacity: 0.12 + (i / 14) * 0.5 }} />
          ))}
        </div>
        <p className={styles.dashNote}>Sample data — your real numbers replace these on day 15.</p>
      </div>

      <div className={styles.badgeReply}>
        <span className={styles.badgeReplyLabel}>REPLY RATE</span>
        <span className={styles.badgeReplyValue}>4.2%</span>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.dotGrid} />
      <div className="container-wide">
        <div className={`${styles.heroGrid} grid-hero`}>
          <div>
            <span className={`eyebrow-2 rise rise-d1 ${styles.eyebrow}`}>
              B2B pipeline systems · Bengaluru
            </span>
            <h1 className={`mega rise rise-d2 ${styles.headline}`}>
              Your next 12 clients are in someone else's <em>pipeline.</em>
            </h1>
            <p className={`rise rise-d3 ${styles.subtext}`}>
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
          <div className={`rise rise-d3 ${styles.cardSide}`}>
            <DashCard />
          </div>
        </div>
      </div>
    </section>
  )
}
