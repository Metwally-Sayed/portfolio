export type ResumeExperience = {
  company: string
  role: string
  roleAr: string
  location: string
  locationAr: string
  period: string
  periodAr: string
  points: string[]
  pointsAr: string[]
}

export type Resume = {
  summary: string
  experience: ResumeExperience[]
  skills: string[]
  links: { label: string; href: string }[]
}

export const resume: Resume = {
  summary:
    "Senior frontend engineer based in Cairo, building fast, accessible web and mobile interfaces with React, Next.js and React Native — with deep experience in Arabic-first RTL, fintech, SaaS, e-commerce, and enterprise products.",
  experience: [
    {
      company: "MAAAL",
      role: "Software Developer",
      roleAr: "مطوّر برمجيات",
      location: "Remote, Saudi Arabia",
      locationAr: "عن بُعد، السعودية",
      period: "Dec 2025 – Present",
      periodAr: "ديسمبر 2025 – حتى الآن",
      points: [
        "Built production web apps for MAAAL, MAAAL Capital, and Riyadh Chamber.",
        "Built Arabic CMS/admin dashboard with 10+ content sections.",
        "Built Ads Management System with 12+ placements.",
        "Maintained capital.maaal.com with 90+ SEO and 85+ Performance Lighthouse scores.",
        "Used React, Next.js, TypeScript, SSR, REST APIs, Arabic RTL, GitHub Actions, and Vercel CI/CD.",
      ],
      pointsAr: [
        "بنيت تطبيقات ويب إنتاجية لـ MAAAL و MAAAL Capital و Riyadh Chamber.",
        "بنيت نظام إدارة محتوى/لوحة تحكم عربية بأكثر من 10 أقسام.",
        "بنيت نظام إدارة إعلانات بأكثر من 12 موضعًا.",
        "حافظت على capital.maaal.com بدرجات Lighthouse تتجاوز 90 للسيو و85 للأداء.",
        "استخدمت React و Next.js و TypeScript و SSR و REST APIs والعربية RTL و GitHub Actions و Vercel CI/CD.",
      ],
    },
    {
      company: "Eco Digital Solutions",
      role: "Software Developer",
      roleAr: "مطوّر برمجيات",
      location: "Egypt",
      locationAr: "مصر",
      period: "Dec 2024 – Dec 2025",
      periodAr: "ديسمبر 2024 – ديسمبر 2025",
      points: [
        "Built Arabian-Fal data dashboard with 15+ tables, charts, and filters.",
        "Delivered Avancer AI landing pages.",
        "Built OBM dashboard features using TanStack Query, GraphQL, and REST APIs.",
        "Added Jest and React Testing Library tests.",
        "Built ECO-Facility asset management system using SAP UI5 and SAP Fiori.",
      ],
      pointsAr: [
        "بنيت لوحة بيانات Arabian-Fal بأكثر من 15 جدولًا ومخططًا ومرشحًا.",
        "سلّمت صفحات هبوط Avancer AI.",
        "بنيت ميزات لوحة OBM باستخدام TanStack Query و GraphQL و REST APIs.",
        "أضفت اختبارات Jest و React Testing Library.",
        "بنيت نظام إدارة أصول ECO-Facility باستخدام SAP UI5 و SAP Fiori.",
      ],
    },
    {
      company: "Dafaa",
      role: "Software Developer",
      roleAr: "مطوّر برمجيات",
      location: "Remote, Saudi Arabia",
      locationAr: "عن بُعد، السعودية",
      period: "Oct 2023 – Nov 2024",
      periodAr: "أكتوبر 2023 – نوفمبر 2024",
      points: [
        "Migrated 6+ Wix products to a custom React, Next.js, and Tailwind CSS stack.",
        "Improved page speed by up to 40%.",
        "Delivered Dafa, Masarat, Creative Core, and Geftar.",
        "Worked on Maqsafy, Wsal, and Riyadh Schools Almalqa React Native apps.",
      ],
      pointsAr: [
        "رحّلت أكثر من 6 منتجات من Wix إلى حزمة مخصصة بـ React و Next.js و Tailwind CSS.",
        "حسّنت سرعة الصفحات بنسبة تصل إلى 40%.",
        "سلّمت Dafa و Masarat و Creative Core و Geftar.",
        "عملت على تطبيقات Maqsafy و Wsal و Riyadh Schools Almalqa بـ React Native.",
      ],
    },
    {
      company: "Suvidha Foundation",
      role: "Frontend Developer",
      roleAr: "مطوّر واجهات أمامية",
      location: "Remote, India",
      locationAr: "عن بُعد، الهند",
      period: "Oct 2022 – Sep 2023",
      periodAr: "أكتوبر 2022 – سبتمبر 2023",
      points: [
        "Built Booksportz admin and supplier portals across 8+ modules.",
        "Used React, JavaScript, MUI, Redux, Apollo Client, and GraphQL.",
        "Built reusable forms, tables, dashboards, and data-driven screens.",
      ],
      pointsAr: [
        "بنيت بوابات مشرفي ومورّدي Booksportz عبر أكثر من 8 وحدات.",
        "استخدمت React و JavaScript و MUI و Redux و Apollo Client و GraphQL.",
        "بنيت نماذج وجداول ولوحات وشاشات معتمدة على البيانات قابلة لإعادة الاستخدام.",
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
    "REST APIs",
    "GraphQL",
    "Jest",
    "React Testing Library",
    "GitHub Actions",
    "Vercel CI/CD",
  ],
  links: [
    { label: "github.com/Metwally-Sayed", href: "https://github.com/Metwally-Sayed" },
    { label: "linkedin.com/in/metwallysayed", href: "https://linkedin.com/in/metwallysayed" },
    { label: "metwallysayed1999@gmail.com", href: "mailto:metwallysayed1999@gmail.com" },
  ],
}
