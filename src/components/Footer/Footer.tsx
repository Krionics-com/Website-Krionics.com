import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'rgba(245,241,232,0.5)', borderTop: '1px solid rgba(245,241,232,0.08)', padding: '60px 0 40px' }}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <div className="serif" style={{ fontSize: 22, color: 'var(--cream-2)', letterSpacing: '-0.01em', marginBottom: 16 }}>Krionics</div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65, maxWidth: '26ch' }}>
              B2B pipeline systems. We build the outbound infrastructure and run it — so you get meetings, not excuses.
            </p>
            <p style={{ margin: '16px 0 0', fontSize: 12, fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>
              hello@krionics.com
            </p>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,241,232,0.4)', display: 'block', marginBottom: 16 }}>Services</span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['AI Cold Outbound System', 'AI Voice Agents'].map((item) => (
                <li key={item}>
                  <Link to="/#services" style={{ color: 'rgba(245,241,232,0.5)', fontSize: 13, textDecoration: 'none' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cream-2)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,241,232,0.5)')}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,241,232,0.4)', display: 'block', marginBottom: 16 }}>Company</span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Our approach', href: '/#approach' },
                { label: 'Pricing', href: '/#pricing' },
                { label: 'FAQ', href: '/#faq' },
                { label: 'Dashboard', href: '/dashboard' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} style={{ color: 'rgba(245,241,232,0.5)', fontSize: 13, textDecoration: 'none' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cream-2)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,241,232,0.5)')}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,241,232,0.4)', display: 'block', marginBottom: 16 }}>Get started</span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li>
                <Link to="/book" style={{ color: 'rgba(245,241,232,0.5)', fontSize: 13, textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cream-2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,241,232,0.5)')}>
                  Book a call
                </Link>
              </li>
              <li>
                <a href="#roi" style={{ color: 'rgba(245,241,232,0.5)', fontSize: 13, textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cream-2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,241,232,0.5)')}>
                  ROI calculator
                </a>
              </li>
              <li>
                <a href="#pricing" style={{ color: 'rgba(245,241,232,0.5)', fontSize: 13, textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cream-2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,241,232,0.5)')}>
                  See pricing
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em' }}>
            © {new Date().getFullYear()} Krionics. All rights reserved.
          </span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em' }}>
            B2B pipeline systems · Cold outbound · AI voice agents
          </span>
        </div>
      </div>
    </footer>
  )
}
