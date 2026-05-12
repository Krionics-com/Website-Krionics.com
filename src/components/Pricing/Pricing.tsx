import { Link } from 'react-router-dom'
import styles from './Pricing.module.css'

interface PriceTierProps {
  name: string
  price: string
  sub: string
  description: string
  includes: string[]
  recommended?: boolean
}

function PriceTier({ name, price, sub, description, includes, recommended = false }: PriceTierProps) {
  return (
    <div className={`${styles.tier} ${recommended ? styles.recommended : ''}`}>
      {recommended && <span className={styles.badge}>RECOMMENDED</span>}
      <span className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', color: recommended ? 'rgba(245,241,232,0.6)' : 'var(--text-2)' }}>{name}</span>
      <div className="serif" style={{ fontSize: 52, lineHeight: 1, letterSpacing: '-0.03em', margin: '16px 0 4px', color: recommended ? 'var(--primary)' : 'var(--text)' }}>
        {price}
      </div>
      <span className="mono" style={{ fontSize: 12, color: recommended ? 'rgba(245,241,232,0.6)' : 'var(--text-2)', letterSpacing: '0.06em' }}>{sub}</span>
      <p style={{ margin: '20px 0', fontSize: 14, lineHeight: 1.6, color: recommended ? 'rgba(245,241,232,0.8)' : 'var(--text-2)' }}>{description}</p>
      <hr style={{ height: 1, background: recommended ? 'rgba(245,241,232,0.18)' : 'var(--border)', border: 0, margin: '20px 0' }} />
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {includes.map((item) => (
          <li key={item} style={{ fontSize: 13, display: 'flex', alignItems: 'flex-start', gap: 10, color: recommended ? 'rgba(245,241,232,0.85)' : 'var(--text)' }}>
            <span style={{ color: 'var(--primary)', fontFamily: 'var(--mono)', fontSize: 11, marginTop: 2, flexShrink: 0 }}>✓</span>
            {item}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 'auto', paddingTop: 28 }}>
        <Link to="/book" className={`btn ${recommended ? 'btn-primary' : 'btn-ghost'}`} style={{ width: '100%', justifyContent: 'center' }}>
          Book a call <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  )
}

export function Pricing() {
  return (
    <section id="pricing" style={{ paddingTop: 140 }}>
      <div className="container">
        <div style={{ marginBottom: 40 }}>
          <span className="eyebrow-2 reveal">06 / Pricing</span>
          <h2 className="h1 reveal" style={{ margin: '20px 0 16px', maxWidth: '22ch', letterSpacing: '-0.02em' }}>
            Three tiers. Published. <em style={{ fontStyle: 'italic' }}>No surprises.</em>
          </h2>
          <p className="muted reveal" style={{ margin: 0, fontSize: 17, maxWidth: '54ch' }}>
            All plans include infrastructure, tools, data, and operating time. There is no "minimum spend" footnote.
          </p>
        </div>

        <div className="reveal" style={{ marginBottom: 28, padding: '14px 20px', background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--text-2)', textTransform: 'uppercase' }}>These tiers are for</span>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Service A — AI Cold Outbound System</span>
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.04em' }}>Service B (AI Voice Agent): $7,500 setup + $2,000/mo — ask on the call</span>
        </div>

        <div className={`reveal ${styles.grid}`}>
          <PriceTier
            name="GROWTH"
            price="$2,500"
            sub="/mo + $2,000 setup"
            description="Cold email outbound system. Ideal for companies with a proven offer who need a reliable, operated pipeline channel without hiring."
            includes={[
              'Sending infrastructure (domains, inboxes)',
              'ICP list build + verification (monthly)',
              'Sequence writing + A/B testing',
              'Daily operation + deliverability monitoring',
              'Weekly performance reports',
              'Slack access (response same business day)',
              '3-month minimum, then month-to-month',
            ]}
          />
          <PriceTier
            name="SYSTEMATIZE"
            price="$4,500"
            sub="/mo + $5,000 setup"
            description="Cold email + LinkedIn outbound. For companies ready to build multi-channel pipeline with unified data and a real dashboard."
            recommended
            includes={[
              'Everything in Growth',
              'LinkedIn outreach (connection + message sequences)',
              'Clay enrichment pipelines (custom triggers)',
              'Multi-channel unified dashboard',
              'Monthly ICP refinement review',
              'CRM sync configuration',
              'Dedicated account lead',
            ]}
          />
          <PriceTier
            name="OUTPACE"
            price="$7,500"
            sub="/mo + $7,500 setup"
            description="Full pipeline system with intent data, custom signals, and aggressive multi-channel. For companies where pipeline is a strategic priority."
            includes={[
              'Everything in Systematize',
              'Intent data integration (G2, Bombora)',
              'Custom signal tracking (job posts, news, funding)',
              'Parallel sequence architecture',
              'Weekly strategy call',
              'Quarterly system rebuild',
              'Priority SLA',
            ]}
          />
        </div>

        <p className="sidenote reveal" style={{ marginTop: 28, maxWidth: '60ch' }}>
          Early clients (first 5 active accounts) book at rates below the above — ask about availability on the call. All pricing is in USD. Setup is one-time.
        </p>
      </div>
    </section>
  )
}
