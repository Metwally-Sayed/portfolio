'use client'

import { useEffect, useRef } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { gsap } from '@/lib/gsap'
import { projects } from '@/lib/data/projects'
import { ProjectCard, ProjectPreview } from '@/components/ui/project-card'
import { EncryptedText } from '@/components/ui/encrypted-text'
import type { Project } from '@/lib/data/projects'
import { dict, pick, useLocale } from '@/lib/i18n'

function Tag({ children }: { children: string }) {
  return (
    <span className="text-[11px] py-[2px] px-[7px] border border-border rounded-[6px] text-muted-foreground font-mono transition-colors duration-150 hover:border-foreground hover:text-foreground">
      [{children}]
    </span>
  )
}

function FeaturedCard({ project }: { project: Project }) {
  const { locale } = useLocale()
  const t = dict[locale]
  return (
    <article className="group border border-border rounded-[10px] overflow-hidden bg-card mb-4">
      <div className="flex max-[720px]:flex-col">
        {/* Left side — 60% */}
        <div className="flex flex-col justify-between p-7 max-[720px]:p-5" style={{ flex: '0 0 60%' }}>
          <div>
            <div className="text-[11px] text-muted-foreground tracking-[0.06em] uppercase mb-3">
              {project.year} / {pick(locale, project.kind, project.kindAr)}
            </div>
            <div className="text-[40px] font-semibold tracking-[-0.02em] leading-[1.1]">
              {project.name}
            </div>
            {project.stats && (
              <div className="text-[12px] text-muted-foreground mt-2 font-mono">
                {project.stats}
              </div>
            )}
            <div className="text-[15px] text-muted-foreground leading-[1.65] mt-4">
              {pick(locale, project.desc, project.descAr)}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex gap-[6px] flex-wrap mb-5">
              {project.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            <div className="flex gap-[14px] pt-4 border-t border-border">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[12px] text-foreground inline-flex items-center gap-1 hover:underline underline-offset-4"
                >
                  {t.projects.viewLive} <ArrowUpRight size={12} />
                </a>
              )}
              {project.appStore && (
                <a
                  href={project.appStore}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[12px] text-foreground inline-flex items-center gap-1 hover:underline underline-offset-4"
                >
                  {t.projects.appStore} <ArrowUpRight size={12} />
                </a>
              )}
              {project.playStore && (
                <a
                  href={project.playStore}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[12px] text-foreground inline-flex items-center gap-1 hover:underline underline-offset-4"
                >
                  {t.projects.playStore} <ArrowUpRight size={12} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right side — 40% preview */}
        <div
          className="relative overflow-hidden border-l border-border max-[720px]:border-l-0 max-[720px]:border-t max-[720px]:aspect-video flex items-center justify-center bg-secondary"
          style={{ flex: '0 0 40%' }}
        >
          <div className="relative transition-transform duration-500 group-hover:scale-[1.03] w-full h-full flex items-center justify-center min-h-[240px]">
            <ProjectPreview project={project} />
          </div>
          {/* Featured badge */}
          <span className="absolute top-3 right-3 text-[11px] px-2 py-1 bg-foreground text-background tracking-widest uppercase">
            {t.projects.featured}
          </span>
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  const { locale } = useLocale()
  const t = dict[locale]
  const featuredRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const featured = projects.filter((p) => p.featured)
  const regular = projects.filter((p) => !p.featured)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      if (featuredRef.current) {
        gsap.fromTo(
          featuredRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuredRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }

      if (gridRef.current) {
        gsap.fromTo(
          Array.from(gridRef.current.children),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" className="py-24">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Section header */}
        <div className="flex items-baseline justify-between mb-10 gap-4 flex-wrap">
          <div>
            <div className="text-[12px] tracking-[0.08em] uppercase text-muted-foreground">
              <EncryptedText text={t.projects.kicker} />
            </div>
            <h2 className="text-[32px] font-semibold tracking-[-0.02em] mt-0">
              <EncryptedText text={t.projects.title} />
            </h2>
          </div>
          <p className="text-muted-foreground text-[15px] max-w-[380px]">
            {t.projects.subtitle}
          </p>
        </div>

        <div ref={featuredRef}>
          {featured.map((project) => (
            <FeaturedCard key={project.id} project={project} />
          ))}
        </div>

        {/* Regular grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1"
        >
          {regular.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
