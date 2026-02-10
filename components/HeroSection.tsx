"use client";

const HERO_VIDEO_SRC = "/video/hero-placeholder-test.mp4";

export default function HeroSection() {
  return (
    <section className="hero relative min-h-screen bg-black" aria-label="Hero">
      {/* Video background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover object-center"
          src={HERO_VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
      </div>

      {/* Panel - slides down from top on load */}
      <div className="hero__panel">
        <div className="hero__content">
          <div className="hero__content-inner">
            <p className="hero__tagline" role="presentation">
              Independent design studio of Michael Charles Brown
            </p>
            <div className="hero__headline-wrap">
              <h1 className="hero__headline">MCB Creative</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
