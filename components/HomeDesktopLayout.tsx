"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import BodyClass from "@/components/BodyClass";
import AboutBlurb from "@/components/AboutBlurb";
import Footer from "@/components/Footer";
import LogoVideoReveal from "@/components/LogoVideoReveal";
import WorkPageMarquees from "@/components/WorkPageMarquees";
import { FluidWorkGrid } from "@/components/FluidWorkGrid";

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

  if (!isDesktop) return null;

  return (
    <>
      <BodyClass className="home" />
      <div className="bg-background">
        <div className="overflow-hidden bg-background">
          <HeroSection />
          <div className="hero-video bg-background">
            <video
              className="w-full h-auto block"
              src="/video/mcb-creative-hp-video.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>

        <div className="min-h-screen flex items-center bg-background">
          <AboutBlurb />
        </div>

        <div className="bg-background">
          <div className="max-w-[var(--content-max-width)] mx-auto content-inset pt-[max(var(--nav-height),200px)] pb-8 md:pb-12">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-heading-lg font-normal">Featured Work</h2>
              <a
                href="/projects"
                className="uppercase text-ui hover:opacity-50 transition-opacity shrink-0"
              >
                See All Work →
              </a>
            </div>
          </div>
          <FluidWorkGrid projects={projects} />
          <div className="pb-[200px]" />
        </div>
      </div>

      <LogoVideoReveal />
      <WorkPageMarquees />
      <Footer />
    </>
  );
}
