import { Link } from 'react-router-dom'
import { Founders } from '../components/Founders/Founders'
import { PageLayout, PageHero, PageCta, BrandJsonLd } from '../components/PageLayout/PageLayout'
import { usePageMeta } from '../hooks/usePageMeta'
import { BRAND } from '../lib/brand'
import styles from '../components/PageLayout/PageLayout.module.css'

const VALUES = [
  {
    title: 'Systems over campaigns',
    body: 'We build infrastructure that runs daily — domains, inboxes, lists, sequences, and reporting — not one-off sends that stop when the contract ends.',
  },
  {
    title: 'Transparency by default',
    body: 'You see every domain, inbox, and sequence we run. Your dashboard goes live on day 15. Bad news arrives the same week it happens.',
  },
  {
    title: 'You own what we build',
    body: 'Domains, prospect data, sequences, and automation stay yours. If you leave, we hand everything over — no hostage data.',
  },
  {
    title: 'Honest fit assessment',
    body: 'We tell you when your ICP is wrong, when outbound is not the right channel, or when your offer needs work before we build anything.',
  },
]

export function AboutPage() {
  usePageMeta({
    title: 'About Krionics — B2B pipeline systems',
    description: `${BRAND.description} Learn who builds and operates your outbound system — a three-person team in Bengaluru, remote-first delivery.`,
    path: '/about',
  })

  return (
    <PageLayout>
      <BrandJsonLd />
      <PageHero
        eyebrow="About"
        title={
          <>
            We build pipeline systems.<br />
            <em style={{ fontStyle: 'italic' }}>We run them too.</em>
          </>
        }
        description={`${BRAND.name} is a B2B pipeline agency based in ${BRAND.location}. We design, build, and operate AI-powered cold outbound and voice agent systems for teams that need qualified meetings — not another tool subscription.`}
      />

      <section className={styles.section}>
        <div className="container">
          <div className={`${styles.prose} reveal`}>
            <p>
              Most B2B teams know they need outbound. Few have the time to warm domains, verify lists, write sequences,
              monitor deliverability, and route replies — while also running sales. That gap is why {BRAND.name} exists.
            </p>
            <p>
              We are not a lead-gen shop that sells lists. We are operators: the same people on your kickoff call build
              your infrastructure, write your copy, and optimize your system every month. No account managers. No offshore
              handoffs.
            </p>
            <p>
              Founded in {BRAND.founded}, we work with B2B companies from early-stage SaaS to Series A+ — primarily in the US
              and Europe, delivered remotely from Bengaluru. Typical engagement: live system in 14 days, 3-month minimum,
              then month-to-month.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className="container">
          <span className="eyebrow-2 reveal">What we believe</span>
          <h2 className="h2 reveal" style={{ margin: '20px 0 48px', letterSpacing: '-0.02em', maxWidth: '28ch' }}>
            Principles that shape every build.
          </h2>
          <div className={styles.grid2}>
            {VALUES.map((v) => (
              <div key={v.title} className="reveal card" style={{ padding: 28 }}>
                <h3 className="h3" style={{ margin: '0 0 12px', letterSpacing: '-0.01em' }}>
                  {v.title}
                </h3>
                <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.65 }}>
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Founders />

      <section className={styles.section}>
        <div className="container reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
          <p className="muted" style={{ margin: 0, flex: 1, minWidth: 200 }}>
            Want the full picture? Read how we work on the homepage — or book a call.
          </p>
          <Link to="/#approach" className="btn btn-ghost">
            Our approach
          </Link>
          <Link to="/book" className="btn btn-primary">
            Book a call <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      <PageCta
        title="Ready to see if we are a fit?"
        description="15-minute call. We diagnose your ICP, stack, and timeline — and tell you honestly whether outbound is the right move."
      />
    </PageLayout>
  )
}
