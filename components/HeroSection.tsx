"use client";

import Link from "next/link";
import Image from "next/image";

const HERO_VIDEO_SRC = "/video/hero-placeholder-test.mp4";

export default function HeroSection() {
  return (
    <section className="hero" aria-label="Hero">
      {/* Layer 1: Full-viewport video background */}
      <div className="hero__video-wrap">
        <video
          className="hero__video"
          src={HERO_VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
      </div>

      {/* Layer 2: White overlay panel (slides down from above, settles at --panel-top) */}
      <div className="heroPanel" aria-hidden />

      {/* Layer 3: Hero content (fades in after panel settles) */}
      <div className="hero__content">
        <div className="hero__content-inner">
          <Link href="/" className="hero__logo">
            <Image
              src="/images/mcb-creative-logo.svg"
              alt="MCB Creative"
              width={120}
              height={40}
              className="h-8 w-auto md:h-10"
            />
          </Link>
          <p className="hero__tagline">
            Independent design studio of Michael Charles Brown
          </p>
          <h1 className="hero__headline">MCB Creative</h1>
          <Link href="/projects" className="hero__cta">
            View Work
          </Link>
        </div>
      </div>
    </section>
  );
}
