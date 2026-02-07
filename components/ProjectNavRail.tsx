"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { projects } from "@/data/projects";

interface ProjectNavRailProps {
  currentSlug?: string;
}

export default function ProjectNavRail({ currentSlug }: ProjectNavRailProps) {
  const pathname = usePathname();
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const translateX = useRef<number>(0);
  const velocity = useRef<number>(0);
  const singleSetWidth = useRef<number>(0);
  const scrollDirection = useRef<number>(1); // 1 for forward (right), -1 for backward (left)
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const lastWheelTime = useRef<number>(0);
  
  // Kinetic scrolling constants
  const maxVelocity = 2.0; // Maximum pixels per frame
  
  // Filter out current project to make carousel contextual
  const filteredProjects = projects.filter(p => p.slug !== currentSlug);
  
  // Duplicate filtered projects twice for seamless loop
  const duplicatedProjects = [...filteredProjects, ...filteredProjects];

  // Debug beacon (dev only)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log("[carousel] mounted", { 
        count: filteredProjects.length, 
        path: pathname,
        currentSlug,
        filteredSlugs: filteredProjects.map(p => p.slug)
      });
    }
  }, [filteredProjects.length, pathname, currentSlug]);

  // Check for prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Measure single set width and initialize
  useEffect(() => {
    if (typeof window === "undefined" || !trackRef.current) return;
    
    const measureWidth = () => {
      if (!trackRef.current) return;
      
      // Measure width of one copy (half the track's scrollWidth since we duplicate twice)
      const trackWidth = trackRef.current.scrollWidth;
      
      if (trackWidth > 0) {
        singleSetWidth.current = trackWidth / 2;
        translateX.current = 0;
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${0}px)`;
        }
      }
    };
    
    measureWidth();
    
    // Retry after delays to ensure images are loaded
    const timeoutId1 = setTimeout(measureWidth, 100);
    const timeoutId2 = setTimeout(measureWidth, 500);
    const timeoutId3 = setTimeout(measureWidth, 1000);
    
    const images = trackRef.current.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = images.length;
    
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        measureWidth();
      }
    };
    
    if (totalImages > 0) {
      images.forEach((img) => {
        if (img.complete) {
          checkAllLoaded();
        } else {
          img.addEventListener('load', checkAllLoaded, { once: true });
          img.addEventListener('error', checkAllLoaded, { once: true });
        }
      });
    }
    
    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
      images.forEach((img) => {
        img.removeEventListener('load', checkAllLoaded);
        img.removeEventListener('error', checkAllLoaded);
      });
    };
  }, [filteredProjects]);

  // Kinetic auto-scroll animation
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !trackRef.current ||
      prefersReducedMotion ||
      singleSetWidth.current === 0
    ) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    const idleSpeed = 0.3;
    const friction = 0.96; // Softer, more buttery decay
    const minVelocity = 0.1;

    // Initialize velocity to idle speed in current scroll direction
    if (Math.abs(velocity.current) < minVelocity) {
      velocity.current = idleSpeed * scrollDirection.current;
    }

    const animate = () => {
      if (
        !trackRef.current ||
        prefersReducedMotion ||
        singleSetWidth.current === 0
      ) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        return;
      }

      // Apply elastic easing friction when user is not interacting
      if (!isHovered) {
        // Elastic easing function (ease-out-exponential) for buttery smooth decay
        const easeOutExpo = (t: number) => {
          return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        };
        
        // Apply elastic easing based on velocity magnitude
        const velocityMagnitude = Math.abs(velocity.current);
        const normalizedVel = Math.min(velocityMagnitude / maxVelocity, 1);
        const easedFriction = 1 - (1 - friction) * easeOutExpo(normalizedVel);
        velocity.current *= easedFriction;
        
        // Return to idle drift if velocity is very low, maintaining scroll direction
        if (Math.abs(velocity.current) < minVelocity) {
          velocity.current = idleSpeed * scrollDirection.current;
        }
      }

      // Update translateX with velocity
      translateX.current += velocity.current;

      // Wrap translateX using modulo for seamless infinite loop
      const wrappedX = translateX.current % singleSetWidth.current;
      translateX.current = wrappedX < 0 ? wrappedX + singleSetWidth.current : wrappedX;

      // Apply transform to track
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${-translateX.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [prefersReducedMotion, isHovered, filteredProjects]);

  // Wheel handler for kinetic scrolling
  const handleWheel = (e: React.WheelEvent) => {
    if (!trackRef.current) return;
    
    e.preventDefault();
    
    const delta = e.deltaX || e.deltaY;
    const now = Date.now();
    const timeDelta = Math.max(1, now - lastWheelTime.current);
    
    // Update scroll direction based on scroll input
    if (delta > 0) {
      scrollDirection.current = 1; // Forward (right)
    } else if (delta < 0) {
      scrollDirection.current = -1; // Backward (left)
    }
    
    // Add velocity based on scroll delta (gentle but responsive acceleration)
    const velocityBoost = (delta / timeDelta) * 0.06;
    velocity.current += velocityBoost;
    
    // Clamp velocity to prevent excessive speeds
    velocity.current = Math.max(-maxVelocity, Math.min(maxVelocity, velocity.current));
    
    lastWheelTime.current = now;
  };

  // Early return if no projects
  if (filteredProjects.length === 0) {
    return (
      <div data-testid="projects-carousel">
        <span className="sr-only">Projects carousel mounted (empty)</span>
      </div>
    );
  }

  return (
    <div
      data-testid="projects-carousel"
      className="overflow-x-hidden overflow-y-hidden"
      style={{
        width: "100%",
        height: "100%",
        minHeight: "400px",
      }}
      onWheel={handleWheel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="sr-only">Projects carousel mounted</span>
      <div
        ref={trackRef}
        data-testid="projects-carousel-track"
        className="flex gap-4 md:gap-6"
        style={{
          alignItems: "stretch",
          display: "flex",
          height: "100%",
          minHeight: "400px",
          willChange: "transform",
        }}
      >
        {duplicatedProjects.map((project, index) => (
          <Link
            key={`${project.slug}-${index}`}
            href={`/projects/${project.slug}`}
            className="flex-shrink-0 block"
            style={{ 
              flex: "0 0 auto",
              width: "200px",
              height: "280px",
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                sizes="(max-width: 768px) calc(80vh * 5 / 7), calc(80vh * 5 / 7)"
                className="object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
