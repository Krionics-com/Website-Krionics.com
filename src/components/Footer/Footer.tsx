import { Link } from 'react-router-dom'
import { BRAND } from '../../lib/brand'
import styles from './Footer.module.css'

const linkStyle = {
  color: 'rgba(245,241,232,0.5)',
  fontSize: 13,
  textDecoration: 'none' as const,
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      style={linkStyle}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cream-2)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,241,232,0.5)')}
    >
      {children}
    </Link>
  )
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <span className={styles.colTitle}>{title}</span>
      <ul className={styles.linkList}>
        {links.map((item) => (
          <li key={item.label}>
            <FooterLink to={item.href}>{item.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link to="/" aria-label={`${BRAND.name} — home`}>
              <span className="nav-logo-wrap">
                <img src="/logo.png" alt="" className="nav-logo-icon" aria-hidden="true" style={{ height: 26, borderRadius: 5 }} />
                <span className="nav-logo" style={{ color: 'var(--cream-2)' }}>
                  {BRAND.name}
                  <span style={{ color: 'var(--primary)' }}>.</span>
                </span>
              </span>
            </Link>
            <p className={styles.brandDesc}>{BRAND.description}</p>
            <p className={styles.brandMeta}>
              <a href={`mailto:${BRAND.email}`} className={styles.emailLink}>
                {BRAND.email}
              </a>
              <br />
              <a href={BRAND.url} className={styles.siteLink}>
                {BRAND.url.replace('https://', '')}
              </a>
            </p>
          </div>

          <FooterColumn
            title="Services"
            links={[
              { label: 'AI Cold Outbound System', href: '/#services' },
              { label: 'AI Voice Agents', href: '/#services' },
            ]}
          />

          <FooterColumn
            title="Company"
            links={[
              { label: 'Our approach', href: '/#approach' },
              { label: 'Pricing', href: '/#pricing' },
              { label: 'FAQ', href: '/#faq' },
              { label: 'About', href: '/about' },
              { label: 'Blog', href: '/blog' },
              { label: 'Careers', href: '/careers' },
              { label: 'Contact', href: '/contact' },
              { label: 'Dashboard', href: '/dashboard' },
            ]}
          />

          <FooterColumn
            title="Legal"
            links={[
              { label: 'Privacy Policy', href: '/privacy-policy' },
              { label: 'Terms of Service', href: '/terms' },
            ]}
          />

          <FooterColumn
            title="Get started"
            links={[
              { label: 'Book a call', href: '/book' },
              { label: 'ROI calculator', href: '/#roi' },
              { label: 'See pricing', href: '/#pricing' },
            ]}
          />
        </div>

        <div className={styles.bar}>
          <span className={styles.barCopy}>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </span>
          <span className={styles.barCopy}>
            B2B pipeline systems · Cold outbound · AI voice agents
          </span>
        </div>
      </div>
    </footer>
  )
}
