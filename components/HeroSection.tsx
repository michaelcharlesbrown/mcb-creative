"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GrainCanvas from "@/components/GrainCanvas";

gsap.registerPlugin(ScrollTrigger);

const HERO_VIDEO_SRC = "/video/hero-placeholder-test.mp4";

interface HeroSectionProps {
  disableScrollTrigger?: boolean;
}

export default function HeroSection({ disableScrollTrigger = false }: HeroSectionProps) {
  const heroRef     = useRef<HTMLElement>(null);
  const grayRef     = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef  = useRef<HTMLParagraphElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const hero     = heroRef.current;
    const gray     = grayRef.current;
    const overlay  = overlayRef.current;
    const headline = headlineRef.current;
    const tagline  = taglineRef.current;
    const video    = videoRef.current;

    if (!hero || !gray || !overlay || !headline || !tagline || !video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.set([overlay, gray], { yPercent: -100 });
      gsap.set(video, { yPercent: 0 });
      gsap.set([headline, tagline], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {

      // ── Initial states ───────────────────────────────────────────────
      gsap.set(gray,     { yPercent: -100 });
      gsap.set(overlay,  { yPercent: -100 });
      gsap.set(video,    { yPercent: 100 });
      gsap.set(headline, { opacity: 0, y: 40 });
      gsap.set(tagline,  { opacity: 0, y: 30 });

      // ── Intro timeline ───────────────────────────────────────────────
      // Beat 1: gray accent panel swooshes down, settles at 75vh
      // Beat 2: white overlay follows, covers gray cleanly, same destination
      // Beat 3: headline rises up
      // Beat 4: tagline follows
      // Then scroll takes over
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          if (disableScrollTrigger) return;

          // ── Hand off to ScrollTrigger ────────────────────────────────
          // Both panels move together from -25 → -100 on scroll
          gsap.to([gray, overlay], {
            yPercent: -100,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "+=100%",
              pin: true,
              scrub: 0.8,
            },
          });
        },
      });

      tl
        // Gray drops first — the accent swoosh
        .to(gray,    { yPercent: -25, duration: 1.0 }, 0)
        .to(video,   { yPercent: 0, duration: 1.2, ease: "power3.out" }, 0)
        // White follows — covers gray, clean edge
        .to(overlay, { yPercent: -25, duration: 1.0 }, 0.18)
        // Headline rises as white panel settles
        .to(headline, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        }, "-=0.3")
        // Tagline a beat behind
        .to(tagline, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.45");

    }, hero);

    return () => ctx.revert();
  }, [disableScrollTrigger]);

  return (
    <section
      ref={heroRef}
      className="hero relative h-screen overflow-hidden bg-black"
    >
      {/* VIDEO — already present, revealed as panels scroll away */}
      <video
        ref={videoRef}
        className="hero__video absolute inset-0 h-full w-full object-cover"
        src={HERO_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* GRAIN */}
      <div className="hero__grain absolute inset-0 z-[5] pointer-events-none">
        <GrainCanvas opacity={0.08} blendMode="overlay" zIndex={10} />
      </div>

      {/* GRAY ACCENT PANEL — drops first, two-beat swoosh */}
      <div
        ref={grayRef}
        className="absolute inset-0 z-10"
        style={{ background: "var(--dark-background)" }}
      />

      {/* WHITE OVERLAY — drops behind gray, covers it, peels off on scroll */}
      <div
        ref={overlayRef}
        className="hero__overlay absolute inset-0 z-20 bg-background"
      >
        <div className="hero__content">
          <div className="hero__content-inner">
            <div
              className="hero__headline-wrap"
              style={{ animation: "none", opacity: 1 }}
            >
              <h1
                ref={headlineRef}
                className="hero__headline"
                style={{ animation: "none", opacity: 0 }}
              >
                MCB Creative
              </h1>
              <p
                ref={taglineRef}
                className="hero__subtitle mt-3 text-[12px] uppercase tracking-wide font-[var(--font-mono)] leading-relaxed text-black"
                style={{ animation: "none", opacity: 0 }}
              >
                Independent design studio of<br className="md:hidden" /> Michael Charles Brown
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
