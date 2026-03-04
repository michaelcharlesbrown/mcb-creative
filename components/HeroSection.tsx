"use client";

import { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";
import GrainCanvas from "@/components/GrainCanvas";
import FitText from "@/components/FitText";

interface HeroSectionProps {
  disableScrollTrigger?: boolean;
  titleRef?: React.RefObject<HTMLDivElement | null>;
  taglineRef?: React.RefObject<HTMLDivElement | null>;
  /** When true, parent runs animation; this component does not */
  animateFromParent?: boolean;
}

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (el: T | null) => {
    refs.forEach((r) => {
      if (!r) return;
      if (typeof r === "function") r(el);
      else (r as React.MutableRefObject<T | null>).current = el;
    });
  };
}

const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(
  function HeroSection({ disableScrollTrigger: _ = false, titleRef, taglineRef, animateFromParent = false }, ref) {
    const sectionRef = useRef<HTMLElement>(null);
    const innerTitleRef = useRef<HTMLDivElement>(null);
    const innerTaglineRef = useRef<HTMLDivElement>(null);
    const titleEl = titleRef ?? innerTitleRef;
    const taglineEl = taglineRef ?? innerTaglineRef;

    useEffect(() => {
      if (animateFromParent) return;
      const section = (ref && typeof ref !== "function" ? ref.current : null) ?? sectionRef.current;
      const title = titleEl.current;
      const tagline = taglineEl.current;
      if (!section || !title || !tagline) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        const ease = [0.22, 1, 0.36, 1]; /* smooth out — fluid deceleration */
        tl.fromTo(section, { yPercent: -100 }, { yPercent: 0, duration: 0.7, ease });
        tl.fromTo(title, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, ease }, "-=0.2");
        tl.fromTo(tagline, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, ease }, "-=0.15");
      }, section);

      return () => ctx.revert();
    }, [animateFromParent, ref, titleEl, taglineEl]);

    return (
    <section ref={mergeRefs(ref, sectionRef)} className="hero relative h-[66.67vh] bg-background overflow-hidden">
      {/* Grain — inset 48px from bottom to avoid seam at hero/video boundary */}
      <div className="absolute inset-0 z-[5] pointer-events-none [clip-path:inset(0_0_48px_0)]">
        <GrainCanvas opacity={0.04} blendMode="overlay" zIndex={5} />
      </div>

      {/* Content — bottom-left, constrained to main container like nav/Featured Work */}
      <div className="hero__content z-10 flex flex-col justify-end">
        <div className="max-w-[var(--content-max-width)] mx-auto content-inset w-full pt-0">
          <div className="hero__headline-wrap flex flex-col gap-2 text-left">
            {/* H1: tagline — semantic H1, displayed as body copy (12px mono) */}
            <h1 ref={taglineEl} className="hero__tagline tracking-widest text-black [&>span]:block" style={{ textTransform: 'uppercase' }}>
              <span>Independent</span>
              <span>Design Studio Of</span>
              <span>Michael Charles Brown</span>
            </h1>
            {/* Site title — Clash Display, decorative */}
            <div ref={titleEl} className="hero__headline-block mt-1">
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
);

export default HeroSection;
