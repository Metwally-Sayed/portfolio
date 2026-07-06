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

export type SelectedCaseStudy = {
  title: string
  titleAr: string
  problem: string
  problemAr: string
  work: string
  workAr: string
  impact: string
  impactAr: string
  tags: string[]
}

export const selectedCaseStudies: SelectedCaseStudy[] = [
  {
    title: "MAAAL Capital Performance",
    titleAr: "أداء MAAAL Capital",
    problem: "Financial pages needed strong SEO, fast rendering, and reliable Arabic RTL support.",
    problemAr: "احتاجت الصفحات المالية إلى سيو قوي، وعرض سريع، ودعم عربي RTL موثوق.",
    work: "Used Next.js SSR, optimized rendering, cleaned frontend structure, improved Core Web Vitals, and maintained reusable components.",
    workAr: "استخدمت SSR في Next.js، وحسّنت العرض، ونظّفت بنية الواجهة، وحسّنت Core Web Vitals، وحافظت على مكوّنات قابلة لإعادة الاستخدام.",
    impact: "90+ Lighthouse SEO and 85+ Performance.",
    impactAr: "أكثر من 90 لسيو Lighthouse و85 للأداء.",
    tags: ["Next.js", "SSR", "Core Web Vitals", "Arabic RTL"],
  },
  {
    title: "Ads Management System",
    titleAr: "نظام إدارة الإعلانات",
    problem: "Business teams needed one dashboard to manage multiple ad placements.",
    problemAr: "احتاجت فرق الأعمال إلى لوحة واحدة لإدارة مواضع إعلانية متعددة.",
    work: "Built API-driven dashboard screens, reusable UI modules, placement management flows, and structured campaign setup.",
    workAr: "بنيت شاشات لوحة معتمدة على الـ APIs، ووحدات واجهة قابلة لإعادة الاستخدام، وتدفقات إدارة المواضع، وإعداد حملات منظّم.",
    impact: "Supported 12+ ad placements and centralized ad operations.",
    impactAr: "دعم أكثر من 12 موضعًا إعلانيًا وتوحيد عمليات الإعلانات.",
    tags: ["Dashboard", "REST APIs", "Reusable UI", "Operations"],
  },
  {
    title: "Wix to Next.js Migration",
    titleAr: "الترحيل من Wix إلى Next.js",
    problem: "Legacy Wix websites were slow, harder to maintain, and limited for SEO/performance.",
    problemAr: "كانت مواقع Wix القديمة بطيئة وأصعب في الصيانة ومحدودة للسيو والأداء.",
    work: "Migrated 6+ products to React, Next.js, Tailwind CSS, and reusable sections.",
    workAr: "رحّلت أكثر من 6 منتجات إلى React و Next.js و Tailwind CSS وأقسام قابلة لإعادة الاستخدام.",
    impact: "Improved page speed by up to 40% and made websites easier to scale.",
    impactAr: "حسّنت سرعة الصفحات بنسبة تصل إلى 40% وسهّلت توسّع المواقع.",
    tags: ["Migration", "Next.js", "Tailwind CSS", "SEO"],
  },
]

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
