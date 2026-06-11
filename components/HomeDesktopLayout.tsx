"use client";

import HomeHero from "@/components/HomeHero";
import HeroSection from "@/components/HeroSection";
import BodyClass from "@/components/BodyClass";
import SectionIntro from "@/components/SectionIntro";
import Footer from "@/components/Footer";
import WorkCard from "@/components/WorkCard";

export interface DesktopProject {
  slug: string;
  title: string;
  accentColor: string;
  subheadline?: string;
  scope?: string[];
  heroImageLandscape: string;
}

interface HomeDesktopLayoutProps {
  projects: DesktopProject[];
}

export default function HomeDesktopLayout({ projects }: HomeDesktopLayoutProps) {
  return (
    <div className="hidden md:block">
      <BodyClass className="home" />
      <div className="bg-background">
        <HomeHero />

        <div className="overflow-hidden bg-background">
          <HeroSection />
        </div>

        <div className="min-h-[50vh] flex items-center bg-background">
          <SectionIntro
            label="Featured Work"
            tagline="I help brands define and develop a unique visual language that speaks directly to their audience."
          />
        </div>

        <div className="bg-background pb-[25vh]">
          <div className="max-w-[var(--content-max-width)] mx-auto content-inset">
            <div className="col-2">
              {projects.map((project) => (
                <WorkCard
                  key={project.slug}
                  project={{
                    slug: project.slug,
                    title: project.title,
                    accentColor: project.accentColor,
                    services: project.scope ?? [],
                    heroImageLandscape: project.heroImageLandscape,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
