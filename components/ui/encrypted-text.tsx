'use client'

import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*?'

function rand() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

interface Props {
  text: string
  className?: string
  /** ms between each character being locked in */
  revealDelayMs?: number
  /** ms between each scramble refresh of unrevealed chars */
  flipDelayMs?: number
  /** ms to hold scrambled state before reveal begins */
  holdMs?: number
}

export function EncryptedText({
  text,
  className,
  revealDelayMs = 80,
  flipDelayMs = 45,
  holdMs = 300,
}: Props) {
  const [display, setDisplay] = useState<string[]>(() => text.split(''))
  const [revealed, setRevealed] = useState(0)
  const elRef = useRef<HTMLSpanElement>(null)
  const rafRef = useRef(0)
  const doneRef = useRef(false)

  useEffect(() => {
    // Scramble on client immediately (prevents hydration mismatch)
    setDisplay(text.split('').map(c => (c === ' ' ? ' ' : rand())))
    setRevealed(0)

    const el = elRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || doneRef.current) return
        observer.disconnect()

        let revealedCount = 0
        let lastRevealAt = performance.now()
        let lastFlipAt = 0

        const tick = (now: number) => {
          const holdOver = revealedCount === 0
            ? now - lastRevealAt >= holdMs
            : now - lastRevealAt >= revealDelayMs

          if (holdOver && revealedCount < text.length) {
            revealedCount++
            lastRevealAt = now
            setRevealed(revealedCount)
          }

          if (now - lastFlipAt >= flipDelayMs) {
            lastFlipAt = now
            setDisplay(
              text.split('').map((c, i) => {
                if (c === ' ') return ' '
                if (i < revealedCount) return c
                return rand()
              })
            )
          }

          if (revealedCount < text.length) {
            rafRef.current = requestAnimationFrame(tick)
          } else {
            // Ensure final state shows real text
            setDisplay(text.split(''))
            doneRef.current = true
          }
        }

        rafRef.current = requestAnimationFrame(tick)
      },
      { threshold: 0.1 }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafRef.current)
    }
  }, [text, revealDelayMs, flipDelayMs, holdMs])

  return (
    <span ref={elRef} className={className} aria-label={text}>
      {display.map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={i < revealed
            ? undefined
            : { color: 'var(--muted-foreground)', opacity: 0.5 }
          }
        >
          {char}
        </span>
      ))}
    </span>
  )
}
