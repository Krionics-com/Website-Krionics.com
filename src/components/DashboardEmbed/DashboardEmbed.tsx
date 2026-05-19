import { Link } from 'react-router-dom'
import styles from './DashboardEmbed.module.css'

const KPI_CARDS = [
  { label: 'Meetings booked (30d)', value: '12' },
  { label: 'Open rate', value: '41%' },
  { label: 'Reply rate', value: '4.2%' },
  { label: 'Pipeline created', value: '$288k' },
]

const INBOX_ROWS = [
  { name: 'Marcus Webb', company: 'Clearpath SaaS', status: 'Meeting booked', time: '2h ago' },
  { name: 'Priya Nair', company: 'Velox AI', status: 'Interested', time: '4h ago' },
  { name: 'Dan Kowalski', company: 'Stackform', status: 'Follow-up sent', time: '1d ago' },
  { name: 'Jamie Torres', company: 'RevPath', status: 'Interested', time: '1d ago' },
]

const STATUS_COLORS: Record<string, string> = {
  'Interested': 'var(--structural)',
  'Meeting booked': 'var(--primary)',
  'Follow-up sent': 'var(--text-2)',
}

export function DashboardEmbed() {
  return (
    <section style={{ paddingTop: 96, paddingBottom: 0 }}>
      <div className="container">
        <div style={{ marginBottom: 48 }}>
          <span className="eyebrow-2 reveal">07 / The dashboard</span>
          <h2 className="h1 reveal" style={{ margin: '20px 0 16px', maxWidth: '22ch', letterSpacing: '-0.02em' }}>
            You see everything.<br /><em style={{ fontStyle: 'italic' }}>Every day.</em>
          </h2>
          <p className="muted reveal" style={{ margin: 0, fontSize: 17, maxWidth: '56ch' }}>
            Not a monthly PDF. Not a Zoom debrief. A live dashboard — your pipeline data, updated daily. This is what it looks like on Day 15.
          </p>
        </div>

        <div className={`reveal ${styles.screens}`}>
          {/* Screen 1: KPI overview */}
          <div className={styles.screen}>
            <div className={styles.screenBar}>
              <div className={styles.screenDots}>
                <span style={{ background: '#ff5f57' }} />
                <span style={{ background: '#febc2e' }} />
                <span style={{ background: '#28c840' }} />
              </div>
              <span className={styles.screenTitle}>Overview — Day 15</span>
              <span className={styles.screenLive}><span className="live-pip" />LIVE</span>
            </div>

            <div className={styles.kpiRow}>
              {KPI_CARDS.map((k) => (
                <div key={k.label} className={styles.kpiCard}>
                  <span className={styles.kpiLabel}>{k.label}</span>
                  <div className={styles.kpiValue}>{k.value}</div>
                  <span className={styles.kpiSub}>Your numbers, day 15+</span>
                </div>
              ))}
            </div>

            <div className={styles.chartPlaceholder}>
              <span className={styles.chartLabel}>Reply volume — last 14 days</span>
              <div className={styles.chartBars}>
                {[30, 48, 36, 62, 52, 74, 44, 88, 60, 76, 50, 84, 68, 94].map((h, i) => (
                  <div key={i} className={styles.bar} style={{ height: `${h}%`, opacity: 0.12 + (i / 14) * 0.52 }} />
                ))}
              </div>
            </div>
          </div>

          {/* Screen 2: Replies inbox */}
          <div className={styles.screen}>
            <div className={styles.screenBar}>
              <div className={styles.screenDots}>
                <span style={{ background: '#ff5f57' }} />
                <span style={{ background: '#febc2e' }} />
                <span style={{ background: '#28c840' }} />
              </div>
              <span className={styles.screenTitle}>Replies — inbox</span>
              <span className={styles.screenBadge}>4 new</span>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Contact</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {INBOX_ROWS.map((r, i) => (
                  <tr key={i}>
                    <td>{r.name}</td>
                    <td style={{ color: 'var(--text-2)' }}>{r.company}</td>
                    <td>
                      <span className={styles.statusChip} style={{ '--chip-color': STATUS_COLORS[r.status] } as React.CSSProperties}>
                        {r.status}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-2)' }}>{r.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={styles.screenFooter}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11 }}>Showing 4 of 47 total replies</span>
              <span style={{ color: 'var(--text-2)', fontFamily: 'var(--mono)', fontSize: 11 }}>All data is yours. Export any time.</span>
            </div>
          </div>
        </div>

        <div className="reveal" style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link to="/dashboard" className="btn btn-ghost">
            See the full dashboard →
          </Link>
          <span className="mono" style={{ fontSize: 11, color: 'var(--text-2)' }}>
            Sample data shown — your real numbers populate on day 15
          </span>
        </div>
      </div>
    </section>
  )
}
