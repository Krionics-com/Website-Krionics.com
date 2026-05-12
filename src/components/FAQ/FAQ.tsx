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
    <section id="faq" style={{ paddingTop: 140, paddingBottom: 120 }}>
      <div className="container">
        <div style={{ marginBottom: 56 }}>
          <span className="eyebrow-2 reveal">09 / Objections</span>
          <h2 className="h1 reveal" style={{ margin: '20px 0 16px', maxWidth: '22ch', letterSpacing: '-0.02em' }}>
            Questions we actually get.
          </h2>
        </div>

        <div className={`reveal ${styles.list}`}>
          <FAQItem
            q="What if I'm not ready to pay full price yet?"
            a={
              <p>
                We're taking on early clients at a rate meaningfully below what you see on the pricing page. We want 5 accounts we can point to publicly — logos, results, testimonials. In exchange for being an early reference, you get a discount we won't offer once those 5 spots are filled. Ask on the call whether there's still availability. We'll tell you straight.
              </p>
            }
          />
          <FAQItem
            q="How is this different from the agencies that already cold-emailed me?"
            a={
              <p>
                Most agencies sell you a retainer and treat your account as one of 40. We operate a smaller book on purpose — you get a named account lead, a live dashboard, and weekly data. The other difference: we publish our pricing. If they won't quote you without three calls, you already know something.
              </p>
            }
          />
          <FAQItem
            q="What results can I realistically expect, and when?"
            a={
              <>
                <p>Infrastructure and list build takes 14 days. You'll see first sends in week 3. Meaningful reply data by week 6–8. Booked meetings typically start appearing at week 4–6 depending on your ICP and offer clarity.</p>
                <p style={{ marginTop: 12 }}>We don't promise a specific number of meetings — that depends on your offer, your market, and your ICP quality. What we do promise: we run the system every day, we tell you what's working and what's not, and we adjust in real time. The ROI calculator on this page uses conservative assumptions — use your own numbers.</p>
              </>
            }
          />
          <FAQItem
            q="Do I need to be hands-on for this to work?"
            a={
              <p>
                You need 30 minutes for the kickoff call to get the ICP right, and 10–15 minutes a week to review the dashboard and respond to the weekly report. That's it. We don't need you to write copy, manage sequences, or babysit deliverability. That's what the retainer covers.
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
