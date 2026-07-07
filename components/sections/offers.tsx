'use client'

import { FadeIn } from '@/components/fade-in'
import { EncryptedText } from '@/components/ui/encrypted-text'
import { dict, useLocale } from '@/lib/i18n'

export function Offers() {
  const { locale } = useLocale()
  const t = dict[locale]

  return (
    <section id="offers" className="py-24 max-[720px]:py-18">
      <div className="mx-auto max-w-[1100px] px-6">
        <FadeIn>
          <div className="mx-auto mb-14 max-w-[680px] text-center">
            <div className="text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
              <EncryptedText text={t.offers.kicker} />
            </div>
            <h2 className="mt-2 text-[clamp(30px,5vw,48px)] font-semibold tracking-[-0.02em] leading-[1.05]">
              <EncryptedText text={t.offers.title} />
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] text-[13px] leading-[1.7] text-muted-foreground">
              {t.offers.subtitle}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-1">
          {t.offers.tiers.map((tier, i) => (
            <FadeIn key={tier.name} delay={i * 100} direction="up">
              <div className="flex h-full flex-col rounded-[10px] border border-border bg-card p-6 transition-colors duration-200 hover:border-foreground max-[520px]:p-5">
                <div className="text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                  {tier.kind}
                </div>
                <h3 className="mt-2 text-[21px] font-semibold tracking-[-0.02em] leading-[1.15]">
                  {tier.name}
                </h3>
                <p className="mt-4 flex-1 text-[13px] leading-[1.7] text-muted-foreground">
                  {tier.desc}
                </p>
                <div className="mt-6 border-t border-border pt-4">
                  <div className="text-[11px] tracking-[0.04em] text-foreground">
                    {tier.price}
                  </div>
                  <div className="mt-2 text-[11px] leading-[1.6] text-muted-foreground">
                    <span className="uppercase tracking-[0.06em]">{t.offers.bestFor}:</span>{' '}
                    {tier.bestForValue}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
