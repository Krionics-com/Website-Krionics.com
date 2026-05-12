import styles from './Machine.module.css'

interface PrincipleCellProps {
  n: string
  title: string
  body: string
  last?: boolean
}

function PrincipleCell({ n, title, body, last = false }: PrincipleCellProps) {
  return (
    <div className={styles.cell} style={{ borderRight: last ? 'none' : '1px solid var(--border)' }}>
      <span className="num-marker">{n}</span>
      <h3 className="h3" style={{ margin: '12px 0 10px' }}>{title}</h3>
      <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.65 }}>{body}</p>
    </div>
  )
}

export function Machine() {
  return (
    <section style={{ paddingTop: 96, paddingBottom: 0 }}>
      <div className="container-wide">
        <div className={styles.header}>
          <div>
            <span className="eyebrow-2 reveal">01 / The machine</span>
            <h2 className="h1 reveal" style={{ margin: '20px 0 0', letterSpacing: '-0.02em' }}>
              A pipeline isn't<br />a campaign.
            </h2>
          </div>
          <div className={styles.headerBody}>
            <p className="reveal" style={{ fontSize: 20, lineHeight: 1.55, margin: 0, fontFamily: 'var(--serif)' }}>
              The reason most B2B outbound fails has nothing to do with the tools. Apollo isn't broken. Clay isn't broken. The problem is every team treats outbound like a project — set it up, hope it works, blame the tool when it doesn't. We treat it like infrastructure: monitored, optimized, accountable.
            </p>
            <p className="sidenote reveal" style={{ marginTop: 24 }}>
              We don't sell campaigns. We build the system that makes outbound a reliable input — like servers in a data center, not a Hail Mary.
            </p>
          </div>
        </div>

        <div className={`reveal ${styles.principles}`}>
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
          <PrincipleCell
            n="iii"
            title="Owned, not rented"
            body="Your domains, your inboxes, your CRM, your data. We operate the infrastructure but you keep the keys. If we leave, the machine stays."
            last
          />
        </div>
      </div>
    </section>
  )
}
