'use client'

import { useEffect, useRef } from 'react'
import { FadeIn } from '@/components/fade-in'
import { gsap } from '@/lib/gsap'
import { EncryptedText } from '@/components/ui/encrypted-text'
import { stats } from '@/lib/data/skills'
import { dict, pick, useLocale } from '@/lib/i18n'

export function About() {
  const { locale } = useLocale()
  const t = dict[locale]
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
                <div className="text-[12px] tracking-[0.08em] uppercase text-muted-foreground">
                  <EncryptedText text={t.about.kicker} />
                </div>
                <h2 className="text-[32px] font-semibold tracking-[-0.02em] mt-0">
                  <EncryptedText text={t.about.title} />
                </h2>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-[1fr_2fr] gap-14 max-[720px]:grid-cols-1 max-[720px]:gap-6">
            <FadeIn delay={0} direction="up">
              <div className="text-[12px] tracking-[0.08em] uppercase text-muted-foreground pt-1">
                {t.about.im}
              </div>
            </FadeIn>
            <div className="space-y-[14px] text-[15px] text-muted-foreground leading-[1.75] max-w-[65ch]">
              <FadeIn delay={0} direction="up">
                <p>{t.about.p1}</p>
              </FadeIn>
              <FadeIn delay={100} direction="up">
                <p>{t.about.p2}</p>
              </FadeIn>
              <FadeIn delay={200} direction="up">
                <p>{t.about.p3}</p>
              </FadeIn>
              <FadeIn delay={300} direction="up">
                <p>{t.about.p4}</p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-4 max-[720px]:grid-cols-2">
            {stats.map(({ value, label, labelAr }, i) => (
              <div
                key={label}
                className="py-[18px] px-5 border-s border-border first:border-s-0 first:ps-0 max-[720px]:[&:nth-child(odd)]:border-s-0 max-[720px]:[&:nth-child(odd)]:ps-0"
              >
                <div
                  ref={el => {
                    if (el) statRefs.current[i] = el
                  }}
                  className="text-[44px] font-semibold tracking-[-0.02em] leading-none"
                >
                  {value}
                </div>
                <div className="text-[12px] text-muted-foreground tracking-[0.04em] mt-[10px]">
                  {pick(locale, label, labelAr)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
