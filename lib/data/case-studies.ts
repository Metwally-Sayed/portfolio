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
