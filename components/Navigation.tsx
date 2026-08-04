"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TripleSlash from "@/components/TripleSlash";

export default function Navigation() {
  const pathname = usePathname();
  // The nav mounts once in LayoutShell, above {children}, so it survives every
  // client-side route change — its entrance belongs to the page *load*, not to
  // any one route. Freeze the homepage check at mount: were it read live, a
  // route change would rewrite animation-delay underneath an animation that is
  // still running, dropping the nav out and replaying it mid-navigation. The
  // initialiser also runs during SSR, so the class ships in the first HTML.
  const [isHomeOnLoad] = useState(() => pathname === "/");

  return (
    <nav
      className={[
        "nav fixed top-0 left-0 right-0 z-50 bg-transparent",
        isHomeOnLoad && "nav--intro",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ mixBlendMode: "difference" }}
    >
      <div className="nav__inner max-w-[var(--content-max-width)] mx-auto content-inset pt-4 pb-2 flex justify-between items-center">
        <Link
          href="/"
          className="nav__logo flex items-center text-white"
          aria-label="MCB Creative"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- same-origin SVG logo; next/image adds nothing for SVGs */}
          <img
            src="/images/mcb-creative-logo.svg"
            alt="MCB Creative"
            className="nav__logo-img"
          />
        </Link>
        <div className="nav__links flex items-center gap-2 uppercase text-white">
          <Link
            href="/projects"
            className="flip-link"
            aria-current={pathname === "/projects" ? "page" : undefined}
          >
            <span className="flip-link__inner" data-text="WORK">WORK</span>
          </Link>
          <TripleSlash />
          <Link
            href="/info"
            className="flip-link"
            aria-current={pathname === "/info" ? "page" : undefined}
          >
            <span className="flip-link__inner" data-text="INFO">INFO</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
