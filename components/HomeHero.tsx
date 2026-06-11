export default function HomeHero() {
  return (
    <section className="home-hero" aria-label="MCB Creative">
      <div className="home-hero__base max-w-[var(--content-max-width)] mx-auto content-inset">
        <h1 className="home-hero__monogram" aria-label="MCB Creative">
          M/C/B
        </h1>

        <div className="home-hero__meta">
          <p className="home-hero__studio label">
            Independent
            <br />
            Design Studio of
            <br />
            Michael Charles Brown
          </p>

          <p className="home-hero__services label">
            Branding /// Web /// Motion /// Illustration
          </p>
        </div>
      </div>
    </section>
  );
}
