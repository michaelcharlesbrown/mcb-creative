"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

interface ProjectNavRailProps {
  currentSlug?: string;
}

export default function ProjectNavRail({ currentSlug }: ProjectNavRailProps) {
  const cards = projects.filter((p) => p.slug !== currentSlug);

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
            className="carousel-slide"
            style={{ flex: "0 0 25%", minWidth: 0, paddingLeft: 4, paddingRight: 4 }}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="block group"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            >
              <div
                className="relative w-full overflow-hidden rounded-sm"
                style={{ aspectRatio: "5/7" }}
              >
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="25vw"
                  draggable={false}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="pt-2">
                <h3 className="font-bold truncate text-3xl">{project.title}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}