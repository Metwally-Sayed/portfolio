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
