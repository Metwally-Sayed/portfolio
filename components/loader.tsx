'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

const MESSAGES = [
  'initializing...',
  'loading assets...',
  'building ui...',
  'almost ready...',
  'done.',
]

const DURATION = 2.0

export function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [msgIdx, setMsgIdx] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const countObj = { value: 0 }

    gsap.to(countObj, {
      value: 100,
      duration: DURATION,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(countObj.value)),
    })

    gsap.to(progressRef.current, {
      width: '100%',
      duration: DURATION,
      ease: 'power2.inOut',
    })

    const msgStep = (DURATION * 1000) / MESSAGES.length
    const intervals = MESSAGES.map((_, i) =>
      setTimeout(() => setMsgIdx(i), msgStep * i)
    )

    const exitTimer = setTimeout(() => {
      document.body.style.overflow = ''
      gsap.to(loaderRef.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.85,
        ease: 'power4.inOut',
        onComplete: () => setHidden(true),
      })
    }, DURATION * 1000 + 120)

    return () => {
      document.body.style.overflow = ''
      intervals.forEach(clearTimeout)
      clearTimeout(exitTimer)
    }
  }, [])

  if (hidden) return null

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9990] bg-background flex flex-col select-none"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      {/* Top branding */}
      <div className="px-6 pt-6">
        <span className="text-[13px] font-semibold tracking-[-0.02em] text-foreground">
          [ms]
        </span>
      </div>

      {/* Counter */}
      <div className="flex-1 flex items-center justify-center">
        <span className="text-[clamp(100px,18vw,220px)] font-semibold tracking-[-0.05em] leading-none text-foreground tabular-nums">
          {String(count).padStart(2, '0')}
        </span>
      </div>

      {/* Bottom: status + progress */}
      <div className="px-6 pb-8 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground tracking-[0.12em] uppercase">
            {MESSAGES[msgIdx]}
          </span>
          <span className="text-[10px] text-muted-foreground tracking-[0.08em] tabular-nums">
            {count}%
          </span>
        </div>
        <div className="h-px bg-border relative overflow-hidden">
          <div
            ref={progressRef}
            className="absolute left-0 top-0 h-full bg-foreground"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </div>
  )
}
