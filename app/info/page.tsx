export default function Info() {
  return (
    <>
      {/* Make body transparent so the fixed video shows through the middle section */}
      <style>{`body { background: transparent !important; }`}</style>

      {/* Fixed video — pinned behind all sections */}
      <video
        className="fixed inset-0 w-full h-full object-cover -z-10"
        src="/video/mcb-creative.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
      {/* Colour-cycling overlay with blend mode */}
      <style>{`
        @keyframes color-cycle {
          0%   { background-color: #ff2020; }
          33%  { background-color: #2050ff; }
          66%  { background-color: #00c853; }
          100% { background-color: #ff2020; }
        }
        .color-cycle-overlay {
          animation: color-cycle 45s ease-in-out infinite;
        }
      `}</style>
      <div
        className="color-cycle-overlay fixed inset-0 -z-10"
        style={{ mixBlendMode: "overlay" }}
        aria-hidden
      />

      {/* Section 1 — opaque, covers the video */}
      <section className="min-h-screen bg-[#fcfcfc] text-black flex items-center relative z-10">
        <main className="w-full max-w-[var(--content-max-width)] mx-auto content-inset pt-[var(--nav-height)] min-h-[calc(100vh-var(--nav-height))] flex items-center">
          <div className="w-full grid grid-cols-12 gap-x-4 md:gap-x-[clamp(1rem,2vw,2rem)]">
            <p className="info-page__text col-span-12 md:col-span-7 md:col-start-5 text-black uppercase font-display font-normal text-left max-w-[calc(100%-35px)]">
              I&apos;m a senior brand designer with 10+ years of experience
              creating brand identities, websites, and digital products for
              growing businesses, big and small. My work spans graphic design,
              web design, motion and illustration, as well as product design and
              design systems.
            </p>
          </div>
        </main>
      </section>

      {/* Section 2 — transparent window, fixed video shows through */}
      <section className="min-h-screen relative z-10" />

      {/* Section 3 — opaque, covers the video */}
      <section className="min-h-screen bg-[#fcfcfc] text-black flex items-center relative z-10">
        <main className="w-full max-w-[var(--content-max-width)] mx-auto content-inset min-h-[calc(100vh-var(--nav-height))] flex items-center">
          <div className="w-full grid grid-cols-12 gap-x-4 md:gap-x-[clamp(1rem,2vw,2rem)]">
            <p className="info-page__text col-span-12 md:col-span-7 md:col-start-5 text-black uppercase font-display font-normal text-left max-w-[calc(100%-35px)]">
              I&apos;m at my best when I&apos;m leading a team. I&apos;ve built
              creative departments from scratch, outlining processes and best
              practices, in both in-house and agency settings, while delivering
              projects reaching millions of users. My focus is cultivating a
              fun, collaborative environment where everyone is heard and
              inspired to do their best work.
            </p>
          </div>
        </main>
      </section>
    </>
  );
}
