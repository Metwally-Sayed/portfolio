import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { caseStudies, getCaseStudy } from "@/lib/data/case-studies"
import { projects } from "@/lib/data/projects"
import { CaseStudyView } from "@/components/case-study"

export function generateStaticParams() {
  return caseStudies.filter((c) => c.published).map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.id === slug)
  if (!project) return {}
  return {
    title: `${project.name} — Case Study`,
    description: project.desc,
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  const project = projects.find((p) => p.id === slug)
  if (!study || !project) notFound()
  return <CaseStudyView study={study} project={project} />
}
