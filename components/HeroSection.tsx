"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GrainCanvas from "@/components/GrainCanvas";

gsap.registerPlugin(ScrollTrigger);

const HERO_VIDEO_SRC = "/video/hero-placeholder-test.mp4";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const overlay = overlayRef.current;
    if (!hero || !overlay) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.set(overlay, { yPercent: -100 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(overlay, {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: true,
        },
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero relative h-screen overflow-hidden"
    >
      {/* HERO STAGE: video fills viewport */}
      <video
        className="hero__video absolute inset-0 h-full w-full object-cover"
        src={HERO_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="hero__grain absolute inset-0 z-[5] pointer-events-none">
        <GrainCanvas opacity={0.08} blendMode="overlay" zIndex={10} />
      </div>
      {/* OVERLAY PANEL: peels off on scroll */}
      <div
        ref={overlayRef}
        className="hero__overlay absolute inset-0 z-10 bg-white"
      >
        <div className="hero__panel hero__panel--gray" />
        <div className="hero__panel hero__panel--white" />
        <div className="hero__content">
          <div className="hero__content-inner">
            <div className="hero__headline-wrap">
              <h1 className="hero__headline hero-headline">MCB Creative</h1>
              <p className="hero__subtitle mt-3 text-[12px] uppercase tracking-wide font-[var(--font-mono)] leading-relaxed text-black">
                Independent design studio of Michael Charles Brown
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
