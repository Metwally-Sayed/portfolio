'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

export type Locale = 'en' | 'ar'

type LocaleCtx = {
  locale: Locale
  setLocale: (l: Locale) => void
  toggle: () => void
}

const LocaleContext = createContext<LocaleCtx | null>(null)
const STORAGE_KEY = 'locale'

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  // restore saved choice on mount (SSR renders 'en' first, then flips — same as theme)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'ar' || saved === 'en') setLocaleState(saved)
  }, [])

  useEffect(() => {
    const el = document.documentElement
    el.lang = locale
    el.dir = locale === 'ar' ? 'rtl' : 'ltr'
  }, [locale])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    localStorage.setItem(STORAGE_KEY, l)
  }, [])

  const toggle = useCallback(
    () => setLocale(locale === 'ar' ? 'en' : 'ar'),
    [locale, setLocale]
  )

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggle }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}

/** pick a translated string, falling back to English if the Arabic is missing */
export function pick(locale: Locale, en: string, ar?: string) {
  return locale === 'ar' && ar ? ar : en
}

// ponytail: client-side toggle, not separate /ar URLs. Good enough for the RTL demo;
// upgrade to Next.js locale routing later if the Arabic pages need their own SEO.
const en = {
  nav: {
    about: 'about',
    experience: 'experience',
    projects: 'projects',
    skills: 'skills',
    contact: 'contact',
  },
  hero: {
    role: 'Metwally Sayed · Cairo, Egypt',
    h1a: 'Senior Frontend',
    h1b: 'Engineer',
    tagline: 'building fast, accessible React & Next.js products.',
    desc: 'i build production websites, dashboards, and mobile apps in react, next.js, and react native — with proper Arabic/RTL support most teams get wrong. 4 years shipping for fintech, SaaS, and e-commerce. available for freelance projects.',
    bookCall: 'book a call',
    viewWork: 'view work',
    emailMe: 'email me',
  },
  about: {
    kicker: '01 / about',
    title: 'about',
    im: "i'm metwally —",
    p1: 'a senior frontend engineer based in cairo, focused on shipping fast, accessible interfaces for the web and mobile.',
    p2: "i've spent the last 4+ years building production systems — Arabic-first fintech platforms, SaaS dashboards, e-commerce products, enterprise apps, and mobile workflows — with react, next.js and react native.",
    p3: 'i care about details that compound: clean code, useful animation, tiny bundle sizes, lighthouse scores in the nineties.',
  },
  experience: {
    kicker: '02 / experience',
    title: 'the journey that shaped my work',
    subtitle: 'production frontend roles across fintech, SaaS, enterprise, and mobile products.',
    milestone: 'milestone',
  },
  projects: {
    kicker: '03 / projects',
    title: 'selected work',
    subtitle: 'production systems with live links, mobile apps, and measurable performance work.',
    featured: 'Featured',
    viewLive: 'view live',
    appStore: 'app store',
    playStore: 'play store',
    readCase: 'read case study →',
  },
  caseStudies: {
    kicker: '04 / case studies',
    title: 'selected case studies',
    subtitle: 'a few high-signal examples of problem, execution, and impact.',
    problem: 'Problem',
    work: 'What I did',
    impact: 'Impact',
  },
  skills: {
    kicker: '05 / skills',
    title: 'stack',
    subtitle: 'tools i reach for daily, in roughly that order.',
  },
  contact: {
    kicker: '06 / contact',
    heading: "let's build something.",
    email: 'email',
    linkedin: 'linkedin',
    github: 'github',
    location: 'location',
    locationValue: 'cairo, egypt · open to remote',
  },
  common: {
    downloadCv: 'download cv',
    availability: 'available for freelance & remote work',
    footerBuilt: 'built with next.js · cairo',
    footerTheme: 'to toggle theme',
    footerThemePrefix: 'press',
    copyright: '© 2026 metwally sayed',
    langLabel: 'ع',
    langAria: 'switch to arabic',
  },
}

type Dict = typeof en

const ar: Dict = {
  nav: {
    about: 'نبذة',
    experience: 'الخبرات',
    projects: 'الأعمال',
    skills: 'المهارات',
    contact: 'تواصل',
  },
  hero: {
    role: 'متولي سيد · القاهرة، مصر',
    h1a: 'مهندس واجهات',
    h1b: 'أمامية أول',
    tagline: 'أبني منتجات React و Next.js سريعة وسهلة الوصول.',
    desc: 'أبني مواقع ولوحات تحكم وتطبيقات جوال بـ React و Next.js و React Native — مع دعم عربي/RTL احترافي تخطئ فيه معظم الفرق. أربع سنوات من العمل الإنتاجي في التقنية المالية و SaaS والتجارة الإلكترونية. متاح لمشاريع العمل الحر.',
    bookCall: 'احجز مكالمة',
    viewWork: 'شاهد الأعمال',
    emailMe: 'راسلني',
  },
  about: {
    kicker: '٠١ / نبذة',
    title: 'نبذة',
    im: 'أنا متولي —',
    p1: 'مهندس واجهات أمامية أول مقيم في القاهرة، أركّز على تسليم واجهات سريعة وسهلة الوصول للويب والجوال.',
    p2: 'قضيت أكثر من 4 سنوات في بناء أنظمة إنتاجية — منصات مالية عربية أولاً، ولوحات تحكم SaaS، ومنتجات تجارة إلكترونية، وتطبيقات مؤسسية، وتدفقات عمل للجوال — باستخدام React و Next.js و React Native.',
    p3: 'أهتم بالتفاصيل التي تتراكم: كود نظيف، وحركات مفيدة، وأحجام حزم صغيرة، ودرجات Lighthouse في التسعينات.',
  },
  experience: {
    kicker: '٠٢ / الخبرات',
    title: 'الرحلة التي شكّلت عملي',
    subtitle: 'أدوار إنتاجية في الواجهات الأمامية عبر التقنية المالية و SaaS والمنتجات المؤسسية وتطبيقات الجوال.',
    milestone: 'محطة',
  },
  projects: {
    kicker: '٠٣ / الأعمال',
    title: 'أعمال مختارة',
    subtitle: 'أنظمة إنتاجية بروابط حية وتطبيقات جوال وأعمال أداء قابلة للقياس.',
    featured: 'مميّز',
    viewLive: 'معاينة مباشرة',
    appStore: 'آب ستور',
    playStore: 'جوجل بلاي',
    readCase: 'اقرأ دراسة الحالة →',
  },
  caseStudies: {
    kicker: '٠٤ / دراسات الحالة',
    title: 'دراسات حالة مختارة',
    subtitle: 'أمثلة مركّزة على المشكلة والتنفيذ والأثر.',
    problem: 'المشكلة',
    work: 'ما قمت به',
    impact: 'الأثر',
  },
  skills: {
    kicker: '٠٥ / المهارات',
    title: 'الأدوات',
    subtitle: 'الأدوات التي أستخدمها يوميًا، بهذا الترتيب تقريبًا.',
  },
  contact: {
    kicker: '٠٦ / تواصل',
    heading: 'لنبنِ شيئًا معًا.',
    email: 'البريد',
    linkedin: 'لينكدإن',
    github: 'جيت​هب',
    location: 'الموقع',
    locationValue: 'القاهرة، مصر · متاح للعمل عن بُعد',
  },
  common: {
    downloadCv: 'تحميل السيرة',
    availability: 'متاح للعمل الحر والعمل عن بُعد',
    footerBuilt: 'بُني بـ Next.js · القاهرة',
    footerTheme: 'لتبديل السمة',
    footerThemePrefix: 'اضغط',
    copyright: '© 2026 متولي سيد',
    langLabel: 'EN',
    langAria: 'التبديل إلى الإنجليزية',
  },
}

export const dict: Record<Locale, Dict> = { en, ar }

// skill group headings (keys match lib/data/skills.ts); tech tags stay in English
export const skillGroupAr: Record<string, string> = {
  Frameworks: 'أطر العمل',
  Languages: 'اللغات',
  Styling: 'التنسيق',
  Data: 'البيانات',
  Enterprise: 'المؤسسات',
  'Backend & APIs': 'الخلفية و APIs',
  'Engineering Practices': 'ممارسات الهندسة',
}
