'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

const navItems = [
  { label: 'about', href: '#about' },
  { label: 'projects', href: '#projects' },
  { label: 'skills', href: '#skills' },
  { label: 'contact', href: '#contact' },
]

export function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border backdrop-blur-[12px] bg-background/75">
      <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-14">
        <a href="#top" className="text-base font-semibold tracking-tight">
          [ms]
        </a>

        <nav className="flex items-center gap-[22px]">
          {navItems.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              {label}
            </a>
          ))}

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
