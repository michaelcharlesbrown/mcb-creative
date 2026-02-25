"use client";

import Image from "next/image";
import { useNavigateWithTransition } from "@/components/transitions/useNavigateWithTransition";

interface ProjectCardProps {
  project: {
    slug: string;
    title: string;
    accentColor: string;
    thumbnail: string;
    thumbnailAlt?: string;
    subheadline?: string;
    scope?: string[];
    services?: string[];
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { navigateWithTransition } = useNavigateWithTransition();
  const scopeItems = project.scope ?? project.services;

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
            alt={project.thumbnailAlt ?? project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>
      </div>

      <div className="space-y-1 md:space-y-2">
        <h3 className="font-bold" style={{ fontSize: '14px' }}>
          {project.title}
        </h3>
        {project.subheadline && (
          <p className="text-gray-600 line-clamp-2">
            {project.subheadline}
          </p>
        )}
      </div>
    </a>
  );
}
