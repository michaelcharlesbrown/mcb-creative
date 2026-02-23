"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PageIntroProps {
  onComplete: () => void;
}

export default function PageIntro({ onComplete }: PageIntroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const logoRef    = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const logo    = logoRef.current;
    if (!wrapper || !logo) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      onComplete();
      return;
    }

    // Initial state
    gsap.set(logo, { opacity: 0, y: 24 });

    const tl = gsap.timeline();

    tl
      // Logo slides up and fades in
      .to(logo, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      }, 0.2)

      // Hold for a breath
      .to(logo, {
        opacity: 1,
        duration: 0.5,
      })

      // Logo slides down and fades out
      .to(logo, {
        opacity: 0,
        y: 48,
        duration: 0.55,
        ease: "power2.in",
      })

      // Whole screen fades to black then away
      .to(wrapper, {
        opacity: 0,
        duration: 0.35,
        ease: "power1.in",
        onComplete,
      }, "-=0.1");

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "var(--dark-background)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <img
        ref={logoRef}
        src="/images/mcb-creative-logo.svg"
        alt="MCB Creative"
        style={{
          width: "clamp(60px, 8vw, 110px)",
          height: "auto",
          // Force logo white on black background
          filter: "brightness(0) invert(1)",
        }}
      />
    </div>
  );
}
