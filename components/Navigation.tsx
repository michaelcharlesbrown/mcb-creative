"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const isProjectsPage = pathname === "/projects";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isProjectsPage
          ? "bg-transparent text-white"
          : "bg-white text-black"
      }`}
    >
      <div className="max-w-[2400px] mx-auto px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/mcb-creative-logo.svg"
            alt="MCB Creative"
            width={120}
            height={40}
            className={`h-8 w-auto ${
              isProjectsPage ? "brightness-0 invert" : ""
            }`}
          />
        </Link>
        <div className="flex gap-6">
          <Link
            href="/projects"
            className={`hover:underline ${
              pathname === "/projects" ? "underline" : ""
            }`}
          >
            Projects
          </Link>
          <Link
            href="/info"
            className={`hover:underline ${
              pathname === "/info" ? "underline" : ""
            }`}
          >
            Info
          </Link>
        </div>
      </div>
    </nav>
  );
}
