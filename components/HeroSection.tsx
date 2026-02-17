"use client";

import { useEffect, useRef, useState } from "react";
import GrainCanvas from "@/components/GrainCanvas";

const HERO_VIDEO_SRC = "/video/hero-placeholder-test.mp4";

export default function HeroSection() {
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

  return (
    <section className="hero relative">
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
          />
        </div>
      </div>
      <GrainCanvas opacity={0.08} blendMode="overlay" zIndex={10} />
    </section>
  );
}
