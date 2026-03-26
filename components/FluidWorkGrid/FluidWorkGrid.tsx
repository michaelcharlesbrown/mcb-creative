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
}

const ACTIVE_W = 0.40   // active col: 40% of grid width
const DEFAULT_H = 0.60  // default wrapper height: 60% of grid height
const ACTIVE_H  = 0.895 // active wrapper height: ~90% of grid height (Estrela staircase)

export function FluidWorkGrid({ projects }: FluidWorkGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const colRefs = useRef<(HTMLDivElement | null)[]>([])
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    import('gsap').then(({ gsap }) => {
      const gridW = grid.offsetWidth
      const gridH = grid.offsetHeight
      const n = projects.length
      const equalW = Math.round(gridW / n)

      // Initial snap — equal widths, no animation
      let x = 0
      colRefs.current.forEach((col, i) => {
        if (!col) return
        gsap.set(col, { width: equalW, x })
        x += equalW
        const wrapper = wrapperRefs.current[i]
        if (wrapper) gsap.set(wrapper, { height: Math.round(gridH * DEFAULT_H) })
      })

      gsap.set(grid, { visibility: 'visible' })

      // Native event handlers — no React state, no re-renders during animation
      const DURATION = 1.2
      const EASE = 'expo.out'

      const setActive = (index: number) => {
        const gW = grid.offsetWidth
        const gH = grid.offsetHeight
        const aW = Math.round(gW * ACTIVE_W)
        const nW = Math.round((gW - aW) / (n - 1))

        colRefs.current.forEach((col, j) => col?.classList.toggle(styles.isActive, j === index))

        let px = 0
        colRefs.current.forEach((col, j) => {
          if (!col) return
          const w = j === index ? aW : nW
          gsap.to(col, { width: w, x: px, duration: DURATION, ease: EASE, overwrite: 'auto' })
          px += w
          const wrapper = wrapperRefs.current[j]
          if (wrapper) {
            gsap.to(wrapper, {
              height: j === index ? Math.round(gH * ACTIVE_H) : Math.round(gH * DEFAULT_H),
              duration: DURATION,
              ease: EASE,
              overwrite: 'auto',
            })
          }
        })
      }

      const reset = () => {
        const gW = grid.offsetWidth
        const gH = grid.offsetHeight
        const eW = Math.round(gW / n)

        colRefs.current.forEach((col) => col?.classList.remove(styles.isActive))

        let px = 0
        colRefs.current.forEach((col, j) => {
          if (!col) return
          gsap.to(col, { width: eW, x: px, duration: DURATION, ease: EASE, overwrite: 'auto' })
          px += eW
          const wrapper = wrapperRefs.current[j]
          if (wrapper) gsap.to(wrapper, { height: Math.round(gH * DEFAULT_H), duration: DURATION, ease: EASE, overwrite: 'auto' })
        })
      }

      const enterHandlers = colRefs.current.map((_, i) => () => setActive(i))
      colRefs.current.forEach((col, i) => col?.addEventListener('mouseenter', enterHandlers[i]))
      grid.addEventListener('mouseleave', reset)

      return () => {
        colRefs.current.forEach((col, i) => col?.removeEventListener('mouseenter', enterHandlers[i]))
        grid.removeEventListener('mouseleave', reset)
        gsap.killTweensOf([...colRefs.current.filter(Boolean), ...wrapperRefs.current.filter(Boolean)])
      }
    })
  }, [projects.length])

  return (
    <div ref={gridRef} className={styles.grid}>
      {projects.map((project, i) => (
        <div
          key={project.slug}
          ref={(el) => { colRefs.current[i] = el }}
          className={styles.col}
        >
          <span className={styles.colNumber}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <div
            ref={(el) => { wrapperRefs.current[i] = el }}
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
                <span key={si} className={styles.colTag}>{s}</span>
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
