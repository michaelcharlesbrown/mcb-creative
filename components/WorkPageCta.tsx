import Link from "next/link";

export default function WorkPageCta() {
  return (
    <section className="work-page__cta" aria-labelledby="work-page-cta-heading">
      <h2 id="work-page-cta-heading" className="work-page__cta-headline">
        Let&apos;s work
        <br />
        together
      </h2>
      <div className="work-page__cta-row">
        <Link href="/info" className="work-page__cta-button">
          Say hello
        </Link>
        <img
          src="/images/arrow.svg"
          alt=""
          className="work-page__cta-arrow"
          width={142}
          height={141}
          decoding="async"
          aria-hidden
        />
      </div>
    </section>
  );
}
