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

export default function Info() {
  return (
    <InfoPeelReveal>
      <main className="info-page info-intro" aria-label="About Michael Charles Brown">
      <section className="project-intro">
        <header className="project-intro__header max-w-[var(--content-max-width)] mx-auto content-inset">
          {/* Desktop: standard single-line eyebrow */}
          <p className="label info-intro__eyebrow-desktop">
            <span className="label-title">MICHAEL CHARLES BROWN</span>{" "}
            <TripleSlash />{" "}
            <span className="label-meta">BRAND DESIGNER</span>{" "}
            <TripleSlash />{" "}
            <span className="label-meta">CREATIVE DIRECTOR</span>
          </p>
          {/* Mobile: stacked — full line is too long */}
          <div className="info-intro__eyebrow">
            <p className="info-intro__eyebrow-name">MICHAEL CHARLES BROWN</p>
            <p className="label info-intro__eyebrow-roles">
              <span className="label-meta">BRAND DESIGNER</span>{" "}
              <TripleSlash />{" "}
              <span className="label-meta">CREATIVE DIRECTOR</span>
            </p>
          </div>
          <h1 className="project-intro__headline">
            I&apos;ve been building brand identities and creating visual
            personalities for fifteen years.
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
              <p className="label project-info__links flex items-center gap-2">
                <a href="https://www.instagram.com/maddenizen" target="_blank" rel="noopener noreferrer" className="flip-link">
                  <span className="flip-link__inner" data-text="Instagram">Instagram</span>
                </a>
                <TripleSlash />
                <a href="https://www.linkedin.com/in/michaelcharlesbrown/" target="_blank" rel="noopener noreferrer" className="flip-link">
                  <span className="flip-link__inner" data-text="LinkedIn">LinkedIn</span>
                </a>
              </p>
            </div>
            <div className="project-info__copy-col">
              {introColRight.map((para) => (
                <p key={para} className="project-info__body">
                  {para}
                </p>
              ))}
              <a className="project-info__body" href="https://michaelcharlesbrown.com" target="_blank" rel="noopener noreferrer">
                Check out my music projects here →
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
    </InfoPeelReveal>
  );
}
