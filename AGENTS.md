# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server with Turbopack
npm run build      # Production build
npm run lint       # ESLint
npm run format     # Prettier (formats TS/TSX files)
npm run typecheck  # TypeScript type check (no emit)
```

## Adding shadcn components

```bash
npx shadcn@latest add <component-name>
```

Components land in `components/ui/`. The project uses the **base-lyra** style, **neutral** base color, **Phosphor** icon library, and CSS variables for theming.

## Architecture

- **Next.js 16 App Router** — all routes live under `app/`. Server Components by default; add `'use client'` only where interactivity is required.
- **Theme system** — `components/theme-provider.tsx` wraps the app with `next-themes`. Dark mode toggled via the `d` key (handled by `ThemeHotkey` inside the provider). The root layout applies this provider around all children.
- **Styling** — Tailwind CSS v4 (imported via `@import "tailwindcss"` in `globals.css`, no `tailwind.config.*` file). CSS variables defined in `globals.css` drive the design tokens. Use `cn()` from `@/lib/utils` to merge class names.
- **Fonts** — Geist (`--font-sans`), JetBrains Mono (`--font-mono`), and Cairo (`--font-arabic`, Arabic subset) loaded via `next/font/google` in `app/layout.tsx`. The root element defaults to `font-mono`; `[dir="rtl"] body` (in `globals.css`) switches to Cairo since the mono stack has no Arabic glyphs.
- **Path aliases** — `@/components`, `@/lib`, `@/hooks` (configured in `tsconfig.json`).
- **No tests configured** — there is no test runner set up yet.

## Internationalization (AR / EN + RTL)

The site is bilingual via a **client-side locale toggle** (no `/ar` routes — deliberate; upgrade to Next.js locale routing later if the Arabic pages need their own SEO).

- **Core:** `lib/i18n.tsx` — `LocaleProvider` (wraps the app in `app/layout.tsx`, *outside* `ThemeProvider`), `useLocale()` → `{ locale, setLocale, toggle }`, persisted to `localStorage["locale"]`, sets `document.documentElement.dir`/`lang` on change.
- **UI chrome strings** live in the `dict` object (`dict.en` / `dict.ar`; the `ar` object is type-checked against `Dict = typeof en`, so a missing key is a compile error). Skill-group headings are in `skillGroupAr`.
- **Content strings** (projects, résumé experience, case studies, stat labels) carry parallel Arabic fields in `lib/data/*` — `descAr`, `kindAr`, `pointsAr`, `roleAr`, `titleAr`, `labelAr`, etc. Read them with `pick(locale, en, ar)` (falls back to English if the Arabic is missing).
- **To add a translatable string:** add it to both `dict.en` and `dict.ar` (or an `*Ar` field in the data file), then in the component: `const { locale } = useLocale(); const t = dict[locale]`. Tech tags (React, Next.js…) intentionally stay English in both locales.

### Two gotchas — do not remove

- **ScrollTrigger refresh on locale change** (`components/header.tsx`): a locale swap changes text length + swaps in Cairo, shifting every section's scroll position. GSAP ScrollTrigger caches positions, so the header calls `ScrollTrigger.refresh()` on `locale` change **and** on `document.fonts.ready`. Without it, bottom sections (contact) stay stuck at `opacity: 0`.
- **`EncryptedText` re-runs on text change** (`components/ui/encrypted-text.tsx`): its reveal effect re-arms whenever `text` changes (required for the locale toggle — the old version froze mid-scramble), and it scrambles with an Arabic charset when the text is Arabic.

> `CLAUDE.md` is a mirror of this file for Claude Code — keep the two in sync when editing.
