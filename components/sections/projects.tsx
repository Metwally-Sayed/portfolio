'use client'

import { useEffect, useRef } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { projects } from '@/lib/data/projects'
import { ProjectCard } from '@/components/ui/project-card'
import type { Project } from '@/lib/data/projects'

function Tag({ children }: { children: string }) {
  return (
    <span className="text-[10px] py-[2px] px-[7px] border border-border rounded-[6px] text-muted-foreground font-mono">
      [{children}]
    </span>
  )
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className="group border border-border rounded-[10px] overflow-hidden bg-card mb-4">
      <div className="flex max-[720px]:flex-col">
        {/* Left side — 60% */}
        <div className="flex flex-col justify-between p-7 max-[720px]:p-5" style={{ flex: '0 0 60%' }}>
          <div>
            <div className="text-[10px] text-muted-foreground tracking-[0.06em] uppercase mb-3">
              {project.year} / {project.kind}
            </div>
            <div className="text-[40px] font-semibold tracking-[-0.02em] leading-[1.1]">
              {project.name}
            </div>
            {project.stats && (
              <div className="text-[12px] text-muted-foreground mt-2 font-mono">
                {project.stats}
              </div>
            )}
            <div className="text-[13px] text-muted-foreground leading-[1.65] mt-4">
              {project.desc}
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
                  className="text-[11px] text-foreground inline-flex items-center gap-1 hover:underline underline-offset-4"
                >
                  view live ↗ <ArrowUpRight size={12} />
                </a>
              )}
              {project.appStore && (
                <a
                  href={project.appStore}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-foreground inline-flex items-center gap-1 hover:underline underline-offset-4"
                >
                  app store ↗ <ArrowUpRight size={12} />
                </a>
              )}
              {project.playStore && (
                <a
                  href={project.playStore}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-foreground inline-flex items-center gap-1 hover:underline underline-offset-4"
                >
                  play store ↗ <ArrowUpRight size={12} />
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
          <div className="transition-transform duration-500 group-hover:scale-[1.03] w-full h-full flex items-center justify-center min-h-[240px]">
            <span className="text-[13px] text-muted-foreground tracking-[0.04em]">
              {project.label}
            </span>
          </div>
          {/* Featured badge */}
          <span className="absolute top-3 right-3 text-[10px] px-2 py-1 bg-foreground text-background tracking-widest uppercase">
            Featured
          </span>
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  const featuredRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const featured = projects.find((p) => p.featured)
  const regular = projects.filter((p) => !p.featured)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const triggers: ScrollTrigger[] = []

    // Animate featured card
    if (featuredRef.current) {
      const t = ScrollTrigger.create({
        trigger: featuredRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () =>
          gsap.from(featuredRef.current, {
            opacity: 0,
            y: 40,
            duration: 0.7,
            ease: 'power3.out',
          }),
      })
      triggers.push(t)
    }

    // Animate grid cards
    if (gridRef.current) {
      const cards = Array.from(gridRef.current.children)
      const t = ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () =>
          gsap.from(cards, {
            opacity: 0,
            y: 40,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power3.out',
          }),
      })
      triggers.push(t)
    }

    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <section id="projects" className="py-24">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Section header */}
        <div className="flex items-baseline justify-between mb-10 gap-4 flex-wrap">
          <div>
            <div className="text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
              02 / projects
            </div>
            <h2 className="text-[32px] font-semibold tracking-[-0.02em] mt-0">
              selected work
            </h2>
          </div>
          <p className="text-muted-foreground text-[13px] max-w-[380px]">
            four production systems, shipped end-to-end.
          </p>
        </div>

        {/* Featured card */}
        {featured && (
          <div ref={featuredRef}>
            <FeaturedCard project={featured} />
          </div>
        )}

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
