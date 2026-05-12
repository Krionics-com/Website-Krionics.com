const DOMAINS = Array.from({ length: 4 }, (_, i) => ({
  domain: `—.${['com', 'io', 'co', 'email'][i]}`,
  inboxes: '—',
  warmup: i < 3 ? 'Complete' : 'In progress',
  spf: 'Pass',
  dkim: 'Pass',
  dmarc: 'Pass',
  health: i < 3 ? 'Green' : 'Warming',
}))

const HEALTH_COLOR: Record<string, string> = {
  Green: 'var(--structural)',
  Warming: 'var(--primary)',
  Warning: '#D97706',
}

export function InfraTab() {
  return (
    <div style={{ padding: '40px 0' }}>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, margin: '0 0 8px', letterSpacing: '-0.01em' }}>Infrastructure</h2>
        <p style={{ color: 'var(--text-2)', fontSize: 14, margin: 0 }}>Domains, inboxes, and authentication status. All registered in your name — you own everything.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--border)', marginBottom: 32 }}>
        {[['—', 'Domains active'], ['—', 'Inboxes configured'], ['All green', 'Deliverability status']].map(([v, l], i) => (
          <div key={l} style={{ padding: 24, borderRight: i < 2 ? '1px solid var(--border)' : undefined }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 36, lineHeight: 1, letterSpacing: '-0.02em', color: i === 2 ? 'var(--structural)' : 'var(--text)' }}>{v}</div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.08em', display: 'block', marginTop: 6 }}>{l.toUpperCase()}</span>
          </div>
        ))}
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, border: '1px solid var(--border)' }}>
        <thead>
          <tr style={{ background: 'var(--bg-elev)' }}>
            {['Domain', 'Inboxes', 'Warmup', 'SPF', 'DKIM', 'DMARC', 'Health'].map((h) => (
              <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--text-2)', borderBottom: '1px solid var(--border)', fontWeight: 400 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DOMAINS.map((d, i) => (
            <tr key={i} style={{ borderBottom: i < DOMAINS.length - 1 ? '1px solid var(--border)' : undefined }}>
              <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', fontSize: 12 }}>{d.domain}</td>
              <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', fontSize: 12 }}>{d.inboxes}</td>
              <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-2)' }}>{d.warmup}</td>
              <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--structural)' }}>{d.spf}</td>
              <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--structural)' }}>{d.dkim}</td>
              <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--structural)' }}>{d.dmarc}</td>
              <td style={{ padding: '14px 16px' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: HEALTH_COLOR[d.health] || 'var(--text-2)', border: `1px solid ${HEALTH_COLOR[d.health] || 'var(--border)'}`, padding: '3px 8px', borderRadius: 3, letterSpacing: '0.06em' }}>
                  {d.health}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
