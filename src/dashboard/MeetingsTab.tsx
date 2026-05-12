const MEETINGS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  contact: '—',
  company: '—',
  title: '—',
  date: '—',
  time: '—',
  seq: '—',
  status: i === 0 ? 'Confirmed' : i === 1 ? 'Rescheduled' : 'Confirmed',
}))

const STATUS_COLOR: Record<string, string> = {
  Confirmed: 'var(--structural)',
  Rescheduled: 'var(--text-2)',
  Cancelled: 'var(--primary)',
}

export function MeetingsTab() {
  return (
    <div style={{ padding: '40px 0' }}>
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, margin: '0 0 8px', letterSpacing: '-0.01em' }}>Meetings booked</h2>
          <p style={{ color: 'var(--text-2)', fontSize: 14, margin: 0 }}>All meetings sourced through Krionics outbound sequences.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 40, lineHeight: 1, letterSpacing: '-0.02em' }}>—</div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.06em' }}>TOTAL THIS MONTH</span>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, border: '1px solid var(--border)' }}>
        <thead>
          <tr style={{ background: 'var(--bg-elev)' }}>
            {['Contact', 'Company', 'Title', 'Date', 'Time', 'Sequence', 'Status'].map((h) => (
              <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--text-2)', borderBottom: '1px solid var(--border)', fontWeight: 400 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MEETINGS.map((m) => (
            <tr key={m.id} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '14px 16px' }}>{m.contact}</td>
              <td style={{ padding: '14px 16px', color: 'var(--text-2)' }}>{m.company}</td>
              <td style={{ padding: '14px 16px', color: 'var(--text-2)' }}>{m.title}</td>
              <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', fontSize: 12 }}>{m.date}</td>
              <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', fontSize: 12 }}>{m.time}</td>
              <td style={{ padding: '14px 16px', color: 'var(--text-2)', fontSize: 12 }}>{m.seq}</td>
              <td style={{ padding: '14px 16px' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: STATUS_COLOR[m.status] || 'var(--text-2)', border: `1px solid ${STATUS_COLOR[m.status] || 'var(--border)'}`, padding: '3px 8px', borderRadius: 3, letterSpacing: '0.06em' }}>
                  {m.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
