'use client'

import { useEffect, useRef } from 'react'
import { AvailabilityPill } from '@/components/availability-pill'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import {
  Envelope,
  LinkedinLogo,
  GithubLogo,
  MapPin,
  ArrowUpRight,
} from '@phosphor-icons/react/dist/ssr'

const contactRows = [
  {
    label: 'email',
    value: 'metwallysayed1999@gmail.com',
    href: 'mailto:metwallysayed1999@gmail.com',
    Icon: Envelope,
  },
  {
    label: 'linkedin',
    value: 'linkedin.com/in/metwallysayed',
    href: 'https://linkedin.com/in/metwallysayed',
    Icon: LinkedinLogo,
  },
  {
    label: 'github',
    value: 'github.com/Metwally-Sayed',
    href: 'https://github.com/Metwally-Sayed',
    Icon: GithubLogo,
  },
  {
    label: 'location',
    value: 'cairo, egypt · open to remote',
    href: null,
    Icon: MapPin,
  },
]

export function Contact() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const triggers: ReturnType<typeof ScrollTrigger.create>[] = []

    const words = headingRef.current?.querySelectorAll('.word')
    if (words && words.length > 0) {
      const t = ScrollTrigger.create({
        trigger: headingRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.from(words, {
            opacity: 0,
            y: 30,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power3.out',
          })
        },
      })
      triggers.push(t)
    }

    if (listRef.current) {
      const rows = Array.from(listRef.current.children)
      const t = ScrollTrigger.create({
        trigger: listRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.from(rows, {
            opacity: 0,
            x: 20,
            stagger: 0.07,
            duration: 0.5,
            ease: 'power2.out',
          })
        },
      })
      triggers.push(t)
    }

    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <>
      <section id="contact" className="py-24">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-2 gap-14 items-start max-[720px]:grid-cols-1 max-[720px]:gap-6">
            <div>
              <div className="text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
                04 / contact
              </div>
              <h2
                ref={headingRef}
                className="text-[clamp(36px,6vw,64px)] font-semibold tracking-[-0.02em] leading-[1.05] mt-3"
              >
                {"let's build something.".split(' ').map((word, i) => (
                  <span key={i} className="word inline-block mr-[0.25em]">
                    {word}
                  </span>
                ))}
              </h2>
              <div className="mt-6">
                <AvailabilityPill />
              </div>
            </div>

            <div
              ref={listRef}
              className="flex flex-col gap-px bg-border border border-border rounded-[10px] overflow-hidden"
            >
              {contactRows.map(({ label, value, href, Icon }) => {
                const inner = (
                  <>
                    <Icon size={16} className="flex-none text-foreground" />
                    <span className="text-[10px] text-muted-foreground tracking-[0.06em] uppercase flex-none w-20">
                      {label}
                    </span>
                    <span className="text-[13px] flex-1 min-w-0 truncate">{value}</span>
                    {href && (
                      <ArrowUpRight size={12} className="flex-none text-muted-foreground" />
                    )}
                  </>
                )

                return href ? (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noreferrer"
                    className="flex items-center gap-3 bg-background px-4 py-[14px] hover:bg-muted transition-colors duration-150"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={label}
                    className="flex items-center gap-3 bg-background px-4 py-[14px]"
                  >
                    {inner}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between gap-4 flex-wrap">
          <span className="text-[11px] text-muted-foreground tracking-[0.04em]">
            © 2026 metwally sayed
          </span>
          <span className="text-[11px] text-muted-foreground tracking-[0.04em]">
            built with next.js · cairo
          </span>
          <span className="text-[11px] text-muted-foreground tracking-[0.04em]">
            press{' '}
            <kbd className="px-[6px] py-[1px] border border-border rounded-[4px] font-mono">
              d
            </kbd>{' '}
            to toggle theme
          </span>
        </div>
      </footer>
    </>
  )
}
