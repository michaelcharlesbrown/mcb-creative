"use client";

import HeroSection from "@/components/HeroSection";
import BodyClass from "@/components/BodyClass";
import StudioIntro from "@/components/StudioIntro";
import Footer from "@/components/Footer";
import ProjectNavRail from "@/components/ProjectNavRail";

export interface MobileProject {
  slug: string;
  title: string;
  accentColor: string;
  subheadline?: string;
  scope?: string[];
  /** Portrait image (5:7) — mobile carousel cards */
  heroImagePortrait: string;
}

interface HomeMobileLayoutProps {
  projects: MobileProject[];
}

export default function HomeMobileLayout({ projects }: HomeMobileLayoutProps) {
  const navRailProjects = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    accentColor: p.accentColor,
    scope: p.scope,
    heroImagePortrait: p.heroImagePortrait,
  }));

  return (
    <>
      <BodyClass className="home" />
      <div className="fixed inset-0 overflow-y-scroll scrollbar-hide md:hidden z-10">
        <div className="flex-shrink-0 overflow-hidden bg-background">
          <HeroSection />
        </div>

        <section className="flex-shrink-0 min-h-dvh flex items-center">
          <StudioIntro />
        </section>

        <section className="flex-shrink-0 bg-background min-h-dvh flex flex-col justify-center">
          <div className="content-inset pt-[200px] pb-[200px]">
            <ProjectNavRail projects={navRailProjects} variant="homepage" />
          </div>
        </section>

        <section className="flex-shrink-0">
          <Footer />
        </section>
      </div>
    </>
  );
}
