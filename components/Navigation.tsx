"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const isProjectsPage = pathname === "/projects";
  const isHomePage = pathname === "/";

  const overlayNav = isHomePage || isProjectsPage;
  const transparentBg = overlayNav ? "bg-transparent" : "bg-white";
  const textColor = isProjectsPage ? "text-white" : "text-black";
  const logoInvert = isProjectsPage ? "brightness-0 invert" : "";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${transparentBg} ${textColor}`}
    >
      <div className="max-w-[2400px] mx-auto px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/mcb-creative-logo.svg"
            alt="MCB Creative"
            width={120}
            height={40}
            className={`h-8 w-auto ${logoInvert}`}
          />
        </Link>
        <div className="flex items-center gap-1 text-[20px] leading-[1.3] tracking-[-0.06em] uppercase font-[var(--font-mono)]">
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
