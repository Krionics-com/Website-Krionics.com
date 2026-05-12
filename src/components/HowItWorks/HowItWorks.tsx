import styles from './HowItWorks.module.css'

const STEPS = [
  {
    day: 'Day 0',
    title: 'Kickoff & diagnosis',
    body: 'One 60-minute call. We audit your ICP, existing data, domain health, and tool stack. You leave with a written system spec — no ambiguity about what we\'re building or why.',
    marker: '1',
  },
  {
    day: 'Days 1–7',
    title: 'Infrastructure build',
    body: 'Domains purchased and warmed. Inboxes configured and authenticated (SPF, DKIM, DMARC). Apollo and Clay pipelines built. Sending infrastructure tested end-to-end before a single prospect email goes out.',
    marker: '2',
  },
  {
    day: 'Days 8–13',
    title: 'List build & copy',
    body: 'ICP-filtered prospect list built, verified, and enriched. Sequences written — opening lines personalized to each segment. A/B variants drafted. Everything reviewed with you before launch.',
    marker: '3',
  },
  {
    day: 'Day 14',
    title: 'Launch',
    body: 'Sequences go live. Dashboard goes live. You get a Slack channel with us in it. Deliverability is monitored from hour one. The machine is running.',
    marker: '4',
  },
  {
    day: 'Ongoing',
    title: 'Operate & optimize',
    body: 'We run the system every business day. Weekly performance reports. Monthly ICP reviews. Sequence variants rotated based on data. If something underperforms, we fix it — that\'s what the retainer covers.',
    marker: '5',
  },
]

export function HowItWorks() {
  return (
    <section style={{ paddingTop: 96, background: 'var(--bg-elev)', marginTop: 0, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', paddingBottom: 96 }}>
      <div className="container">
        <div style={{ marginBottom: 64 }}>
          <span className="eyebrow-2 reveal">06 / How it works</span>
          <h2 className="h1 reveal" style={{ margin: '20px 0 16px', maxWidth: '22ch', letterSpacing: '-0.02em' }}>
            From signed to running<br />in <em style={{ fontStyle: 'italic' }}>14 days.</em>
          </h2>
          <p className="muted reveal" style={{ margin: 0, fontSize: 17, maxWidth: '52ch' }}>
            No discovery dance. No 6-week onboarding. We've done this enough times to have the process hardened.
          </p>
        </div>

        <div className={`reveal ${styles.timeline}`}>
          {STEPS.map((step, i) => (
            <div key={step.day} className={styles.step}>
              <div className={styles.stepLeft}>
                <div className={styles.stepMarker}>{step.marker}</div>
                {i < STEPS.length - 1 && <div className={styles.stepLine} />}
              </div>
              <div className={styles.stepContent}>
                <span className="mono" style={{ fontSize: 11, color: 'var(--primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{step.day}</span>
                <h3 className="h3" style={{ margin: '8px 0 12px', letterSpacing: '-0.01em' }}>{step.title}</h3>
                <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.65, maxWidth: '52ch' }}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
