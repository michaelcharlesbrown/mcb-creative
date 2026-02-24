export default function Info() {
  return (
    <div className="info-page">
      {/* Section 1: Current top section */}
      <section className="min-h-screen bg-background text-black flex items-center">
        <main className="w-full max-w-[var(--content-max-width)] mx-auto content-inset pt-[var(--nav-height)] min-h-[calc(100vh-var(--nav-height))] flex items-center">
          <div className="w-full grid grid-cols-12 gap-x-4 md:gap-x-[clamp(1rem,2vw,2rem)]">
            <p
              className="info-page__text col-span-12 md:col-span-7 md:col-start-5 text-black uppercase font-display font-normal text-left max-w-[calc(100%-35px)]"
            >
              I&apos;m a senior brand designer with 10+ years of experience
              creating brand identities, websites, and digital products for
              growing businesses, big and small. My work spans graphic design,
              web design, motion and illustration, as well as product design and
              design systems.
            </p>
          </div>
        </main>
      </section>

      {/* Section 2: Full viewport homepage video */}
      <section className="h-screen w-full bg-black">
        <video
          className="w-full h-full object-cover"
          src="/video/hero-placeholder-test.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
      </section>

      {/* Section 3: Three columns */}
      <section className="min-h-screen bg-background text-black py-16 md:py-24">
        <div className="max-w-[var(--content-max-width)] mx-auto content-inset">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <h3 className="text-xl font-display font-normal mb-4">Services</h3>
              <p className="font-mono text-sm text-black/80 mb-6">
                Brand identity, web design, and digital product design for
                growing businesses.
              </p>
              <a href="#" className="font-mono text-sm underline hover:opacity-70">
                View services →
              </a>
            </div>
            <div>
              <h3 className="text-xl font-display font-normal mb-4">Work</h3>
              <p className="font-mono text-sm text-black/80 mb-6">
                Selected projects across branding, web, and product design.
              </p>
              <a href="/projects" className="font-mono text-sm underline hover:opacity-70">
                View projects →
              </a>
            </div>
            <div>
              <h3 className="text-xl font-display font-normal mb-4">Contact</h3>
              <p className="font-mono text-sm text-black/80 mb-6">
                Get in touch for new projects and collaborations.
              </p>
              <a href="mailto:hello@mcb-creative.design" className="font-mono text-sm underline hover:opacity-70">
                hello@mcb-creative.design →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
