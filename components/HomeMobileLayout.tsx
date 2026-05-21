"use client";

import HeroSection from "@/components/HeroSection";
import BodyClass from "@/components/BodyClass";
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
    <>
      <BodyClass className="home" />
      <div className="fixed inset-0 overflow-y-scroll scrollbar-hide md:hidden z-10">
        <div className="flex-shrink-0 overflow-hidden bg-background">
          <HeroSection />
        </div>

        <section className="flex-shrink-0">
          <AboutBlurb />
        </section>

        <section className="flex-shrink-0 bg-background min-h-dvh flex flex-col justify-center">
          <div className="content-inset pt-[200px] pb-[200px]">
            <ProjectNavRail projects={projects} variant="homepage" />
          </div>
        </section>

        <section className="flex-shrink-0">
          <Footer />
        </section>
      </div>
    </>
  );
}
