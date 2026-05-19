import Image from "next/image";

/**
 * Temporary holding / under-construction homepage.
 * Full homepage lived here before 2026-05 — restore from git history when ready to ship.
 */
export default function Home() {
  return (
    <div className="holding-page">
      <div className="holding-page__inner">
        <p className="holding-page__eyebrow">Site update in progress</p>
        <div className="holding-page__brand">
          <Image
            className="holding-page__logo"
            src="/images/mcb-creative-logo.svg"
            alt=""
            width={165}
            height={55}
            priority
          />
          <h1 className="hero__headline-block">
            <span className="hero__headline">MCB Creative</span>
          </h1>
        </div>
        <p className="holding-page__message">
          New work is on the way.
          <br />
          Please check back soon.
        </p>
      </div>
    </div>
  );
}
