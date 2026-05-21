import Image from "next/image";

const testimonials = [
  {
    body: "A clear communicator who speaks candidly but always with sincerity and understanding. One of the first people I call when I get something going and need to think creatively or strategically about any venture I\u2019m thinking about.",
    name: "Scott MacDonald,",
    titles: ["CTO, AllSides"],
  },
  {
    body: "One of the most talented creative directors in the game. I hired him for a complete rebrand of my startup and he led us through a thorough branding exercise which led to a gorgeous new logo and all of the associated business collateral.",
    name: "Aaron Selverson,",
    titles: ["Co-founder & CEO, Superspatial"],
  },
  {
    body: "I\u2019m so lucky that I had the opportunity to work with Michael, as he contributed immensely to my growth as a designer. He has a talent for creating an environment where the team feels heard, encouraged, and inspired.",
    name: "Brianna Jackson,",
    titles: ["UX & Product Designer"],
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
            <p className="info-page__caption-name">Michael Charles Brown,</p>
            <p className="info-page__caption-role">Creative Director</p>
          </div>

          <div className="info-page__intro-col">
            <h1 className="info-page__headline">
              I help people define and develop a unique visual language that
              speaks directly to their audience.
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

        <hr className="info-page__rule" />

        <section className="info-page__testimonials">
          <h2 className="info-page__testimonials-headline">
            See what my clients have to say about working with me
          </h2>
          <div className="info-page__testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.name} className="info-page__testimonial">
                <span className="info-page__testimonial-mark">&ldquo;</span>
                <p className="info-page__testimonial-body">{t.body}</p>
                <footer className="info-page__testimonial-attribution">
                  <span>{t.name}</span>
                  {t.titles.map((title) => (
                    <span key={title}>{title}</span>
                  ))}
                </footer>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
