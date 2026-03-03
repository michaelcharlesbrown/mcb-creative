'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import FitText from '@/components/FitText'

interface FooterProps {
  accentColor?: string
}

export default function Footer({ accentColor = 'var(--color-white)' }: FooterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <footer ref={ref} className="w-full bg-black">
      {/* Frame wrapper */}
      <div className="max-w-[var(--content-max-width)] mx-auto">
        <motion.div
          className="relative w-full min-h-screen overflow-hidden flex flex-col bg-black"
          initial={{ y: -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
        {/* Upper content - flex-1 + justify-center centers text vertically above wordmark */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 content-inset py-10">
            <motion.div
              className="flex flex-col gap-5"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <p className="text-micro uppercase tracking-widest leading-body" style={{ color: accentColor }}>
                Independent Design Studio And<br />
                Portfolio Of Creative Director<br />
                Michael Charles Brown
              </p>
              <p className="text-micro uppercase tracking-widest leading-body" style={{ color: accentColor }}>
                San Francisco///Los Angeles
              </p>
              <p className="text-micro uppercase tracking-widest leading-body opacity-50" style={{ color: accentColor }}>
                ©{new Date().getFullYear()}
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col gap-5"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <p className="text-micro uppercase tracking-widest leading-body" style={{ color: accentColor }}>
                Got A Project In Mind?<br />
                I&apos;d Love To Hear About It.<br />
                Get In Touch:
              </p>
              <a href="mailto:hello@mcb-creative.design" className="text-micro normal-case tracking-widest leading-body hover:opacity-60 transition-opacity cursor-pointer inline-block" style={{ color: accentColor }}>
                hello@mcb-creative.design
              </a>
              <div className="flex flex-col gap-2 mt-2">
                <Link href="https://www.behance.net/mcb-creative" target="_blank" rel="noopener noreferrer" className="text-micro uppercase tracking-widest leading-body hover:opacity-60 transition-opacity" style={{ color: accentColor }}>Behance</Link>
                <Link href="https://www.linkedin.com/in/michaelcharlesbrown/" target="_blank" rel="noopener noreferrer" className="text-micro uppercase tracking-widest leading-body hover:opacity-60 transition-opacity" style={{ color: accentColor }}>LinkedIn</Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wordmark - stretches edge to edge */}
        <div className="overflow-hidden flex items-end w-full">
          <FitText text="MCB Creative" fontFamily="'Clash Display', var(--font-bebas-neue)" sizeScale={0.98} tagClassName="text-center" style={{ color: accentColor, fontWeight: 'var(--weight-semibold)' }} />
        </div>
        </motion.div>
      </div>
    </footer>
  )
}