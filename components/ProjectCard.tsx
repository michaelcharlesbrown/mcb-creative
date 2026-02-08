"use client";

import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const firstService = project.services[0] || "";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block w-full"
    >
      <div className="relative w-full aspect-[5/7] overflow-hidden rounded-[4px] mb-3 md:mb-4">
        {/* Image Container */}
        <div className="relative w-full h-full">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          />
          {/* Dark Overlay on Hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-1 md:space-y-2">
        {/* Title */}
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold group-hover:underline">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="text-sm md:text-base lg:text-lg text-gray-600 line-clamp-2">
          {project.tagline}
        </p>

        {/* Year and Service */}
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
          <span>{project.year}</span>
          <span>•</span>
          <span>{firstService}</span>
        </div>
      </div>
    </Link>
  );
}
