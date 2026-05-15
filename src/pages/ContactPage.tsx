import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { PageLayout, PageHero, BrandJsonLd } from '../components/PageLayout/PageLayout'
import { usePageMeta } from '../hooks/usePageMeta'
import { BRAND } from '../lib/brand'
import styles from './ContactPage.module.css'
import layout from '../components/PageLayout/PageLayout.module.css'

const CONTACT_REASONS = [
  'Book a discovery call',
  'Pricing question',
  'Partnership inquiry',
  'Press / media',
  'Other',
]

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    reason: CONTACT_REASONS[0],
    message: '',
  })

  usePageMeta({
    title: 'Contact Krionics',
    description: `Contact ${BRAND.name} — ${BRAND.email}. Questions about cold outbound systems, AI voice agents, pricing, or partnerships. We respond within one business day.`,
    path: '/contact',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`[${BRAND.name}] ${form.reason} — ${form.company || form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nReason: ${form.reason}\n\n${form.message}`,
    )
    window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <PageLayout>
      <BrandJsonLd />
      <PageHero
        eyebrow="Contact"
        title="Talk to the team."
        description={`Questions about pipeline systems, pricing, or fit? Reach us at ${BRAND.email} — or use the form below.`}
      />

      <section className={layout.section}>
        <div className="container">
          <div className={styles.grid}>
            <div className="reveal">
              <h2 className="h3" style={{ margin: '0 0 24px', letterSpacing: '-0.01em' }}>
                Direct contact
              </h2>
              <ul className={styles.infoList}>
                <li>
                  <span className={styles.infoLabel}>Email</span>
                  <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
                </li>
                <li>
                  <span className={styles.infoLabel}>Website</span>
                  <a href={BRAND.url} rel="noopener noreferrer">
                    {BRAND.url.replace('https://', '')}
                  </a>
                </li>
                <li>
                  <span className={styles.infoLabel}>Location</span>
                  <span>{BRAND.location} · Remote-first delivery</span>
                </li>
                <li>
                  <span className={styles.infoLabel}>Response time</span>
                  <span>Within 1 business day</span>
                </li>
              </ul>
              <p className="muted" style={{ fontSize: 14, lineHeight: 1.65, marginTop: 32 }}>
                Ready to discuss your pipeline?{' '}
                <Link to="/book" style={{ color: 'var(--primary)' }}>
                  Book a 15-minute call
                </Link>{' '}
                — we read your answers before we meet.
              </p>
            </div>

            <div className="reveal">
              {submitted ? (
                <div className={styles.success}>
                  <h2 className="serif" style={{ fontSize: 28, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
                    Opening your email client…
                  </h2>
                  <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.65 }}>
                    If nothing opened, email us directly at{' '}
                    <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <label className={styles.field}>
                    <span className={styles.label}>Name</span>
                    <input
                      className={styles.input}
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                    />
                  </label>
                  <label className={styles.field}>
                    <span className={styles.label}>Work email</span>
                    <input
                      className={styles.input}
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="you@company.com"
                    />
                  </label>
                  <label className={styles.field}>
                    <span className={styles.label}>Company</span>
                    <input
                      className={styles.input}
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                      placeholder="Company name"
                    />
                  </label>
                  <label className={styles.field}>
                    <span className={styles.label}>Reason</span>
                    <select
                      className={styles.input}
                      value={form.reason}
                      onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
                    >
                      {CONTACT_REASONS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className={styles.field}>
                    <span className={styles.label}>Message</span>
                    <textarea
                      className={styles.textarea}
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Tell us what you are looking for…"
                    />
                  </label>
                  <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                    Send message <span className="arrow">→</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
