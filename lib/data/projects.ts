export type Project = {
  id: string
  name: string
  year: string
  kind: string
  desc: string
  tags: string[]
  live: string | null
  appStore: string | null
  playStore: string | null
  label: string
  featured?: boolean
  stats?: string
}

export const projects: Project[] = [
  {
    id: "maaal",
    name: "MAAAL",
    year: "2025",
    kind: "Fintech · Web Platform",
    featured: true,
    stats: "90+ Lighthouse SEO · 85+ Performance",
    desc: "High-traffic Arabic financial content platform. Architected CMS with 10+ content sections, built Ads Management System supporting 12+ placements, and delivered enterprise apps for the Riyadh Chamber of Commerce.",
    tags: ["Next.js", "TypeScript", "SSR", "Arabic RTL", "CMS"],
    live: "https://maaal.com",
    appStore: null,
    playStore: null,
    label: "maaal.com",
  },
  {
    id: "maaal-capital",
    name: "MAAAL Capital",
    year: "2025",
    kind: "Fintech · Capital Platform",
    desc: "Dedicated capital markets platform under the MAAAL umbrella — covering stocks, funds, and financial instruments with full Arabic RTL support and SSR-optimised pages.",
    tags: ["Next.js", "TypeScript", "SSR", "Arabic RTL"],
    live: "https://capital.maaal.com",
    appStore: null,
    playStore: null,
    label: "capital.maaal.com",
  },
  {
    id: "avancer",
    name: "Avancer AI",
    year: "2024",
    kind: "SaaS · Company Website",
    desc: "Corporate website for Avancer AI — the company behind the OBM platform. Built with performance and brand consistency in mind.",
    tags: ["React", "TypeScript"],
    live: "https://www.avancer.ai",
    appStore: null,
    playStore: null,
    label: "avancer.ai",
  },
  {
    id: "obm",
    name: "OBM",
    year: "2024",
    kind: "SaaS · Dashboard",
    desc: "Business management SaaS platform with TanStack Query data-fetching, scalable UI architecture, and a companion React Native app on the App Store.",
    tags: ["React", "TanStack Query", "SaaS", "React Native"],
    live: "https://dev.obm.avancer.ai/en",
    appStore: "https://apps.apple.com/us/app/obm/id6740640541",
    playStore: null,
    label: "dev.obm.avancer.ai",
  },
  {
    id: "maqsafy",
    name: "Maqsafy",
    year: "2023",
    kind: "E-commerce · Web + Mobile",
    desc: "Full e-commerce platform — React web storefront with a shared-codebase React Native mobile app shipped to both Play Store and App Store.",
    tags: ["React", "React Native", "iOS", "Android"],
    live: "https://www.maqsafy.com",
    appStore: "https://apps.apple.com/gb/app/مقصفي/id1493287507",
    playStore: "https://play.google.com/store/apps/details?id=com.maqsafy&hl=ar",
    label: "maqsafy.com",
  },
  {
    id: "wasl",
    name: "Wasl ERP",
    year: "2023",
    kind: "ERP · Mobile",
    desc: "Cross-platform ERP mobile app. Shared React Native codebase delivering inventory, invoicing, and multi-tenant support on Android.",
    tags: ["React Native", "ERP", "Android"],
    live: "https://www.waslerp.com",
    appStore: null,
    playStore: "https://play.google.com/store/apps/details?id=com.waslapps&hl=ar",
    label: "waslerp.com",
  },
]
