# Portfolio Credibility — Design Spec

Date: 2026-06-10
Status: Approved (design), pending implementation plan

## Goal

Raise the portfolio's credibility for senior/mid frontend roles by adding the four
pure-code deliverables that need no purchased domain: SEO primitives, dynamic OG
images, a resume page with downloadable CV, and case-study pages. Each phase is an
independently shippable git commit.

## Scope

In scope (this spec):

1. SEO — `sitemap.ts`, `robots.ts`, JSON-LD `Person` schema.
2. Dynamic OG images via `next/og` (per-route).
3. `/resume` page + "Download CV" buttons (hand-maintained PDF).
4. Case-study pages at `/projects/[slug]`, gated by a `published` flag.

Explicitly out of scope: buying/connecting a custom domain, testimonials, writing the
actual case-study prose (user supplies facts), Vercel Analytics, blog, Arabic site,
contact form.

## Context

- Next.js 16 App Router, Tailwind v4, single-page site (`app/page.tsx` with sections).
- No sub-routes exist yet. Root layout at `app/layout.tsx` holds all metadata.
- Current `openGraph.url` and metadata point at `https://metwally-sayed.vercel.app`
  with no `metadataBase` set — this is the og:url mismatch to fix.
- Project data lives in `lib/data/projects.ts` (typed `Project[]`, 6 projects, one
  `featured`, some with `stats`). OBM currently links to a **dev** URL
  (`https://dev.obm.avancer.ai/en`) — flagged separately, not resolved here.

## Shared foundation

- `lib/site.ts` exports a `SITE_URL` constant (current value: the vercel.app URL;
  one-line swap to the real domain later) plus small helpers for absolute URLs.
- `app/layout.tsx` gains `metadataBase: new URL(SITE_URL)` so all relative OG/canonical
  URLs resolve correctly. Existing hardcoded `openGraph.url` switches to `SITE_URL`.

## 1. SEO

- `app/sitemap.ts` (MetadataRoute.Sitemap): home `/`, `/resume`, and **only published**
  case studies (`/projects/<slug>`). Derives entries from `projects.ts` + the
  `published` flag.
- `app/robots.ts` (MetadataRoute.Robots): allow all, reference the sitemap URL.
- JSON-LD `Person` schema: a small server component rendering a
  `<script type="application/ld+json">` with name, jobTitle, url (`SITE_URL`),
  `sameAs` (GitHub, LinkedIn), and `knowsAbout` (React, Next.js, React Native, RTL).
  Rendered once in the root layout. Social URLs sourced from existing site data if
  present; otherwise added to `lib/site.ts`.

## 2. Dynamic OG images (next/og)

- Use the Next.js file convention `opengraph-image.tsx` returning an `ImageResponse`
  (1200x630), not a manual route handler, so metadata wiring is automatic.
- One shared template component (dark theme matching the site, Geist/JetBrains fonts
  loaded via `ImageResponse` font option) parameterised by `title` + `subtitle`.
  - Root `app/opengraph-image.tsx` → name + role.
  - `app/resume/opengraph-image.tsx` → "Resume / CV".
  - `app/projects/[slug]/opengraph-image.tsx` → case-study title + kind, using
    `generateImageMetadata`/params; only needs to render for published slugs.
- `twitter` card in metadata reuses the same images (`summary_large_image`).
- API specifics (font loading, `ImageResponse` signature) to be verified against
  current `next/og` docs during implementation — do not assume from memory.

## 3. Resume

- `lib/data/resume.ts`: structured resume content (summary, experience entries,
  skills, education/links) as typed data. Experience may reference `projects.ts`.
- `app/resume/page.tsx`: server component rendering that data in the site's visual
  language. Screen-first; include a print stylesheet so browser print-to-PDF looks
  clean (bonus, not the primary download path).
- Download path: a hand-maintained `public/cv.pdf`. The "Download CV" button links to
  `/cv.pdf` with `download`. **Dependency:** user provides the PDF; until then a clearly
  marked placeholder file/label is used and the button is visually present.
- "Download CV" button added to: the **header** (`components/header.tsx`) and the
  **contact section**. Follow existing nav/link styling.

## 4. Case studies

- Data: `lib/data/case-studies.ts` keyed by project `id`, each with:
  `published: boolean`, `role`, `context`, `challenges: string[]`,
  `decisions: string[]`, `outcomes: string[]` (metrics), `screenshots: string[]`,
  and reused links from `projects.ts`. All start `published: false`.
- Route: `app/projects/[slug]/page.tsx` with `generateStaticParams` over case-study
  keys. **Unpublished slug → `notFound()` (404).** Unpublished slugs are excluded from
  `generateStaticParams` and the sitemap, so nothing half-empty is reachable.
- Template (reusable component): hero (title / role / year / stack) → context →
  challenges → decisions & trade-offs → outcomes & metrics → screenshot gallery →
  live/store links → prev/next navigation across published studies.
- Homepage project cards (`components/ui/project-card.tsx`): link to the internal case
  study **iff** that project's study is published; otherwise retain the current
  external/live link behaviour.

## Phasing (each = one shippable commit)

- **Phase A — Foundation + SEO**: `lib/site.ts`, `metadataBase` fix, `sitemap.ts`,
  `robots.ts`, JSON-LD, root `opengraph-image.tsx`. Needs no user input; fully
  verifiable (routes resolve, OG renders, sitemap/robots return valid output).
- **Phase B — Resume**: `resume.ts`, `/resume` page + its OG image, Download-CV buttons,
  `public/cv.pdf` wiring. Page ships even before the real PDF lands.
- **Phase C — Case studies**: `case-studies.ts`, `/projects/[slug]` route + template +
  per-slug OG, project-card linking, `published` gating. Ships MAAAL once real content
  is supplied; other slugs remain 404.

## Verification per phase

- Run dev server; confirm new routes render and old ones unbroken.
- `npm run lint`, `npm run typecheck`, `npm run build` pass.
- OG: fetch `/opengraph-image` (and per-route variants) renders a valid PNG.
- SEO: `/sitemap.xml` and `/robots.txt` return expected, well-formed output; published
  set matches the `published` flags.
- Case studies: published slug renders full template; unpublished slug returns 404 and
  is absent from sitemap and project-card links.

## Open dependencies (user-supplied, do not fabricate)

- `public/cv.pdf` (Phase B finish).
- Real MAAAL case-study facts: role, challenges, decisions, outcomes/metrics,
  screenshots (Phase C content). PageSpeed numbers may be measured live instead.
- Confirm OBM live link: production URL vs. App Store/avancer.ai instead of the dev URL.
- GitHub/LinkedIn URLs for JSON-LD `sameAs` if not already in the codebase.
