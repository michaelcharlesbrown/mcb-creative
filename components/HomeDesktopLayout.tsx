"use client";

import HeroSection from "@/components/HeroSection";
import BodyClass from "@/components/BodyClass";
import AboutBlurb from "@/components/AboutBlurb";
import Footer from "@/components/Footer";
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
  const fluidRowTop = projects.slice(0, 2);
  const fluidRowBottom = projects.slice(2, 4);

  return (
    <div className="hidden md:block">
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

        <div className="bg-background pt-[max(var(--nav-height),200px)] pb-8 md:pb-12">
          <div className="flex flex-col gap-4 md:gap-5">
            {fluidRowTop.length === 2 && (
              <FluidWorkGrid
                key={fluidRowTop.map((p) => p.slug).join("-")}
                pairedRow
                projects={fluidRowTop}
              />
            )}
            {fluidRowBottom.length === 2 && (
              <FluidWorkGrid
                key={fluidRowBottom.map((p) => p.slug).join("-")}
                pairedRow
                projects={fluidRowBottom}
              />
            )}
          </div>
          <div className="pb-[200px]" />
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
