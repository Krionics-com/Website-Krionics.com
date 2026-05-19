import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Pricing.module.css'

interface PriceTierProps {
  name: string
  price: string
  sub: string
  bestFor: string
  description: string
  includes: string[]
  recommended?: boolean
}

function PriceTier({ name, price, sub, bestFor, description, includes, recommended = false }: PriceTierProps) {
  return (
    <div className={`${styles.tier} ${recommended ? styles.recommended : ''}`}>
      {recommended && <span className={styles.badge}>RECOMMENDED</span>}
      <span className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', color: recommended ? 'rgba(245,241,232,0.6)' : 'var(--text-2)' }}>{name}</span>
      <div className="serif" style={{ fontSize: 48, lineHeight: 1, letterSpacing: '-0.03em', margin: '14px 0 4px', color: recommended ? 'var(--primary)' : 'var(--text)' }}>
        {price}
      </div>
      <span className="mono" style={{ fontSize: 12, color: recommended ? 'rgba(245,241,232,0.6)' : 'var(--text-2)', letterSpacing: '0.06em' }}>{sub}</span>
      <div style={{ margin: '16px 0 0', padding: '12px 14px', background: recommended ? 'rgba(245,241,232,0.07)' : 'var(--bg-elev)', borderRadius: 4 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: recommended ? 'rgba(245,241,232,0.5)' : 'var(--text-2)', display: 'block', marginBottom: 4 }}>Best for</span>
        <span style={{ fontSize: 13, lineHeight: 1.45, color: recommended ? 'rgba(245,241,232,0.85)' : 'var(--text)' }}>{bestFor}</span>
      </div>
      <p style={{ margin: '16px 0', fontSize: 13.5, lineHeight: 1.6, color: recommended ? 'rgba(245,241,232,0.7)' : 'var(--text-2)' }}>{description}</p>
      <hr style={{ height: 1, background: recommended ? 'rgba(245,241,232,0.18)' : 'var(--border)', border: 0, margin: '20px 0' }} />
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {includes.map((item) => (
          <li key={item} style={{ fontSize: 13, display: 'flex', alignItems: 'flex-start', gap: 10, color: recommended ? 'rgba(245,241,232,0.85)' : 'var(--text)' }}>
            <span style={{ color: 'var(--primary)', fontFamily: 'var(--mono)', fontSize: 11, marginTop: 2, flexShrink: 0 }}>✓</span>
            {item}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 'auto', paddingTop: 28 }}>
        <Link to="/book" className={`btn ${recommended ? 'btn-primary' : 'btn-ghost'}`} style={{ width: '100%', justifyContent: 'center' }}>
          Book a call <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  )
}

type ServiceTab = 'a' | 'b'

const SERVICE_A_TIERS = (
  <>
    <PriceTier
      name="GROWTH"
      price="$2,500"
      sub="/mo + $2,000 setup"
      bestFor="Teams of 1–15 with a proven offer and zero cold outbound today. No SDR, no existing sequences."
      description="Cold email outbound system. Ideal for companies who need a reliable, operated pipeline channel without hiring."
      includes={[
        'Sending infrastructure (domains, inboxes)',
        'ICP list build + verification (monthly)',
        'Sequence writing + A/B testing',
        'Daily operation + deliverability monitoring',
        'Weekly performance reports',
        'Slack access (response same business day)',
        '3-month minimum, then month-to-month',
      ]}
    />
    <PriceTier
      name="SYSTEMATIZE"
      price="$4,500"
      sub="/mo + $5,000 setup"
      bestFor="Growing sales teams ready to go multi-channel. $1M+ ARR, dedicated sales rep, wants unified reporting."
      description="Cold email + LinkedIn outbound. For companies ready to build multi-channel pipeline with unified data and a real dashboard."
      recommended
      includes={[
        'Everything in Growth',
        'LinkedIn outreach (connection + message sequences)',
        'Clay enrichment pipelines (custom triggers)',
        'Multi-channel unified dashboard',
        'Monthly ICP refinement review',
        'CRM sync configuration',
        'Dedicated account lead',
      ]}
    />
    <PriceTier
      name="OUTPACE"
      price="$7,500"
      sub="/mo + $7,500 setup"
      bestFor="Series A+ or $5M+ ARR. Pipeline is a strategic priority — intent data, custom triggers, aggressive volume."
      description="Full pipeline system with intent data, custom signals, and aggressive multi-channel. For companies where pipeline is a strategic priority."
      includes={[
        'Everything in Systematize',
        'Intent data integration (G2, Bombora)',
        'Custom signal tracking (job posts, news, funding)',
        'Parallel sequence architecture',
        'Weekly strategy call',
        'Quarterly system rebuild',
        'Priority SLA',
      ]}
    />
  </>
)

const SERVICE_B_CONTENT = (
  <div className={styles.voiceTier}>
    <span className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', color: 'var(--text-2)' }}>AI VOICE AGENT</span>
    <div className="serif" style={{ fontSize: 48, lineHeight: 1, letterSpacing: '-0.03em', margin: '14px 0 4px' }}>
      $2,000
    </div>
    <span className="mono" style={{ fontSize: 12, color: 'var(--text-2)', letterSpacing: '0.06em' }}>/mo + $7,500 one-time setup</span>

    <div style={{ margin: '24px 0 0', padding: '12px 14px', background: 'var(--bg-elev)', borderRadius: 4 }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-2)', display: 'block', marginBottom: 4 }}>Best for</span>
      <span style={{ fontSize: 13, lineHeight: 1.45, color: 'var(--text)' }}>Teams receiving inbound leads but losing them on calls — no coverage, slow follow-up, or missed qualification.</span>
    </div>
    <p style={{ margin: '16px 0', fontSize: 15, lineHeight: 1.6, color: 'var(--text-2)' }}>
      We build and operate a voice agent that handles inbound calls 24/7 — qualifies leads against your ICP, answers objections from a custom script, and books directly into your calendar. CRM integration included.
    </p>

    <hr style={{ height: 1, background: 'var(--border)', border: 0, margin: '24px 0' }} />

    <div className={styles.voiceGrid}>
      <div>
        <span className={styles.voiceColTitle}>What's included</span>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            'Call-flow workshop + script development',
            'Vapi agent with 5–10 call path variations',
            '24/7 inbound coverage — no voicemail gaps',
            'ElevenLabs voice (your choice of voice profile)',
            'Twilio number provisioning + routing',
          ].map((item) => (
            <li key={item} style={{ fontSize: 13, display: 'flex', alignItems: 'flex-start', gap: 10, color: 'var(--text)' }}>
              <span style={{ color: 'var(--primary)', fontFamily: 'var(--mono)', fontSize: 11, marginTop: 2, flexShrink: 0 }}>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <span className={styles.voiceColTitle}>Post-launch</span>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            'CRM integration + lead qualification tagging',
            'Direct calendar booking (Calendly / Cal.com)',
            'Post-call follow-up automation via n8n',
            '30-day hypercare window post-launch',
          ].map((item) => (
            <li key={item} style={{ fontSize: 13, display: 'flex', alignItems: 'flex-start', gap: 10, color: 'var(--text)' }}>
              <span style={{ color: 'var(--primary)', fontFamily: 'var(--mono)', fontSize: 11, marginTop: 2, flexShrink: 0 }}>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 24 }}>
      {['Vapi', 'ElevenLabs', 'Twilio', 'Claude Sonnet', 'n8n'].map((t) => (
        <span key={t} style={{
          fontFamily: 'var(--mono)', fontSize: 11, padding: '4px 10px',
          background: 'var(--bg-elev)', border: '1px solid var(--border)',
          borderRadius: 3, letterSpacing: '0.06em', color: 'var(--text-2)',
        }}>{t}</span>
      ))}
    </div>

    <div style={{ marginTop: 28 }}>
      <Link to="/book" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
        Book a call <span className="arrow">→</span>
      </Link>
    </div>
  </div>
)

export function Pricing() {
  const [activeTab, setActiveTab] = useState<ServiceTab>('a')

  return (
    <section id="pricing" style={{ paddingTop: 140 }}>
      <div className="container">
        <div style={{ marginBottom: 40 }}>
          <span className="eyebrow-2 reveal">08 / Pricing</span>
          <h2 className="h1 reveal" style={{ margin: '20px 0 16px', maxWidth: '22ch', letterSpacing: '-0.02em' }}>
            {activeTab === 'a' ? (
              <>Three tiers. Published. <em style={{ fontStyle: 'italic' }}>No surprises.</em></>
            ) : (
              <>One system. One price. <em style={{ fontStyle: 'italic' }}>No surprises.</em></>
            )}
          </h2>
          <p className="muted reveal" style={{ margin: 0, fontSize: 17, maxWidth: '54ch' }}>
            All plans include infrastructure, tools, data, and operating time. There is no "minimum spend" footnote.
          </p>
        </div>

        <div className={`reveal ${styles.tabBar}`}>
          <button
            className={`${styles.tab} ${activeTab === 'a' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('a')}
          >
            <span className={styles.tabLabel}>Service A</span>
            <span className={styles.tabName}>AI Cold Outbound System</span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'b' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('b')}
          >
            <span className={styles.tabLabel}>Service B</span>
            <span className={styles.tabName}>AI Voice Agent</span>
          </button>
        </div>

        {activeTab === 'a' ? (
          <div className={`reveal ${styles.grid}`}>
            {SERVICE_A_TIERS}
          </div>
        ) : (
          <div className="reveal">
            {SERVICE_B_CONTENT}
          </div>
        )}

        <p className="sidenote reveal" style={{ marginTop: 28, maxWidth: '60ch' }}>
          Early clients (first 5 active accounts) book at rates below the above — ask about availability on the call. All pricing is in USD. Setup is one-time.
        </p>
      </div>
    </section>
  )
}
