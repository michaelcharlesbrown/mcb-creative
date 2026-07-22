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

      {/* Upper half — title + tagline, centered */}
      <div className="hero__upper">
        <div className="hero__wordmark">
          {/* eslint-disable-next-line @next/next/no-img-element -- same-origin SVG wordmark; next/image adds nothing for SVGs */}
          <img
            src="/images/mcb-creative-dark.svg"
            alt="MCB Creative"
            className="hero__wordmark-img"
            width="100%"
            height="auto"
          />
        </div>

        <p className="hero__tagline">
          Independent Design Studio of Michael Charles Brown
        </p>
      </div>

      {/* Lower half — video after title + tagline */}
      <div className="hero__lower">
        <div className="hero__lower-inner">
          <div className="max-w-[var(--content-max-width)] mx-auto w-full content-inset box-border">
            {hasSizzleReel && <SizzleReel slides={sizzleReelSlides} priority />}
          </div>
        </div>
      </div>
    </section>
  );
}
