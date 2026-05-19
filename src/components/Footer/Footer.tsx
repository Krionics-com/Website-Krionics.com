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
            <div className={styles.socialLinks}>
              <a href="https://linkedin.com/company/krionics" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://x.com/krionics" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="X (Twitter)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
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
