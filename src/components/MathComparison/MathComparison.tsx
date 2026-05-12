import styles from './MathComparison.module.css'

interface MathColProps {
  tag: string
  title: string
  cost: string
  breakdown: [string, string][]
  meta: [string, string][]
  highlight?: boolean
}

function MathCol({ tag, title, cost, breakdown, meta, highlight = false }: MathColProps) {
  return (
    <div
      style={{
        padding: 32,
        background: highlight ? 'var(--ink)' : 'var(--bg)',
        color: highlight ? 'var(--cream-2)' : 'var(--text)',
        borderRight: '1px solid ' + (highlight ? 'var(--ink)' : 'var(--border)'),
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        position: 'relative',
      }}
    >
      {highlight && (
        <span className={styles.badge}>30% BELOW MARKET</span>
      )}
      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', color: highlight ? 'rgba(245,241,232,0.6)' : 'var(--text-2)' }}>{tag}</span>
      <h3 className="serif" style={{ fontSize: 28, fontWeight: 400, letterSpacing: '-0.01em', margin: 0 }}>{title}</h3>
      <div className="serif" style={{ fontSize: 52, lineHeight: 1, letterSpacing: '-0.03em', color: highlight ? 'var(--primary)' : 'var(--text)' }}>
        {cost}
      </div>
      <hr style={{ height: 1, background: highlight ? 'rgba(245,241,232,0.18)' : 'var(--border)', border: 0, margin: 0 }} />
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {breakdown.map(([k, v]) => (
          <li key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, gap: 16 }}>
            <span style={{ color: highlight ? 'rgba(245,241,232,0.7)' : 'var(--text-2)' }}>{k}</span>
            <span style={{ fontFamily: 'var(--mono)', textAlign: 'right' }}>{v}</span>
          </li>
        ))}
      </ul>
      <hr style={{ height: 1, background: highlight ? 'rgba(245,241,232,0.18)' : 'var(--border)', border: 0, margin: 0 }} />
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {meta.map(([k, v]) => (
          <li key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, gap: 16 }}>
            <span style={{ color: highlight ? 'rgba(245,241,232,0.7)' : 'var(--text-2)' }}>{k}</span>
            <span style={{ fontFamily: 'var(--mono)', textAlign: 'right', color: highlight ? 'var(--cream-2)' : 'var(--text)' }}>{v}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function MathComparison() {
  return (
    <section style={{ paddingTop: 140 }}>
      <div className="container">
        <div style={{ marginBottom: 48 }}>
          <span className="eyebrow-2 reveal">02 / The math</span>
          <h2 className="h1 reveal" style={{ margin: '20px 0 16px', maxWidth: '20ch', letterSpacing: '-0.02em' }}>
            Here's what an SDR <em style={{ fontStyle: 'italic' }}>actually</em> costs you.
          </h2>
          <p className="muted reveal" style={{ margin: 0, fontSize: 17, maxWidth: '60ch' }}>
            Most agencies make you book three calls before they'll quote you. We don't. If the numbers don't work, you save the time.
          </p>
        </div>

        <div className={`${styles.grid} grid-math reveal`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, border: '1px solid var(--border)' }}>
          <MathCol
            tag="OPTION A"
            title="Hire an SDR"
            cost="$5,800/mo"
            breakdown={[
              ['Base salary', '$72k/yr'],
              ['Benefits + tax', '+22%'],
              ['Tools (Apollo, etc.)', '$650/mo'],
              ['Sales ops time', '$400/mo'],
              ['Manager time', '$1,200/mo'],
            ]}
            meta={[
              ['Time to ramp', '3 months'],
              ['Avg tenure', '11 months'],
              ['Meetings/mo', '10–14'],
            ]}
          />
          <MathCol
            tag="OPTION B"
            title="Another agency"
            cost="$4,500/mo"
            breakdown={[
              ['Retainer', '$3,500/mo'],
              ['List + tools', '$650/mo'],
              ['Sending infra', '$350/mo'],
              ['Onboarding', '$5,000 once'],
            ]}
            meta={[
              ['Time to launch', '6–8 weeks'],
              ['Lock-in', '12 months'],
              ['Meetings (real)', '5–9/mo'],
            ]}
          />
          <MathCol
            tag="OPTION C"
            title="Krionics"
            cost="$2,500/mo"
            breakdown={[
              ['Operations', '$2,500/mo'],
              ['Setup (one-time)', '$2,000'],
              ['Tools', 'included'],
              ['Sending infra', 'included'],
              ['Optimization', 'included'],
            ]}
            meta={[
              ['Time to launch', '14 days'],
              ['Lock-in', '3 mo, then m/m'],
              ['You own', 'everything'],
            ]}
            highlight
          />
        </div>

        <p className="sidenote reveal" style={{ marginTop: 24, maxWidth: '60ch' }}>
          Numbers above use loaded costs (US-based SDR; 2024 industry medians for retainer agencies). Krionics pricing is what it costs you, every month, with a published price. No discovery dance.
        </p>
      </div>
    </section>
  )
}
