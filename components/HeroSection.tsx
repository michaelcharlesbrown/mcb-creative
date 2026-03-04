"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import GrainCanvas from "@/components/GrainCanvas";
import FitText from "@/components/FitText";

interface HeroSectionProps {
  disableScrollTrigger?: boolean;
}

export default function HeroSection({ disableScrollTrigger: _ = false }: HeroSectionProps) {
  const headlineRef = useRef<HTMLDivElement>(null);
  const taglineRef  = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const headline = headlineRef.current;
    const tagline  = taglineRef.current;
    if (!headline || !tagline) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.set([headline, tagline], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(headline, { opacity: 0, y: 40 });
      gsap.set(tagline,  { opacity: 0, y: 30 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl
        .to(headline, { opacity: 1, y: 0, duration: 0.7 }, 0.2)
        .to(tagline,  { opacity: 1, y: 0, duration: 0.6 }, "-=0.35");
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero relative h-screen bg-background overflow-hidden">
      {/* Grain overlay */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <GrainCanvas opacity={0.04} blendMode="overlay" zIndex={5} />
      </div>

      {/* Content */}
      <div className="hero__content relative z-10 flex flex-col">
        <div className="min-h-[calc(66.67vh-var(--nav-height))] shrink-0" aria-hidden />
        <div className="hero__content-inner flex-1 min-h-0">
          <div className="hero__headline-wrap">
            <div ref={headlineRef} style={{ opacity: 0 }}>
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
            <p
              ref={taglineRef}
              className="hero__subtitle mt-3 text-ui uppercase tracking-open leading-body text-black"
              style={{ opacity: 0 }}
            >
              Independent design studio of<br className="md:hidden" /> Michael Charles Brown
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
