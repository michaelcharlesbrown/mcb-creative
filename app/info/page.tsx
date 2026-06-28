import HeroCorners from "@/components/HeroCorners";
import InfoArchiveGrid from "@/components/InfoArchiveGrid";
import InfoChromeFade from "@/components/InfoChromeFade";

const introColLeft = [
  "As a web designer at LeapFrog, a UI designer at Pro Tools, and as the Creative Director of BitTorrent, I’ve maintained global platforms, crafted graphics for industry-standard music technology and led campaigns reaching millions.",
  "I’ve built creative departments from scratch in both in-house and agency settings, always focused on delivering work that speaks directly to the right people.",
];

const introColRight = [
  "Today I partner with founders and creators to take their projects from spark of inspiration to complete visual identity.",
  "I’m also a classically trained musician and have just completed my first feature film score.",
];

export default function Info() {
  return (
    <main className="info-archive-page info-intro" aria-label="About Michael Charles Brown">
      <InfoChromeFade />

      {/* Typography — shown at the top, fades out on scroll (desktop) */}
      <div className="info-archive-page__text">
        <div className="info-archive__band">
          <section className="project-intro">
            <header className="project-intro__header">
              <p className="project-intro__eyebrow">WHAT I DO</p>
              <h1 className="project-intro__headline">
                I&apos;ve been building brand identities and creating visual
                personalities for fifteen years.
              </h1>
            </header>

            <div className="project-intro__info">
              <div className="project-info__grid">
                <div className="project-info__copy-col">
                  {introColLeft.map((para) => (
                    <p key={para} className="project-info__body">
                      {para}
                    </p>
                  ))}
                </div>
                <div className="project-info__copy-col">
                  {introColRight.map((para) => (
                    <p key={para} className="project-info__body">
                      {para}
                    </p>
                  ))}
                  <a className="project-info__body" href="/projects">
                    Check out my music projects here →
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Masonry that scrolls up from below, behind the text */}
      <InfoArchiveGrid />

      <HeroCorners />
    </main>
  );
}
