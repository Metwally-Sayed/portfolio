# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- **Fonts** — Geist (`--font-sans`) and JetBrains Mono (`--font-mono`) loaded via `next/font/google` in `app/layout.tsx`. The root element defaults to `font-mono`.
- **Path aliases** — `@/components`, `@/lib`, `@/hooks` (configured in `tsconfig.json`).
- **RTL** — enabled in `components.json`; keep layout utilities RTL-compatible.
- **No tests configured** — there is no test runner set up yet.
