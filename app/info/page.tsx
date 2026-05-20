export default function Info() {
  return (
    <article className="info-page">
      <div className="info-page__main content-inset">
        <header className="info-page__header">
          <p className="info-page__name">Michael Charles Brown,</p>
          <p className="info-page__role">Creative Director</p>
        </header>

        <div className="info-page__prose">
          <p className="info-page__prose-lead">
            <strong>
              I help people define and develop the unique visual language
              that tells their story.
            </strong>
          </p>
          <p>
            I partner with founders, marketing leads, and design teams who
            need clarity and conviction in how they show up—from early identity
            work through polished digital experiences.
          </p>
          <p>
            I&apos;ve been building brand identities and designing websites for
            15 years—from the web team at LeapFrog, through UI design at Pro
            Tools, to Creative Director at BitTorrent, where I led the global
            rebrand for one of the internet&apos;s most recognizable platforms.
          </p>
          <p>
            My work spans brand identity, web design, motion, and illustration.
            Today I collaborate with other founders and creators to take projects
            from inspiration to a complete visual system—one your team can ship
            and grow with.
          </p>
        </div>

        <section className="info-page__section" aria-labelledby="clients-heading">
          <h2 id="clients-heading" className="info-page__section-title">
            Who we&apos;ve worked with
          </h2>
          <ul className="info-page__list">
            <li className="info-page__list-item">LeapFrog</li>
            <li className="info-page__list-item">Avid / Pro Tools</li>
            <li className="info-page__list-item">BitTorrent</li>
            <li className="info-page__list-item">
              Venture-backed startups and product teams
            </li>
            <li className="info-page__list-item">
              Studios and independent creators
            </li>
          </ul>
        </section>

        <section
          className="info-page__section"
          aria-labelledby="industry-heading"
        >
          <h2 id="industry-heading" className="info-page__section-title">
            Industry experience
          </h2>
          <ul className="info-page__list">
            <li className="info-page__list-item">Education & learning</li>
            <li className="info-page__list-item">Professional audio tools</li>
            <li className="info-page__list-item">Internet & consumer software</li>
            <li className="info-page__list-item">Brand systems</li>
            <li className="info-page__list-item">Portfolio & editorial web</li>
            <li className="info-page__list-item">Motion & illustrative identity</li>
          </ul>
        </section>

        <section
          className="info-page__section"
          aria-labelledby="recognition-heading"
        >
          <h2 id="recognition-heading" className="info-page__section-title">
            Recognition
          </h2>
          <div className="info-page__recognition-grid">
            <a
              href="https://www.behance.net/mcb-creative"
              target="_blank"
              rel="noopener noreferrer"
            >
              Behance
            </a>
            <a
              href="https://www.linkedin.com/in/michaelcharlesbrown/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a href="mailto:hello@mcb-creative.design">
              hello@mcb-creative.design
            </a>
          </div>
        </section>

        <hr className="info-page__rule" />

        <div className="info-page__cta">
          <h2 className="info-page__cta-title">Get in touch</h2>
          <p className="info-page__cta-copy">
            Thinking about a new identity, site, or campaign system? I&apos;d
            love to hear what you&apos;re building.
          </p>
          <a className="info-page__cta-link" href="mailto:hello@mcb-creative.design">
            Say hello → hello@mcb-creative.design
          </a>
        </div>
      </div>
    </article>
  );
}
