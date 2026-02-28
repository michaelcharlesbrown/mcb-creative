"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import AboutBlurb from "@/components/AboutBlurb";
import Footer from "@/components/Footer";
import ProjectNavRail from "@/components/ProjectNavRail";

export interface DesktopProject {
  slug: string;
  title: string;
  accentColor: string;
  subheadline?: string;
  scope?: string[];
  heroImage: string;
}

interface HomeDesktopLayoutProps {
  projects: DesktopProject[];
}

export default function HomeDesktopLayout({ projects }: HomeDesktopLayoutProps) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Don't render on mobile or during SSR
  if (!isDesktop) return null;

  return (
    <div className="bg-background">
      <div>
        <HeroSection />
      </div>

      {/* Video */}
      <div className="bg-black">
        <video
          className="w-full h-auto block"
          src="/video/hero-placeholder-test.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* About */}
      <div className="min-h-screen flex items-center bg-background">
        <AboutBlurb />
      </div>

      {/* Featured Work */}
      <div className="bg-background">
        <div className="max-w-[var(--content-max-width)] mx-auto content-inset pt-[max(var(--nav-height),4rem)] pb-16 md:pt-[max(var(--nav-height),6rem)] md:pb-24">
          <div className="flex items-baseline justify-between gap-4 mb-8 md:mb-12">
            <h2 className="text-heading-lg font-normal">
              Featured Work
            </h2>
            <a
              href="/projects"
              className="uppercase text-ui tracking-widest  hover:opacity-50 transition-opacity shrink-0"
            >
              See All Work →
            </a>
          </div>
          <ProjectNavRail projects={projects} variant="homepage" />
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
