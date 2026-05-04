export type Project = {
  name: string
  year: string
  kind: string
  desc: string
  tags: string[]
  live: string | null
  appStore: string | null
  accent: string
  label: string
}

export const projects: Project[] = [
  {
    name: 'MAAAL',
    year: '2024',
    kind: 'fintech',
    desc: 'arabic-first fintech platform. next.js ssr, cms with 10+ sections, ads system across 12+ placements, 90+ lighthouse seo.',
    tags: ['next.js', 'ssr', 'cms', 'arabic'],
    live: 'https://maaal.com',
    appStore: null,
    accent: 'oklch(0.97 0 0)',
    label: 'maaal.com',
  },
  {
    name: 'OBM Avancer',
    year: '2024',
    kind: 'saas dashboard',
    desc: 'saas business management dashboard. react + tanstack query, real-time data, ios companion app on the app store.',
    tags: ['react', 'tanstack query', 'ios'],
    live: 'https://dev.obm.avancer.ai',
    appStore: 'https://apps.apple.com/us/app/obm/id6740640541',
    accent: 'oklch(0.96 0 0)',
    label: 'dev.obm.avancer.ai',
  },
  {
    name: 'Maqsafy',
    year: '2023',
    kind: 'e-commerce',
    desc: 'e-commerce platform — react web storefront and a react native mobile app shipped to play store + app store.',
    tags: ['react', 'react native', 'ios', 'android'],
    live: 'https://maqsafy.com',
    appStore: null,
    accent: 'oklch(0.95 0 0)',
    label: 'maqsafy.com',
  },
  {
    name: 'Wasl ERP',
    year: '2023',
    kind: 'erp',
    desc: 'cross-platform erp system. react native build for android, deployed to play store. inventory, invoicing, multi-tenant.',
    tags: ['react native', 'android', 'erp'],
    live: 'https://waslerp.com',
    appStore: null,
    accent: 'oklch(0.94 0 0)',
    label: 'waslerp.com',
  },
]
