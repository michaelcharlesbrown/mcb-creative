"use client";

import GrainCanvas from "@/components/GrainCanvas";

export default function HeroSection() {
  return (
    <section className="hero relative bg-background">
      {/* Grain — inset from bottom to avoid seam at hero/video boundary */}
      <div className="absolute inset-0 z-[5] pointer-events-none [clip-path:inset(0_0_48px_0)]">
        <GrainCanvas opacity={0.04} blendMode="overlay" zIndex={5} />
      </div>

      <div className="hero__content z-10 flex flex-col justify-end">
        <div className="max-w-[var(--content-max-width)] mx-auto w-full content-inset overflow-hidden flex items-end box-border">
          <h1 className="hero__wordmark m-0 w-full">
            <img
              src="/images/mcb-creative-dark.svg"
              alt="MCB Creative"
              width="100%"
              height="auto"
            />
          </h1>
        </div>
      </div>
    </section>
  );
}
