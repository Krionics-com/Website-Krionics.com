import { Link } from 'react-router-dom'
import { PageLayout, PageHero } from '../components/PageLayout/PageLayout'
import { usePageMeta } from '../hooks/usePageMeta'
import { BRAND } from '../lib/brand'
import layout from '../components/PageLayout/PageLayout.module.css'

const LAST_UPDATED = 'May 15, 2026'

export function TermsPage() {
  usePageMeta({
    title: 'Terms of Service',
    description: `Terms of Service for ${BRAND.name} (${BRAND.url}) — website use, service engagements, intellectual property, and limitations of liability.`,
    path: '/terms',
  })

  return (
    <PageLayout>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description={`Terms governing use of ${BRAND.url} and ${BRAND.name} services. Last updated: ${LAST_UPDATED}.`}
      />

      <section className={layout.section}>
        <div className="container">
          <article className={`${layout.prose} reveal`}>
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your access to and use of {BRAND.url} and related services
              offered by {BRAND.name} (&quot;Krionics,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By
              accessing our website or engaging our services, you agree to these Terms.
            </p>

            <h2>1. Services</h2>
            <p>
              Krionics provides B2B pipeline systems, including cold outbound infrastructure, list building, sequence
              operation, AI voice agents, and related consulting. Specific deliverables, fees, timelines, and minimum
              commitments are defined in a separate proposal, statement of work, or service agreement (&quot;Service
              Agreement&quot;) signed or accepted by you. If there is a conflict between these Terms and a Service
              Agreement, the Service Agreement controls for that engagement.
            </p>

            <h2>2. Eligibility</h2>
            <p>
              Our services are intended for businesses and individuals acting in a professional capacity. You represent
              that you have authority to bind your organization to these Terms where applicable.
            </p>

            <h2>3. Website use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the site for unlawful purposes or in violation of applicable regulations</li>
              <li>Attempt to gain unauthorized access to our systems or data</li>
              <li>Scrape, crawl, or harvest content at scale without written permission</li>
              <li>Interfere with site security or performance</li>
              <li>Misrepresent your identity or affiliation</li>
            </ul>

            <h2>4. Bookings and communications</h2>
            <p>
              Submitting a booking form or contact request does not create a client relationship or obligation to provide
              services. We reserve the right to decline engagements that are not a fit. Information you submit must be
              accurate to the best of your knowledge.
            </p>

            <h2>5. Fees and payment</h2>
            <p>
              Published pricing on {BRAND.url} is indicative and may change. Binding fees are those in your Service
              Agreement. Setup fees and monthly retainers are due per the payment schedule in your agreement. Late
              payments may result in paused service after notice.
            </p>

            <h2>6. Client responsibilities</h2>
            <p>When engaged as a client, you agree to:</p>
            <ul>
              <li>Provide timely access to domains, tools, CRM, and brand assets needed for delivery</li>
              <li>Ensure you have rights to data you supply for outreach</li>
              <li>Comply with applicable laws governing email, telemarketing, and data protection in your markets</li>
              <li>Review and approve sequences and messaging before launch where specified</li>
            </ul>

            <h2>7. Intellectual property</h2>
            <p>
              We retain ownership of our pre-existing methodologies, templates, and tools. Upon full payment, clients
              receive ownership or license to deliverables specified in the Service Agreement — typically including
              domains, prospect data, sequences, and automation configurations built for your account, as stated in our
              standard handoff policy.
            </p>
            <p>
              You may not copy, resell, or white-label Krionics proprietary systems without written consent. Our name,
              logo, and website content remain our intellectual property.
            </p>

            <h2>8. Confidentiality</h2>
            <p>
              Each party may receive confidential business information from the other. Both parties agree to use such
              information only to perform under the Service Agreement and to protect it with reasonable care.
            </p>

            <h2>9. Disclaimers</h2>
            <p>
              Pipeline results depend on your offer, market, ICP, and sales process. We do not guarantee a specific number
              of meetings, replies, or revenue. THE WEBSITE AND SERVICES ARE PROVIDED &quot;AS IS&quot; TO THE MAXIMUM
              EXTENT PERMITTED BY LAW. WE DISCLAIM WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
              NON-INFRINGEMENT.
            </p>

            <h2>10. Limitation of liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, KRIONICS SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR LOST PROFITS OR REVENUE. OUR TOTAL LIABILITY FOR ANY CLAIM ARISING
              FROM THESE TERMS OR THE SERVICES SHALL NOT EXCEED THE FEES PAID BY YOU TO KRIONICS IN THE THREE (3) MONTHS
              PRECEDING THE CLAIM.
            </p>

            <h2>11. Indemnification</h2>
            <p>
              You agree to indemnify Krionics against claims arising from your breach of these Terms, your data or content,
              or your violation of applicable outreach and privacy laws — except to the extent caused by our gross
              negligence or willful misconduct.
            </p>

            <h2>12. Term and termination</h2>
            <p>
              Website access may be suspended for violations of these Terms. Service engagements terminate per your
              Service Agreement, including notice periods for month-to-month arrangements after any minimum term.
            </p>

            <h2>13. Governing law</h2>
            <p>
              These Terms are governed by the laws of India, without regard to conflict-of-law principles. Disputes shall
              be subject to the exclusive jurisdiction of courts in Bengaluru, Karnataka, unless otherwise agreed in a
              Service Agreement.
            </p>

            <h2>14. Changes</h2>
            <p>
              We may update these Terms by posting a revised version on {BRAND.url}. Continued use of the site after
              changes constitutes acceptance. Material changes to active Service Agreements require mutual agreement unless
              required by law.
            </p>

            <h2>15. Contact</h2>
            <p>
              {BRAND.name}<br />
              Email: <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              <br />
              Web: <a href={BRAND.url}>{BRAND.url}</a>
            </p>
            <p style={{ marginTop: 32 }}>
              See also our <Link to="/privacy-policy">Privacy Policy</Link>.
            </p>
          </article>
        </div>
      </section>
    </PageLayout>
  )
}
