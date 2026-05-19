"use client";

import GrainCanvas from "@/components/GrainCanvas";
import FitText from "@/components/FitText";

export default function HeroSection() {
  return (
    <section className="hero relative bg-background">
      {/* Grain — inset from bottom to avoid seam at hero/video boundary */}
      <div className="absolute inset-0 z-[5] pointer-events-none [clip-path:inset(0_0_48px_0)]">
        <GrainCanvas opacity={0.04} blendMode="overlay" zIndex={5} />
      </div>

      <div className="hero__content z-10 flex flex-col justify-end">
        <div className="max-w-[var(--content-max-width)] mx-auto w-full overflow-hidden flex items-end">
          <FitText
            as="h1"
            text="MCB Creative"
            fontFamily="var(--font-family-wordmark)"
            sizeScale={0.98}
            style={{ color: "var(--color-black)", fontWeight: 600, textAlign: "center" }}
          />
        </div>
      </div>
    </section>
  );
}
