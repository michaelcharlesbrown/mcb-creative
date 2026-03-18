"use client";

import { useEffect, useRef } from "react";
import GrainCanvas from "@/components/GrainCanvas";
import FitText from "@/components/FitText";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Snap height to a whole pixel to prevent sub-pixel seam with the video below.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.style.height = `${Math.floor(el.getBoundingClientRect().height)}px`;
  }, []);

  return (
    <section ref={sectionRef} className="hero relative h-[66.67vh] bg-background">
      {/* Grain — inset from bottom to avoid seam at hero/video boundary */}
      <div className="absolute inset-0 z-[5] pointer-events-none [clip-path:inset(0_0_48px_0)]">
        <GrainCanvas opacity={0.04} blendMode="overlay" zIndex={5} />
      </div>

      <div className="hero__content z-10 flex flex-col justify-end">
        <div className="max-w-[var(--content-max-width)] mx-auto content-inset w-full pt-0">
          <div className="hero__headline-wrap flex flex-col gap-2 text-left">
            <h1 className="hero__tagline text-black [&>span]:block" style={{ textTransform: "uppercase" }}>
              <span>Independent</span>
              <span>Design Studio Of</span>
              <span>Michael Charles Brown</span>
            </h1>
            <div className="hero__headline-block mt-1">
              <div className="md:hidden">
                <FitText
                  text="MCB Creative"
                  as="span"
                  fontFamily="var(--font-family-wordmark)"
                  sizeScale={0.98}
                  style={{ color: "var(--color-black)", fontWeight: 600, textAlign: "left" }}
                />
              </div>
              <span className="hero__headline hidden md:block" aria-hidden>
                MCB Creative
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
