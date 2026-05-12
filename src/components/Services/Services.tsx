import styles from './Services.module.css'

interface ServiceCardProps {
  n: string
  name: string
  headline: string
  body: string
  tools: string[]
  setup: string
  monthly: string
}

function ServiceCard({ n, name, headline, body, tools, setup, monthly }: ServiceCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <span className="num-marker">{n}</span>
        <span className="eyebrow-2" style={{ marginLeft: 12, fontSize: 11 }}>{name}</span>
      </div>
      <h3 className="h2" style={{ margin: '20px 0 16px', letterSpacing: '-0.02em' }}>{headline}</h3>
      <p className="muted" style={{ fontSize: 15, lineHeight: 1.65, marginBottom: 24 }}>{body}</p>
      <div className={styles.tools}>
        {tools.map((t) => (
          <span key={t} className={styles.toolChip}>{t}</span>
        ))}
      </div>
      <div className={styles.pricing}>
        <div>
          <span className="mono" style={{ fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Setup</span>
          <div className="serif" style={{ fontSize: 32, lineHeight: 1, marginTop: 4, letterSpacing: '-0.02em' }}>{setup}</div>
        </div>
        <div>
          <span className="mono" style={{ fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Monthly</span>
          <div className="serif" style={{ fontSize: 32, lineHeight: 1, marginTop: 4, letterSpacing: '-0.02em', color: 'var(--primary)' }}>{monthly}</div>
        </div>
      </div>
    </div>
  )
}

export function Services() {
  return (
    <section id="services" style={{ paddingTop: 140 }}>
      <div className="container">
        <div style={{ marginBottom: 64 }}>
          <span className="eyebrow-2 reveal">05 / What we build</span>
          <h2 className="h1 reveal" style={{ margin: '20px 0 16px', maxWidth: '24ch', letterSpacing: '-0.02em' }}>
            Two systems.<br />One outcome: <em style={{ fontStyle: 'italic' }}>pipeline.</em>
          </h2>
          <p className="muted reveal" style={{ margin: 0, fontSize: 17, maxWidth: '54ch' }}>
            We don't do campaigns. We build the infrastructure and run it — daily. Pick the system that fits your stage.
          </p>
        </div>

        <div className={`reveal ${styles.grid}`}>
          <ServiceCard
            n="i"
            name="Cold outbound system"
            headline="Precision cold email at scale"
            body="We build your sending infrastructure, source and verify prospect lists, write and test sequences, monitor deliverability daily, and hand you qualified meetings. You get the machine — and we run it."
            tools={['Apollo', 'Clay', 'Instantly', 'Smartlead', 'ZoomInfo']}
            setup="$2,000"
            monthly="$2,500"
          />
          <ServiceCard
            n="ii"
            name="Full pipeline system"
            headline="Cold outbound + LinkedIn + data ops"
            body="Everything in the cold outbound system, plus LinkedIn outreach, custom data enrichment pipelines, ICP refinement loops, and a unified pipeline dashboard. For companies ready to make outbound a serious channel."
            tools={['Apollo', 'Clay', 'Instantly', 'LinkedIn Sales Nav', 'Phantombuster', 'ZoomInfo']}
            setup="$7,500"
            monthly="$2,000"
          />
        </div>

        <div className="reveal" style={{ marginTop: 40, padding: '24px 28px', background: 'var(--bg-elev)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p className="muted" style={{ margin: 0, fontSize: 14, maxWidth: '52ch' }}>
            All tools, sending infrastructure, domains, and inboxes are <strong style={{ color: 'var(--text)' }}>included in the monthly fee</strong>. No surprise add-ons. No discovery calls to find out the price.
          </p>
          <span className="mono" style={{ fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.08em' }}>PUBLISHED PRICING. NO DANCE.</span>
        </div>
      </div>
    </section>
  )
}
