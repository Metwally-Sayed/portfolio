# Portfolio Credibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add SEO primitives, dynamic OG images, a `/resume` page with downloadable CV, and `published`-gated case-study pages to the portfolio — each phase an independently shippable commit.

**Architecture:** A shared `lib/site.ts` constant drives `metadataBase` and all absolute URLs. SEO uses Next 16 file conventions (`sitemap.ts`, `robots.ts`) plus a JSON-LD `Person` component in the layout. OG images use the `opengraph-image.tsx` file convention with a shared inline-styled template. Case studies are static-generated from a `case-studies.ts` data file; unpublished slugs `notFound()` and are excluded from `generateStaticParams`, the sitemap, and project-card links.

**Tech Stack:** Next.js 16.1.7 (App Router), TypeScript, Tailwind v4, `next/og`. No unit-test runner is configured (per CLAUDE.md), so each task's verification gate is `npm run typecheck` + `npm run lint` + `npm run build`, plus browser-preview checks where a route renders.

> **API caveat:** `next/og` and Next metadata-route signatures change across versions. Before writing OG/sitemap/robots code, verify current signatures against https://nextjs.org/docs/app/api-reference/file-conventions/metadata — do not rely on memory. The code below reflects the Next 16 conventions but confirm `ImageResponse` import path and `MetadataRoute` shapes.

---

## File Structure

**Phase A — Foundation + SEO**
- Create `lib/site.ts` — `SITE_URL`, `SOCIALS`, `absoluteUrl()` helper. Single source for all URLs.
- Create `lib/og-template.tsx` — `OG_SIZE`, `OG_CONTENT_TYPE`, `OgCard({title, subtitle})` shared inline-styled card.
- Create `app/opengraph-image.tsx` — root OG image (name + role).
- Create `app/sitemap.ts` — sitemap from a routes list + published case studies.
- Create `app/robots.ts` — allow-all + sitemap reference.
- Create `components/person-jsonld.tsx` — `<script type="application/ld+json">` Person schema.
- Modify `app/layout.tsx` — add `metadataBase`, swap hardcoded OG url for `SITE_URL`, render `<PersonJsonLd/>`.

**Phase B — Resume**
- Create `lib/data/resume.ts` — typed resume content.
- Create `app/resume/page.tsx` — resume page + route metadata.
- Create `app/resume/opengraph-image.tsx` — resume OG image.
- Create `components/download-cv.tsx` — reusable "Download CV" link.
- Modify `components/header.tsx` — add Download-CV link to nav.
- Modify `components/sections/contact.tsx` — add Download-CV button.
- Add `public/cv.pdf` — placeholder until user supplies the real file.

**Phase C — Case studies**
- Create `lib/data/case-studies.ts` — typed case-study content keyed by project id, all `published: false`.
- Create `components/case-study.tsx` — reusable template component.
- Create `app/projects/[slug]/page.tsx` — route + `generateStaticParams` + metadata.
- Create `app/projects/[slug]/opengraph-image.tsx` — per-slug OG image.
- Modify `components/ui/project-card.tsx` — link to internal study when published.
- Modify `app/sitemap.ts` — include published case-study routes.

---

## Phase A — Foundation + SEO

### Task A1: Site constants

**Files:**
- Create: `lib/site.ts`

- [ ] **Step 1: Create the file**

```ts
export const SITE_URL = "https://metwally-sayed.vercel.app"

export const SOCIALS = {
  github: "https://github.com/Metwally-Sayed",
  linkedin: "https://linkedin.com/in/metwallysayed",
}

export const PERSON = {
  name: "Metwally Sayed",
  role: "Frontend Engineer",
  jobTitle: "Senior Frontend Engineer",
  location: "Cairo, Egypt",
  knowsAbout: [
    "React",
    "Next.js",
    "React Native",
    "TypeScript",
    "RTL / Arabic-first interfaces",
    "SSR",
  ],
}

export function absoluteUrl(path = ""): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: PASS (no errors).

- [ ] **Step 3: Commit**

```bash
git add lib/site.ts
git commit -m "feat: add site constants (SITE_URL, socials, person)"
```

### Task A2: Wire metadataBase and SITE_URL into layout

**Files:**
- Modify: `app/layout.tsx` (metadata object)

- [ ] **Step 1: Edit metadata**

Add the `SITE_URL` import and set `metadataBase`; replace the hardcoded `openGraph.url`.

```ts
import { SITE_URL } from "@/lib/site"
```

In the `metadata` object, add as the first field:

```ts
  metadataBase: new URL(SITE_URL),
```

And change `openGraph.url` from the literal string to:

```ts
    url: SITE_URL,
```

- [ ] **Step 2: Typecheck + build**

Run: `npm run typecheck && npm run build`
Expected: PASS. Build output lists `/` as a route with no metadata warnings.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "fix: set metadataBase and use SITE_URL for og:url"
```

### Task A3: JSON-LD Person schema

**Files:**
- Create: `components/person-jsonld.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { SITE_URL, SOCIALS, PERSON } from "@/lib/site"

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON.name,
    jobTitle: PERSON.jobTitle,
    url: SITE_URL,
    sameAs: [SOCIALS.github, SOCIALS.linkedin],
    knowsAbout: PERSON.knowsAbout,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

- [ ] **Step 2: Render it in layout**

In `app/layout.tsx`, import and render `<PersonJsonLd />` inside `<body>`, before `<ThemeProvider>`:

```tsx
import { PersonJsonLd } from "@/components/person-jsonld"
```

```tsx
      <body>
        <PersonJsonLd />
        <ThemeProvider>
```

- [ ] **Step 3: Typecheck + build, then verify in browser**

Run: `npm run typecheck && npm run build`
Expected: PASS.

Then start the preview and confirm the JSON-LD script is present in the DOM:
- preview_start, then preview_eval: `document.querySelector('script[type="application/ld+json"]').textContent`
- Expected: a JSON string containing `"@type":"Person"` and the GitHub/LinkedIn URLs.

- [ ] **Step 4: Commit**

```bash
git add components/person-jsonld.tsx app/layout.tsx
git commit -m "feat: add Person JSON-LD structured data"
```

### Task A4: robots.ts

**Files:**
- Create: `app/robots.ts`

- [ ] **Step 1: Create the file**

```ts
import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
```

- [ ] **Step 2: Build + verify**

Run: `npm run build`
Expected: build lists `/robots.txt` as a route.

Start preview, preview_eval: `await (await fetch('/robots.txt')).text()`
Expected: contains `User-Agent: *`, `Allow: /`, and `Sitemap: https://metwally-sayed.vercel.app/sitemap.xml`.

- [ ] **Step 3: Commit**

```bash
git add app/robots.ts
git commit -m "feat: add robots.txt"
```

### Task A5: sitemap.ts (routes list, case studies added in Phase C)

**Files:**
- Create: `app/sitemap.ts`

- [ ] **Step 1: Create the file**

```ts
import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticRoutes = ["", "/resume"]

  return staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }))
}
```

Note: `/resume` is listed now; it 404s until Phase B ships, which is acceptable for a
not-yet-deployed branch. Phase C appends published case studies here.

- [ ] **Step 2: Build + verify**

Run: `npm run build`
Expected: build lists `/sitemap.xml`.

Start preview, preview_eval: `await (await fetch('/sitemap.xml')).text()`
Expected: XML containing `<loc>https://metwally-sayed.vercel.app</loc>`.

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat: add sitemap.xml"
```

### Task A6: Shared OG template

**Files:**
- Create: `lib/og-template.tsx`

- [ ] **Step 1: Create the template**

`ImageResponse` renders a subset of CSS with inline styles only (no Tailwind, no CSS vars). Colors are hardcoded to match the site's dark theme.

```tsx
import { ImageResponse } from "next/og"

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = "image/png"

export function ogCard({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0a0a0a",
          color: "#ededed",
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 28, color: "#a1a1a1" }}>[ms]</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: "-0.02em" }}>
            {title}
          </div>
          <div style={{ fontSize: 32, color: "#a1a1a1", marginTop: 16 }}>
            {subtitle}
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#a1a1a1" }}>
          metwally-sayed.vercel.app
        </div>
      </div>
    ),
    { ...OG_SIZE }
  )
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add lib/og-template.tsx
git commit -m "feat: add shared OG image template"
```

### Task A7: Root OG image

**Files:**
- Create: `app/opengraph-image.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template"

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = "Metwally Sayed — Frontend Engineer"

export default function Image() {
  return ogCard({
    title: "Metwally Sayed",
    subtitle: "Senior Frontend Engineer · Cairo",
  })
}
```

- [ ] **Step 2: Build + verify the image renders**

Run: `npm run build`
Expected: build lists `/opengraph-image` as a route.

Start preview, preview_eval:
`(await fetch('/opengraph-image')).headers.get('content-type')`
Expected: `image/png`.

Optionally preview_screenshot of the rendered image route to eyeball the card.

- [ ] **Step 3: Commit**

```bash
git add app/opengraph-image.tsx
git commit -m "feat: add dynamic root OG image"
```

**Phase A complete:** SEO + OG foundation shipped. No user input was required.

---

## Phase B — Resume

### Task B1: Resume data

**Files:**
- Create: `lib/data/resume.ts`

- [ ] **Step 1: Create typed resume data**

Content below is structural scaffolding using facts already in the repo (role, location,
socials, project names). The user refines wording/dates later; no fabricated metrics.

```ts
export type ResumeExperience = {
  company: string
  role: string
  period: string
  points: string[]
}

export type Resume = {
  summary: string
  experience: ResumeExperience[]
  skills: string[]
  links: { label: string; href: string }[]
}

export const resume: Resume = {
  summary:
    "Senior frontend engineer based in Cairo, building fast, accessible web and mobile interfaces with React, Next.js and React Native — with deep experience in Arabic-first, RTL, high-traffic products.",
  experience: [
    {
      company: "MAAAL",
      role: "Frontend Engineer",
      period: "2025",
      points: [
        "Architected a high-traffic Arabic financial content platform with SSR-optimised pages.",
        "Built a CMS with 10+ content sections and an Ads Management System supporting 12+ placements.",
        "Delivered enterprise apps for the Riyadh Chamber of Commerce.",
      ],
    },
    {
      company: "Avancer AI",
      role: "Frontend Engineer",
      period: "2024",
      points: [
        "Built the OBM business-management SaaS dashboard with TanStack Query and a scalable UI architecture.",
        "Shipped a companion OBM React Native app to the App Store.",
        "Built the Avancer AI corporate website.",
      ],
    },
  ],
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "React Native",
    "Arabic RTL",
    "SSR",
    "TanStack Query",
    "Tailwind CSS",
  ],
  links: [
    { label: "github.com/Metwally-Sayed", href: "https://github.com/Metwally-Sayed" },
    { label: "linkedin.com/in/metwallysayed", href: "https://linkedin.com/in/metwallysayed" },
    { label: "metwallysayed1999@gmail.com", href: "mailto:metwallysayed1999@gmail.com" },
  ],
}
```

- [ ] **Step 2: Typecheck + commit**

Run: `npm run typecheck`
Expected: PASS.

```bash
git add lib/data/resume.ts
git commit -m "feat: add resume data"
```

### Task B2: Download-CV component + placeholder PDF

**Files:**
- Create: `components/download-cv.tsx`
- Add: `public/cv.pdf` (placeholder)

- [ ] **Step 1: Create a placeholder PDF**

Run (creates a minimal valid PDF placeholder so the link works before the real file lands):

```bash
printf '%%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]>>endobj\nxref\n0 4\n0000000000 65535 f \ntrailer<</Root 1 0 R/Size 4>>\nstartxref\n0\n%%%%EOF\n' > public/cv.pdf
```

Note: replace `public/cv.pdf` with the user's real CV before deploy.

- [ ] **Step 2: Create the component**

```tsx
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr"

export function DownloadCv({ className = "" }: { className?: string }) {
  return (
    <a
      href="/cv.pdf"
      download
      className={`text-xs inline-flex items-center gap-1 hover:underline underline-offset-4 ${className}`}
    >
      download cv <DownloadSimple size={13} />
    </a>
  )
}
```

- [ ] **Step 3: Typecheck + commit**

Run: `npm run typecheck`
Expected: PASS.

```bash
git add components/download-cv.tsx public/cv.pdf
git commit -m "feat: add Download CV component and placeholder PDF"
```

### Task B3: Resume page + OG

**Files:**
- Create: `app/resume/page.tsx`
- Create: `app/resume/opengraph-image.tsx`

- [ ] **Step 1: Create the page**

```tsx
import type { Metadata } from "next"
import Link from "next/link"
import { resume } from "@/lib/data/resume"
import { PERSON } from "@/lib/site"
import { DownloadCv } from "@/components/download-cv"

export const metadata: Metadata = {
  title: "Resume — Metwally Sayed",
  description: "Resume of Metwally Sayed, senior frontend engineer based in Cairo.",
}

export default function ResumePage() {
  return (
    <main className="max-w-[820px] mx-auto px-6 py-20">
      <div className="flex items-center justify-between mb-12">
        <Link href="/" className="text-xs text-muted-foreground hover:underline underline-offset-4">
          ← back
        </Link>
        <DownloadCv />
      </div>

      <h1 className="text-3xl font-semibold tracking-tight">{PERSON.name}</h1>
      <p className="text-sm text-muted-foreground mt-1">
        {PERSON.jobTitle} · {PERSON.location}
      </p>

      <p className="text-sm leading-[1.7] mt-8">{resume.summary}</p>

      <section className="mt-12">
        <h2 className="text-xs uppercase tracking-[0.08em] text-muted-foreground mb-5">
          Experience
        </h2>
        <div className="flex flex-col gap-8">
          {resume.experience.map((exp) => (
            <div key={exp.company}>
              <div className="flex items-baseline justify-between">
                <div className="text-base font-medium">
                  {exp.role} · {exp.company}
                </div>
                <div className="text-xs text-muted-foreground">{exp.period}</div>
              </div>
              <ul className="mt-3 flex flex-col gap-2">
                {exp.points.map((p) => (
                  <li key={p} className="text-sm text-muted-foreground leading-[1.65] pl-4 relative">
                    <span className="absolute left-0">–</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xs uppercase tracking-[0.08em] text-muted-foreground mb-5">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {resume.skills.map((s) => (
            <span
              key={s}
              className="text-[11px] py-1 px-2 border border-border rounded-[6px] text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xs uppercase tracking-[0.08em] text-muted-foreground mb-5">
          Links
        </h2>
        <div className="flex flex-col gap-2">
          {resume.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm hover:underline underline-offset-4 w-fit"
            >
              {l.label}
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Create the resume OG image**

```tsx
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template"

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = "Resume — Metwally Sayed"

export default function Image() {
  return ogCard({ title: "Resume", subtitle: "Metwally Sayed · Frontend Engineer" })
}
```

- [ ] **Step 3: Build + verify in browser**

Run: `npm run typecheck && npm run lint && npm run build`
Expected: PASS; build lists `/resume` and `/resume/opengraph-image`.

Start preview, navigate to `/resume`:
- preview_snapshot — confirm name, experience entries, skills, links, and the download-cv link render.
- preview_eval: `(await fetch('/cv.pdf')).headers.get('content-type')` → expect `application/pdf`.

- [ ] **Step 4: Commit**

```bash
git add app/resume/page.tsx app/resume/opengraph-image.tsx
git commit -m "feat: add resume page and OG image"
```

### Task B4: Download-CV in header and contact

**Files:**
- Modify: `components/header.tsx`
- Modify: `components/sections/contact.tsx`

- [ ] **Step 1: Add to header nav**

In `components/header.tsx`, import the component:

```tsx
import { DownloadCv } from "@/components/download-cv"
```

Inside `<nav>`, after the `navItems.map(...)` block and before the theme `<button>`, add:

```tsx
          <DownloadCv className="text-muted-foreground hover:text-foreground" />
```

- [ ] **Step 2: Add to contact section**

In `components/sections/contact.tsx`, import the component:

```tsx
import { DownloadCv } from "@/components/download-cv"
```

Render `<DownloadCv />` near the contact rows (place it after the contact rows list in the returned JSX; exact placement follows the section's existing layout container). Use:

```tsx
          <DownloadCv className="mt-6" />
```

- [ ] **Step 3: Build + verify**

Run: `npm run lint && npm run build`
Expected: PASS.

Start preview on `/`:
- preview_snapshot — confirm a "download cv" link appears in the header and in the contact section.
- preview_click the header download-cv link is not required; just confirm `href="/cv.pdf"` via preview_inspect or snapshot.

- [ ] **Step 4: Commit**

```bash
git add components/header.tsx components/sections/contact.tsx
git commit -m "feat: add Download CV to header and contact"
```

**Phase B complete:** Resume page + CV buttons shipped. User supplies real `public/cv.pdf` before deploy.

---

## Phase C — Case studies

### Task C1: Case-study data

**Files:**
- Create: `lib/data/case-studies.ts`

- [ ] **Step 1: Create typed data, all unpublished**

Keyed by the `id` values from `lib/data/projects.ts`. All `published: false` until the
user supplies real content. Empty arrays are intentional placeholders — the gate keeps
them off the live site.

```ts
export type CaseStudy = {
  slug: string
  published: boolean
  role: string
  context: string
  challenges: string[]
  decisions: string[]
  outcomes: string[]
  screenshots: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "maaal",
    published: false,
    role: "",
    context: "",
    challenges: [],
    decisions: [],
    outcomes: [],
    screenshots: [],
  },
  {
    slug: "obm",
    published: false,
    role: "",
    context: "",
    challenges: [],
    decisions: [],
    outcomes: [],
    screenshots: [],
  },
]

export function getPublishedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((c) => c.published)
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug && c.published)
}
```

- [ ] **Step 2: Typecheck + commit**

Run: `npm run typecheck`
Expected: PASS.

```bash
git add lib/data/case-studies.ts
git commit -m "feat: add case-study data structure (all unpublished)"
```

### Task C2: Case-study template component

**Files:**
- Create: `components/case-study.tsx`

- [ ] **Step 1: Create the template**

Takes a `CaseStudy` plus the matching `Project` (for name/year/kind/stack/links).

```tsx
import Link from "next/link"
import type { CaseStudy } from "@/lib/data/case-studies"
import type { Project } from "@/lib/data/projects"

function Block({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null
  return (
    <section className="mt-12">
      <h2 className="text-xs uppercase tracking-[0.08em] text-muted-foreground mb-5">
        {title}
      </h2>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="text-sm text-muted-foreground leading-[1.7] pl-4 relative">
            <span className="absolute left-0">–</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function CaseStudyView({
  study,
  project,
}: {
  study: CaseStudy
  project: Project
}) {
  return (
    <main className="max-w-[820px] mx-auto px-6 py-20">
      <Link href="/#projects" className="text-xs text-muted-foreground hover:underline underline-offset-4">
        ← projects
      </Link>

      <div className="text-[10px] text-muted-foreground tracking-[0.06em] uppercase mt-10">
        {project.year} / {project.kind}
      </div>
      <h1 className="text-3xl font-semibold tracking-tight mt-2">{project.name}</h1>
      {study.role && <p className="text-sm text-muted-foreground mt-1">{study.role}</p>}

      <div className="flex gap-2 flex-wrap mt-5">
        {project.tags.map((t) => (
          <span
            key={t}
            className="text-[10px] py-[2px] px-[7px] border border-border rounded-[6px] text-muted-foreground"
          >
            [{t}]
          </span>
        ))}
      </div>

      {study.context && (
        <p className="text-sm leading-[1.7] mt-10">{study.context}</p>
      )}

      <Block title="Challenges" items={study.challenges} />
      <Block title="Decisions & trade-offs" items={study.decisions} />
      <Block title="Outcomes" items={study.outcomes} />

      {study.screenshots.length > 0 && (
        <section className="mt-12 flex flex-col gap-6">
          {study.screenshots.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt={`${project.name} screenshot`} className="w-full border border-border rounded-[10px]" />
          ))}
        </section>
      )}

      <div className="flex gap-4 mt-12 pt-6 border-t border-border">
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" className="text-xs hover:underline underline-offset-4">
            view live →
          </a>
        )}
        {project.appStore && (
          <a href={project.appStore} target="_blank" rel="noreferrer" className="text-xs hover:underline underline-offset-4">
            app store →
          </a>
        )}
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Typecheck + commit**

Run: `npm run typecheck`
Expected: PASS.

```bash
git add components/case-study.tsx
git commit -m "feat: add case-study template component"
```

### Task C3: Case-study route + per-slug OG

**Files:**
- Create: `app/projects/[slug]/page.tsx`
- Create: `app/projects/[slug]/opengraph-image.tsx`

- [ ] **Step 1: Create the route**

`params` is a Promise in Next 16 — await it. Unpublished/unknown slug → `notFound()`.

```tsx
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { caseStudies, getCaseStudy } from "@/lib/data/case-studies"
import { projects } from "@/lib/data/projects"
import { CaseStudyView } from "@/components/case-study"

export function generateStaticParams() {
  return caseStudies.filter((c) => c.published).map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.id === slug)
  if (!project) return {}
  return {
    title: `${project.name} — Case Study`,
    description: project.desc,
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  const project = projects.find((p) => p.id === slug)
  if (!study || !project) notFound()
  return <CaseStudyView study={study} project={project} />
}
```

- [ ] **Step 2: Create the per-slug OG image**

```tsx
import { notFound } from "next/navigation"
import { getCaseStudy } from "@/lib/data/case-studies"
import { projects } from "@/lib/data/projects"
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-template"

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = "Case Study — Metwally Sayed"

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  const project = projects.find((p) => p.id === slug)
  if (!study || !project) notFound()
  return ogCard({ title: project.name, subtitle: project.kind })
}
```

- [ ] **Step 3: Build + verify gating**

Run: `npm run typecheck && npm run lint && npm run build`
Expected: PASS. Because all studies are `published: false`, `generateStaticParams`
returns empty and no `/projects/*` pages are prerendered.

Start preview, preview_eval: `(await fetch('/projects/maaal')).status`
Expected: `404` (unpublished).

- [ ] **Step 4: Commit**

```bash
git add app/projects/[slug]/page.tsx app/projects/[slug]/opengraph-image.tsx
git commit -m "feat: add case-study route and per-slug OG (published-gated)"
```

### Task C4: Link project cards to published studies

**Files:**
- Modify: `components/ui/project-card.tsx`

- [ ] **Step 1: Add a published-aware internal link**

Import the lookup at the top of `components/ui/project-card.tsx`:

```tsx
import Link from "next/link"
import { getCaseStudy } from "@/lib/data/case-studies"
```

In `ProjectCard`, compute whether a published study exists and render a "read case study"
internal link in the links row (the `<div>` with `border-t`), before the existing
`project.live` link:

```tsx
  const study = getCaseStudy(project.id)
```

```tsx
        <div className="flex gap-[14px] mt-4 pt-4 border-t border-border">
          {study && (
            <Link
              href={`/projects/${project.id}`}
              className="text-[11px] text-foreground inline-flex items-center gap-1 hover:underline underline-offset-4"
            >
              read case study →
            </Link>
          )}
          {project.live && (
            <ProjectLink href={project.live} label="view live" />
          )}
          {project.appStore && (
            <ProjectLink href={project.appStore} label="app store" />
          )}
          {project.playStore && (
            <ProjectLink href={project.playStore} label="play store" />
          )}
        </div>
```

- [ ] **Step 2: Build + verify no card shows the link yet**

Run: `npm run lint && npm run build`
Expected: PASS.

Start preview on `/`, preview_snapshot of the projects section.
Expected: no "read case study" link appears (all studies unpublished). This confirms the
gate works end-to-end.

- [ ] **Step 3: Commit**

```bash
git add components/ui/project-card.tsx
git commit -m "feat: link project cards to published case studies"
```

### Task C5: Add published case studies to sitemap

**Files:**
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Append published case-study routes**

Replace the body of `sitemap()` in `app/sitemap.ts` with:

```ts
import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { getPublishedCaseStudies } from "@/lib/data/case-studies"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticRoutes = ["", "/resume"]

  const staticEntries = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }))

  const caseStudyEntries = getPublishedCaseStudies().map((c) => ({
    url: `${SITE_URL}/projects/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...caseStudyEntries]
}
```

- [ ] **Step 2: Build + verify**

Run: `npm run build`
Expected: PASS.

Start preview, preview_eval: `await (await fetch('/sitemap.xml')).text()`
Expected: contains `/` and `/resume`, and NO `/projects/*` entries (none published yet).

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat: include published case studies in sitemap"
```

**Phase C complete:** Case-study system shipped and fully gated. Publishing MAAAL later is
a data-only change: fill its fields in `case-studies.ts` and set `published: true`.

---

## Post-implementation (user-supplied, do not fabricate)

- Replace `public/cv.pdf` with the real CV.
- Fill MAAAL's fields in `lib/data/case-studies.ts` (role, context, challenges, decisions,
  outcomes, screenshots) and set `published: true`. PageSpeed numbers can be measured live.
- Decide OBM's live link (production URL vs. App Store/avancer.ai) before publishing its study.
- Swap `SITE_URL` in `lib/site.ts` when the custom domain is connected.

## Final verification (whole branch)

- [ ] `npm run typecheck` — PASS
- [ ] `npm run lint` — PASS
- [ ] `npm run build` — PASS, no metadata warnings
- [ ] Preview: `/`, `/resume` render; `/projects/maaal` returns 404; `/sitemap.xml`,
      `/robots.txt`, `/opengraph-image` return valid output.
