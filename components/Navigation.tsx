"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav
      className="nav fixed top-0 left-0 right-0 z-50 bg-transparent text-white mix-blend-difference"
    >
      <div className="nav__inner max-w-[var(--content-max-width)] mx-auto content-inset pt-8 pb-4 flex justify-between items-center">
        <Link href="/" className="nav__logo flex items-center gap-4">
          <Image
            src="/images/mcb-creative-logo.svg"
            alt="MCB Creative"
            width={165}
            height={55}
            className="h-11 w-auto brightness-0 invert"
          />
          <span className="nav__tagline hidden sm:block text-[12px] uppercase tracking-wide font-[var(--font-mono)] max-w-[240px] leading-tight">
            Independent design studio of Michael Charles Brown
          </span>
        </Link>
        <div className="nav__links flex items-center gap-1 text-[12px] leading-[1.3] tracking-[-0.06em] uppercase font-[var(--font-mono)]">
          <Link
            href="/projects"
            className={`hover:underline ${
              pathname === "/projects" ? "underline" : ""
            }`}
          >
            WORK
          </Link>
          <span className="opacity-80"> /// </span>
          <Link
            href="/info"
            className={`hover:underline ${
              pathname === "/info" ? "underline" : ""
            }`}
          >
            INFO
          </Link>
        </div>
      </div>
    </nav>
  );
}
