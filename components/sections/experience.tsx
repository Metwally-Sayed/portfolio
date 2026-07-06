'use client'

import { useEffect, useRef } from 'react'
import { FadeIn } from '@/components/fade-in'
import { EncryptedText } from '@/components/ui/encrypted-text'
import { gsap } from '@/lib/gsap'
import { resume } from '@/lib/data/resume'
import { dict, pick, useLocale } from '@/lib/i18n'

export function Experience() {
  const { locale } = useLocale()
  const t = dict[locale]
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<HTMLElement[]>([])

  useEffect(() => {
    if (!timelineRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          ease: 'power2.out',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )

      gsap.fromTo(
        itemRefs.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.14,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 78%',
            once: true,
          },
        }
      )
    }, timelineRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" className="py-24 max-[720px]:py-18">
      <div className="mx-auto max-w-[1100px] px-6">
        <FadeIn>
          <div className="mx-auto mb-14 max-w-[680px] text-center">
            <div className="text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
              <EncryptedText text={t.experience.kicker} />
            </div>
            <h2 className="mt-2 text-[clamp(30px,5vw,48px)] font-semibold tracking-[-0.02em] leading-[1.05]">
              <EncryptedText text={t.experience.title} />
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] text-[13px] leading-[1.7] text-muted-foreground">
              {t.experience.subtitle}
            </p>
          </div>
        </FadeIn>

        <div ref={timelineRef} className="relative">
          <div
            ref={lineRef}
            aria-hidden
            className="absolute left-[220px] top-0 h-full w-px origin-top bg-border max-[760px]:left-3"
          />

          {resume.experience.map((exp, i) => (
            <article
              key={exp.company}
              ref={(el) => {
                if (el) itemRefs.current[i] = el
              }}
              className="relative grid grid-cols-[190px_60px_minmax(0,1fr)] gap-0 pb-12 opacity-0 last:pb-0 max-[760px]:grid-cols-[28px_minmax(0,1fr)]"
            >
              <div className="pt-7 max-[760px]:hidden">
                <div className="sticky top-24">
                  <div className="text-[11px] text-muted-foreground tracking-[0.06em] uppercase">
                    {pick(locale, exp.period, exp.periodAr)}
                  </div>
                  <div className="mt-2 text-[12px] text-muted-foreground">{pick(locale, exp.location, exp.locationAr)}</div>
                </div>
              </div>

              <div className="relative flex justify-center pt-8 max-[760px]:justify-start">
                <span className="relative z-10 h-4 w-4 rounded-full border border-foreground bg-background shadow-[0_0_0_6px_var(--background)]" />
              </div>

              <div className="min-w-0">
                <div className="rounded-[10px] border border-border bg-card p-6 transition-colors duration-200 hover:border-foreground max-[520px]:p-5">
                  <div className="mb-4 hidden text-[11px] tracking-[0.06em] uppercase text-muted-foreground max-[760px]:block">
                    {pick(locale, exp.period, exp.periodAr)} · {pick(locale, exp.location, exp.locationAr)}
                  </div>

                  <div className="flex items-start justify-between gap-5 max-[620px]:flex-col max-[620px]:gap-2">
                    <div>
                      <h3 className="text-[24px] font-semibold tracking-[-0.02em] leading-[1.12] max-[520px]:text-[21px]">
                        {exp.company}
                      </h3>
                      <p className="mt-2 text-[13px] text-muted-foreground">{pick(locale, exp.role, exp.roleAr)}</p>
                    </div>
                    <div className="text-right text-[10px] uppercase tracking-[0.08em] text-muted-foreground max-[620px]:text-left">
                      {t.experience.milestone} {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>

                  <ul className="mt-6 grid grid-cols-2 gap-x-7 gap-y-3 border-t border-border pt-5 max-[900px]:grid-cols-1">
                    {(locale === 'ar' ? exp.pointsAr : exp.points).map((point) => (
                      <li
                        key={point}
                        className="relative pl-4 text-[13px] leading-[1.65] text-muted-foreground"
                      >
                        <span className="absolute left-0 top-[0.75em] h-1 w-1 rounded-full bg-foreground" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
