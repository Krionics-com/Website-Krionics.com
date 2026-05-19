import { Link } from 'react-router-dom'

export function FinalCTA() {
  return (
    <section style={{ background: 'var(--ink)', color: 'var(--cream-2)', padding: '100px 0', borderTop: '1px solid rgba(245,241,232,0.12)' }}>
      <div className="container" style={{ maxWidth: 720, textAlign: 'center' }}>
        <span className="reveal" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', color: 'rgba(245,241,232,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: 32 }}>
          12 / The decision
        </span>
        <h2 className="serif reveal" style={{ fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 28px', color: 'var(--cream-2)' }}>
          You've read this far.<br /><em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>That tells us something.</em>
        </h2>
        <p className="reveal" style={{ fontSize: 18, lineHeight: 1.65, color: 'rgba(245,241,232,0.7)', margin: '0 0 48px', maxWidth: '52ch', marginLeft: 'auto', marginRight: 'auto' }}>
          You already know the problem. You've seen the math. The only question is whether you want to do something about it before your competitors do.
        </p>
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/book" className="btn btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>
              Book a call <span className="arrow">→</span>
            </Link>
            <Link to="/dashboard" className="btn btn-ghost" style={{ fontSize: 16, padding: '16px 28px', borderColor: 'rgba(245,241,232,0.2)', color: 'rgba(245,241,232,0.75)' }}>
              See the dashboard
            </Link>
          </div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'rgba(245,241,232,0.4)', letterSpacing: '0.06em' }}>
            No pitch deck. No sales process. Just the call.
          </span>
        </div>

        <div className="reveal" style={{ marginTop: 80, paddingTop: 48, borderTop: '1px solid rgba(245,241,232,0.12)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32, textAlign: 'left' }}>
          {[
            { label: '14-day setup', sub: 'From signed to running in two weeks' },
            { label: 'Month-to-month', sub: 'After the 3-month minimum' },
            { label: 'You own everything', sub: 'Domains, data, sequences — yours' },
          ].map((item) => (
            <div key={item.label}>
              <div className="serif" style={{ fontSize: 18, letterSpacing: '-0.01em', color: 'var(--cream-2)', marginBottom: 6 }}>{item.label}</div>
              <p style={{ margin: 0, fontSize: 13, color: 'rgba(245,241,232,0.5)', lineHeight: 1.5 }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
