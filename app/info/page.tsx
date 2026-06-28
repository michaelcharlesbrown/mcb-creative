const testimonials = [
  {
    body: "A clear communicator who speaks candidly but always with sincerity and understanding. One of the first people I call when I get something going and need to think creatively or strategically about any venture I\u2019m thinking about.",
    name: "Scott MacDonald",
    title: "CTO, AllSides",
  },
  {
    body: "I hired Michael for a complete rebrand of my startup and he led us through a thorough branding exercise which led to a gorgeous new logo and all of the associated business collateral.",
    name: "Aaron Selverson",
    title: "CEO, Superspatial",
  },
  {
    body: "I\u2019m so lucky that I had the opportunity to work with Michael, as he contributed immensely to my growth as a designer. He has a talent for creating an environment where the team feels heard, encouraged, and inspired.",
    name: "Brianna Jackson",
    title: "Product Designer, BitTorrent",
  },
];

const introColLeft = [
  "As a web designer at LeapFrog, a UI designer at Pro Tools, and as the Creative Director of BitTorrent, I\u2019ve maintained global platforms, crafted graphics for industry-standard music technology and led campaigns reaching millions.",
  "I\u2019ve built creative departments from scratch in both in-house and agency settings, always focused on delivering work that speaks directly to the right people.",
];

const introColRight = [
  "Today I partner with founders and creators to take their projects from spark of inspiration to complete visual identity.",
  "I\u2019m also a classically trained musician and have just completed my first feature film score.",
];

export default function Info() {
  return (
    <article className="info-page">
      <div className="info-page__main content-inset">
        <section
          className="project-intro info-intro"
          aria-labelledby="info-intro-title"
        >
          <header className="project-intro__header">
            <h1 id="info-intro-title" className="project-intro__headline">
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

        <hr className="info-page__rule" />

        <section className="info-page__testimonials">
          <div className="info-page__testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.name} className="info-page__testimonial">
                <span className="info-page__testimonial-mark">&ldquo;</span>
                <p className="info-page__testimonial-body">{t.body}</p>
                <footer className="info-page__testimonial-attribution label">
                  {t.name}{" "}
                  <span className="triple-slash">///</span>{" "}
                  <span className="label-meta">{t.title}</span>
                </footer>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
