import { Link } from 'react-router-dom'
import styles from './DashboardEmbed.module.css'

const KPI_CARDS = [
  { label: 'Meetings booked (30d)', value: '—', delta: null },
  { label: 'Open rate', value: '—', delta: null },
  { label: 'Reply rate', value: '—', delta: null },
  { label: 'Pipeline created', value: '—', delta: null },
]

const INBOX_ROWS = [
  { name: '—', company: '—', status: 'Interested', time: '—' },
  { name: '—', company: '—', status: 'Meeting booked', time: '—' },
  { name: '—', company: '—', status: 'Interested', time: '—' },
  { name: '—', company: '—', status: 'Follow-up sent', time: '—' },
]

const STATUS_COLORS: Record<string, string> = {
  'Interested': 'var(--structural)',
  'Meeting booked': 'var(--primary)',
  'Follow-up sent': 'var(--text-2)',
}

export function DashboardEmbed() {
  return (
    <section style={{ paddingTop: 140, paddingBottom: 0 }}>
      <div className="container">
        <div style={{ marginBottom: 56 }}>
          <span className="eyebrow-2 reveal">04 / The dashboard</span>
          <h2 className="h1 reveal" style={{ margin: '20px 0 16px', maxWidth: '22ch', letterSpacing: '-0.02em' }}>
            You see everything.<br /><em style={{ fontStyle: 'italic' }}>Every day.</em>
          </h2>
          <p className="muted reveal" style={{ margin: 0, fontSize: 17, maxWidth: '54ch' }}>
            Not a monthly PDF. Not a Zoom debrief. A live dashboard — your pipeline data, in real time. Here's what it looks like on Day 15 of your program.
          </p>
        </div>

        <div className={`reveal ${styles.screens}`}>
          {/* Screen 1: KPI overview */}
          <div className={styles.screen}>
            <div className={styles.screenBar}>
              <div className={styles.screenDots}>
                <span /><span /><span />
              </div>
              <span className={styles.screenTitle}>Overview — Day 15</span>
              <span className={styles.screenLive}><span className="live-pip" />LIVE</span>
            </div>

            <div className={styles.kpiRow}>
              {KPI_CARDS.map((k) => (
                <div key={k.label} className={styles.kpiCard}>
                  <span className={styles.kpiLabel}>{k.label}</span>
                  <div className={styles.kpiValue}>{k.value}</div>
                  <span className={styles.kpiSub}>Your real numbers appear here on day 15</span>
                </div>
              ))}
            </div>

            <div className={styles.chartPlaceholder}>
              <span className={styles.chartLabel}>Reply volume — last 14 days</span>
              <div className={styles.chartBars}>
                {[40, 55, 35, 70, 60, 80, 45, 90, 65, 75, 50, 85, 70, 95].map((h, i) => (
                  <div key={i} className={styles.bar} style={{ height: `${h}%`, opacity: 0.15 + (i / 14) * 0.45 }} />
                ))}
              </div>
            </div>
          </div>

          {/* Screen 2: Replies inbox */}
          <div className={styles.screen}>
            <div className={styles.screenBar}>
              <div className={styles.screenDots}>
                <span /><span /><span />
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
              <span>Showing 4 of — total replies</span>
              <span style={{ color: 'var(--text-2)', fontFamily: 'var(--mono)' }}>All data is yours. Export any time.</span>
            </div>
          </div>
        </div>

        <div className="reveal" style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link to="/dashboard" className="btn btn-ghost">
            See the full dashboard →
          </Link>
          <span className="mono" style={{ fontSize: 11, color: 'var(--text-2)' }}>
            All — placeholders become your numbers on day 15
          </span>
        </div>
      </div>
    </section>
  )
}
