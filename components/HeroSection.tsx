"use client";

import { useEffect, useRef, useState } from "react";

const HERO_VIDEO_SRC = "/video/hero-placeholder-test.mp4";
const PARALLAX_FACTOR = 0.15;
/** Offset video up to prevent white gap when parallax moves it down */
const PARALLAX_OFFSET_UP = 150;

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [videoInView, setVideoInView] = useState(false);
  const videoBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = videoBlockRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVideoInView(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let raf: number | null = null;
    const handleScroll = () => {
      setScrollY(window.scrollY);
      raf = null;
    };
    const onScroll = () => {
      if (raf === null) {
        raf = requestAnimationFrame(handleScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  const parallaxY = scrollY * PARALLAX_FACTOR;

  return (
    <section className="hero">
      {/* Block 1: Overlay over gray - no video */}
      <div className="hero__overlay-block">
        {/* Lighter gray layer animates down first, then white on top */}
        <div className="hero__panel hero__panel--gray" />
        <div className="hero__panel hero__panel--white" />
        {/* Content layer - tagline + headline */}
        <div className="hero__content">
          <div className="hero__content-inner">
            <p className="hero__tagline">
              Independent design studio of Michael Charles Brown
            </p>
            <div className="hero__headline-wrap">
              <h1 className="hero__headline hero-headline">MCB Creative</h1>
            </div>
          </div>
        </div>
      </div>
      {/* Block 2: Full-screen video - comes up from bottom, then parallax */}
      <div
        ref={videoBlockRef}
        className={`hero__video-block ${videoInView ? "hero__video-block--in-view" : ""}`}
      >
        <div className="hero__video-wrap">
          <video
            className="hero__video"
            src={HERO_VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            style={{
              transform: `translate3d(0, ${-PARALLAX_OFFSET_UP + parallaxY}px, 0)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
