import styles from './SocialProof.module.css'

const METRICS = [
  { value: '58,000+', label: 'Emails sent & tracked', sub: 'Across all active campaigns' },
  { value: '340+', label: 'Meetings booked', sub: 'Qualified pipeline only' },
  { value: '14 days', label: 'Average time to first reply', sub: 'From signed to live' },
  { value: '$2.4M', label: 'Pipeline generated', sub: 'Across client accounts' },
]

const SIGNALS = [
  'Currently onboarding 2 new accounts',
  '3 active client systems running daily',
  'Avg. reply rate across clients: 4.1%',
]

export function SocialProof() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <div className={`reveal ${styles.metricsGrid}`}>
            {METRICS.map((m) => (
              <div key={m.label} className={styles.metric}>
                <div className={styles.metricValue}>{m.value}</div>
                <span className={styles.metricLabel}>{m.label}</span>
                <span className={styles.metricSub}>{m.sub}</span>
              </div>
            ))}
          </div>

          <div className={`reveal ${styles.signals}`}>
            <div className={styles.signalHeader}>
              <span className={styles.liveDot} />
              <span className={styles.signalTitle}>LIVE STATUS</span>
            </div>
            <div className={styles.signalList}>
              {SIGNALS.map((s) => (
                <span key={s} className={styles.signalItem}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
