"use client";

import { motion } from "framer-motion";
import GrainCanvas from "@/components/GrainCanvas";
import { HOMEPAGE_HERO_VIDEO_SRC } from "@/lib/homepageHeroVideo";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function HeroSection() {
  return (
    <section className="hero relative bg-background">
      {/* Grain overlay */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <GrainCanvas opacity={0.04} blendMode="overlay" zIndex={5} />
      </div>

      {/* Upper half — title + tagline, centered */}
      <div className="hero__upper">
        <motion.div
          className="hero__wordmark"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <img
            src="/images/mcb-creative-dark.svg"
            alt="MCB Creative"
            width="100%"
            height="auto"
          />
        </motion.div>

        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.38 }}
        >
          Independent Design Studio of Michael Charles Brown
        </motion.p>
      </div>

      {/* Lower half — video slides up after text settles */}
      <div className="hero__lower">
        <motion.div
          className="hero__lower-inner"
          initial={{ y: 56, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0, ease: EASE, delay: 1.0 }}
        >
          <div className="max-w-[var(--content-max-width)] mx-auto w-full content-inset box-border">
            <div className="hero__video-frame aspect-[5/7] md:aspect-auto">
              <video
                className="w-full h-full object-cover md:h-auto md:object-contain"
                src={HOMEPAGE_HERO_VIDEO_SRC}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
