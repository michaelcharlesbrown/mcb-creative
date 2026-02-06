"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";

interface ProjectCarouselProps {
  projects: Project[];
  currentSlug: string;
}

export default function ProjectCarousel({ projects, currentSlug }: ProjectCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll position and update arrow visibility
  const updateScrollButtons = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  // Auto-scroll to center current project on mount
  useEffect(() => {
    if (!carouselRef.current) return;

    const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
    if (currentIndex === -1) return;

    const carousel = carouselRef.current;
    const cardWidth = 320 + 16; // w-80 (320px) + gap-4 (16px)
    const containerWidth = carousel.clientWidth;
    const scrollPosition = currentIndex * cardWidth - containerWidth / 2 + cardWidth / 2;

    // Smooth scroll to center the current project
    carousel.scrollTo({
      left: Math.max(0, scrollPosition),
      behavior: "smooth",
    });

    // Update button visibility after scroll
    setTimeout(updateScrollButtons, 500);
  }, [projects, currentSlug]);

  // Update scroll buttons on scroll
  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    updateScrollButtons();

    carousel.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      carousel.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const scrollLeft = () => {
    if (!carouselRef.current) return;
    const cardWidth = 320 + 16; // w-80 (320px) + gap-4 (16px)
    carouselRef.current.scrollBy({
      left: -cardWidth * 2,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    if (!carouselRef.current) return;
    const cardWidth = 320 + 16; // w-80 (320px) + gap-4 (16px)
    carouselRef.current.scrollBy({
      left: cardWidth * 2,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full">
      {/* Left Arrow Button */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-2 shadow-lg transition-colors"
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      )}

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {projects.map((project) => {
          const isCurrent = project.slug === currentSlug;
          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`flex-shrink-0 w-80 ${isCurrent ? "opacity-50 pointer-events-none" : ""}`}
            >
              <div className="relative w-full aspect-[5/7] mb-3">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
                {isCurrent && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-bold text-sm uppercase tracking-wider">
                      Current Project
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold">{project.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{project.tagline}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Right Arrow Button */}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-2 shadow-lg transition-colors"
          aria-label="Scroll right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      )}
    </div>
  );
}
