import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Nav.module.css'

export function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const anchor = (id: string) => isHome ? `#${id}` : `/#${id}`

  return (
    <>
      <header className="nav">
        <div className="container-wide nav-inner">
          <Link to="/" aria-label="Krionics — home" style={{ flexShrink: 0 }}>
            <span className="nav-logo">Krionics<span style={{ color: 'var(--primary)' }}>.</span></span>
          </Link>
          <nav className="nav-links">
            <a className="nav-link" href={anchor('approach')}>Our approach</a>
            <a className="nav-link" href={anchor('services')}>Services</a>
            <a className="nav-link" href={anchor('pricing')}>Pricing</a>
            <a className="nav-link" href={anchor('faq')}>FAQ</a>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/blog" className="nav-link">Blog</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
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
            <span className="nav-logo">Krionics<span style={{ color: 'var(--primary)' }}>.</span></span>
            <button onClick={() => setOpen(false)} style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Close ×
            </button>
          </div>
          <a href={anchor('approach')} onClick={() => setOpen(false)}>Our approach</a>
          <a href={anchor('services')} onClick={() => setOpen(false)}>Services</a>
          <a href={anchor('pricing')} onClick={() => setOpen(false)}>Pricing</a>
          <a href={anchor('faq')} onClick={() => setOpen(false)}>FAQ</a>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/blog" onClick={() => setOpen(false)}>Blog</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link to="/book" style={{ color: 'var(--primary)' }} onClick={() => setOpen(false)}>Book a call →</Link>
        </div>
      )}
    </>
  )
}
