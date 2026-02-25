"use client";

import { useRef, useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import AboutBlurb from "@/components/AboutBlurb";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";

export interface DesktopProject {
  slug: string;
  title: string;
  accentColor: string;
  subheadline?: string;
  scope?: string[];
  thumbnail: string;
  thumbnailAlt?: string;
}

interface HomeDesktopLayoutProps {
  projects: DesktopProject[];
}

export default function HomeDesktopLayout({ projects }: HomeDesktopLayoutProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridInView, setGridInView] = useState(false);

  // Add scroll-snap-type to html element on mount; remove on unmount
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollSnapType = "y proximity";
    return () => {
      html.style.scrollSnapType = "";
    };
  }, []);

  // Stagger animation: fire once when grid section enters viewport
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGridInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hidden md:block">
      {/* Hero — GSAP ScrollTrigger pin provides snap-like feel; wrap in snap-start */}
      <div style={{ scrollSnapAlign: "start" }}>
        <HeroSection />
      </div>

      {/* About — min-h-screen snap section, centered vertically */}
      <div
        className="min-h-screen flex items-center bg-background"
        style={{ scrollSnapAlign: "start" }}
      >
        <AboutBlurb />
      </div>

      {/* Featured Work Grid — snap section */}
      <div
        className="min-h-screen bg-background"
        style={{ scrollSnapAlign: "start" }}
      >
        <main className="max-w-[var(--content-max-width)] mx-auto">
          <section className="content-inset pt-[max(var(--nav-height),4rem)] pb-16 md:pt-[max(var(--nav-height),6rem)] md:pb-24">
            <h2 className="text-left font-bold mb-8 md:mb-12" style={{ fontSize: "20px" }}>
              Featured Work
            </h2>
            <div
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[8px] gap-y-16 md:gap-y-20"
            >
              {projects.map((project, i) => (
                <div
                  key={project.slug}
                  className={`transition-all duration-700 ease-out ${
                    gridInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: gridInView ? `${i * 100}ms` : "0ms" }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Footer — snap section */}
      <div style={{ scrollSnapAlign: "start" }}>
        <Footer />
      </div>
    </div>
  );
}
