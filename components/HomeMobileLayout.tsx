"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import AboutBlurb from "@/components/AboutBlurb";
import Footer from "@/components/Footer";
import { useNavigateWithTransition } from "@/components/transitions/useNavigateWithTransition";

export interface MobileProject {
  slug: string;
  title: string;
  accentColor: string;
  subheadline?: string;
  scope?: string[];
  thumbnail: string;
  thumbnailAlt?: string;
}

interface HomeMobileLayoutProps {
  projects: MobileProject[];
}

export default function HomeMobileLayout({ projects }: HomeMobileLayoutProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const { navigateWithTransition } = useNavigateWithTransition();

  // Track which card section is most visible within the scroll container
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!cards.length || !scrollContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let highestRatio = 0;
        let nextIdx: number | null = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
            highestRatio = entry.intersectionRatio;
            const idx = entry.target.getAttribute("data-card-index");
            nextIdx = idx !== null ? Number(idx) : null;
          }
        });
        if (nextIdx !== null) setActiveCardIndex(nextIdx);
      },
      { root: scrollContainerRef.current, threshold: [0.5, 0.8] }
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [projects.length]);

  // Sentinel at the start of the footer section: clears activeCardIndex when footer enters view
  const footerSentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sentinel = footerSentinelRef.current;
    if (!sentinel || !scrollContainerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveCardIndex(null);
      },
      { root: scrollContainerRef.current, threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const isInCardZone = activeCardIndex !== null;

  return (
    <>
      {/* Fixed "Featured Work" label — visible only during card zone */}
      <div
        className={`fixed z-40 pointer-events-none transition-all duration-700 ease-out md:hidden ${
          isInCardZone ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ top: "calc(var(--nav-height, 92px) + 1.5rem)", left: 0, right: 0 }}
      >
        <p
          className="content-inset text-black font-bold uppercase"
          style={{ fontSize: "16px", fontFamily: "var(--font-ibm-plex-mono)" }}
        >
          Featured Work
        </p>
      </div>

      {/* Snap scroll container */}
      <div
        ref={scrollContainerRef}
        className="fixed inset-0 overflow-y-scroll snap-y snap-mandatory scrollbar-hide md:hidden z-10"
      >
        {/* Section 1: Hero */}
        <section className="h-screen snap-start flex-shrink-0">
          <HeroSection disableScrollTrigger />
        </section>

        {/* Section 2: About */}
        <section className="h-screen snap-start flex-shrink-0 flex items-center bg-background">
          <AboutBlurb />
        </section>

        {/* Sections 3–N: One per project card */}
        {projects.map((project, i) => (
          <section
            key={project.slug}
            ref={(el) => { cardRefs.current[i] = el; }}
            data-card-index={i}
            className="h-screen snap-start flex-shrink-0 relative bg-background overflow-hidden"
          >
            <a
              href={`/projects/${project.slug}`}
              className="flex flex-col h-full"
              onClick={(e) => {
                e.preventDefault();
                navigateWithTransition(`/projects/${project.slug}`, project.accentColor);
              }}
            >
              {/* Spacer: clears fixed nav + "Featured Work" label */}
              <div style={{ height: "calc(var(--nav-height, 92px) + 3.5rem)" }} className="flex-shrink-0" />

              {/* Thumbnail — fills remaining space above text */}
              <div className="flex-1 relative mx-[var(--content-inset)] rounded-[4px] overflow-hidden min-h-0">
                <Image
                  src={project.thumbnail}
                  alt={project.thumbnailAlt ?? project.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={i < 2}
                />
              </div>

              {/* Title + subheadline — slip in from below when card is active */}
              <div
                className={`flex-shrink-0 pt-4 pb-8 transition-all duration-700 ease-out ${
                  activeCardIndex === i
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{
                  paddingLeft: "var(--content-inset)",
                  paddingRight: "var(--content-inset)",
                  transitionDelay: activeCardIndex === i ? "450ms" : "0ms",
                }}
              >
                <h2
                  className="text-black font-bold uppercase"
                  style={{ fontSize: "16px", letterSpacing: "-0.04em", fontFamily: "var(--font-ibm-plex-mono)" }}
                >
                  {project.title}
                </h2>
                {project.subheadline && (
                  <p className="text-black mt-1" style={{ fontSize: "12px", fontFamily: "var(--font-ibm-plex-mono)" }}>
                    {project.subheadline}
                  </p>
                )}
              </div>
            </a>
          </section>
        ))}

        {/* Footer sentinel — detects when footer enters view to hide "Featured Work" label */}
        <div ref={footerSentinelRef} style={{ height: "1px" }} />

        {/* Footer snap section */}
        <section className="snap-start flex-shrink-0">
          <Footer />
        </section>
      </div>
    </>
  );
}
