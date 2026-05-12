import styles from './Manifesto.module.css'

const WONT = [
  "Sell you a list and call it strategy",
  "Pitch on a volume you know we can't hit",
  "Lock you into a 12-month contract on month one",
  "Fabricate case studies to close you",
  "Pretend AI replaces human judgment in copywriting",
  "Disappear after onboarding",
  "Call it 'personalized' when it's a mail merge",
  "Blame deliverability when the real problem is the offer",
  "Promise a meeting number we can't stand behind",
  "Keep you in the dark when something breaks",
]

const WILL = [
  "Tell you if your ICP is wrong before we build",
  "Show you every domain, inbox, and sequence we run",
  "Give you a dashboard you can check without asking us",
  "Rotate what's not working without waiting to be asked",
  "Bring bad news in the same week it happens",
  "Hand you everything if you leave — the data, the domains, the system",
  "Tell you when outbound isn't the right solution for your stage",
  "Keep early-client rates for the first clients who take a chance on us",
  "Diagnose what broke before we build — and tell you if it's not a system problem",
  "Show you a live system, not a slide deck, before you commit",
]

export function Manifesto() {
  return (
    <section style={{ paddingTop: 96, paddingBottom: 96, background: 'var(--ink)', marginTop: 0, borderTop: '1px solid rgba(245,241,232,0.12)' }}>
      <div className="container">
        <div style={{ marginBottom: 64 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', color: 'rgba(245,241,232,0.5)', textTransform: 'uppercase' }} className="reveal">08 / How we operate</span>
          <h2 className="h1 reveal" style={{ margin: '20px 0 0', maxWidth: '22ch', letterSpacing: '-0.02em', color: 'var(--cream-2)' }}>
            What we will and<br /><em style={{ fontStyle: 'italic' }}>won't</em> do.
          </h2>
        </div>

        <div className={`reveal ${styles.grid}`}>
          <div>
            <span className={styles.colHeader} style={{ color: 'rgba(245,241,232,0.4)' }}>WON'T</span>
            <ul className={styles.list}>
              {WONT.map((item) => (
                <li key={item} className={styles.item}>
                  <span className={styles.mark} style={{ color: 'rgba(245,241,232,0.25)' }}>✕</span>
                  <span style={{ color: 'rgba(245,241,232,0.65)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className={styles.colHeader} style={{ color: 'var(--primary)' }}>WILL</span>
            <ul className={styles.list}>
              {WILL.map((item) => (
                <li key={item} className={styles.item}>
                  <span className={styles.mark} style={{ color: 'var(--primary)' }}>✓</span>
                  <span style={{ color: 'var(--cream-2)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
