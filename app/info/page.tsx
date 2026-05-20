import BodyClass from "@/components/BodyClass";

export default function Info() {
  return (
    <>
      {/* Make body transparent so the fixed video shows through the middle section */}
      <BodyClass className="info-page-active" />

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

      {/* Section 1 — opaque, covers the video */}
      <section className="min-h-screen bg-[#fcfcfc] text-black flex items-center relative z-10">
        <main className="w-full max-w-[var(--content-max-width)] mx-auto content-inset pt-[var(--nav-height)] min-h-[calc(100vh-var(--nav-height))] flex items-center">
          <div className="w-full grid grid-cols-12 gap-x-4 md:gap-x-[clamp(1rem,2vw,2rem)]">
            <div className="info-page__copy col-span-12 md:col-span-7 md:col-start-5 text-black uppercase font-normal text-left max-w-[calc(100%-35px)]">
              <p className="info-page__text">
                <strong>
                  I help people define and develop the unique visual language
                  that tells their story.
                </strong>
              </p>
              <p className="info-page__text">
                I&apos;ve been building brand identities and designing websites
                for 15 years, starting on the web team at LeapFrog, through a
                UI design role at Pro Tools, to Creative Director at BitTorrent
                where I led the global rebrand for one of the internet&apos;s
                most recognized platforms.
              </p>
            </div>
          </div>
        </main>
      </section>

      {/* Section 2 — transparent window, fixed video shows through */}
      <section className="min-h-screen relative z-10" />

      {/* Section 3 — opaque, covers the video */}
      <section className="min-h-screen bg-[#fcfcfc] text-black flex items-center relative z-10">
        <main className="w-full max-w-[var(--content-max-width)] mx-auto content-inset min-h-[calc(100vh-var(--nav-height))] flex items-center">
          <div className="w-full grid grid-cols-12 gap-x-4 md:gap-x-[clamp(1rem,2vw,2rem)]">
            <p className="info-page__text col-span-12 md:col-span-7 md:col-start-5 text-black uppercase font-normal text-left max-w-[calc(100%-35px)]">
              My work spans brand identity, web design, motion, and
              illustration. Today I work with other founders and creators to
              help take their businesses and projects from inspiration to
              complete visual identity.
            </p>
          </div>
        </main>
      </section>
    </>
  );
}
