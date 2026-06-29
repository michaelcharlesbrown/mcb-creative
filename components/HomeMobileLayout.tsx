"use client";

import HeroSection from "@/components/HeroSection";
import BodyClass from "@/components/BodyClass";
import Footer from "@/components/Footer";
import WorkGrid from "@/components/WorkGrid";

interface GridProject {
  slug: string;
  title: string;
  services: string[];
  heroImageLandscape: string;
  accentColor: string;
}

interface HomeMobileLayoutProps {
  projects: GridProject[];
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
          <WorkGrid projects={projects} />
        </section>

        <section className="flex-shrink-0">
          <Footer />
        </section>
      </div>
    </>
  );
}
