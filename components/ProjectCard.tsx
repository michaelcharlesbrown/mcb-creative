"use client";

import Image from "next/image";
import { Project } from "@/data/projects";
import { useNavigateWithTransition } from "@/components/transitions/useNavigateWithTransition";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { navigateWithTransition } = useNavigateWithTransition();
  const firstService = project.services[0] || "";

  return (
    <a
      href={`/projects/${project.slug}`}
      className="group block w-full"
      onClick={(e) => { e.preventDefault(); navigateWithTransition(`/projects/${project.slug}`, project.accentColor); }}
    >
      <div className="relative w-full aspect-[5/7] overflow-hidden rounded-[4px] mb-3 md:mb-4">
        <div className="relative w-full h-full">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>
      </div>

      <div className="space-y-1 md:space-y-2">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">
          {project.title}
        </h3>
        <p className="text-gray-600 line-clamp-2">
          {project.tagline}
        </p>
        <div className="flex items-center gap-2 text-gray-500">
          <span>{project.year}</span>
          <span>•</span>
          <span>{firstService}</span>
        </div>
      </div>
    </a>
  );
}
