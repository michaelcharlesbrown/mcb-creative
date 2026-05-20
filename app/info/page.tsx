export default function Info() {
  return (
    <article className="info-page">
      <div className="info-page__main content-inset">
        {/* ── Hero: portrait left, headline + prose right ── */}
        <section className="info-page__hero">
          <div className="info-page__portrait-col">
            <div className="info-page__portrait-wrap">
              <video
                className="info-page__portrait-video"
                src="/video/mcb-creative-hp-video.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
            <p className="info-page__caption-name">Michael Charles Brown,</p>
            <p className="info-page__caption-role">Creative Director</p>
          </div>

          <div className="info-page__intro-col">
            <h1 className="info-page__headline">
              I help people define and develop a unique visual language to tell
              their story.
            </h1>

            <div className="info-page__prose">
              <p>
                I&apos;ve been building brand identities, creating visual
                personalities and constructing digital worlds for 15 years.
              </p>
              <p>
                As a web designer at LeapFrog, a user interface designer at Pro
                Tools, and as the Creative Director of BitTorrent, I&apos;ve
                maintained global e-commerce platforms, crafted graphics for
                industry standard music technology and led the design of
                products and campaigns reaching millions.
              </p>
              <p>
                Today I partner with other creators and founders to help take
                their projects from the spark of inspiration to complete visual
                identity.
              </p>
              <p>
                My work spans brand, web, motion, and illustration, always with
                the focus of speaking directly to the right people.
              </p>
              <p>
                I&apos;m also a classically trained musician and have just
                completed my first feature film score.
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <hr className="info-page__rule" />

        <section className="info-page__cta">
          <h2 className="info-page__cta-title">Get in touch</h2>
          <div className="info-page__cta-body">
            <p className="info-page__cta-copy">
              Thinking about a new identity, site, or campaign system?
              I&apos;d love to chat.
            </p>
            <a
              className="info-page__cta-button"
              href="mailto:hello@mcb-creative.design"
            >
              Say hello
            </a>
          </div>
        </section>
      </div>
    </article>
  );
}
