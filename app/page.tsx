"use client";

import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <main className="max-w-[2400px] mx-auto">
        {/* Hero Section */}
        <section className="px-8 pt-16 pb-8">
          <div className="mb-12">
            <p className="text-sm uppercase tracking-wider text-gray-600 mb-4">
              Independent Creative Studio Of
            </p>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
              Michael Charles Brown
            </h1>
          </div>
          <p className="text-xl md:text-2xl lg:text-3xl">
            Independent Creative specializing in visual design, motion graphics, and brand identity.
          </p>
        </section>

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
