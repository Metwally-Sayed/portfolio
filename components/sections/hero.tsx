'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { AvailabilityPill } from '@/components/availability-pill'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

function handleMagnetMove(e: React.MouseEvent<HTMLAnchorElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3 })
}

function handleMagnetLeave(e: React.MouseEvent<HTMLAnchorElement>) {
  gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.3)' })
}

export function Hero() {
  const pillRef = useRef<HTMLSpanElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLParagraphElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const btnsRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const tl = gsap.timeline()

    tl.from(pillRef.current, { opacity: 0, y: 12, duration: 0.5 })
    tl.from(h1Ref.current, { opacity: 0, y: 40, duration: 0.6, ease: 'power3.out' }, '-=0.2')
    tl.from(roleRef.current, { opacity: 0, y: 16, duration: 0.5 }, '-=0.3')
    tl.from(descRef.current, { opacity: 0, y: 16, duration: 0.5 }, '-=0.35')
    tl.from(
      btnsRef.current?.children ? Array.from(btnsRef.current.children) : [],
      { opacity: 0, y: 16, stagger: 0.1, duration: 0.4 },
      '-=0.3'
    )
    tl.from(scrollRef.current, { opacity: 0, duration: 0.4 }, '-=0.1')

    const bounce = gsap.to(scrollRef.current, {
      y: 8,
      duration: 0.8,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    })

    return () => {
      tl.kill()
      bounce.kill()
    }
  }, [])

  return (
    <section id="top" className="pt-[140px] pb-24">
      <div className="max-w-[1100px] mx-auto px-6">
        <span ref={pillRef} className="inline-block">
          <AvailabilityPill />
        </span>

        <h1
          ref={h1Ref}
          className="mt-6 text-[clamp(48px,8vw,88px)] font-semibold tracking-[-0.02em] leading-[1.02] text-foreground"
        >
          <span className="block">metwally</span>
          <span className="block">sayed</span>
        </h1>

        <p
          ref={roleRef}
          className="mt-4 text-[11px] tracking-[0.08em] uppercase text-muted-foreground"
        >
          Senior Frontend Engineer · Cairo, Egypt
        </p>

        <p
          ref={descRef}
          className="mt-[22px] text-base text-muted-foreground max-w-[540px] leading-[1.6]"
        >
          i build fast, accessible web &amp; mobile interfaces. three+ years shipping production
          react, next.js and react native. currently open to remote roles.
        </p>

        <div ref={btnsRef} className="mt-8 flex gap-[10px] flex-wrap">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 h-9 px-[14px] bg-primary text-primary-foreground text-xs font-medium rounded-none border border-transparent hover:opacity-90 transition-opacity duration-150"
            onMouseMove={handleMagnetMove}
            onMouseLeave={handleMagnetLeave}
          >
            let&apos;s talk <ArrowRight size={14} />
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 h-9 px-[14px] bg-background text-foreground text-xs font-medium rounded-none border border-border hover:bg-muted transition-colors duration-150"
            onMouseMove={handleMagnetMove}
            onMouseLeave={handleMagnetLeave}
          >
            view projects
          </a>
        </div>

        <div ref={scrollRef} className="mt-12 flex flex-col items-start">
          <span className="text-muted-foreground text-lg select-none" aria-hidden="true">
            ↓
          </span>
        </div>
      </div>
    </section>
  )
}
