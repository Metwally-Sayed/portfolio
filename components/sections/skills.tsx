'use client'

import { useEffect, useRef } from 'react'
import { skillGroups } from '@/lib/data/skills'
import { FadeIn } from '@/components/fade-in'
import { gsap, ScrollTrigger } from '@/lib/gsap'

function Tag({ children }: { children: string }) {
  return (
    <span className="skill-tag text-[10px] py-[2px] px-[7px] border border-border rounded-[6px] text-muted-foreground">
      [{children}]
    </span>
  )
}

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!containerRef.current) return

    const rows = Array.from(containerRef.current.querySelectorAll('.skill-row'))

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        // Rows slide in from left
        gsap.from(rows, {
          opacity: 0,
          x: -30,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
        })
        // Tags in each row fade in after a short delay
        rows.forEach((row, i) => {
          const tags = Array.from(row.querySelectorAll('.skill-tag'))
          gsap.from(tags, {
            opacity: 0,
            stagger: 0.04,
            duration: 0.4,
            ease: 'power2.out',
            delay: 0.08 * i + 0.2,
          })
        })
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <section id="skills" className="py-24">
      <div className="max-w-[1100px] mx-auto px-6">
        <FadeIn>
          <div className="flex items-baseline justify-between mb-10 gap-4 flex-wrap">
            <div>
              <div className="text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
                03 / skills
              </div>
              <h2 className="text-[32px] font-semibold tracking-[-0.02em] mt-0">stack</h2>
            </div>
            <p className="text-muted-foreground text-[13px] max-w-[380px]">
              tools i reach for daily, in roughly that order.
            </p>
          </div>
        </FadeIn>

        <div ref={containerRef}>
          {skillGroups.map(([cat, items]) => (
            <div key={cat} className="skill-row grid grid-cols-[200px_1fr] gap-6 py-4 border-t border-border last:border-b last:border-border max-[720px]:grid-cols-1 max-[720px]:gap-2">
              <div className="text-[11px] tracking-[0.06em] text-muted-foreground uppercase pt-1">
                {cat}
              </div>
              <div className="flex gap-[6px] flex-wrap">
                {items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
