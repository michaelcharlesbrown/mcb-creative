"use client";

import Image from "next/image";

interface WorkCardProps {
  project: {
    slug: string;
    title: string;
    services: string[];
    heroImage: string;
    accentColor: string;
  };
}

export default function WorkCard({ project }: WorkCardProps) {
  return (
    <a
      href={`/projects/${project.slug}`}
      className="group block w-full"
    >
      <div
        className="relative w-full aspect-video overflow-hidden rounded-[4px] mb-3"
      >
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      <div className="space-y-1">
        <h3 className="uppercase text-heading-sm font-normal tracking-wide">
          {project.title}
        </h3>
        <p className="text-black/50 uppercase text-ui">
          {project.services.slice(0, 2).join(", ")}
        </p>
      </div>
    </a>
  );
}
