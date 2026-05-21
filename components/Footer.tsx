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

  const wordmarkRef = useRef(null)
  const wordmarkInView = useInView(wordmarkRef, { once: true, margin: '0px' })

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
        {/* Upper content — CTA block, vertically centered above wordmark */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 content-inset py-10">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <h2 className="footer__cta-headline">
                Let&apos;s work<br />
                together
              </h2>
            </motion.div>

            <motion.div
              className="flex flex-col justify-center gap-8"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <p className="footer__cta-body">
                Got A Project In Mind?<br />
                I&apos;d Love To Hear About It.<br />
                Get In Touch.
              </p>
              <Link href="/info" className="footer__cta-link">
                Say hello
                <img
                  src="/images/arrow-light.svg"
                  alt=""
                  className="footer__cta-arrow"
                  width={30}
                  height={30}
                  decoding="async"
                  aria-hidden
                />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Wordmark — full width matches nav + body (content-inset inside max-width) */}
        <div ref={wordmarkRef} className="overflow-hidden flex items-end w-full content-inset box-border mt-auto">
          <motion.img
            src="/images/mcb-creative-light.svg"
            alt="MCB Creative"
            width="100%"
            height="auto"
            className="footer__wordmark"
            initial={{ opacity: 0, y: 140 }}
            animate={wordmarkInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              opacity: { duration: 3, ease: 'easeIn', delay: 0.6 },
              y:       { duration: 3, ease: [0.16, 1, 0.3, 1], delay: 0.6 },
            }}
          />
        </div>
        </motion.div>
      </div>
    </footer>
  )
}