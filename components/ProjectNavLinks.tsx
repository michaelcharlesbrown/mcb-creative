"use client";

import { useNavigateWithTransition } from "@/components/transitions/useNavigateWithTransition";

interface AdjacentProject {
  slug: string;
  title: string;
  accentColor?: string;
}

interface ProjectNavLinksProps {
  previous: AdjacentProject | null;
  next: AdjacentProject | null;
}

export default function ProjectNavLinks({ previous, next }: ProjectNavLinksProps) {
  const { navigateWithTransition } = useNavigateWithTransition();

  return (
    <section className="mt-16 mb-16 md:mb-24">
      <div className="flex justify-between items-center gap-8">
        {previous ? (
          <a
            href={`/projects/${previous.slug}`}
            className="flex-1 group cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              navigateWithTransition(`/projects/${previous.slug}`, previous.accentColor);
            }}
          >
            <div className="text-gray-500 mb-2">Previous Project</div>
            <div className="font-bold font-display text-5xl md:text-6xl group-hover:underline">
              {previous.title}
            </div>
          </a>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <a
            href={`/projects/${next.slug}`}
            className="flex-1 text-right group cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              navigateWithTransition(`/projects/${next.slug}`, next.accentColor);
            }}
          >
            <div className="text-gray-500 mb-2">Next Project</div>
            <div className="font-bold font-display text-5xl md:text-6xl group-hover:underline">
              {next.title}
            </div>
          </a>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </section>
  );
}
