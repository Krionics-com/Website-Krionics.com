import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Nav.module.css'

const SECTIONS = ['approach', 'services', 'pricing', 'faq'] as const

function useActiveSection() {
  const [active, setActive] = useState('')
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname !== '/') {
      setActive('')
      return
    }

    const handleScroll = () => {
      const scrollY = window.scrollY + 120
      let current = ''
      for (const id of SECTIONS) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollY) {
          current = id
        }
      }
      setActive(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  return active
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const activeSection = useActiveSection()
  const progress = useScrollProgress()

  const anchor = (id: string) => isHome ? `#${id}` : `/#${id}`

  return (
    <>
      <header className="nav">
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        <div className="container-wide nav-inner">
          <Link to="/" aria-label="Krionics — home" style={{ flexShrink: 0 }}>
            <span className="nav-logo-wrap">
              <img src="/logo.png" alt="" className="nav-logo-icon" aria-hidden="true" />
              <span className="nav-logo">Krionics<span style={{ color: 'var(--primary)' }}>.</span></span>
            </span>
          </Link>
          <nav className="nav-links">
            {SECTIONS.map((id) => (
              <a
                key={id}
                className={`nav-link ${activeSection === id ? styles.navActive : ''}`}
                href={anchor(id)}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
            <Link to="/about" className={`nav-link ${pathname === '/about' ? styles.navActive : ''}`}>About</Link>
            <Link to="/book" className="btn btn-primary nav-cta" style={{ marginLeft: 8 }}>
              Book a call <span className="arrow">→</span>
            </Link>
            <button className="menu-btn" onClick={() => setOpen(true)}>
              <span>Menu</span>
              <span className={styles.hamburger}>
                <span />
                <span />
              </span>
            </button>
          </nav>
        </div>
      </header>

      {open && (
        <div className="mobile-menu" onClick={() => setOpen(false)}>
          <div className={styles.mobileHeader}>
            <span className="nav-logo-wrap">
              <img src="/logo.png" alt="" className="nav-logo-icon" aria-hidden="true" />
              <span className="nav-logo">Krionics<span style={{ color: 'var(--primary)' }}>.</span></span>
            </span>
            <button onClick={() => setOpen(false)} style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Close ×
            </button>
          </div>
          <a href={anchor('approach')} onClick={() => setOpen(false)}>Approach</a>
          <a href={anchor('services')} onClick={() => setOpen(false)}>Services</a>
          <a href={anchor('pricing')} onClick={() => setOpen(false)}>Pricing</a>
          <a href={anchor('faq')} onClick={() => setOpen(false)}>FAQ</a>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/book" style={{ color: 'var(--primary)' }} onClick={() => setOpen(false)}>Book a call →</Link>
        </div>
      )}
    </>
  )
}
