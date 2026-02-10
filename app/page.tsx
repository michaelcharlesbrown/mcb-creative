"use client";

import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import HeroSection from "@/components/HeroSection";
import AboutBlurb from "@/components/AboutBlurb";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <HeroSection />
      <AboutBlurb />

      <main className="max-w-[var(--content-max-width)] mx-auto">
        {/* Project grid */}
        <section className="content-inset py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
