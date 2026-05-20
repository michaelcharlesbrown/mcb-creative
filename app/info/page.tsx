import Image from "next/image";

export default function Info() {
  return (
    <article className="info-page">
      <div className="info-page__main content-inset">
        {/* ── Hero: portrait left, headline + prose right ── */}
        <section className="info-page__hero">
          <div className="info-page__portrait-col">
            <div className="info-page__portrait-wrap">
              <Image
                src="/images/portrait.jpg"
                alt="Michael Charles Brown, Creative Director"
                width={640}
                height={800}
                className="info-page__portrait-img"
                priority
              />
            </div>
            <p className="info-page__caption-name">Michael Charles Brown,</p>
            <p className="info-page__caption-role">Creative Director</p>
          </div>

          <div className="info-page__intro-col">
            <h1 className="info-page__headline">
              I help people define and develop the unique visual language that
              tells their story.
            </h1>

            <div className="info-page__prose">
              <p>
                I partner with founders, marketing leads, and design teams who
                need clarity and conviction in how they show up—from early
                identity work through polished digital experiences.
              </p>
              <p>
                I&apos;ve been building brand identities and designing websites
                for 15 years—from the web team at LeapFrog, through UI design
                at Pro Tools, to Creative Director at BitTorrent, where I led
                the global rebrand for one of the internet&apos;s most
                recognizable platforms.
              </p>
              <p>
                My work spans brand identity, web design, motion, and
                illustration. Today I collaborate with other founders and
                creators to take projects from inspiration to a complete visual
                system—one your team can ship and grow with.
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
