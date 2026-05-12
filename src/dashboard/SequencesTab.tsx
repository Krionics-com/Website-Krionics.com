const SEQS = [
  { name: '—', status: 'Active', prospects: '—', sent: '—', opens: '—%', replies: '—%', meetings: '—', variant: 'A' },
  { name: '—', status: 'Active', prospects: '—', sent: '—', opens: '—%', replies: '—%', meetings: '—', variant: 'B' },
  { name: '—', status: 'Paused', prospects: '—', sent: '—', opens: '—%', replies: '—%', meetings: '—', variant: 'A' },
]

const STATUS_COLOR: Record<string, string> = {
  Active: 'var(--structural)',
  Paused: 'var(--text-2)',
  Draft: 'var(--border-strong)',
}

export function SequencesTab() {
  return (
    <div style={{ padding: '40px 0' }}>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, margin: '0 0 8px', letterSpacing: '-0.01em' }}>Sequences</h2>
        <p style={{ color: 'var(--text-2)', fontSize: 14, margin: 0 }}>All active and paused outbound sequences. We rotate variants based on reply data weekly.</p>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, border: '1px solid var(--border)' }}>
        <thead>
          <tr style={{ background: 'var(--bg-elev)' }}>
            {['Sequence name', 'Status', 'Prospects', 'Sent', 'Open rate', 'Reply rate', 'Meetings', 'Variant'].map((h) => (
              <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--text-2)', borderBottom: '1px solid var(--border)', fontWeight: 400 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SEQS.map((s, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '14px 16px' }}>{s.name}</td>
              <td style={{ padding: '14px 16px' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: STATUS_COLOR[s.status] || 'var(--text-2)', border: `1px solid ${STATUS_COLOR[s.status] || 'var(--border)'}`, padding: '3px 8px', borderRadius: 3, letterSpacing: '0.06em' }}>
                  {s.status}
                </span>
              </td>
              <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', fontSize: 12 }}>{s.prospects}</td>
              <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', fontSize: 12 }}>{s.sent}</td>
              <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', fontSize: 12 }}>{s.opens}</td>
              <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', fontSize: 12 }}>{s.replies}</td>
              <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', fontSize: 12 }}>{s.meetings}</td>
              <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-2)' }}>{s.variant}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 24, padding: '16px 20px', background: 'var(--bg-elev)', border: '1px solid var(--border)', fontSize: 13, color: 'var(--text-2)' }}>
        Sequence content and variant copy are available on request. We adjust copy weekly based on reply data — no action needed from your side.
      </div>
    </div>
  )
}
