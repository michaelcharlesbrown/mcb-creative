"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useNavigateWithTransition } from "@/components/transitions/useNavigateWithTransition";

export interface NavRailProject {
  slug: string;
  title: string;
  accentColor?: string;
  thumbnail: string;
  thumbnailAlt?: string;
  subheadline?: string;
}

interface ProjectNavRailProps {
  currentSlug?: string;
  projects: NavRailProject[];
  variant?: "rail" | "homepage";
}

export default function ProjectNavRail({ currentSlug, projects, variant = "rail" }: ProjectNavRailProps) {
  const { navigateWithTransition } = useNavigateWithTransition();
  const isHomepage = variant === "homepage";

  const cards = isHomepage ? projects : projects.filter((p) => p.slug !== currentSlug);

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1, dragFree: true },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  return (
    <div className="w-full overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
      <div className="flex">
        {cards.map((project) => (
          <div
            key={project.slug}
            className={`carousel-slide min-w-0 ${
              isHomepage
                ? "flex-[0_0_85%] pl-0 pr-4 md:flex-[0_0_33.333%] md:px-1"
                : "flex-[0_0_55%] pl-0 pr-4 md:flex-[0_0_25%] md:px-1"
            }`}
          >
            <a
              href={`/projects/${project.slug}`}
              className="block group"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              onClick={(e) => { e.preventDefault(); navigateWithTransition(`/projects/${project.slug}`, project.accentColor); }}
            >
              <div
                className="relative w-full overflow-hidden rounded-sm"
                style={{ aspectRatio: "5/7" }}
              >
                <Image
                  src={project.thumbnail}
                  alt={project.thumbnailAlt ?? project.title}
                  fill
                  sizes={isHomepage ? "(max-width: 767px) 85vw, 33vw" : "(max-width: 767px) 55vw, 25vw"}
                  draggable={false}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="pt-2">
                <h3 className="truncate uppercase text-heading-sm font-normal">
                  {project.title}
                </h3>
                {isHomepage && project.subheadline && (
                  <p className="truncate text-black/60 mt-0.5 uppercase text-ui">
                    {project.subheadline}
                  </p>
                )}
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
