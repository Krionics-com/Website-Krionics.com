import styles from './Problem.module.css'

const pains = [
  {
    num: '01',
    title: "You’re paying for tools, not results",
    body: 'Apollo. Clay. Instantly. Smartlead. The average B2B team spends $1,800/month on outbound tools and still books the same number of meetings as last quarter.',
  },
  {
    num: '02',
    title: 'Your SDR quit. Again.',
    body: 'Average SDR tenure is 11 months. Three months to ramp, three months of output, five months of declining effort. Then you start over — $18K in sunk recruiting costs later.',
  },
  {
    num: '03',
    title: 'Every idle week is money walking away',
    body: 'At a $24K ACV and 20% close rate, every meeting you don\'t book costs you $4,800 in expected revenue. Twelve missed meetings a month is $57,600 a year evaporating.',
  },
]

export function Problem() {
  return (
    <section id="approach" style={{ paddingTop: 0, paddingBottom: 0 }}>
      <div className="container">
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 80 }}>
          <div style={{ marginBottom: 56 }}>
            <span className="eyebrow-2 reveal">The real cost of doing nothing</span>
            <h2 className={`h1 reveal ${styles.headline}`} style={{ margin: '20px 0 0' }}>
              Outbound isn't broken. Your system is.
            </h2>
          </div>

          <div className={`${styles.grid} grid-pain reveal`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, border: '1px solid var(--border)' }}>
            {pains.map((p, i) => (
              <div
                key={p.num}
                style={{
                  padding: '32px 28px',
                  borderRight: i < 2 ? '1px solid var(--border)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <span className="mono" style={{ fontSize: 12, color: 'var(--primary)', letterSpacing: '0.08em' }}>{p.num}</span>
                <h3 className="serif" style={{ fontSize: 24, fontWeight: 400, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.2 }}>{p.title}</h3>
                <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>{p.body}</p>
              </div>
            ))}
          </div>

          <div className={`reveal ${styles.callout}`}>
            <p className="serif" style={{ fontSize: 20, fontStyle: 'italic', margin: 0, maxWidth: '48ch', color: 'var(--text)' }}>
              The question isn't whether you can afford a pipeline system. It's whether you can afford another quarter without one.
            </p>
            <a href="#roi" className="btn btn-ghost" style={{ flexShrink: 0 }}>Run your numbers →</a>
          </div>
        </div>
      </div>
    </section>
  )
}
