import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Overview } from '../dashboard/Overview'
import { MeetingsTab } from '../dashboard/MeetingsTab'
import { RepliesTab } from '../dashboard/RepliesTab'
import { SequencesTab } from '../dashboard/SequencesTab'
import { InfraTab } from '../dashboard/InfraTab'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'meetings', label: 'Meetings' },
  { id: 'replies', label: 'Replies' },
  { id: 'sequences', label: 'Sequences' },
  { id: 'infrastructure', label: 'Infrastructure' },
]

export function DashboardPage() {
  const [active, setActive] = useState('overview')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Dashboard header */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-elev)' }}>
        <div className="container" style={{ padding: '0 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <Link to="/" style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--text)', textDecoration: 'none', letterSpacing: '-0.01em' }}>
                Krionics
              </Link>
              <span style={{ color: 'var(--border-strong)', fontSize: 14 }}>/</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-2)', letterSpacing: '0.06em' }}>Pipeline Dashboard</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.06em' }}>
                <span className="live-pip" />LIVE
              </span>
              <Link to="/book" className="btn btn-primary" style={{ fontSize: 13, padding: '8px 16px' }}>
                Book a call →
              </Link>
            </div>
          </div>

          {/* Tab bar */}
          <div style={{ display: 'flex', gap: 0, borderTop: '1px solid var(--border)' }}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                style={{
                  padding: '12px 20px',
                  background: 'none',
                  border: 'none',
                  borderBottom: active === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
                  fontFamily: 'var(--mono)',
                  fontSize: 12,
                  letterSpacing: '0.06em',
                  color: active === tab.id ? 'var(--text)' : 'var(--text-2)',
                  cursor: 'pointer',
                  transition: 'color 0.15s',
                  marginBottom: -1,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="container" style={{ padding: '0 32px' }}>
        {active === 'overview' && <Overview />}
        {active === 'meetings' && <MeetingsTab />}
        {active === 'replies' && <RepliesTab />}
        {active === 'sequences' && <SequencesTab />}
        {active === 'infrastructure' && <InfraTab />}
      </div>
    </div>
  )
}
