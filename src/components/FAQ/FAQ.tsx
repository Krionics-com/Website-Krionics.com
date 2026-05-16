import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './FAQ.module.css'

interface FAQItemProps {
  q: string
  a: React.ReactNode
}

function FAQItem({ q, a }: FAQItemProps) {
  const [open, setOpen] = useState(false)
  const id = q.replace(/\s+/g, '-').toLowerCase().slice(0, 32)
  return (
    <div className={styles.item}>
      <button
        className={styles.question}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`faq-${id}`}
      >
        <span>{q}</span>
        <span className={styles.icon} aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <div id={`faq-${id}`} role="region" hidden={!open} className={styles.answer}>
        {a}
      </div>
    </div>
  )
}

export function FAQ() {
  return (
    <section id="faq" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="container">
        <div style={{ marginBottom: 56 }}>
          <span className="eyebrow-2 reveal">09 / Objections</span>
          <h2 className="h1 reveal" style={{ margin: '20px 0 16px', maxWidth: '22ch', letterSpacing: '-0.02em' }}>
            Questions we actually get.
          </h2>
        </div>

        <div className={`reveal ${styles.list}`}>
          <FAQItem
            q="Is this really 30–50% cheaper than hiring an SDR?"
            a={
              <p>
                Yes. An SDR fully loaded — salary, benefits, tools, manager time — runs $5,000–$8,000/month in the US. They take 3 months to ramp. Average tenure is 11 months. We're at $2,500/month from day 14. No ramp, no turnover, no severance conversation.
              </p>
            }
          />
          <FAQItem
            q="We've tried cold email before and it didn't work."
            a={
              <p>
                What specifically broke — deliverability, list quality, message, or volume? Almost every cold email failure traces to one of those four. We diagnose which before we build. If your offer genuinely doesn't have product-market fit, we'll tell you on the call rather than take the retainer.
              </p>
            }
          />
          <FAQItem
            q="Can you guarantee a specific number of meetings?"
            a={
              <p>
                Honest answer: no. Any agency that does is lying. Booked meetings depend on your offer, your ICP, and your market. What we guarantee: the system runs every day, deliverability is monitored, sequences are optimized weekly, and you see everything in a live dashboard. Month-to-month after the minimum means we earn the renewal every month.
              </p>
            }
          />
          <FAQItem
            q="Why would I trust an agency based in India?"
            a={
              <p>
                Three things to evaluate us on, in this order: communication quality (you're seeing it now), delivery quality (we'll show you a live system on the call), time-zone overlap (we cover US mornings). Geography only changes the timezone — and the price, which is why you're roughly 30% below what a US agency would charge for the same output.
              </p>
            }
          />
          <FAQItem
            q="We're not ready right now — maybe Q3."
            a={
              <p>
                What changes between now and Q3? Most "not now" situations are the same problem in 3 months, just bigger. If there's a specific reason — budget cycle, headcount, product launch — tell us and we'll plan around it. If it's uncertainty, book the call. We won't pitch you if the timing is wrong.
              </p>
            }
          />
          <FAQItem
            q="How does this integrate with our CRM?"
            a={
              <p>
                We configure n8n automations to route qualified replies and booked meetings directly into your CRM — tagged by status, sequence, and ICP tier. We've integrated with HubSpot, Salesforce, and Pipedrive. If you're on something else, tell us on the call and we'll confirm compatibility before you sign. CRM sync is included in Systematize and Outpace; Growth clients get basic Calendly routing.
              </p>
            }
          />
          <FAQItem
            q="What happens to my infrastructure if I cancel?"
            a={
              <p>
                You own it. The domains are registered in your name. The inboxes are yours. The Apollo account is yours. The sequences, the lists, the data — all yours. We build infrastructure you keep, not infrastructure that locks you into paying us. If you leave after month 3, you can operate the machine yourself or hand it to another operator.
              </p>
            }
          />
        </div>

        <div className="reveal" style={{ marginTop: 48, padding: '32px 36px', background: 'var(--bg-elev)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <p className="serif" style={{ fontSize: 20, margin: 0, letterSpacing: '-0.01em' }}>Still have a specific question?</p>
            <p className="muted" style={{ margin: '6px 0 0', fontSize: 14 }}>Bring it to the call. We won't pitch you — we'll answer it.</p>
          </div>
          <Link to="/book" className="btn btn-primary">
            Book a call <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
