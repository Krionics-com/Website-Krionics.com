/** Single source of truth for Krionics brand across all pages. */
export const BRAND = {
  name: 'Krionics',
  url: 'https://krionics.com',
  email: 'hello@krionics.com',
  tagline: 'Pipeline systems for B2B teams',
  description:
    'We build and operate cold outbound systems and AI voice agents for B2B teams. 14 days to live. Month-to-month. You own everything we build.',
  location: 'Bengaluru, India',
  founded: '2024',
} as const

export function pageTitle(page: string) {
  return `${page} — ${BRAND.name}`
}
