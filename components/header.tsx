'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { ScrollTrigger } from '@/lib/gsap'

const navItems = [
  { label: 'about', href: '#about' },
  { label: 'projects', href: '#projects' },
  { label: 'skills', href: '#skills' },
  { label: 'contact', href: '#contact' },
]

export function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    setMounted(true) // eslint-disable-line react-hooks/set-state-in-effect
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    ScrollTrigger.create({
      start: 'top top-=1',
      onToggle: (self) => setScrolled(self.isActive),
    })

    const sections = ['about', 'projects', 'skills', 'contact']
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

  return (
    <header
      className={`sticky top-0 z-50 border-b ${scrolled ? 'border-border' : 'border-transparent'} transition-colors duration-300 backdrop-blur-[12px] bg-background/75`}
    >
      <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-14">
        <a href="#top" className="text-base font-semibold tracking-tight">
          [ms]
        </a>

        <nav className="flex items-center gap-[22px]">
          {navItems.map(({ label, href }) => {
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
                {label}
              </a>
            )
          })}

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
      </div>
    </header>
  )
}
