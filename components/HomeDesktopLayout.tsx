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

interface HomeDesktopLayoutProps {
  projects: GridProject[];
}

export default function HomeDesktopLayout({ projects }: HomeDesktopLayoutProps) {
  return (
    <div className="hidden md:block">
      <BodyClass className="home" />
      <div className="bg-background">
        <div className="overflow-hidden bg-background">
          <HeroSection />
        </div>

        <WorkGrid projects={projects} />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
