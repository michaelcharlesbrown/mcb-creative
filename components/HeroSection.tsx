import GrainCanvas from "@/components/GrainCanvas";
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

      {/* Upper half — title + tagline, centered. Steps 1 and 2 of the page load
          sequence; the nav takes step 3 and the reel below takes step 4. */}
      <div className="hero__upper">
        <div className="hero__wordmark intro-beat intro-beat--depth intro-beat--1">
          {/* eslint-disable-next-line @next/next/no-img-element -- same-origin SVG wordmark; next/image adds nothing for SVGs */}
          <img
            src="/images/mcb-creative-dark.svg"
            alt="MCB Creative"
            className="hero__wordmark-img"
            width="100%"
            height="auto"
          />
        </div>

        <p className="hero__tagline intro-beat intro-beat--wipe intro-beat--2">
          Independent Design Studio of Michael Charles Brown
        </p>
      </div>

      {/* Lower half — video after title + tagline */}
      <div className="hero__lower intro-beat intro-beat--4">
        <div className="hero__lower-inner">
          <div className="max-w-[var(--content-max-width)] mx-auto w-full content-inset box-border">
            {hasSizzleReel && <SizzleReel slides={sizzleReelSlides} priority />}
          </div>
        </div>
      </div>
    </section>
  );
}
