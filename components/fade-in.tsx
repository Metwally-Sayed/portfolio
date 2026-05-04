'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number // in milliseconds, default 0
  direction?: 'up' | 'left' | 'none' // default 'up'
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = 'up',
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const el = ref.current
    if (!el) return

    const fromVars = {
      opacity: 0,
      y: direction === 'up' ? 24 : 0,
      x: direction === 'left' ? -24 : 0,
    }

    const tween = gsap.fromTo(
      el,
      fromVars,
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: delay / 1000,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      }
    )

    return () => {
      tween.kill()
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === el) t.kill()
      })
    }
  }, [delay, direction])

  return (
    <div ref={ref} style={{ opacity: 0 }} className={cn(className)}>
      {children}
    </div>
  )
}
