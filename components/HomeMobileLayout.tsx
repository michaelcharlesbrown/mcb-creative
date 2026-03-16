"use client";

import HeroSection from "@/components/HeroSection";
import BodyClass from "@/components/BodyClass";
import AboutBlurb from "@/components/AboutBlurb";
import Footer from "@/components/Footer";
import LogoVideoReveal from "@/components/LogoVideoReveal";
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
          <section className="hero-video flex-shrink-0 bg-background">
            <video
              className="w-full h-auto block"
              src="/video/mcb-creative-hp-video.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </section>
        </div>

        <section className="flex-shrink-0">
          <AboutBlurb />
        </section>

        <section className="flex-shrink-0 bg-background min-h-dvh flex flex-col justify-center">
          <div className="content-inset pt-[200px] pb-[200px]">
            <div className="flex items-baseline justify-between gap-4 mb-6">
              <h2 className="text-heading-sm font-normal">
                Featured Work
              </h2>
              <a
                href="/projects"
                className="uppercase text-ui tracking-widest hover:opacity-50 transition-opacity shrink-0"
              >
                See All Work →
              </a>
            </div>
            <ProjectNavRail projects={projects} variant="homepage" />
          </div>
        </section>

        <section className="flex-shrink-0 min-h-screen relative">
          <LogoVideoReveal />
        </section>

        <section className="flex-shrink-0">
          <Footer />
        </section>
      </div>
    </>
  );
}
