"use client";

import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <main className="max-w-[2400px] mx-auto">
        <HeroSection />

        {/* Featured Work Section */}
        <section className="px-8 py-16 md:py-24">
          <h2 className="text-left mb-8 md:mb-12 text-2xl md:text-3xl font-bold">
            Featured Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[8px]">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
