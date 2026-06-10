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
