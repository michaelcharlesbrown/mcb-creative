'use client'

import { useEffect, useRef, useState } from 'react'

interface FitTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

const MEASURE_FONT_SIZE = 100

export default function FitText({ text, className = '', style = {} }: FitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)
  const [fontSize, setFontSize] = useState(1)

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
      setFontSize(computed)
    }

    calculate()

    const resizeObserver = new ResizeObserver(calculate)
    resizeObserver.observe(container)

    return () => resizeObserver.disconnect()
  }, [text])

  return (
    <div ref={containerRef} className={`relative overflow-hidden w-full ${className}`.trim()}>
      {/* Hidden measure element - same font inheritance as visible text */}
      <span
        ref={measureRef}
        aria-hidden
        className="absolute opacity-0 pointer-events-none whitespace-nowrap"
        style={{
          fontFamily: 'var(--font-bebas-neue)',
          fontSize: MEASURE_FONT_SIZE,
          lineHeight: 0.82,
          letterSpacing: '-0.02em',
        }}
      >
        {text}
      </span>
      <h2
        className="select-none whitespace-nowrap w-full"
        style={{
          fontFamily: 'var(--font-bebas-neue)',
          fontSize: `${fontSize}px`,
          lineHeight: 0.82,
          letterSpacing: '-0.02em',
          ...style,
        }}
      >
        {text}
      </h2>
    </div>
  )
}
