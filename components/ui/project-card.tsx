'use client'

import { useRef } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { gsap } from '@/lib/gsap'
import type { Project } from '@/lib/data/projects'

function Tag({ children }: { children: string }) {
  return (
    <span className="text-[10px] py-[2px] px-[7px] border border-border rounded-[6px] text-muted-foreground font-mono">
      [{children}]
    </span>
  )
}

function ProjectLink({
  href,
  label,
}: {
  href: string
  label: string
}) {
  const linkRef = useRef<HTMLAnchorElement>(null)

  function handleMouseEnter() {
    if (linkRef.current) {
      gsap.to(linkRef.current.querySelector('svg'), {
        x: 3,
        y: -3,
        duration: 0.2,
        ease: 'power2.out',
      })
    }
  }

  function handleMouseLeave() {
    if (linkRef.current) {
      gsap.to(linkRef.current.querySelector('svg'), {
        x: 0,
        y: 0,
        duration: 0.2,
        ease: 'power2.out',
      })
    }
  }

  return (
    <a
      ref={linkRef}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-[11px] text-foreground inline-flex items-center gap-1 hover:underline underline-offset-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {label} <ArrowUpRight size={12} />
    </a>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="border border-border rounded-[10px] overflow-hidden bg-card flex flex-col transition-all duration-[250ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:border-foreground hover:-translate-y-1 h-full">
      <div className="aspect-video border-b border-border relative overflow-hidden flex items-center justify-center bg-muted">
        <span className="text-[13px] text-muted-foreground tracking-[0.04em]">
          {project.label}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="text-[10px] text-muted-foreground tracking-[0.06em] uppercase">
          {project.year} / {project.kind}
        </div>
        <div className="text-[22px] font-semibold mt-[6px] tracking-[-0.01em]">
          {project.name}
        </div>
        <div className="text-[13px] text-muted-foreground leading-[1.65] mt-[10px] flex-1">
          {project.desc}
        </div>

        <div className="flex gap-[6px] flex-wrap mt-4">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div className="flex gap-[14px] mt-4 pt-4 border-t border-border">
          {project.live && (
            <ProjectLink href={project.live} label="view live ↗" />
          )}
          {project.appStore && (
            <ProjectLink href={project.appStore} label="app store ↗" />
          )}
          {project.playStore && (
            <ProjectLink href={project.playStore} label="play store ↗" />
          )}
        </div>
      </div>
    </article>
  )
}
