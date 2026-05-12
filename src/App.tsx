import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { Nav } from './components/Nav/Nav'
import { Home } from './pages/Home'
import { DashboardPage } from './pages/DashboardPage'
import { BookPage } from './pages/BookPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 24px' }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', color: 'var(--text-2)', textTransform: 'uppercase', display: 'block', marginBottom: 20 }}>404</span>
      <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.02em', margin: '0 0 16px' }}>Page not found.</h1>
      <p style={{ color: 'var(--text-2)', fontSize: 16, margin: '0 0 32px', maxWidth: '36ch', lineHeight: 1.6 }}>
        The page you're looking for doesn't exist. Probably not what you were hoping for.
      </p>
      <Link to="/" className="btn btn-primary">Back to home <span className="arrow">→</span></Link>
    </div>
  )
}

function AppShell() {
  const { pathname } = useLocation()
  const showNav = pathname !== '/book' && pathname !== '/dashboard'
  return (
    <>
      <ScrollToTop />
      {showNav && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
