'use client'

import { useTheme } from 'next-themes'
import { List, Moon, Sun, X } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { ScrollTrigger } from '@/lib/gsap'
import { DownloadCv } from '@/components/download-cv'
import { dict, useLocale } from '@/lib/i18n'

const navItems = [
  { href: '#about' },
  { href: '#experience' },
  { href: '#projects' },
  { href: '#skills' },
  { href: '#contact' },
]

export function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const { locale, toggle: toggleLocale } = useLocale()
  const t = dict[locale]
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true) // eslint-disable-line react-hooks/set-state-in-effect
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    ScrollTrigger.create({
      start: 'top top-=1',
      onToggle: (self) => setScrolled(self.isActive),
    })

    const sections = ['about', 'experience', 'projects', 'skills', 'contact']
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
        onLeave: () => {},
        onLeaveBack: () => {},
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  // Locale swap changes text length + swaps in the Arabic font, shifting every
  // section's position. Recalc ScrollTrigger (after paint and once fonts settle)
  // or bottom sections like contact stay stuck at opacity 0.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(raf)
  }, [locale])

  return (
    <header
      className={`sticky top-0 z-50 border-b ${scrolled ? 'border-border' : 'border-transparent'} transition-colors duration-300 backdrop-blur-[12px] bg-background/75`}
    >
      <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-14">
        <a href="#top" className="text-base font-semibold tracking-tight">
          [ms]
        </a>

        <nav className="hidden items-center gap-[22px] min-[820px]:flex">
          {navItems.map(({ href }) => {
            const sectionId = href.slice(1)
            return (
              <a
                key={href}
                href={href}
                className="text-xs transition-colors duration-150"
                style={{
                  color:
                    activeSection === sectionId
                      ? 'var(--foreground)'
                      : 'var(--muted-foreground)',
                }}
              >
                {t.nav[sectionId as keyof typeof t.nav]}
              </a>
            )
          })}

          <DownloadCv className="text-muted-foreground hover:text-foreground" />

          <button
            aria-label={t.common.langAria}
            onClick={toggleLocale}
            className="h-8 min-w-8 px-2 border border-border flex items-center justify-center rounded-none text-xs hover:bg-muted transition-colors duration-150"
          >
            {t.common.langLabel}
          </button>

          <button
            aria-label="toggle theme"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="w-8 h-8 border border-border flex items-center justify-center rounded-none hover:bg-muted transition-colors duration-150"
          >
            {mounted && resolvedTheme === 'dark' ? (
              <Sun size={14} />
            ) : (
              <Moon size={14} />
            )}
          </button>
        </nav>

        <div className="flex items-center gap-3 min-[820px]:hidden">
          <DownloadCv className="text-muted-foreground hover:text-foreground" />
          <button
            aria-label={t.common.langAria}
            onClick={toggleLocale}
            className="flex h-8 min-w-8 px-2 items-center justify-center border border-border rounded-none text-xs hover:bg-muted transition-colors duration-150"
          >
            {t.common.langLabel}
          </button>
          <button
            aria-label="toggle theme"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="flex h-8 w-8 items-center justify-center border border-border rounded-none hover:bg-muted transition-colors duration-150"
          >
            {mounted && resolvedTheme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            aria-label="toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-8 w-8 items-center justify-center border border-border rounded-none hover:bg-muted transition-colors duration-150"
          >
            {menuOpen ? <X size={15} /> : <List size={15} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-border bg-background/95 px-6 py-4 min-[820px]:hidden">
          <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-3">
            {navItems.map(({ href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="border border-border px-3 py-3 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {t.nav[href.slice(1) as keyof typeof t.nav]}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
