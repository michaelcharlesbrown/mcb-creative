"use client";

import { useState, useEffect } from "react";
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
  heroImage: string;
}

interface HomeMobileLayoutProps {
  projects: MobileProject[];
}

export default function HomeMobileLayout({ projects }: HomeMobileLayoutProps) {
  return (
    <div
      className="fixed inset-0 overflow-y-scroll scrollbar-hide md:hidden z-10"
    >
      {/* Hero */}
      <section className="h-screen flex-shrink-0">
        <HeroSection disableScrollTrigger />
      </section>

      {/* Video */}
      <section className="flex-shrink-0 bg-black">
        <video
          className="w-full h-auto block"
          src="/video/hero-placeholder-test.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </section>

      {/* About */}
      <section className="flex-shrink-0">
        <AboutBlurb />
      </section>

      {/* Featured Work — full viewport section like About, card peek on right */}
      <section className="flex-shrink-0 bg-background min-h-dvh flex flex-col justify-center">
        <div className="content-inset py-10">
          <div className="flex items-baseline justify-between gap-4 mb-6">
            <h2 className="text-heading-sm font-normal">
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
      </section>

      {/* Footer */}
      <section className="flex-shrink-0">
        <Footer />
      </section>
    </div>
  );
}
