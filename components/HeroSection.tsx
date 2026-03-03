"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import GrainCanvas from "@/components/GrainCanvas";
import FitText from "@/components/FitText";

interface HeroSectionProps {
  disableScrollTrigger?: boolean;
}

export default function HeroSection({ disableScrollTrigger: _ = false }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const taglineRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const tagline  = taglineRef.current;
    if (!section || !headline || !tagline) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.set(section, { y: 0 });
      gsap.set([headline, tagline], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(tagline,  { opacity: 0, y: 30 });
      gsap.set(headline, { opacity: 0, y: 40 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl
        .to(section,  { y: 0, duration: 1.2, ease: "power3.inOut", overwrite: "auto" }, 0)
        .to(tagline,  { opacity: 1, y: 0, duration: 0.6 }, 0.3)
        .to(headline, { opacity: 1, y: 0, duration: 0.7 }, "-=0.35");
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero hero--slide-in relative bg-background overflow-hidden">
      {/* Grain overlay */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <GrainCanvas opacity={0.04} blendMode="overlay" zIndex={5} />
      </div>

      {/* Content */}
      <div className="hero__content relative z-10">
        <div className="hero__content-inner">
          <div className="hero__headline-wrap">
            {/* Tagline above wordmark (Figma spec) */}
            <div
              ref={taglineRef}
              className="hero__tagline hero__content-animate mb-3 md:mb-4"
            >
              <p className="m-0">Independent </p>
              <p className="m-0">DESIGN studio of </p>
              <p className="m-0">Michael Charles Brown</p>
            </div>
            <div ref={headlineRef} className="hero__content-animate">
              {/* Mobile: FitText */}
              <div className="md:hidden">
                <FitText
                  text="MCB Creative"
                  as="h1"
                  fontFamily="'Clash Display', var(--font-bebas-neue)"
                  sizeScale={0.98}
                  style={{ color: "var(--color-black)", fontWeight: 600, textAlign: "left" }}
                />
              </div>
              {/* Desktop: CSS headline */}
              <h1 className="hero__headline hidden md:block">
                MCB Creative
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
