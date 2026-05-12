const KPI = [
  { label: 'Meetings booked (30d)', value: '—', delta: '+— vs last month' },
  { label: 'Emails sent (30d)', value: '—', delta: '— sequences active' },
  { label: 'Open rate (avg)', value: '—%', delta: 'Industry avg: 28%' },
  { label: 'Reply rate (avg)', value: '—%', delta: 'Industry avg: 4%' },
  { label: 'Pipeline created', value: '$—', delta: 'This month' },
  { label: 'Active prospects', value: '—', delta: '— in sequence' },
]

const ACTIVITY = [
  { time: '—', event: 'New positive reply — —, — · Forwarded to your inbox' },
  { time: '—', event: 'Meeting booked — — at — · Added to your calendar' },
  { time: '—', event: 'Sequence rotated — A/B test — outperforming by —%' },
  { time: '—', event: 'Deliverability check passed — all inboxes green' },
  { time: '—', event: 'Weekly digest sent — check your inbox' },
]

export function Overview() {
  return (
    <div style={{ padding: '40px 0' }}>
      <div style={{ marginBottom: 36 }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, margin: '0 0 8px', letterSpacing: '-0.01em' }}>Overview</h2>
        <p style={{ color: 'var(--text-2)', fontSize: 14, margin: 0 }}>Your numbers appear here on day 15 of the program.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--border)', marginBottom: 40 }}>
        {KPI.map((k, i) => (
          <div key={k.label} style={{ padding: 24, borderRight: i % 3 !== 2 ? '1px solid var(--border)' : undefined, borderBottom: i < 3 ? '1px solid var(--border)' : undefined }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--text-2)', textTransform: 'uppercase', display: 'block' }}>{k.label}</span>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 36, lineHeight: 1, marginTop: 8, letterSpacing: '-0.02em' }}>{k.value}</div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-2)', display: 'block', marginTop: 6 }}>{k.delta}</span>
          </div>
        ))}
      </div>

      <div style={{ border: '1px solid var(--border)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg-elev)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-2)' }}>Recent activity</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-2)' }}>Updated live</span>
        </div>
        {ACTIVITY.map((a, i) => (
          <div key={i} style={{ padding: '16px 20px', borderBottom: i < ACTIVITY.length - 1 ? '1px solid var(--border)' : undefined, display: 'flex', gap: 20, fontSize: 13 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-2)', flexShrink: 0, width: 48 }}>{a.time}</span>
            <span style={{ color: 'var(--text)' }}>{a.event}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
