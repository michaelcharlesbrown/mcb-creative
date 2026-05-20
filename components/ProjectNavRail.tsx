"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export interface NavRailProject {
  slug: string;
  title: string;
  accentColor?: string;
  heroImage: string;          // was: thumbnail
  scope?: string[];
}

interface ProjectNavRailProps {
  currentSlug?: string;
  projects: NavRailProject[];
  variant?: "rail" | "homepage";
}

export default function ProjectNavRail({ currentSlug, projects, variant = "rail" }: ProjectNavRailProps) {
  const isHomepage = variant === "homepage";

  const cards = isHomepage ? projects : projects.filter((p) => p.slug !== currentSlug);

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1, dragFree: true },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  return (
    <div className={`nav-rail ${isHomepage ? "nav-rail--homepage" : "nav-rail--rail"} w-full overflow-hidden cursor-grab active:cursor-grabbing`} ref={emblaRef}>
      <div className="flex gap-5">
        {cards.map((project) => (
          <div
            key={project.slug}
            className="carousel-slide min-w-0 last:mr-5"
          >
            <a
              href={`/projects/${project.slug}`}
              className="block group"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            >
              <div
                className="relative w-full overflow-hidden rounded-sm"
                style={{
                  aspectRatio: "5/7",
                }}
              >
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  sizes={isHomepage ? "(max-width: 767px) 85vw, 33vw" : "(max-width: 767px) 55vw, 25vw"}
                  draggable={false}
                  className="object-cover"
                />
              </div>
              <div className="pt-2">
                <h3 className="nav-rail__card-title truncate" suppressHydrationWarning>
                  {project.title}
                </h3>
                {project.scope && project.scope.length > 0 && (
                  <p className="line-clamp-2 text-black/60 mt-0.5 uppercase text-ui">
                    {project.scope.join(", ")}
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
