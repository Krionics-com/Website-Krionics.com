import { BRAND } from '../../lib/brand'
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
            Krionics is three people who build, sell, and operate the systems. No account managers, no offshore execution teams — the people on this page do the work.
          </p>
        </div>

        <div className={`reveal ${styles.grid}`}>
          <FounderCard
            initial="A"
            name="Aryan Bhendarkar"
            role="Delivery Lead"
            bio="Aryan builds and operates the systems. Every Service A and Service B build goes through him — from domain setup to voice agent prompts to the monthly optimization work that actually keeps systems performing."
            background={[
              'Builds cold outbound systems end-to-end',
              'Deep expertise in Clay, Apollo, Vapi, and n8n',
              'Based in Bengaluru · Scaler School of Technology',
            ]}
          />
          <FounderCard
            initial="V"
            name="Vishwas"
            role="Sales Lead"
            bio="Vishwas runs every discovery call, writes every proposal, and owns the commercial relationship. Background in a failed B2B startup means he's been the buyer — and he remembers what it felt like to hire a bad agency."
            background={[
              'Leads all outbound, discovery calls, and closing',
              'Focuses on ICP precision and offer positioning',
              'Posts 3x/week on LinkedIn — specific results, not platitudes',
            ]}
          />
          <FounderCard
            initial="Av"
            name="Avishkar"
            role="Operations"
            bio="Avishkar keeps the delivery machine running — client reports, documentation, repo hygiene, and the process work that lets Aryan focus on building. If it needs to be documented and tracked, Avishkar owns it."
            background={[
              'Owns all client reporting and communication logs',
              'Builds and maintains the Agency OS documentation',
              'Based in Bengaluru · Scaler School of Technology',
            ]}
          />
        </div>

        <div className="reveal" style={{ marginTop: 40, padding: '20px 28px', background: 'var(--bg-elev)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span className="mono" style={{ fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.08em' }}>FOUNDED 2024 · BENGALURU, INDIA · REMOTE-FIRST DELIVERY</span>
          <span style={{ flex: 1 }} />
          <a href={`mailto:${BRAND.email}?subject=${encodeURIComponent(`${BRAND.name} — intro`)}`} className="btn btn-ghost" style={{ fontSize: 13, padding: '8px 16px' }}>
            Get in touch →
          </a>
        </div>
      </div>
    </section>
  )
}
