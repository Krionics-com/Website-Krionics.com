import styles from './Machine.module.css'

interface PrincipleCellProps {
  n: string
  title: string
  body: string
}

function PrincipleCell({ n, title, body }: PrincipleCellProps) {
  return (
    <div style={{ padding: '32px 32px 32px 0', borderRight: '1px solid var(--border)' }}>
      <span className="num-marker">{n}</span>
      <h3 className="h3" style={{ margin: '12px 0' }}>{title}</h3>
      <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>{body}</p>
    </div>
  )
}

export function Machine() {
  return (
    <section style={{ paddingTop: 140, paddingBottom: 0 }}>
      <div className="container-wide">
        <div className={`${styles.grid} grid-2col`} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 320px) minmax(0, 1fr)', gap: 80 }}>
          <div>
            <span className="eyebrow-2 reveal">01 / The machine</span>
            <h2 className="h1 reveal" style={{ margin: '20px 0 0', letterSpacing: '-0.02em' }}>
              A pipeline isn't a campaign.
            </h2>
            <p className="muted reveal" style={{ marginTop: 24, fontSize: 16 }}>
              It's a system. It runs every day. It learns. It deserves the same operational discipline as your product.
            </p>
            <p className="sidenote reveal" style={{ marginTop: 32, maxWidth: 280 }}>
              We don't sell campaigns. We build the system that makes outbound a reliable input — like servers in a data center, not a Hail Mary.
            </p>
          </div>

          <div>
            <p className="reveal" style={{ fontSize: 22, lineHeight: 1.5, maxWidth: '62ch', marginTop: 0, fontFamily: 'var(--serif)' }}>
              The reason most B2B outbound fails has nothing to do with the tools. Apollo isn't broken. Clay isn't broken. The problem is that every team treats outbound like a project — set it up, hope it works, blame the tool when it doesn't. We treat it like infrastructure: monitored, optimized, accountable.
            </p>

            <div className={`reveal ${styles.principles}`} style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: '1px solid var(--border)' }}>
              <PrincipleCell
                n="i"
                title="Verified > volume"
                body="2,000 right-fit prospects beat 20,000 sprayed contacts. Every list is verified, enriched, and segmented before a single email moves."
              />
              <PrincipleCell
                n="ii"
                title="Daily, not monthly"
                body="The system runs every business day. Deliverability is monitored hourly. Sequences ship in batches. You see it in your dashboard."
              />
              <div style={{ padding: '32px 32px 32px 0' }}>
                <span className="num-marker">iii</span>
                <h3 className="h3" style={{ margin: '12px 0' }}>Owned, not rented</h3>
                <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>Your domains, your inboxes, your CRM, your data. We operate the infrastructure but you keep the keys. If we leave, the machine stays.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
