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
    offers: 'work with me',
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
    desc: 'i build production admin panels, dashboards, and mobile apps in react, next.js, and react native — with proper Arabic/RTL support most teams get wrong. 4 years shipping for fintech, SaaS, and e-commerce. available for freelance projects.',
    bookCall: 'book a call',
    viewWork: 'view work',
    emailMe: 'email me',
  },
  about: {
    kicker: '01 / about',
    title: 'about',
    im: "i'm metwally —",
    p1: 'first i was studying law. then i taught myself to code — one bootcamp and too many late nights later — and never looked back.',
    p2: 'today i build the dashboards SaaS teams actually run their business on: admin panels, internal tools, client portals — react, next.js, react native. 4 years in production for fintech, e-commerce, and Arabic-first platforms most teams get wrong.',
    p3: "i don't work backlog tickets. i take one dashboard, own it end to end, and ship it like it's my own product.",
    p4: "full-time employed, freelance on the side — which makes me picky about what i take on. if i say yes, it's because i actually want to build it.",
  },
  offers: {
    kicker: '02 / work with me',
    title: 'three ways in',
    subtitle: "small and scoped, or the full system — start wherever makes sense for you.",
    bestFor: 'best for',
    tiers: [
      {
        name: 'Dashboard Sprint',
        kind: 'one screen or module',
        desc: "a fixed-price, fixed-scope sprint — one dashboard screen, one broken flow fixed, one internal tool shipped. 1–2 weeks, no long contract. the easiest way to see how i work.",
        price: 'fixed price, per scope',
        bestForValue: 'a first project together',
      },
      {
        name: 'Full Dashboard Build',
        kind: 'end-to-end SaaS admin panel',
        desc: 'auth, roles, tables, charts, exports — a complete admin panel or client dashboard built in react/next.js, arabic/rtl-ready if you need it. this is the core of what i do.',
        price: 'project-based',
        bestForValue: "launching or rebuilding your product's dashboard",
      },
      {
        name: 'Dashboard + AI Systems',
        kind: 'ongoing partnership',
        desc: 'a monthly retainer covering dashboard maintenance and new features, plus ai automations layered on top — smart replies, workflow bots, data pipelines. for teams that want to keep shipping, not just launch once.',
        price: 'monthly retainer',
        bestForValue: 'a long-term technical partner',
      },
    ],
  },
  experience: {
    kicker: '03 / experience',
    title: 'the journey that shaped my work',
    subtitle: 'production frontend roles across fintech, SaaS, enterprise, and mobile products.',
    milestone: 'milestone',
  },
  projects: {
    kicker: '04 / projects',
    title: 'selected work',
    subtitle: 'production systems with live links, mobile apps, and measurable performance work.',
    featured: 'Featured',
    viewLive: 'view live',
    appStore: 'app store',
    playStore: 'play store',
    readCase: 'read case study →',
  },
  caseStudies: {
    kicker: '05 / case studies',
    title: 'selected case studies',
    subtitle: 'a few high-signal examples of problem, execution, and impact.',
    problem: 'Problem',
    work: 'What I did',
    impact: 'Impact',
  },
  skills: {
    kicker: '06 / skills',
    title: 'stack',
    subtitle: 'tools i reach for daily, in roughly that order.',
  },
  contact: {
    kicker: '07 / contact',
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
    offers: 'اشتغل معايا',
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
    desc: 'أبني admin panels ولوحات تحكم وتطبيقات جوال بـ React و Next.js و React Native — مع دعم عربي/RTL احترافي تخطئ فيه معظم الفرق. أربع سنوات من العمل الإنتاجي في التقنية المالية و SaaS والتجارة الإلكترونية. متاح لمشاريع العمل الحر.',
    bookCall: 'احجز مكالمة',
    viewWork: 'شاهد الأعمال',
    emailMe: 'راسلني',
  },
  about: {
    kicker: '٠١ / نبذة',
    title: 'نبذة',
    im: 'أنا متولي —',
    p1: 'الأول كنت بدرس قانون. بعدين علّمت نفسي البرمجة — bootcamp واحد وليالي سهر كتير — ومرجعتش تاني.',
    p2: 'دلوقتي بابني الـ dashboards اللي شركات SaaS بتدير بيها شغلها فعلاً: admin panels، أدوات داخلية، بوابات عملاء — بـ React و Next.js و React Native. أربع سنين شغل إنتاجي في fintech وتجارة إلكترونية ومنصات عربية أولاً معظم الفرق بتغلط فيها.',
    p3: 'مش بشتغل على تذاكر backlog. بآخد dashboard واحد، بامتلكه من الأول للآخر، وبسلّمه كإنه منتجي أنا.',
    p4: 'شغال full-time وباخد freelance على الجانب، وده بيخليني بختار اللي بشتغل عليه بعناية — لو قلت آه، يبقى ده لأني فعلاً عايز أبني الحاجة دي.',
  },
  offers: {
    kicker: '٠٢ / اشتغل معايا',
    title: 'ثلاث طرق نبدأ بيها',
    subtitle: 'صغيرة ومحددة النطاق، أو النظام كامل — ابدأ من حيث يناسبك.',
    bestFor: 'الأفضل لـ',
    tiers: [
      {
        name: 'Dashboard Sprint',
        kind: 'شاشة أو موديول واحد',
        desc: 'sprint محدد النطاق وبسعر ثابت — شاشة dashboard واحدة، أو إصلاح تدفق معطّل، أو أداة داخلية. من أسبوع لأسبوعين، من غير عقد طويل. أسهل طريقة تشوف بيها طريقة شغلي.',
        price: 'سعر ثابت حسب النطاق',
        bestForValue: 'أول مشروع مع بعض',
      },
      {
        name: 'Full Dashboard Build',
        kind: 'admin panel كامل لـ SaaS',
        desc: 'تسجيل دخول، صلاحيات، جداول، رسوم بيانية، تصدير بيانات — admin panel أو dashboard عملاء كامل بـ React/Next.js، جاهز لدعم العربي/RTL لو محتاجه. ده جوهر شغلي.',
        price: 'حسب المشروع',
        bestForValue: 'إطلاق أو إعادة بناء dashboard منتجك',
      },
      {
        name: 'Dashboard + AI Systems',
        kind: 'شراكة مستمرة',
        desc: 'اشتراك شهري يغطي صيانة الـ dashboard وميزات جديدة، بالإضافة لأتمتة بالذكاء الاصطناعي فوقه — ردود ذكية، بوتات لسير العمل، أنابيب بيانات. لفرق عايزة تستمر في التطوير مش بس تطلق مرة واحدة.',
        price: 'اشتراك شهري',
        bestForValue: 'شريك تقني طويل المدى',
      },
    ],
  },
  experience: {
    kicker: '٠٣ / الخبرات',
    title: 'الرحلة التي شكّلت عملي',
    subtitle: 'أدوار إنتاجية في الواجهات الأمامية عبر التقنية المالية و SaaS والمنتجات المؤسسية وتطبيقات الجوال.',
    milestone: 'محطة',
  },
  projects: {
    kicker: '٠٤ / الأعمال',
    title: 'أعمال مختارة',
    subtitle: 'أنظمة إنتاجية بروابط حية وتطبيقات جوال وأعمال أداء قابلة للقياس.',
    featured: 'مميّز',
    viewLive: 'معاينة مباشرة',
    appStore: 'آب ستور',
    playStore: 'جوجل بلاي',
    readCase: 'اقرأ دراسة الحالة →',
  },
  caseStudies: {
    kicker: '٠٥ / دراسات الحالة',
    title: 'دراسات حالة مختارة',
    subtitle: 'أمثلة مركّزة على المشكلة والتنفيذ والأثر.',
    problem: 'المشكلة',
    work: 'ما قمت به',
    impact: 'الأثر',
  },
  skills: {
    kicker: '٠٦ / المهارات',
    title: 'الأدوات',
    subtitle: 'الأدوات التي أستخدمها يوميًا، بهذا الترتيب تقريبًا.',
  },
  contact: {
    kicker: '٠٧ / تواصل',
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
