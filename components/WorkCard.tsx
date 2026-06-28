"use client";

import Image from "next/image";
import TripleSlash from "@/components/TripleSlash";

interface WorkCardProps {
  project: {
    slug: string;
    title: string;
    services: string[];
    /** Landscape image — desktop grid, aspect-video */
    heroImageLandscape: string;
    accentColor: string;
  };
}

export default function WorkCard({ project }: WorkCardProps) {
  return (
    <a href={`/projects/${project.slug}`} className="group block w-full">
      <div className="relative w-full aspect-video overflow-hidden mb-3">
        <Image
          src={project.heroImageLandscape}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      <h2 className="label work-card__label">
        <span className="work-card__title">{project.title}</span>
        {" "}
        <TripleSlash />
        {" "}
        <span className="label-meta">{project.services.slice(0, 2).join(", ")}</span>
      </h2>
    </a>
  );
}
