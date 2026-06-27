import Image from "next/image";
import Link from "next/link";

export default function StudioIntro() {
  return (
    <section className="studio-intro" aria-label="Studio introduction">
      <Image
        className="studio-intro__logo"
        src="/images/mcb-creative-logo.svg"
        alt="MCB Creative"
        width={165}
        height={55}
        priority
      />

      <h2 className="studio-intro__headline">
        Independent creative studio focused on branding, interactive web design,
        motion and illustration
      </h2>

      <div className="studio-intro__links">
        <Link href="/info" className="studio-intro__link">
          Get in touch
          <img
            src="/images/arrow.svg"
            alt=""
            className="studio-intro__arrow"
            width={30}
            height={30}
            decoding="async"
            aria-hidden
          />
        </Link>
        <Link href="/projects" className="studio-intro__link">
          See more work
          <img
            src="/images/arrow.svg"
            alt=""
            className="studio-intro__arrow"
            width={30}
            height={30}
            decoding="async"
            aria-hidden
          />
        </Link>
      </div>
    </section>
  );
}
