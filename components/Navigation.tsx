"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const isProjectsPage = pathname === "/projects";
  const isHomePage = pathname === "/";

  /* Match hero panel on home; transparent on projects */
  const transparentBg = isProjectsPage ? "bg-transparent" : "bg-[#F8F8F8]";
  const textColor = isProjectsPage ? "text-white" : "text-black";
  const logoInvert = isProjectsPage ? "brightness-0 invert" : "";

  return (
    <nav
      className={`nav fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${transparentBg} ${textColor}`}
    >
      <div className="nav__inner max-w-[var(--content-max-width)] mx-auto content-inset py-4 flex justify-between items-center">
        <Link href="/" className="nav__logo flex items-center gap-4">
          <Image
            src="/images/mcb-creative-logo.svg"
            alt="MCB Creative"
            width={165}
            height={55}
            className={`h-11 w-auto ${logoInvert}`}
          />
        </Link>
        <div className="nav__links flex items-center gap-1 text-[20px] leading-[1.3] tracking-[-0.06em] uppercase font-[var(--font-mono)]">
          <Link
            href="/projects"
            className={`hover:underline ${
              pathname === "/projects" ? "underline" : ""
            }`}
          >
            WORK
          </Link>
          <span className={isProjectsPage ? "opacity-80" : "text-[#1A1A1A]"}>///</span>
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
