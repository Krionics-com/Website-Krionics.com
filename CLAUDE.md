# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

## Commands

```bash
npm run dev       # Vite dev server on localhost:5173
npm run build     # TypeScript check + production build → dist/
npm run preview   # Preview production build locally
```

## Architecture

**Stack**: Vite + React 18 + TypeScript + React Router v6 + CSS Modules

**Three routes** in `src/App.tsx`:
- `/` → `src/pages/Home.tsx` — assembles all landing page sections in order
- `/dashboard` → `src/pages/DashboardPage.tsx` — tabbed pipeline dashboard (5 tabs)
- `/book` → `src/pages/BookPage.tsx` — 3-step booking form

**Global styles** in `src/styles/global.css`: all brand tokens as CSS custom properties (`--bg`, `--primary` = terracotta `#B85C38`, `--structural` = forest `#1F3D2E`, `--ink` = dark section background). Typography utility classes (`.h1`, `.serif`, `.mono`, `.eyebrow-2`, `.muted`), button classes (`.btn`, `.btn-primary`, `.btn-ghost`), scroll-reveal class (`.reveal` — gets `.in` class from `useScrollReveal` hook).

**Component structure**: each section in `src/components/<Name>/<Name>.tsx` with co-located `<Name>.module.css`. Section order in Home.tsx: Hero → Problem → Machine → MathComparison → ROICalculator → DashboardEmbed → Services → HowItWorks → Pricing → Manifesto → FAQ → FinalCTA → Footer.

**Dashboard tabs**: `src/dashboard/Overview.tsx`, `MeetingsTab.tsx`, `RepliesTab.tsx`, `SequencesTab.tsx`, `InfraTab.tsx` — all display `—` placeholders (real data populates day 15 of program).

**Scroll animations**: `src/hooks/useScrollReveal.ts` observes all `.reveal` elements and adds `.in` class at 12% threshold. Called once in `Home.tsx`.

## Brand rules

- No `transform`, `revolutionize`, `cutting-edge`, `10x`, `unlock`, `leverage` in copy
- Primary CTA color is terracotta (`var(--primary)`), structural dark is forest (`var(--structural)`)
- Fonts are Instrument Serif, Geist, Geist Mono — loaded via Google Fonts CDN in `index.html`
- Dark sections use `background: var(--ink)` with `color: var(--cream-2)`
- CSS Modules for component-scoped styles; global utility classes for typography/buttons

## Pricing (hardcoded, single source of truth)

- Growth: $2,500/mo + $2,000 setup (cold email only)
- Systematize: $4,500/mo + $5,000 setup (cold + LinkedIn)
- Outpace: $7,500/mo + $7,500 setup (full system + intent data)
- Krionics annual cost used in ROI Calculator: `2500 * 12 + 2000 = $32,000`
