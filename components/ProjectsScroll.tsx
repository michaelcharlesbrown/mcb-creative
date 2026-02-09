"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface ProjectWithHero {
  slug: string;
  title: string;
  tagline: string;
  client: string;
  year: string;
  services: string[];
  heroImage: string;
}

interface ProjectsScrollProps {
  projects: ProjectWithHero[];
}

export default function ProjectsScroll({ projects }: ProjectsScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const isScrollingRef = useRef(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Duplicate projects 3 times for seamless infinite loop
  // [original] [duplicate] [duplicate] - we'll scroll in the middle section
  const duplicatedProjects = useMemo(
    () => [...projects, ...projects, ...projects],
    [projects]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const container = containerRef.current;
    if (!container) return;

    // Calculate the height of one set of projects (viewport height * number of projects)
    const viewportHeight = window.innerHeight;
    const singleSetHeight = projects.length * viewportHeight;

    // Start in the middle section (second set) - scroll to first project of middle set
    container.scrollTop = singleSetHeight;

    const handleScroll = () => {
      if (!container || isScrollingRef.current) return;

      const scrollTop = container.scrollTop;
      
      // Boundaries for the middle section
      const middleSetStart = singleSetHeight;
      const middleSetEnd = singleSetHeight * 2;
      
      // If scrolled to or past the end of middle set (into third set), jump to equivalent position in middle set
      if (scrollTop >= middleSetEnd) {
        isScrollingRef.current = true;
        // Calculate how far into the third set we've scrolled
        const overflow = scrollTop - middleSetEnd;
        // Jump to equivalent position in the middle set
        container.scrollTop = middleSetStart + overflow;
        // Re-enable after a frame to allow scroll to settle
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            isScrollingRef.current = false;
          });
        });
      }
      // If scrolled before the start of middle set (into first set), jump to equivalent position in middle set
      else if (scrollTop < middleSetStart) {
        isScrollingRef.current = true;
        // Calculate how far into the first set we've scrolled
        // Position 0 in first set = position middleSetStart in middle set
        // So: equivalent position = middleSetStart + scrollTop
        container.scrollTop = middleSetStart + scrollTop;
        // Re-enable after a frame to allow scroll to settle
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            isScrollingRef.current = false;
          });
        });
      }
    };

    // Throttle scroll events for better performance
    let rafId: number | null = null;
    const rafHandleScroll = () => {
      handleScroll();
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(rafHandleScroll);
      }
    };

    container.addEventListener("scroll", onScroll, { passive: true });

    // Handle window resize to recalculate heights
    const handleResize = () => {
      const newViewportHeight = window.innerHeight;
      const newSingleSetHeight = projects.length * newViewportHeight;
      const currentScroll = container.scrollTop;
      
      // Maintain relative position when resizing
      if (currentScroll >= newSingleSetHeight && currentScroll < newSingleSetHeight * 2) {
        // Already in middle section, no change needed
      } else {
        // Reset to middle section
        container.scrollTop = newSingleSetHeight;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isMounted, projects.length]);

  useEffect(() => {
    if (!isMounted) return;

    const sections = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let nextActive: number | null = null;
        let highestRatio = 0;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
            highestRatio = entry.intersectionRatio;
            const indexAttr = entry.target.getAttribute("data-index");
            nextActive = indexAttr ? Number(indexAttr) : null;
          }
        });

        if (nextActive !== null) {
          setActiveIndex(nextActive);
        }
      },
      {
        root: containerRef.current,
        threshold: [0.5, 0.65, 0.8],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isMounted, duplicatedProjects.length]);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
    >
      {duplicatedProjects.map((project, index) => (
        <section
          key={`${project.slug}-${index}`}
          className="h-screen w-full snap-start snap-always relative"
          ref={(element) => {
            sectionRefs.current[index] = element;
          }}
          data-index={index}
        >
          <Link
            href={`/projects/${project.slug}`}
            className="block w-full h-full relative group"
          >
            {/* Hero Image */}
            <div className="absolute inset-0">
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority={index >= projects.length && index < projects.length + 3}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>

            {/* Project Info Overlay */}
            <div
              className={`absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16 text-white transition-all duration-700 delay-150 ease-out ${
                activeIndex === index
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              <div className="max-w-[2400px] mx-auto">
                <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 md:mb-4">
                  {project.title}
                </h2>
                <p className="text-base md:text-lg lg:text-xl xl:text-2xl mb-4 md:mb-6 text-white/90 max-w-2xl">
                  {project.tagline}
                </p>
                <div className="flex flex-wrap gap-3 md:gap-4 text-sm md:text-base lg:text-lg text-white/80">
                  <span>{project.client}</span>
                  <span>•</span>
                  <span>{project.year}</span>
                  <span>•</span>
                  <span>{project.services.join(", ")}</span>
                </div>
              </div>
            </div>

          </Link>
        </section>
      ))}
    </div>
  );
}
