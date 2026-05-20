"use client";

import HeroSection from "@/components/HeroSection";
import BodyClass from "@/components/BodyClass";
import AboutBlurb from "@/components/AboutBlurb";
import Footer from "@/components/Footer";
import WorkCard from "@/components/WorkCard";

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
  return (
    <div className="hidden md:block">
      <BodyClass className="home" />
      <div className="bg-background">
        <div className="overflow-hidden bg-background">
          <HeroSection />
          <div className="hero-video bg-background">
            <div className="max-w-[var(--content-max-width)] mx-auto content-inset">
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
        </div>

        <div className="min-h-screen flex items-center bg-background">
          <AboutBlurb />
        </div>

        <div className="bg-background pt-[max(var(--nav-height),200px)] pb-[200px]">
          <div className="max-w-[var(--content-max-width)] mx-auto content-inset">
            <div className="grid grid-cols-2 gap-x-6 gap-y-14">
              {projects.map((project) => (
                <WorkCard
                  key={project.slug}
                  project={{
                    slug: project.slug,
                    title: project.title,
                    accentColor: project.accentColor,
                    services: project.scope ?? [],
                    heroImage: project.heroImage,
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
