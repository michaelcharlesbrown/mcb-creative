'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

interface FooterProps {
  accentColor?: string
}

export default function Footer({ accentColor = 'var(--color-white)' }: FooterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <footer ref={ref} style={{ backgroundColor: 'var(--dark-background)' }} className="w-full">
      {/* Frame wrapper */}
      <div className="max-w-[var(--content-max-width)] mx-auto">
        <motion.div
          className="relative w-full min-h-screen overflow-hidden flex flex-col"
          style={{ backgroundColor: 'var(--dark-background)' }}
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
              <p className="text-micro uppercase" style={{ color: accentColor }}>
                Independent Design Studio And<br />
                Portfolio Of Creative Director<br />
                Michael Charles Brown
              </p>
              <p className="text-micro uppercase" style={{ color: accentColor }}>
                San Francisco
                <span className="triple-slash">///</span>
                Los Angeles
              </p>
              <p className="text-micro uppercase opacity-50" style={{ color: accentColor }}>
                ©{new Date().getFullYear()}
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col gap-5"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <p className="text-micro uppercase" style={{ color: accentColor }}>
                Got A Project In Mind?<br />
                I&apos;d Love To Hear About It.<br />
                Get In Touch:
              </p>
              <a href="mailto:hello@mcb-creative.design" className="text-micro normal-case hover:opacity-60 transition-opacity cursor-pointer inline-block" style={{ color: accentColor }}>
                hello@mcb-creative.design
              </a>
              <div className="flex flex-col gap-2 mt-2">
                <Link href="https://www.behance.net/mcb-creative" target="_blank" rel="noopener noreferrer" className="text-micro uppercase hover:opacity-60 transition-opacity" style={{ color: accentColor }}>Behance</Link>
                <Link href="https://www.linkedin.com/in/michaelcharlesbrown/" target="_blank" rel="noopener noreferrer" className="text-micro uppercase hover:opacity-60 transition-opacity" style={{ color: accentColor }}>LinkedIn</Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wordmark — full width matches nav + body (content-inset inside max-width) */}
        <div className="overflow-hidden flex items-end w-full content-inset box-border">
          <img
            src="/images/MCBCreative-light.svg"
            alt="MCB Creative"
            width="100%"
            height="auto"
            className="footer__wordmark"
          />
        </div>
        </motion.div>
      </div>
    </footer>
  )
}