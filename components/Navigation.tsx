"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useNavigateWithTransition } from "@/components/transitions/useNavigateWithTransition";

export default function Navigation() {
  const pathname = usePathname();
  const isProjectsPage = pathname === "/projects";
  const { navigateWithTransition } = useNavigateWithTransition();

  return (
    <nav
      className="nav fixed top-0 left-0 right-0 z-50 bg-transparent"
      style={{ mixBlendMode: "difference" }}
    >
      <div className="nav__inner max-w-[var(--content-max-width)] mx-auto content-inset pt-8 pb-4 flex justify-between items-center">
        <a
          href="/"
          className="nav__logo flex items-center text-white"
          onClick={(e) => { e.preventDefault(); navigateWithTransition("/"); }}
        >
          <Image
            src="/images/mcb-creative-logo.svg"
            alt="MCB Creative"
            width={165}
            height={55}
            className="h-11 w-auto brightness-0 invert"
          />
        </a>
        <div className="nav__links flex items-center gap-0 text-[12px] uppercase tracking-widest leading-relaxed text-white">
          <a
            href="/projects"
            className={pathname === "/projects" ? "underline" : ""}
            onClick={(e) => { e.preventDefault(); navigateWithTransition("/projects"); }}
          >
            WORK
          </a>
          <span className={isProjectsPage ? "opacity-80" : "opacity-80"}>///</span>
          <a
            href="/info"
            className={pathname === "/info" ? "underline" : ""}
            onClick={(e) => { e.preventDefault(); navigateWithTransition("/info"); }}
          >
            INFO
          </a>
        </div>
      </div>
    </nav>
  );
}
