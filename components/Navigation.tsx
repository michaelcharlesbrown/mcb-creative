"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TripleSlash from "@/components/TripleSlash";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <motion.nav
      className="nav fixed top-0 left-0 right-0 z-50 bg-transparent"
      style={{ mixBlendMode: "difference" }}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="nav__inner max-w-[var(--content-max-width)] mx-auto content-inset pt-4 pb-2 flex justify-between items-center">
        <Link
          href="/"
          className="nav__logo flex items-center text-white"
          aria-label="MCB Creative"
        >
          <img
            src="/images/mcb-creative-logo.svg"
            alt="MCB Creative"
            className="nav__logo-img"
          />
        </Link>
        <div className="nav__links flex items-center gap-2 uppercase text-white">
          <Link
            href="/projects"
            className="nav-flip-link"
            aria-current={pathname === "/projects" ? "page" : undefined}
          >
            <span className="nav-flip-link__inner" data-text="WORK">WORK</span>
          </Link>
          <TripleSlash />
          <Link
            href="/info"
            className="nav-flip-link"
            aria-current={pathname === "/info" ? "page" : undefined}
          >
            <span className="nav-flip-link__inner" data-text="INFO">INFO</span>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
