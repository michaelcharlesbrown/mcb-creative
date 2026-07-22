'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')

  useEffect(() => {
    // Sanity Studio manages its own internal scroll regions — it isn't built to
    // sit inside a page-level smooth-scroll wrapper, and Lenis's global wheel
    // interception blocks native scrolling in Studio's panes when it runs there.
    if (isStudio) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    // Drive Lenis with a plain rAF loop. (Previously this rode on gsap.ticker,
    // which was the codebase's only remaining GSAP usage and was never removed
    // on cleanup — leaking ticker callbacks against a destroyed Lenis.)
    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    })

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [isStudio])

  return <>{children}</>
}
