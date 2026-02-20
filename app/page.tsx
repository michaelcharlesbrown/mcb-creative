"use client";

import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import HeroSection from "@/components/HeroSection";
import AboutBlurb from "@/components/AboutBlurb";

export default function Home() {
  return (
    <div className="home min-h-screen bg-white text-black">
      <HeroSection />
      <AboutBlurb />

      <main className="max-w-[var(--content-max-width)] mx-auto">
        {/* Project grid */}
        <section className="content-inset pt-[max(var(--nav-height),4rem)] pb-16 md:pt-[max(var(--nav-height),6rem)] md:pb-24">
          <h2 className="text-left text-3xl md:text-4xl font-bold mb-8 md:mb-12">Featured Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[8px] gap-y-16 md:gap-y-20">
            {projects.slice(0, 6).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
