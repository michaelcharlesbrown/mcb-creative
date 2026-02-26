"use client";

import { useRef, useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import AboutBlurb from "@/components/AboutBlurb";
import Footer from "@/components/Footer";
import ProjectNavRail from "@/components/ProjectNavRail";

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

  return (
    <div
      ref={scrollContainerRef}
      className="fixed inset-0 overflow-y-scroll scrollbar-hide md:hidden z-10"
    >
      {/* Hero */}
      <section className="h-screen flex-shrink-0">
        <HeroSection disableScrollTrigger />
      </section>

      {/* About */}
      <section className="flex-shrink-0">
        <AboutBlurb />
      </section>

      {/* Featured Work */}
      <section className="flex-shrink-0 bg-background">
        <div className="content-inset pt-10 pb-12">
          <h2 className="mb-6" style={{ fontSize: "16px", fontWeight: 400 }}>
            Featured Work
          </h2>
          <ProjectNavRail projects={projects} variant="homepage" />
        </div>
      </section>

      {/* Footer */}
      <section className="flex-shrink-0">
        <Footer />
      </section>
    </div>
  );
}
