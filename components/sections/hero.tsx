'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { AvailabilityPill } from '@/components/availability-pill'
import { EncryptedText } from '@/components/ui/encrypted-text'
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

const GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")"

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const pillRef = useRef<HTMLSpanElement>(null)
  const indexRef = useRef<HTMLSpanElement>(null)
  const name1InnerRef = useRef<HTMLDivElement>(null)
  const name2InnerRef = useRef<HTMLDivElement>(null)
  const ruleRef = useRef<HTMLDivElement>(null)
  const roleRef = useRef<HTMLParagraphElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const btnsRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(pillRef.current, { opacity: 0, y: 8, duration: 0.4 })
      tl.from(indexRef.current, { opacity: 0, duration: 0.3 }, '<')

      tl.fromTo(name1InnerRef.current, { y: '110%' }, { y: '0%', duration: 0.9 }, '-=0.1')
      tl.fromTo(name2InnerRef.current, { y: '110%' }, { y: '0%', duration: 0.9 }, '-=0.62')

      tl.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.75, ease: 'power2.inOut', transformOrigin: 'left' },
        '-=0.55'
      )

      tl.from(roleRef.current, { opacity: 0, y: 8, duration: 0.4 }, '-=0.2')
      tl.from(descRef.current, { opacity: 0, y: 8, duration: 0.4 }, '-=0.3')

      const btnKids = btnsRef.current ? Array.from(btnsRef.current.children) : []
      if (btnKids.length) {
        tl.fromTo(
          btnKids,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.35 },
          '-=0.25'
        )
      }

      tl.from(scrollRef.current, { opacity: 0, duration: 0.4 }, '-=0.1')

      gsap.to(scrollRef.current, {
        y: 8, duration: 0.8, ease: 'power1.inOut', repeat: -1, yoyo: true, delay: 2.8,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="top" className="pt-[130px] pb-24 relative overflow-hidden">

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 select-none"
        style={{ backgroundImage: GRAIN, backgroundSize: '200px 200px', opacity: 0.02, mixBlendMode: 'overlay' }}
      />

      <div className="max-w-[1100px] mx-auto px-6 relative z-0">

        <div className="flex items-center justify-between mb-10">
          <span ref={pillRef} className="inline-block">
            <AvailabilityPill />
          </span>
        </div>

        <h1 className="text-[clamp(58px,9vw,112px)] font-semibold tracking-[-0.03em] leading-[0.88] text-foreground">
          <div className="overflow-hidden">
            <div ref={name1InnerRef} style={{ transform: 'translateY(110%)' }}>
              Metwally
            </div>
          </div>
          <div className="overflow-hidden">
            <div ref={name2InnerRef} style={{ transform: 'translateY(110%)' }}>
              Sayed
            </div>
          </div>
        </h1>

        <div
          ref={ruleRef}
          className="mt-8 h-px bg-border"
          style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
        />

        <p ref={roleRef} className="mt-5 text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
          <EncryptedText text="Senior Frontend Engineer · Cairo, Egypt" revealDelayMs={80} />
        </p>

        <p ref={descRef} className="mt-[18px] text-[13px] text-muted-foreground max-w-[480px] leading-[1.65]">
          i build fast, accessible web &amp; mobile interfaces. three+ years shipping production
          react, next.js and react native. currently open to remote roles.
        </p>

        <div ref={btnsRef} className="mt-7 flex gap-[10px] flex-wrap">
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

        <div ref={scrollRef} className="mt-12">
          <span className="text-muted-foreground text-lg select-none" aria-hidden="true">↓</span>
        </div>

      </div>
    </section>
  )
}
