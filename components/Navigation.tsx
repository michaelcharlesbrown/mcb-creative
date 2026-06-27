"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const isProjectsPage = pathname === "/projects";
  const isHome = pathname === "/";

  return (
    <motion.nav
      className="nav fixed top-0 left-0 right-0 z-50 bg-transparent"
      style={{ mixBlendMode: "difference" }}
      initial={isHome ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="nav__inner relative max-w-[var(--content-max-width)] mx-auto content-inset pt-4 pb-2 flex justify-between items-center">
        <Link href="/" className="nav__logo flex items-center text-white">
          <Image
            src="/images/mcb-creative-logo.svg"
            alt="MCB Creative"
            width={165}
            height={55}
            className="h-[28px] lg:h-10 w-auto brightness-0 invert"
          />
        </Link>
        {isHome && (
          <span className="nav__brand label absolute left-1/2 hidden md:block text-white">
            MCB Creative
          </span>
        )}
        <div className="nav__links label flex items-center gap-2 text-white">
          <Link
            href="/projects"
            className="nav-flip-link"
            aria-current={pathname === "/projects" ? "page" : undefined}
          >
            <span className="nav-flip-link__inner" data-text="Work">Work</span>
          </Link>
          <span className="opacity-80" aria-hidden>///</span>
          <Link
            href="/info"
            className="nav-flip-link"
            aria-current={pathname === "/info" ? "page" : undefined}
          >
            <span className="nav-flip-link__inner" data-text="Info">Info</span>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}