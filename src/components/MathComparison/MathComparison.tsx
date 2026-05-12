import styles from './MathComparison.module.css'

export function MathComparison() {
  return (
    <section style={{ paddingTop: 96 }}>
      <div className="container">
        <div style={{ marginBottom: 48 }}>
          <span className="eyebrow-2 reveal">02 / The math</span>
          <h2 className="h1 reveal" style={{ margin: '20px 0 16px', maxWidth: '22ch', letterSpacing: '-0.02em' }}>
            Here's what an SDR <em style={{ fontStyle: 'italic' }}>actually</em> costs you.
          </h2>
          <p className="muted reveal" style={{ margin: 0, fontSize: 17, maxWidth: '56ch' }}>
            Most agencies make you book three calls before they'll quote you. We don't. If the numbers don't work, you save the time.
          </p>
        </div>

        <div className={`reveal ${styles.grid}`}>
          {/* SDR column */}
          <div className={styles.col}>
            <span className={styles.tag}>OPTION A</span>
            <h3 className="serif" style={{ fontSize: 30, fontWeight: 400, letterSpacing: '-0.01em', margin: '16px 0' }}>Hire an SDR</h3>
            <div className={`serif ${styles.cost}`}>$8,500<span className={styles.costSub}>/mo</span></div>
            <p className={styles.costNote}>Fully loaded — US-based, 2026</p>

            <hr className={styles.rule} />

            <ul className={styles.list}>
              {[
                ['Base salary', '$72k/yr = $6,000/mo'],
                ['Benefits + payroll tax (22%)', '$1,320/mo'],
                ['Tools (Apollo, LinkedIn Nav)', '$700/mo'],
                ['Manager oversight', '$480/mo'],
              ].map(([k, v]) => (
                <li key={k} className={styles.row}>
                  <span className={styles.rowLabel}>{k}</span>
                  <span className={styles.rowVal}>{v}</span>
                </li>
              ))}
            </ul>

            <hr className={styles.rule} />

            <ul className={styles.list}>
              {[
                ['Time to ramp', '3 months'],
                ['Average tenure', '11 months'],
                ['Meetings/mo (ramp-adjusted)', '8–12'],
              ].map(([k, v]) => (
                <li key={k} className={styles.row}>
                  <span className={styles.rowLabel}>{k}</span>
                  <span className={styles.rowValDark}>{v}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Krionics column */}
          <div className={`${styles.col} ${styles.colHighlight}`}>
            <span className={styles.badge}>70% LOWER COST</span>
            <span className={styles.tagLight}>OPTION B</span>
            <h3 className="serif" style={{ fontSize: 30, fontWeight: 400, letterSpacing: '-0.01em', margin: '16px 0', color: 'var(--cream-2)' }}>Krionics</h3>
            <div className={`serif ${styles.costHighlight}`}>$2,500<span className={styles.costSubLight}>/mo</span></div>
            <p className={styles.costNoteLight}>+ $2,000 one-time setup</p>

            <hr className={styles.ruleLight} />

            <ul className={styles.list}>
              {[
                ['Operations', '$2,500/mo'],
                ['Setup (one-time)', '$2,000'],
                ['Tools + infra', 'included'],
                ['Domains + inboxes', 'included'],
              ].map(([k, v]) => (
                <li key={k} className={styles.row}>
                  <span className={styles.rowLabelLight}>{k}</span>
                  <span className={styles.rowValLight}>{v}</span>
                </li>
              ))}
            </ul>

            <hr className={styles.ruleLight} />

            <ul className={styles.list}>
              {[
                ['Time to launch', '14 days'],
                ['Lock-in', '3 mo, then month-to-month'],
                ['Everything we build', 'yours to keep'],
              ].map(([k, v]) => (
                <li key={k} className={styles.row}>
                  <span className={styles.rowLabelLight}>{k}</span>
                  <span className={styles.rowValHighlight}>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="sidenote reveal" style={{ marginTop: 24, maxWidth: '64ch' }}>
          SDR costs reflect 2026 fully loaded US-market rates: base salary + benefits/tax + tooling + manager overhead. We don't compete on price by doing less — we compete by not having the SDR overhead.
        </p>
      </div>
    </section>
  )
}
