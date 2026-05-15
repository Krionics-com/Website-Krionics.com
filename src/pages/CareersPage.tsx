import { useState } from 'react'
import { PageLayout, PageHero, PageCta, BrandJsonLd } from '../components/PageLayout/PageLayout'
import { usePageMeta } from '../hooks/usePageMeta'
import { BRAND } from '../lib/brand'
import styles from './CareersPage.module.css'

type JobRole = {
  id: string
  title: string
  location: string
  type: string
  summary: string
  responsibilities: string[]
  requirements: string[]
}

const ROLES: JobRole[] = [
  {
    id: 'outbound-operator',
    title: 'Outbound Operations Operator',
    location: 'Bengaluru · Remote-first',
    type: 'Full-time',
    summary:
      'Own the day-to-day of pipeline systems: deliverability monitoring, sequence iteration, and reply routing — with clear feedback loops to the team.',
    responsibilities: [
      'Monitor deliverability daily (bounces, placements, spam signals) and act fast when signals shift.',
      'Iterate sequences based on reply and engagement data (opening lines, segmentation, timing).',
      'Validate list quality before sending (verification, enrichment, segmentation).',
      'Route positive replies to CRM and calendar through reliable automation.',
      'Document changes so clients can see what is live and what changed.',
    ],
    requirements: [
      'Strong written communication and attention to detail.',
      'Experience with cold email operations or comparable outbound workflows.',
      'Comfort working with toolchains (Apollo/Clay/Instantly/n8n or similar) and troubleshooting them.',
      'A bias for building systems over chasing “campaign” outcomes.',
    ],
  },
  {
    id: 'voice-agent-operator',
    title: 'Voice Agent Operator',
    location: 'Remote-first',
    type: 'Contract → Full-time (based on fit)',
    summary:
      'Build and operate inbound qualification voice agents using client scripts, branching call flows, and reliable booking behavior.',
    responsibilities: [
      'Translate scripts into call flows with clear success and fallback paths.',
      'Set up agent behavior in Vapi and integrate routing via Twilio where needed.',
      'Work with ElevenLabs voice profiles to keep responses natural and consistent.',
      'Validate lead qualification accuracy and adjust prompts and logic from call outcomes.',
      'Coordinate post-call follow-up automation with the team.',
    ],
    requirements: [
      'Experience designing conversational flows or qualifying conversations.',
      'Comfort with prompt writing and structured branching logic.',
      'Ability to learn and operate Vapi/Twilio/ElevenLabs-style toolchains.',
      'A practical mindset: reduce failure points, keep the agent consistent, and iterate quickly.',
    ],
  },
  {
    id: 'frontend-content-builder',
    title: 'Web Content & Frontend Builder',
    location: 'Remote-first',
    type: 'Part-time (8–15 hours/week) · Contract',
    summary:
      'Help turn pipeline expertise into high-converting pages: landing pages, blog articles, and SEO-friendly structure that stays on-brand.',
    responsibilities: [
      'Write and refine content blocks with clear headings, sections, and internal linking.',
      'Maintain consistent branding (Krionics voice, typography, and component patterns).',
      'Implement new routes and pages in the codebase when needed.',
      'Improve on-page SEO basics: titles, meta descriptions, and content structure.',
      'Ship updates quickly, test in production, and iterate based on performance.',
    ],
    requirements: [
      'Good writing in an operator tone: direct, practical, and specific.',
      'Comfort with React and CSS Modules or equivalent frontend patterns.',
      'Basic SEO knowledge: information hierarchy, internal links, and crawlable HTML.',
      'A clean handoff mindset — you document changes clearly for the team.',
    ],
  },
]

export function CareersPage() {
  usePageMeta({
    title: 'Careers — Build pipeline systems',
    description: `Careers at ${BRAND.name}. We are a Bengaluru-based, remote-first team that builds and operates cold outbound and AI voice agents.`,
    path: '/careers',
  })

  const [selected, setSelected] = useState<null | JobRole>(null)

  return (
    <PageLayout>
      <BrandJsonLd />
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Build systems that<br />
            actually run.
          </>
        }
        description={`Krionics is an operator-first B2B pipeline team based in ${BRAND.location}. We build and operate cold outbound systems and AI voice agents — and we hire people who care about reliability, clarity, and results.`}
      />

      <section className={styles.sectionAlt}>
        <div className="container">
          <div className={`${styles.intro} reveal`}>
            <h2 className="h2 reveal" style={{ margin: '0 0 14px', letterSpacing: '-0.02em' }}>
              What we look for
            </h2>
            <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.7, maxWidth: '70ch' }}>
              We do not hire “resource collectors” or people who only optimize headlines. We hire operators who can
              measure outcomes, find failure points, and ship fixes fast — while keeping the system readable for
              clients.
            </p>
          </div>

          <div className={styles.grid}>
            {ROLES.map((role) => (
              <button
                key={role.id}
                className={`${styles.roleCard} reveal ${selected?.id === role.id ? styles.roleCardActive : ''}`}
                onClick={() => setSelected(role)}
                type="button"
              >
                <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary)' }}>
                  {role.type}
                </span>
                <h3 className="h3" style={{ margin: '10px 0 10px', letterSpacing: '-0.01em' }}>
                  {role.title}
                </h3>
                <p className="muted" style={{ margin: 0, fontSize: 14, lineHeight: 1.7 }}>
                  {role.summary}
                </p>
                <div className={styles.metaRow}>
                  <span className={styles.dot} />
                  <span className="mono" style={{ fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.08em' }}>
                    {role.location}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <section className={styles.section}>
          <div className="container">
            <div className={`${styles.detail} reveal`}>
              <div className={styles.detailHeader}>
                <div>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--primary)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    Role details
                  </span>
                  <h2 className="h1" style={{ fontSize: 36, margin: '14px 0 10px', letterSpacing: '-0.02em' }}>
                    {selected.title}
                  </h2>
                </div>
                <button className={styles.closeBtn} type="button" onClick={() => setSelected(null)} aria-label="Close role details">
                  Close
                </button>
              </div>

              <div className={styles.detailGrid}>
                <div>
                  <h3 className="h3" style={{ margin: '0 0 12px', letterSpacing: '-0.01em' }}>
                    Responsibilities
                  </h3>
                  <ul className={styles.list}>
                    {selected.responsibilities.map((r) => (
                      <li key={r}>
                        <span className={styles.check} aria-hidden>
                          ✓
                        </span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="h3" style={{ margin: '0 0 12px', letterSpacing: '-0.01em' }}>
                    Requirements
                  </h3>
                  <ul className={styles.list}>
                    {selected.requirements.map((r) => (
                      <li key={r}>
                        <span className={styles.check} aria-hidden style={{ color: 'var(--text-2)' }}>
                          —
                        </span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.applyBand}>
                <div className={styles.applyLeft}>
                  <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,241,232,0.5)' }}>
                    Apply
                  </span>
                  <p style={{ margin: '10px 0 0', color: 'rgba(245,241,232,0.85)', lineHeight: 1.7, fontSize: 15, maxWidth: '60ch' }}>
                    Email your resume and a short note about what you built (and what you improved) to{' '}
                    <a href={`mailto:${BRAND.email}`} style={{ color: 'var(--cream-2)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                      {BRAND.email}
                    </a>
                    . Include the role title in the subject line.
                  </p>
                </div>
                <div className={styles.applyRight}>
                  <a href={`mailto:${BRAND.email}?subject=${encodeURIComponent(`Krionics — ${selected.title} (Resume)`)}`} className="btn btn-primary">
                    Send email <span className="arrow">→</span>
                  </a>
                  <p style={{ margin: '10px 0 0', color: 'rgba(245,241,232,0.6)', fontSize: 13, lineHeight: 1.6 }}>
                    We review applications weekly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <PageCta
        title="Not sure which role fits?"
        description="Send a note anyway. If your strengths match our system-building mindset, we will point you to the right track."
        primaryLabel="Book a call"
        primaryTo="/book"
      />
    </PageLayout>
  )
}

