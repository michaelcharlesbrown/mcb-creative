"use client";

import Image from "next/image";

interface ProjectCardProps {
  project: {
    slug: string;
    title: string;
    accentColor: string;
    /** Portrait image (5:7) — carousel, mobile grid */
    heroImagePortrait: string;
    thumbnailAlt?: string;
    subheadline?: string;
    scope?: string[];
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a href={`/projects/${project.slug}`} className="group block w-full">
      <div className="relative w-full aspect-[5/7] overflow-hidden mb-3 md:mb-4">
        <div className="relative w-full h-full">
          <Image
            src={project.heroImagePortrait}
            alt={project.thumbnailAlt ?? project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>
      </div>
      <div className="space-y-1 md:space-y-2">
        <h3 className="label">{project.title}</h3>
        {project.subheadline && (
          <p className="text-gray-600 line-clamp-2">{project.subheadline}</p>
        )}
      </div>
    </a>
  );
}
