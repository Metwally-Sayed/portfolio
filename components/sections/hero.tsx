import { AvailabilityPill } from '@/components/availability-pill'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

export function Hero() {
  return (
    <section id="top" className="pt-[140px] pb-24">
      <div className="max-w-[1100px] mx-auto px-6">
        <AvailabilityPill />

        <p className="mt-6 text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
          senior frontend engineer · cairo, egypt
        </p>

        <h1 className="mt-0 text-[clamp(48px,8vw,88px)] font-semibold tracking-[-0.02em] leading-[1.02] text-foreground">
          metwally sayed
          <span
            className="inline-block w-[0.5ch] bg-foreground ml-1 align-baseline"
            style={{ animation: 'blink 1s step-end infinite' }}
            aria-hidden
          />
        </h1>

        <p className="mt-[22px] text-base text-muted-foreground max-w-[540px] leading-[1.6]">
          i build fast, accessible web &amp; mobile interfaces.
          three+ years shipping production react, next.js and react native.
          currently open to remote roles.
        </p>

        <div className="mt-8 flex gap-[10px] flex-wrap">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 h-9 px-[14px] bg-primary text-primary-foreground text-xs font-medium rounded-none border border-transparent hover:opacity-90 transition-opacity duration-150"
          >
            let&apos;s talk <ArrowRight size={14} />
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 h-9 px-[14px] bg-background text-foreground text-xs font-medium rounded-none border border-border hover:bg-muted transition-colors duration-150"
          >
            view projects
          </a>
        </div>
      </div>
    </section>
  )
}
