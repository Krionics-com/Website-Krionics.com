const REPLIES = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  contact: '—',
  company: '—',
  sentiment: i % 3 === 0 ? 'Positive' : i % 3 === 1 ? 'Neutral' : 'Not now',
  snippet: 'Reply content appears here after day 15 of your program.',
  time: '—',
  action: i % 3 === 0 ? 'Meeting booked' : i % 3 === 1 ? 'Follow-up queued' : 'Archived',
}))

const SENTIMENT_COLOR: Record<string, string> = {
  Positive: 'var(--structural)',
  Neutral: 'var(--text-2)',
  'Not now': 'var(--border-strong)',
}

export function RepliesTab() {
  return (
    <div style={{ padding: '40px 0' }}>
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, margin: '0 0 8px', letterSpacing: '-0.01em' }}>Reply inbox</h2>
          <p style={{ color: 'var(--text-2)', fontSize: 14, margin: 0 }}>All replies classified and routed. Positive replies forwarded to your inbox immediately.</p>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {[['—', 'POSITIVE'], ['—', 'NEUTRAL'], ['—', 'NOT NOW']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 32, lineHeight: 1, letterSpacing: '-0.02em' }}>{v}</div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-2)', letterSpacing: '0.08em' }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ border: '1px solid var(--border)' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', background: 'var(--bg-elev)', display: 'grid', gridTemplateColumns: '160px 160px 100px 1fr 80px 140px', gap: 16 }}>
          {['Contact', 'Company', 'Sentiment', 'Snippet', 'Time', 'Action'].map((h) => (
            <span key={h} style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--text-2)' }}>{h}</span>
          ))}
        </div>
        {REPLIES.map((r, i) => (
          <div key={r.id} style={{ padding: '14px 16px', borderBottom: i < REPLIES.length - 1 ? '1px solid var(--border)' : undefined, display: 'grid', gridTemplateColumns: '160px 160px 100px 1fr 80px 140px', gap: 16, fontSize: 13, alignItems: 'center' }}>
            <span>{r.contact}</span>
            <span style={{ color: 'var(--text-2)' }}>{r.company}</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: SENTIMENT_COLOR[r.sentiment] || 'var(--text-2)' }}>{r.sentiment}</span>
            <span style={{ color: 'var(--text-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12 }}>{r.snippet}</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-2)' }}>{r.time}</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text)' }}>{r.action}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
