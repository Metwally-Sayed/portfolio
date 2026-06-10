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
