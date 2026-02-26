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
  thumbnail: string;
  thumbnailAlt?: string;
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

      {/* About */}
      <div className="min-h-screen flex items-center bg-background">
        <AboutBlurb />
      </div>

      {/* Featured Work */}
      <div className="bg-background">
        <div className="max-w-[var(--content-max-width)] mx-auto content-inset pt-[max(var(--nav-height),4rem)] pb-16 md:pt-[max(var(--nav-height),6rem)] md:pb-24">
          <h2 className="text-left mb-8 md:mb-12" style={{ fontSize: "20px", fontWeight: 400 }}>
            Featured Work
          </h2>
          <ProjectNavRail projects={projects} variant="homepage" />
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
