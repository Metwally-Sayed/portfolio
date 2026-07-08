'use client'

import { FadeIn } from '@/components/fade-in'
import { EncryptedText } from '@/components/ui/encrypted-text'
import { selectedCaseStudies } from '@/lib/data/case-studies'
import { dict, pick, useLocale } from '@/lib/i18n'

function Tag({ children }: { children: string }) {
  return (
    <span className="text-[11px] py-[2px] px-[7px] border border-border rounded-[6px] text-muted-foreground">
      [{children}]
    </span>
  )
}

export function SelectedCaseStudies() {
  const { locale } = useLocale()
  const t = dict[locale]
  return (
    <section id="case-studies" className="py-24">
      <div className="max-w-[1100px] mx-auto px-6">
        <FadeIn>
          <div className="flex items-baseline justify-between mb-10 gap-4 flex-wrap">
            <div>
              <div className="text-[12px] tracking-[0.08em] uppercase text-muted-foreground">
                <EncryptedText text={t.caseStudies.kicker} />
              </div>
              <h2 className="text-[32px] font-semibold tracking-[-0.02em] mt-0">
                <EncryptedText text={t.caseStudies.title} />
              </h2>
            </div>
            <p className="text-muted-foreground text-[15px] max-w-[380px]">
              {t.caseStudies.subtitle}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
          {selectedCaseStudies.map((study, i) => (
            <FadeIn key={study.title} delay={i * 80}>
              <article className="h-full border border-border rounded-[10px] bg-card p-5">
                <h3 className="text-[20px] font-semibold tracking-[-0.01em] leading-[1.2]">
                  {pick(locale, study.title, study.titleAr)}
                </h3>

                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className="text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
                      {t.caseStudies.problem}
                    </dt>
                    <dd className="mt-1 text-[15px] leading-[1.65] text-muted-foreground">
                      {pick(locale, study.problem, study.problemAr)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
                      {t.caseStudies.work}
                    </dt>
                    <dd className="mt-1 text-[15px] leading-[1.65] text-muted-foreground">
                      {pick(locale, study.work, study.workAr)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
                      {t.caseStudies.impact}
                    </dt>
                    <dd className="mt-1 text-[15px] leading-[1.65] text-foreground">
                      {pick(locale, study.impact, study.impactAr)}
                    </dd>
                  </div>
                </dl>

                <div className="flex gap-[6px] flex-wrap mt-5 pt-4 border-t border-border">
                  {study.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
