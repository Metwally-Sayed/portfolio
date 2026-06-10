import Link from "next/link"
import type { CaseStudy } from "@/lib/data/case-studies"
import type { Project } from "@/lib/data/projects"

function Block({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null
  return (
    <section className="mt-12">
      <h2 className="text-xs uppercase tracking-[0.08em] text-muted-foreground mb-5">
        {title}
      </h2>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="text-sm text-muted-foreground leading-[1.7] pl-4 relative">
            <span className="absolute left-0">–</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function CaseStudyView({
  study,
  project,
}: {
  study: CaseStudy
  project: Project
}) {
  return (
    <main className="max-w-[820px] mx-auto px-6 py-20">
      <Link href="/#projects" className="text-xs text-muted-foreground hover:underline underline-offset-4">
        ← projects
      </Link>

      <div className="text-[10px] text-muted-foreground tracking-[0.06em] uppercase mt-10">
        {project.year} / {project.kind}
      </div>
      <h1 className="text-3xl font-semibold tracking-tight mt-2">{project.name}</h1>
      {study.role && <p className="text-sm text-muted-foreground mt-1">{study.role}</p>}

      <div className="flex gap-2 flex-wrap mt-5">
        {project.tags.map((t) => (
          <span
            key={t}
            className="text-[10px] py-[2px] px-[7px] border border-border rounded-[6px] text-muted-foreground"
          >
            [{t}]
          </span>
        ))}
      </div>

      {study.context && (
        <p className="text-sm leading-[1.7] mt-10">{study.context}</p>
      )}

      <Block title="Challenges" items={study.challenges} />
      <Block title="Decisions & trade-offs" items={study.decisions} />
      <Block title="Outcomes" items={study.outcomes} />

      {study.screenshots.length > 0 && (
        <section className="mt-12 flex flex-col gap-6">
          {study.screenshots.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt={`${project.name} screenshot`} className="w-full border border-border rounded-[10px]" />
          ))}
        </section>
      )}

      <div className="flex gap-4 mt-12 pt-6 border-t border-border">
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" className="text-xs hover:underline underline-offset-4">
            view live →
          </a>
        )}
        {project.appStore && (
          <a href={project.appStore} target="_blank" rel="noreferrer" className="text-xs hover:underline underline-offset-4">
            app store →
          </a>
        )}
      </div>
    </main>
  )
}
