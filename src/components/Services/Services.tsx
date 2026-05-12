import styles from './Services.module.css'

interface ServiceCardProps {
  n: string
  name: string
  headline: string
  body: string
  tools: string[]
  deliverables: string[]
  setup: string
  monthly: string
}

function ServiceCard({ n, name, headline, body, tools, deliverables, setup, monthly }: ServiceCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <span className="num-marker">{n}</span>
        <span className={styles.serviceName}>{name}</span>
      </div>
      <h3 className="h2" style={{ margin: '20px 0 14px', letterSpacing: '-0.02em' }}>{headline}</h3>
      <p className="muted" style={{ fontSize: 15, lineHeight: 1.65, marginBottom: 20 }}>{body}</p>

      <div className={styles.tools}>
        {tools.map((t) => (
          <span key={t} className={styles.toolChip}>{t}</span>
        ))}
      </div>

      <hr style={{ height: 1, background: 'var(--border)', border: 0, margin: '24px 0' }} />

      <ul className={styles.deliverables}>
        {deliverables.map((d) => (
          <li key={d} className={styles.deliverableItem}>
            <span className={styles.check}>✓</span>
            <span>{d}</span>
          </li>
        ))}
      </ul>

      <div className={styles.pricing}>
        <div>
          <span className={styles.priceLabel}>Setup</span>
          <div className="serif" style={{ fontSize: 30, lineHeight: 1, marginTop: 4, letterSpacing: '-0.02em' }}>{setup}</div>
        </div>
        <div>
          <span className={styles.priceLabel}>Monthly</span>
          <div className="serif" style={{ fontSize: 30, lineHeight: 1, marginTop: 4, letterSpacing: '-0.02em', color: 'var(--primary)' }}>{monthly}</div>
        </div>
      </div>
    </div>
  )
}

export function Services() {
  return (
    <section id="services" style={{ paddingTop: 96 }}>
      <div className="container">
        <div style={{ marginBottom: 56 }}>
          <span className="eyebrow-2 reveal">03 / What we build</span>
          <h2 className="h1 reveal" style={{ margin: '20px 0 16px', maxWidth: '24ch', letterSpacing: '-0.02em' }}>
            Two systems.<br />One outcome: <em style={{ fontStyle: 'italic' }}>pipeline.</em>
          </h2>
          <p className="muted reveal" style={{ margin: 0, fontSize: 17, maxWidth: '54ch' }}>
            We don't do campaigns. We build the infrastructure and run it — daily. Pick the system that fits your stage.
          </p>
        </div>

        <div className={`reveal ${styles.grid}`}>
          <ServiceCard
            n="i"
            name="SERVICE A — AI Cold Outbound"
            headline="Precision cold email at scale"
            body="We build your sending infrastructure, source and verify prospect lists, write and test sequences, monitor deliverability daily, and hand you qualified meetings. You get the machine — and we run it."
            tools={['Apollo', 'Clay', 'Instantly', 'Claude API', 'n8n', 'LinkedIn Sales Navigator']}
            deliverables={[
              'ICP definition + account tier mapping',
              '1,500–3,000 verified contacts/month',
              '5 dedicated inboxes with 14-day warmup',
              'Claude API personalization layer per contact',
              '3-step sequence + subject line A/B tests',
              'n8n automation for CRM routing + Calendly handoff',
              'Live reporting dashboard from day 15',
              'Monthly list and sequence performance review',
            ]}
            setup="$2,000"
            monthly="$2,500"
          />
          <ServiceCard
            n="ii"
            name="SERVICE B — AI Voice Agent"
            headline="Inbound qualification + appointment booking"
            body="We build and operate a voice agent that handles inbound calls 24/7 — qualifies leads against your ICP, answers objections from a custom script, and books directly into your calendar. CRM integration included."
            tools={['Vapi', 'ElevenLabs', 'Twilio', 'Claude Sonnet', 'n8n']}
            deliverables={[
              'Call-flow workshop + script development',
              'Vapi agent with 5–10 call path variations',
              '24/7 inbound coverage — no voicemail gaps',
              'ElevenLabs voice (your choice of voice profile)',
              'Twilio number provisioning + routing',
              'CRM integration + lead qualification tagging',
              'Direct calendar booking (Calendly / Cal.com)',
              'Post-call follow-up automation via n8n',
              '30-day hypercare window post-launch',
            ]}
            setup="$7,500"
            monthly="$2,000"
          />
        </div>

        <div className="reveal" style={{ marginTop: 36, padding: '20px 24px', background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p className="muted" style={{ margin: 0, fontSize: 14, maxWidth: '52ch' }}>
            All tools, sending infrastructure, domains, and inboxes are <strong style={{ color: 'var(--text)' }}>included in the monthly fee</strong>. No surprise add-ons. No discovery calls to find out the price.
          </p>
          <span className="mono" style={{ fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.08em', flexShrink: 0 }}>PUBLISHED PRICING. NO DANCE.</span>
        </div>
      </div>
    </section>
  )
}
