import TripleSlash from "@/components/TripleSlash";
import InfoPeelReveal from "@/components/InfoPeelReveal";

const introColLeft = [
  "As a web designer at LeapFrog, a UI designer at ProTools, and as the Creative Director of BitTorrent, I've maintained global platforms, crafted graphics for industry-standard music technology and led campaigns reaching millions.",
  "I've built creative departments from scratch in both in-house and agency settings, always focused on delivering work that speaks directly to the right people.",
];

const introColRight = [
  "Today I partner with founders, small businesses, and other creators to take their projects from the spark of inspiration to a complete visual identity.",
  "I'm also a classically trained musician and have just completed my first feature film score.",
];

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
    name: "Brianna Jackson",
    title: "UX & Product Designer",
  },
];

export default function Info() {
  return (
    <InfoPeelReveal className="info-page info-intro" aria-label="About Michael Charles Brown">
      <section className="project-intro">
        <header className="project-intro__header max-w-[var(--content-max-width)] mx-auto content-inset">
          {/* Desktop: standard single-line eyebrow */}
          <p className="label info-intro__eyebrow-desktop">
            <span className="label-title">MICHAEL CHARLES BROWN</span>{" "}
            <TripleSlash />{" "}
            <span className="label-meta">BRAND DESIGNER</span>
          </p>
          {/* Mobile: stacked — full line is too long */}
          <div className="info-intro__eyebrow">
            <p className="info-intro__eyebrow-name">MICHAEL CHARLES BROWN</p>
            <p className="label info-intro__eyebrow-roles">
              <span className="label-meta">BRAND DESIGNER</span>
            </p>
          </div>
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
              {introColRight.map((para) => (
                <p key={para} className="project-info__body">
                  {para}
                </p>
              ))}
              <p className="project-info__body">
                Check out my music projects{" "}
                <a
                  href="https://michaelcharlesbrown.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flip-link"
                >
                  <span className="flip-link__inner" data-text="here">here</span>
                </a>
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
