"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import GrainCanvas from "@/components/GrainCanvas";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const exitY = useTransform(scrollY, [0, 350], [0, -220]);
  const exitOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  return (
    <section className="hero relative bg-background">
      {/* Grain — inset from bottom to avoid seam at hero/video boundary */}
      <div className="absolute inset-0 z-[5] pointer-events-none [clip-path:inset(0_0_48px_0)]">
        <GrainCanvas opacity={0.04} blendMode="overlay" zIndex={5} />
      </div>

      <div className="hero__content z-10 flex flex-col justify-end">
        {/* Scroll-exit wrapper: outside overflow-hidden so the upward motion is unclipped */}
        <motion.div style={{ y: exitY, opacity: exitOpacity }}>
          <div className="max-w-[var(--content-max-width)] mx-auto w-full content-inset overflow-hidden flex items-end box-border">
            <motion.h1
              className="hero__wordmark m-0 w-full"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <img
                src="/images/mcb-creative-dark.svg"
                alt="MCB Creative"
                width="100%"
                height="auto"
              />
            </motion.h1>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
