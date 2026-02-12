"use client";

import { useEffect, useRef, useState } from "react";

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
    <>
      <section className="hero hero--minimal">
        <div className="hero__minimal-content">
          <h1 className="hero__headline hero__headline--minimal">MCB CREATIVE</h1>
        </div>
      </section>
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
    </>
  );
}
