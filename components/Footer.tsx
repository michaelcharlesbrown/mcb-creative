'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import FitText from '@/components/FitText'

interface FooterProps {
  accentColor?: string
}

export default function Footer({ accentColor = '#ffffff' }: FooterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <footer ref={ref} style={{ backgroundColor: '#131212' }} className="w-full">
      {/* Frame wrapper */}
      <div className="max-w-[2400px] mx-auto p-5">
        <motion.div
          className="relative w-full min-h-screen overflow-hidden grid grid-rows-[auto_1fr]"
          style={{ backgroundColor: '#131212' }}
          initial={{ y: -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
        {/* Upper content */}
        <div className="relative z-10 grid grid-cols-2 gap-8 px-8 pt-[25vh] pb-8 md:px-12 md:pt-[28vh] md:pb-10 shrink-0">
          <motion.div
            className="flex flex-col gap-5"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <p className="text-[11px] uppercase tracking-widest leading-relaxed" style={{ color: accentColor }}>
              Independent Design Studio And<br />
              Portfolio Of Creative Director<br />
              Michael Charles Brown
            </p>
            <p className="text-[11px] uppercase tracking-widest leading-relaxed" style={{ color: accentColor }}>
              San Francisco///Los Angeles
            </p>
            <p className="text-[11px] uppercase tracking-widest leading-relaxed opacity-50" style={{ color: accentColor }}>
              ©{new Date().getFullYear()}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-5"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <p className="text-[11px] uppercase tracking-widest leading-relaxed" style={{ color: accentColor }}>
              Got A Project In Mind?<br />
              I&apos;d Love To Hear About It.<br />
              Get In Touch:
            </p>
            <a href="mailto:hello@mcb-creative.design" className="text-[11px] normal-case tracking-widest leading-relaxed hover:opacity-60 transition-opacity cursor-pointer inline-block" style={{ color: accentColor }}>
              hello@mcb-creative.design
            </a>
            <div className="flex flex-col gap-2 mt-2">
              <Link href="https://www.behance.net/mcb-creative" target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-widest leading-relaxed hover:opacity-60 transition-opacity" style={{ color: accentColor }}>Behance</Link>
              <Link href="https://www.linkedin.com/in/michaelcharlesbrown/" target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-widest leading-relaxed hover:opacity-60 transition-opacity" style={{ color: accentColor }}>LinkedIn</Link>
            </div>
          </motion.div>
        </div>

        {/* Wordmark - stretches edge to edge */}
        <div className="overflow-hidden flex items-end self-stretch min-h-0 w-full">
          <FitText text="MCB Creative" fontFamily="'Clash Display', var(--font-bebas-neue)" sizeScale={0.98} style={{ color: accentColor, fontWeight: 600, textAlign: 'center' }} />
        </div>
        </motion.div>
      </div>
    </footer>
  )
}