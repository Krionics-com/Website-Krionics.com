import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
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
