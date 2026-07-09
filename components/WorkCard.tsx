"use client";

import Image from "next/image";
import TripleSlash from "@/components/TripleSlash";
import HeroSequence, { type MediaSlideData } from "@/components/HeroSequence";

interface WorkCardProps {
  project: {
    slug: string;
    title: string;
    services: string[];
    /** Landscape image — desktop grid, aspect-video */
    heroImageLandscape: string;
    accentColor: string;
    cardSlidesDesktop?: MediaSlideData[];
    cardSlidesMobile?: MediaSlideData[];
  };
}

export default function WorkCard({ project }: WorkCardProps) {
  const hasSlideSequence = Boolean(
    project.cardSlidesDesktop?.length && project.cardSlidesMobile?.length
  );

  return (
    <a href={`/projects/${project.slug}`} className="group block w-full">
      {hasSlideSequence ? (
        <div className="work-card__media relative w-full overflow-hidden mb-3">
          <HeroSequence
            slidesDesktop={project.cardSlidesDesktop!}
            slidesMobile={project.cardSlidesMobile!}
            altFallback={project.title}
            desktopSizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            mobileSizes="100vw"
          />
        </div>
      ) : (
        <div className="work-card__media relative w-full aspect-[5/4] md:aspect-video overflow-hidden mb-3">
          <Image
            src={project.heroImageLandscape}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      )}
      <h2 className="label work-card__label">
        <span className="work-card__title">{project.title}</span>
        {" "}
        <TripleSlash />
        {" "}
        <span className="label-meta">{project.services[0]}</span>
      </h2>
    </a>
  );
}
