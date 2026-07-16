"use client";

import { motion } from "framer-motion";
import GrainCanvas from "@/components/GrainCanvas";
import { homepageIntro, HOMEPAGE_INTRO_EASE } from "@/lib/homepageIntro";
import SizzleReel from "@/components/SizzleReel";
import type { MediaSlideData } from "@/components/SlideSequence";

interface HeroSectionProps {
  sizzleReelSlides?: MediaSlideData[];
}

export default function HeroSection({ sizzleReelSlides = [] }: HeroSectionProps) {
  const hasSizzleReel = sizzleReelSlides.length > 0;

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
          initial={{ opacity: 0, y: homepageIntro.title.y }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: homepageIntro.title.duration,
            ease: HOMEPAGE_INTRO_EASE,
            delay: homepageIntro.title.delay,
          }}
        >
          <img
            src="/images/mcb-creative-dark.svg"
            alt="MCB Creative"
            className="hero__wordmark-img"
            width="100%"
            height="auto"
          />
        </motion.div>

        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: homepageIntro.tagline.y }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: homepageIntro.tagline.duration,
            ease: HOMEPAGE_INTRO_EASE,
            delay: homepageIntro.tagline.delay,
          }}
        >
          Independent Design Studio of Michael Charles Brown
        </motion.p>
      </div>

      {/* Lower half — video after title + tagline */}
      <div className="hero__lower">
        <motion.div
          className="hero__lower-inner"
          initial={{ opacity: 0, y: homepageIntro.video.y }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: homepageIntro.video.duration,
            ease: HOMEPAGE_INTRO_EASE,
            delay: homepageIntro.video.delay,
          }}
        >
          <div className="max-w-[var(--content-max-width)] mx-auto w-full content-inset box-border">
            {hasSizzleReel && <SizzleReel slides={sizzleReelSlides} priority />}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
