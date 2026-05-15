import { Link } from 'react-router-dom'
import { Footer } from '../Footer/Footer'
import { BRAND } from '../../lib/brand'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './PageLayout.module.css'

interface PageHeroProps {
  eyebrow?: string
  title: React.ReactNode
  description?: string
  dark?: boolean
}

export function PageHero({ eyebrow, title, description, dark }: PageHeroProps) {
  return (
    <header className={`${styles.hero} ${dark ? styles.heroDark : ''}`}>
      <div className="container">
        <div className={styles.heroInner}>
          {eyebrow && (
            <span
              className="eyebrow-2 reveal"
              style={dark ? { color: 'var(--dark-subtle)' } : undefined}
            >
              {eyebrow}
            </span>
          )}
          <h1
            className="h1 reveal"
            style={{
              margin: '20px 0 16px',
              letterSpacing: '-0.02em',
              color: dark ? 'var(--cream-2)' : undefined,
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              className="muted reveal"
              style={{
                margin: 0,
                fontSize: 17,
                maxWidth: '54ch',
                lineHeight: 1.65,
                color: dark ? 'var(--dark-muted)' : undefined,
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </header>
  )
}

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  useScrollReveal()
  return (
    <div className={styles.page}>
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  )
}

interface PageCtaProps {
  title: string
  description: string
  primaryLabel?: string
  primaryTo?: string
}

export function PageCta({
  title,
  description,
  primaryLabel = 'Book a call',
  primaryTo = '/book',
}: PageCtaProps) {
  return (
    <section className={styles.ctaBand}>
      <div className="container reveal">
        <h2>{title}</h2>
        <p>{description}</p>
        <Link to={primaryTo} className="btn btn-primary">
          {primaryLabel} <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  )
}

export function BrandJsonLd({ type = 'Organization' }: { type?: 'Organization' | 'WebSite' }) {
  const data =
    type === 'WebSite'
      ? {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: BRAND.name,
          url: BRAND.url,
          description: BRAND.description,
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: BRAND.name,
          url: BRAND.url,
          email: BRAND.email,
          description: BRAND.description,
          foundingDate: BRAND.founded,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Bengaluru',
            addressCountry: 'IN',
          },
        }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
