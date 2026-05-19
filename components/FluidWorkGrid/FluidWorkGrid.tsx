'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './FluidWorkGrid.module.css'

interface Project {
  slug: string
  title: string
  accentColor: string
  subheadline?: string
  scope?: string[]
  heroImage: string
}

interface FluidWorkGridProps {
  projects: Project[]
  /** Shorter strip when stacking two FluidWork rows on the homepage (2×2) */
  pairedRow?: boolean
}

const ACTIVE_W = 0.40   // active col: 40% of grid width
const MODULE_H = 0.60   // all modules: constant share of grid height (horizontal hover only)
const MIN_LAYOUT_PX = 16

export function FluidWorkGrid({ projects, pairedRow = false }: FluidWorkGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const colRefs = useRef<(HTMLDivElement | null)[]>([])
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([])
  /** Must match deps array — keyed by slug list + row variant */
  const layoutKey = `${projects.map((p) => p.slug).join('|')}::${pairedRow ? 'pair' : 'full'}`

  useEffect(() => {
    const grid = gridRef.current
    const n = projects.length
    if (!grid || n < 2) {
      if (grid) grid.style.visibility = 'visible'
      return undefined
    }

    let cancelled = false
    let detach: (() => void) | undefined

    void import('gsap').then(({ gsap }) => {
      if (cancelled) return

      const DURATION = 1.2
      const EASE = 'expo.out'

      const setActive = (index: number) => {
        const gW = grid.offsetWidth
        const gH = grid.offsetHeight
        if (gW < MIN_LAYOUT_PX || gH < MIN_LAYOUT_PX) return
        const aW = Math.round(gW * ACTIVE_W)
        const nW = Math.round((gW - aW) / (n - 1))

        colRefs.current.forEach((col, j) => col?.classList.toggle(styles.isActive, j === index))

        let px = 0
        colRefs.current.forEach((col, j) => {
          if (!col) return
          const w = j === index ? aW : nW
          gsap.to(col, { width: w, x: px, duration: DURATION, ease: EASE, overwrite: 'auto' })
          px += w
        })
      }

      const reset = () => {
        const gW = grid.offsetWidth
        const gH = grid.offsetHeight
        if (gW < MIN_LAYOUT_PX || gH < MIN_LAYOUT_PX) return
        const eW = Math.round(gW / n)

        colRefs.current.forEach((col) => col?.classList.remove(styles.isActive))

        let px = 0
        colRefs.current.forEach((col, j) => {
          if (!col) return
          gsap.to(col, { width: eW, x: px, duration: DURATION, ease: EASE, overwrite: 'auto' })
          px += eW
        })
      }

      const snapEqualWidths = () => {
        const gridW = grid.offsetWidth
        const gridH = grid.offsetHeight
        if (gridW < MIN_LAYOUT_PX || gridH < MIN_LAYOUT_PX) return false

        const equalW = Math.round(gridW / n)
        let x = 0
        colRefs.current.forEach((col, i) => {
          if (!col) return
          gsap.set(col, { width: equalW, x })
          x += equalW
          const wrapper = wrapperRefs.current[i]
          if (wrapper) gsap.set(wrapper, { height: Math.round(gridH * MODULE_H) })
        })
        colRefs.current.forEach((col) => col?.classList.remove(styles.isActive))
        gsap.set(grid, { visibility: 'visible' })
        return true
      }

      const enterHandlers = Array.from({ length: n }, (_, i) => () => setActive(i))

      enterHandlers.forEach((fn, i) => colRefs.current[i]?.addEventListener('mouseenter', fn))
      grid.addEventListener('mouseleave', reset)

      snapEqualWidths()

      const resizeObserver = new ResizeObserver(() => snapEqualWidths())
      resizeObserver.observe(grid)

      detach = () => {
        resizeObserver.disconnect()
        enterHandlers.forEach((fn, i) => colRefs.current[i]?.removeEventListener('mouseenter', fn))
        grid.removeEventListener('mouseleave', reset)
        gsap.killTweensOf([
          ...(colRefs.current.filter(Boolean) as HTMLElement[]),
          ...(wrapperRefs.current.filter(Boolean) as HTMLElement[]),
        ])
      }

      if (cancelled) {
        detach()
      }
    })

    return () => {
      cancelled = true
      detach?.()
    }
  }, [layoutKey])

  return (
    <div
      ref={gridRef}
      className={[styles.grid, pairedRow ? styles.gridPairRow : ''].filter(Boolean).join(' ')}
    >
      {projects.map((project, i) => (
        <div
          key={project.slug}
          ref={(el) => {
            colRefs.current[i] = el
          }}
          className={styles.col}
        >
          <div
            ref={(el) => {
              wrapperRefs.current[i] = el
            }}
            className={styles.colWrapper}
          >
            <div className={styles.colInner}>
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                className={styles.colImage}
                sizes="(min-width: 768px) 40vw, 100vw"
              />
            </div>
            <div className={styles.colContent}>
              <span className={styles.colTag}>{project.title}</span>
              {project.scope?.map((s, si) => (
                <span key={si} className={styles.colTag}>
                  {s}
                </span>
              ))}
            </div>
            <Link
              href={`/projects/${project.slug}`}
              className={styles.colLink}
              aria-label={project.title}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
