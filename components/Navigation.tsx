"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const isProjectsPage = pathname === "/projects";

  return (
    <nav
      className="nav fixed top-0 left-0 right-0 z-50 bg-transparent"
      style={{ mixBlendMode: "difference" }}
    >
      <div className="nav__inner max-w-[var(--content-max-width)] mx-auto content-inset pt-8 pb-4 flex justify-between items-center">
        <Link href="/" className="nav__logo flex items-center text-white">
          <Image
            src="/images/mcb-creative-logo.svg"
            alt="MCB Creative"
            width={165}
            height={55}
            className="h-11 w-auto brightness-0 invert"
          />
        </Link>
        <div className="nav__links flex items-center gap-1 leading-[1.3] tracking-[-0.06em] uppercase font-[var(--font-mono)] text-white">
          <Link
            href="/projects"
            className={pathname === "/projects" ? "underline" : ""}
          >
            WORK
          </Link>
          <span className={isProjectsPage ? "opacity-80" : "opacity-80"}>///</span>
          <Link
            href="/info"
            className={pathname === "/info" ? "underline" : ""}
          >
            INFO
          </Link>
        </div>
      </div>
    </nav>
  );
}
