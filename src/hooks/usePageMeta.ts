import { useEffect } from 'react'
import { BRAND } from '../lib/brand'

interface PageMetaOptions {
  title: string
  description: string
  path: string
  noindex?: boolean
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

export function usePageMeta({ title, description, path, noindex }: PageMetaOptions) {
  useEffect(() => {
    const canonical = `${BRAND.url}${path}`
    const fullTitle = title.includes(BRAND.name) ? title : `${title} — ${BRAND.name}`

    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:site_name', BRAND.name)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setCanonical(canonical)

    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
    if (noindex) {
      if (!robots) {
        robots = document.createElement('meta')
        robots.name = 'robots'
        document.head.appendChild(robots)
      }
      robots.content = 'noindex, nofollow'
    } else if (robots) {
      robots.remove()
    }

    return () => {
      const home = BRAND.url
      document.title = `${BRAND.name} — ${BRAND.tagline}`
      setMeta('name', 'description', BRAND.description)
      setMeta('property', 'og:title', `${BRAND.name} — ${BRAND.tagline}`)
      setMeta('property', 'og:description', BRAND.description)
      setMeta('property', 'og:url', home)
      setMeta('name', 'twitter:title', `${BRAND.name} — ${BRAND.tagline}`)
      setMeta('name', 'twitter:description', BRAND.description)
      setCanonical(home)
    }
  }, [title, description, path, noindex])
}
