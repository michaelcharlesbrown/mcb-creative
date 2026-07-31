import TripleSlash from "@/components/TripleSlash";
import InfoPeelReveal from "@/components/InfoPeelReveal";
import { pageMetadata } from "@/lib/siteConfig";

export const metadata = pageMetadata({ path: "/info" });

const introColLeft = [
  "As a web designer at LeapFrog, a UI designer at ProTools, and Creative Director of BitTorrent, I've crafted graphics for industry-standard music technology and designed brand identities and websites reaching millions.",
  "I've built creative departments from scratch in both in-house and agency settings, always focused on delivering work that speaks directly to the right people.",
];

// The right column's copy carries inline links, so it is written as JSX below
// rather than as an array of plain paragraphs like the left column.

const testimonials = [
  {
    quote:
      "A clear communicator who speaks candidly but always with sincerity and understanding. One of the first people I call when I get something going and need to think creatively or strategically about any venture I’m thinking about.",
    name: "Scott MacDonald",
    title: "CTO, AllSides",
  },
  {
    quote:
      "One of the most talented creative directors in the game. I hired him for a complete rebrand of my startup and he led us through a thorough branding exercise which led to a gorgeous new logo and all of the associated business collateral.",
    name: "Aaron Selverson",
    title: "Co-founder & CEO, Superspatial",
  },
  {
    quote:
      "I’m so lucky that I had the opportunity to work with Michael, as he contributed immensely to my growth as a designer. He has a talent for creating an environment where the team feels heard, encouraged, and inspired.",
    name: "Briana Jackson",
    title: "UX & Product Designer",
  },
];

export default function Info() {
  return (
    <InfoPeelReveal className="info-page info-intro" aria-label="About Michael Charles Brown">
      <section className="project-intro">
        <header className="project-intro__header max-w-[var(--content-max-width)] mx-auto content-inset">
          {/* Standard mono eyebrow — one line on desktop. The roles are grouped
              so mobile can drop them off the name's line (see
              info-intro__eyebrow-roles), and each role is bound to the
              separator that introduces it, so a wrap always breaks before a
              /// and never strands one at the end of a line. */}
          <p className="label info-intro__eyebrow">
            <span className="label-title">MICHAEL CHARLES BROWN</span>{" "}
            <span className="info-intro__eyebrow-roles">
              <span className="info-intro__eyebrow-role">
                <TripleSlash /> <span className="label-meta">INDEPENDENT CREATIVE</span>
              </span>{" "}
              <span className="info-intro__eyebrow-role">
                <TripleSlash /> <span className="label-meta">BRANDING + WEB DESIGN</span>
              </span>
            </span>
          </p>
          <h1 className="project-intro__headline">
            Building visual identities for over a decade.
          </h1>
        </header>

        <div className="project-intro__info max-w-[var(--content-max-width)] mx-auto content-inset">
          <div className="project-info__grid">
            <div className="project-info__copy-col">
              {introColLeft.map((para) => (
                <p key={para} className="project-info__body">
                  {para}
                </p>
              ))}
              <p className="label project-info__links">
                <a href="mailto:hello@mcbcreative.design" className="project-info__cta">
                  <span className="flip-link">
                    <span className="flip-link__inner" data-text="Get in touch">Get in touch</span>
                  </span>
                  <span className="project-info__cta-arrow" aria-hidden="true">→</span>
                </a>
              </p>
            </div>
            <div className="project-info__copy-col">
              <p className="project-info__body">
                Today I partner with founders, small businesses, and other
                creators to take their projects from the spark of inspiration
                to a complete visual identity.
              </p>
              <p className="project-info__body">
                I&rsquo;m also a classically trained musician. I&rsquo;ve
                released several albums on my{" "}
                <a
                  href="https://brokenearrecords.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flip-link project-info__link"
                >
                  <span className="flip-link__inner" data-text="indie record label">indie record label</span>
                </a>{" "}
                and just completed my first feature film score.
              </p>
              <p className="project-info__body">
                Check out my music projects{" "}
                <a
                  href="https://michaelcharlesbrown.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flip-link project-info__link"
                >
                  <span className="flip-link__inner" data-text="here">here</span>
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="project-intro info-testimonials" aria-label="Client testimonials">
        {/* Top half — the marks are this section's headline: same header device as
            the intro above, so they bottom-align to the midline. Reusing the grid
            class puts each mark in its own quote's column. Desktop only; the
            halves release on mobile, where the mark rides above its own quote. */}
        <header className="project-intro__header max-w-[var(--content-max-width)] mx-auto content-inset">
          <div className="info-testimonials__grid">
            {testimonials.map((t) => (
              // eslint-disable-next-line @next/next/no-img-element -- decorative same-origin SVG; next/image adds nothing for SVGs
              <img
                key={t.name}
                src="/images/quote-mark.svg"
                alt=""
                className="info-testimonials__mark"
                width={378}
                height={312}
                decoding="async"
                aria-hidden
              />
            ))}
          </div>
        </header>
        <div className="project-intro__info max-w-[var(--content-max-width)] mx-auto content-inset">
          <div className="info-testimonials__grid">
            {testimonials.map((t) => (
              <blockquote key={t.name} className="info-testimonials__item">
                {/* eslint-disable-next-line @next/next/no-img-element -- decorative same-origin SVG; next/image adds nothing for SVGs */}
                <img
                  src="/images/quote-mark.svg"
                  alt=""
                  className="info-testimonials__mark info-testimonials__mark--stacked"
                  width={378}
                  height={312}
                  decoding="async"
                  aria-hidden
                />
                <p className="project-info__body">{t.quote}</p>
                <footer className="label info-testimonials__attribution">
                  <span className="label-title">{t.name}</span>{" "}
                  <TripleSlash />{" "}
                  <span className="label-meta">{t.title}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </InfoPeelReveal>
  );
}
