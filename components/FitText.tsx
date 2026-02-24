'use client'

import { useEffect, useRef, useState } from 'react'

interface FitTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  fontFamily?: string
  sizeScale?: number
}

const MEASURE_FONT_SIZE = 100

export default function FitText({ text, className = '', style = {}, fontFamily = 'var(--font-bebas-neue)', sizeScale = 1 }: FitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)
  const [fontSize, setFontSize] = useState(1)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const measure = measureRef.current
    if (!container || !measure) return

    const calculate = () => {
      const containerWidth = container.offsetWidth
      if (containerWidth <= 0) return

      const measureWidth = measure.offsetWidth
      if (measureWidth <= 0) return

      const computed = (MEASURE_FONT_SIZE * containerWidth) / measureWidth
      setFontSize(Math.round(computed * sizeScale))
      setIsReady(true)
    }

    calculate()

    const resizeObserver = new ResizeObserver(calculate)
    resizeObserver.observe(container)

    return () => resizeObserver.disconnect()
  }, [text, sizeScale])

  return (
    <div ref={containerRef} className={`relative overflow-hidden w-full ${className}`.trim()}>
      {/* Hidden measure element - same font inheritance as visible text */}
      <span
        ref={measureRef}
        aria-hidden
        className="absolute opacity-0 pointer-events-none whitespace-nowrap"
        style={{
          fontFamily,
          fontSize: MEASURE_FONT_SIZE,
          fontWeight: style.fontWeight,
          lineHeight: 0.82,
          letterSpacing: '-0.02em',
        }}
      >
        {text}
      </span>
      <h2
        className="select-none whitespace-nowrap w-full"
        style={{
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.2s ease',
          fontFamily,
          fontSize: `${fontSize}px`,
          lineHeight: 0.82,
          letterSpacing: '-0.02em',
          textTransform: 'none',
          ...style,
        }}
      >
        {text}
      </h2>
    </div>
  )
}
