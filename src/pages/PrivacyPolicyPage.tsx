import { Link } from 'react-router-dom'
import { PageLayout, PageHero } from '../components/PageLayout/PageLayout'
import { usePageMeta } from '../hooks/usePageMeta'
import { BRAND } from '../lib/brand'
import layout from '../components/PageLayout/PageLayout.module.css'

const LAST_UPDATED = 'May 15, 2026'

export function PrivacyPolicyPage() {
  usePageMeta({
    title: 'Privacy Policy',
    description: `${BRAND.name} privacy policy — how we collect, use, and protect personal data when you visit ${BRAND.url}, book a call, or use our services.`,
    path: '/privacy-policy',
  })

  return (
    <PageLayout>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`How ${BRAND.name} (${BRAND.url}) handles your personal information. Last updated: ${LAST_UPDATED}.`}
      />

      <section className={layout.section}>
        <div className="container">
          <article className={`${layout.prose} reveal`}>
            <p>
              This Privacy Policy describes how {BRAND.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects,
              uses, and shares information when you visit {BRAND.url}, use our website chat widget, book a discovery call,
              or engage our B2B pipeline services.
            </p>

            <h2>1. Who we are</h2>
            <p>
              {BRAND.name} is a B2B pipeline agency based in {BRAND.location}. We build and operate cold outbound systems
              and AI voice agents for business clients. For privacy-related questions, contact us at{' '}
              <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.
            </p>

            <h2>2. Information we collect</h2>
            <h3>Information you provide</h3>
            <ul>
              <li>Name, work email, company name, role, and website when you book a call or contact us</li>
              <li>Messages you send through our contact form, chat widget, or email</li>
              <li>Scheduling preferences and diagnostic answers submitted during booking</li>
            </ul>
            <h3>Information collected automatically</h3>
            <ul>
              <li>Device type, browser type, IP address, and general location (country/region)</li>
              <li>Pages visited, time on page, and referral source</li>
              <li>Cookie and similar technology data as described below</li>
            </ul>
            <h3>Client service data</h3>
            <p>
              When you become a client, we may process business contact data, CRM records, and campaign performance data
              on your behalf as part of delivering outbound services. That processing is governed by our service agreement
              with you.
            </p>

            <h2>3. How we use your information</h2>
            <ul>
              <li>Respond to inquiries and schedule discovery calls</li>
              <li>Deliver, operate, and improve our pipeline systems and website</li>
              <li>Send service-related communications (not unsolicited marketing without consent)</li>
              <li>Analyze site usage to improve content and user experience</li>
              <li>Comply with legal obligations and protect our rights</li>
            </ul>

            <h2>4. Legal bases (EEA/UK visitors)</h2>
            <p>
              Where GDPR applies, we process personal data based on: (a) consent (e.g., contact form submission); (b)
              contract performance (client engagements); (c) legitimate interests (site analytics, security, B2B
              outreach to prospects who have a business need for our services); or (d) legal obligation.
            </p>

            <h2>5. How we share information</h2>
            <p>We do not sell your personal information. We may share data with:</p>
            <ul>
              <li>
                <strong>Service providers</strong> — hosting (e.g., Firebase/Google Cloud), analytics, email, scheduling,
                CRM, and AI inference providers used to operate our website and services
              </li>
              <li>
                <strong>Professional advisors</strong> — lawyers or accountants when required
              </li>
              <li>
                <strong>Legal requirements</strong> — when required by law or to protect rights and safety
              </li>
            </ul>
            <p>
              Providers are bound by contractual obligations to protect data and use it only for the services they provide
              to us.
            </p>

            <h2>6. Cookies and analytics</h2>
            <p>
              We may use cookies and similar technologies to remember preferences, measure traffic, and understand how
              visitors use {BRAND.url}. You can control cookies through your browser settings. Disabling cookies may affect
              certain site features.
            </p>

            <h2>7. Data retention</h2>
            <p>
              We retain contact and booking information for as long as needed to respond to inquiries, maintain business
              records, or as required by law. Client operational data is retained per our service agreement and deleted or
              returned upon contract end, per our handoff process.
            </p>

            <h2>8. Your rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access, correct, or delete your personal data</li>
              <li>Object to or restrict certain processing</li>
              <li>Data portability (where applicable)</li>
              <li>Withdraw consent where processing is consent-based</li>
              <li>Lodge a complaint with a supervisory authority (EEA/UK)</li>
            </ul>
            <p>
              California residents may have additional rights under the CCPA/CPRA, including the right to know, delete, and
              opt out of certain sharing. We do not sell personal information as defined under California law.
            </p>
            <p>
              To exercise your rights, email <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>. We will respond within
              the timeframe required by applicable law.
            </p>

            <h2>9. International transfers</h2>
            <p>
              {BRAND.name} is based in India and serves clients globally. Your information may be processed in India, the
              United States, or other countries where our service providers operate. We take steps to ensure appropriate
              safeguards for cross-border transfers where required.
            </p>

            <h2>10. Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect personal data. No method of
              transmission over the internet is 100% secure; we cannot guarantee absolute security.
            </p>

            <h2>11. Children</h2>
            <p>
              Our services are directed at businesses and professionals. We do not knowingly collect personal information
              from anyone under 16.
            </p>

            <h2>12. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will post the revised version on this page with an
              updated &quot;Last updated&quot; date. Material changes may be communicated via email or site notice where
              appropriate.
            </p>

            <h2>13. Contact</h2>
            <p>
              {BRAND.name}<br />
              Email: <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              <br />
              Web: <a href={BRAND.url}>{BRAND.url}</a>
            </p>
            <p style={{ marginTop: 32 }}>
              See also our <Link to="/terms">Terms of Service</Link>.
            </p>
          </article>
        </div>
      </section>
    </PageLayout>
  )
}
