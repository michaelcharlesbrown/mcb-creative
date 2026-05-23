import Image from "next/image";

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

export default function Info() {
  return (
    <article className="info-page">
      <div className="info-page__main content-inset">
        {/* ── Hero: portrait left, headline + prose right ── */}
        <section className="info-page__hero">
          <div className="info-page__portrait-col">
            <div className="info-page__portrait-wrap">
              <Image
                className="info-page__portrait-img"
                src="/images/michael-charles-brown.jpg"
                alt="Michael Charles Brown"
                width={800}
                height={1000}
                priority
              />
            </div>
            <p className="label info-page__caption-name">
              Michael Charles Brown{" "}
              <span className="triple-slash">///</span>{" "}
              <span className="label-meta">Creative Director</span>
            </p>
          </div>

          <div className="info-page__intro-col">
            <h1>
              I&apos;ve been building brand identities and creating visual
              personalities for fifteen years.
            </h1>

            <div className="info-page__prose">
              <p>
                As a web designer at LeapFrog, a UI designer at Pro Tools, and
                as the Creative Director of BitTorrent, I&apos;ve maintained
                global platforms, crafted graphics for industry-standard music
                technology and led campaigns reaching millions.
              </p>
              <p>
                I&apos;ve built creative departments from scratch in both
                in-house and agency settings, always focused on delivering work
                that speaks directly to the right people.
              </p>
              <p>
                Today I partner with founders and creators to take their
                projects from spark of inspiration to complete visual identity.
              </p>
              <p>
                I&apos;m also a classically trained musician and have just
                completed my first feature film score.
              </p>
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
