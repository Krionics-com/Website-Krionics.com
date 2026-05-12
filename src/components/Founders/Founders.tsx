import styles from './Founders.module.css'

interface FounderCardProps {
  initial: string
  name: string
  role: string
  bio: string
  background: string[]
}

function FounderCard({ initial, name, role, bio, background }: FounderCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.initial}>{initial}</div>
      <div className={styles.meta}>
        <span className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: 'var(--text-2)', textTransform: 'uppercase' }}>{role}</span>
        <h3 className="serif" style={{ fontSize: 26, fontWeight: 400, margin: '8px 0 16px', letterSpacing: '-0.01em' }}>{name}</h3>
        <p className="muted" style={{ fontSize: 14, lineHeight: 1.65, margin: '0 0 20px' }}>{bio}</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {background.map((item) => (
            <li key={item} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--text-2)', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--primary)', fontFamily: 'var(--mono)', fontSize: 11, marginTop: 2, flexShrink: 0 }}>—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function Founders() {
  return (
    <section style={{ paddingTop: 120, paddingBottom: 120, borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ marginBottom: 56 }}>
          <span className="eyebrow-2 reveal">Who we are</span>
          <h2 className="h1 reveal" style={{ margin: '20px 0 16px', maxWidth: '28ch', letterSpacing: '-0.02em' }}>
            We've sat on your side of the table.<br />
            <em style={{ fontStyle: 'italic' }}>That's the difference.</em>
          </h2>
          <p className="muted reveal" style={{ margin: 0, fontSize: 17, maxWidth: '54ch' }}>
            Krionics was built by people who ran outbound, got burned by agencies, and decided to do it right. We're not a team of "growth hackers" — we're operators who built the system for ourselves first.
          </p>
        </div>

        <div className={`reveal ${styles.grid}`}>
          <FounderCard
            initial="A"
            name="Aryan Bhendarkar"
            role="Co-founder & Operations"
            bio="Ran outbound for B2B SaaS teams before building Krionics. Tired of agencies that over-promised and under-delivered, he built the system he wished existed — and now operates it for clients."
            background={[
              'Built cold outbound systems from scratch for 3+ companies',
              'Deep expertise in Clay, Apollo, and deliverability infrastructure',
              'Based in Bengaluru · Focused on systems that run without babysitting',
            ]}
          />
          <FounderCard
            initial="V"
            name="— Bhendarkar"
            role="Co-founder & Strategy"
            bio="Background in B2B sales and go-to-market strategy. Brings the commercial lens to every system we build — ensuring the pipeline output actually converts, not just fills a calendar."
            background={[
              'GTM strategy for early-stage B2B teams',
              'Focused on ICP definition and offer positioning',
              'Believes the best outbound starts with a sharp hypothesis, not a big list',
            ]}
          />
        </div>

        <div className="reveal" style={{ marginTop: 40, padding: '20px 28px', background: 'var(--bg-elev)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span className="mono" style={{ fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.08em' }}>FOUNDED 2024 · BENGALURU, INDIA · REMOTE-FIRST DELIVERY</span>
          <span style={{ flex: 1 }} />
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: 13, padding: '8px 16px' }}>
            Find us on LinkedIn →
          </a>
        </div>
      </div>
    </section>
  )
}
