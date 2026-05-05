'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Inject cursor:none globally so only the custom cursor shows
    const style = document.createElement('style')
    style.textContent = '*, *::before, *::after { cursor: none !important; }'
    document.head.appendChild(style)

    // Hide on mobile
    let hidden = window.innerWidth < 768

    if (hidden) {
      dot.style.display = 'none'
      ring.style.display = 'none'
    }

    const onResize = () => {
      hidden = window.innerWidth < 768
      dot.style.display = hidden ? 'none' : 'block'
      ring.style.display = hidden ? 'none' : 'block'
    }

    const onMouseMove = (e: MouseEvent) => {
      if (hidden) return
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'none' })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'none' })
    }

    const onMouseEnterInteractive = () => {
      if (hidden) return
      gsap.to(ring, { scale: 1.8, duration: 0.2, ease: 'power2.out' })
      gsap.to(dot, { opacity: 0, duration: 0.2, ease: 'power2.out' })
    }

    const onMouseLeaveInteractive = () => {
      if (hidden) return
      gsap.to(ring, { scale: 1, duration: 0.2, ease: 'power2.out' })
      gsap.to(dot, { opacity: 1, duration: 0.2, ease: 'power2.out' })
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)

    const interactiveElements = document.querySelectorAll<HTMLElement>('a, button')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive)
      el.addEventListener('mouseleave', onMouseLeaveInteractive)
    })

    // MutationObserver to catch dynamically added interactive elements
    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll<HTMLElement>('a, button')
      newElements.forEach((el) => {
        // Remove first to avoid double-binding
        el.removeEventListener('mouseenter', onMouseEnterInteractive)
        el.removeEventListener('mouseleave', onMouseLeaveInteractive)
        el.addEventListener('mouseenter', onMouseEnterInteractive)
        el.addEventListener('mouseleave', onMouseLeaveInteractive)
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      style.remove()
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive)
        el.removeEventListener('mouseleave', onMouseLeaveInteractive)
      })
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'var(--foreground)',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1.5px solid var(--foreground)',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  )
}
