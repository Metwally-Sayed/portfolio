'use client'

import { useEffect, useRef } from 'react'
import { FadeIn } from '@/components/fade-in'
import { gsap } from '@/lib/gsap'
import { EncryptedText } from '@/components/ui/encrypted-text'
import { stats } from '@/lib/data/skills'

export function About() {
  const statRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const tweens: gsap.core.Tween[] = []

    statRefs.current.forEach((statEl, i) => {
      if (!statEl) return
      const rawValue = stats[i].value
      const suffix = rawValue.replace(/[0-9]/g, '')
      const target = parseInt(rawValue, 10)

      const obj = { val: 0 }
      const tween = gsap.to(obj, {
        val: target,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => {
          statEl.textContent = Math.round(obj.val) + suffix
        },
        scrollTrigger: {
          trigger: statEl,
          start: 'top 80%',
          once: true,
        },
      })

      tweens.push(tween)
    })

    return () => {
      tweens.forEach(t => {
        const st = t.scrollTrigger
        if (st) st.kill()
        t.kill()
      })
    }
  }, [])

  return (
    <>
      <section id="about" className="py-24">
        <div className="max-w-[1100px] mx-auto px-6">
          <FadeIn>
            <div className="flex items-baseline justify-between mb-10 gap-4 flex-wrap">
              <div>
                <div className="text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
                  <EncryptedText text="01 / about" />
                </div>
                <h2 className="text-[32px] font-semibold tracking-[-0.02em] mt-0">
                  <EncryptedText text="about" />
                </h2>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-[1fr_2fr] gap-14 max-[720px]:grid-cols-1 max-[720px]:gap-6">
            <FadeIn delay={0} direction="up">
              <div className="text-[11px] tracking-[0.08em] uppercase text-muted-foreground pt-1">
                i&apos;m metwally —
              </div>
            </FadeIn>
            <div className="space-y-[14px] text-sm text-muted-foreground leading-[1.75]">
              <FadeIn delay={0} direction="up">
                <p>
                  a senior frontend engineer based in cairo, focused on shipping{' '}
                  <strong className="text-foreground font-medium">
                    fast, accessible interfaces
                  </strong>{' '}
                  for the web and mobile.
                </p>
              </FadeIn>
              <FadeIn delay={100} direction="up">
                <p>
                  i&apos;ve spent the last three+ years building production systems — an
                  arabic-first fintech platform, saas dashboards, e-commerce, and erp — with{' '}
                  <strong className="text-foreground font-medium">
                    react, next.js and react native
                  </strong>
                  .
                </p>
              </FadeIn>
              <FadeIn delay={200} direction="up">
                <p>
                  i care about details that compound: clean code, useful animation, tiny bundle
                  sizes, lighthouse scores in the nineties.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-4 max-[720px]:grid-cols-2">
            {stats.map(({ value, label }, i) => (
              <div
                key={label}
                className="py-[18px] px-5 border-l border-border first:border-l-0 first:pl-0 max-[720px]:[&:nth-child(odd)]:border-l-0 max-[720px]:[&:nth-child(odd)]:pl-0"
              >
                <div
                  ref={el => {
                    if (el) statRefs.current[i] = el
                  }}
                  className="text-[44px] font-semibold tracking-[-0.02em] leading-none"
                >
                  {value}
                </div>
                <div className="text-[11px] text-muted-foreground tracking-[0.04em] mt-[10px]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
