"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function ProjectNavRail() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const scrollDirection = useRef<number>(1); // 1 for forward (right), -1 for backward (left)
  const lastScrollLeft = useRef<number>(0);
  const isJumping = useRef<boolean>(false); // Prevent infinite loop during jump
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion (client-side only)
    if (typeof window === "undefined") return;
    
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Initialize scroll position to middle set for seamless looping
  useEffect(() => {
    if (typeof window === "undefined" || !carouselRef.current) return;
    const carousel = carouselRef.current;
    const scrollWidth = carousel.scrollWidth;
    const singleSetWidth = scrollWidth / 3;
    // Start at the beginning of the middle set
    carousel.scrollLeft = singleSetWidth;
    lastScrollLeft.current = singleSetWidth;
  }, []);

  // Infinite loop handler - seamlessly jump to equivalent position when near boundaries
  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;

    const handleScroll = () => {
      if (isJumping.current) {
        isJumping.current = false;
        return;
      }

      const currentScrollLeft = carousel.scrollLeft;
      const scrollWidth = carousel.scrollWidth;
      const singleSetWidth = scrollWidth / 3;
      const startBoundary = singleSetWidth;
      const endBoundary = singleSetWidth * 2;

      // Detect direction
      if (currentScrollLeft > lastScrollLeft.current) {
        scrollDirection.current = 1; // Forward (right)
      } else if (currentScrollLeft < lastScrollLeft.current) {
        scrollDirection.current = -1; // Backward (left)
      }

      // Seamlessly loop: if we've scrolled past the end of the middle set, jump to start of middle set
      if (currentScrollLeft >= endBoundary) {
        isJumping.current = true;
        carousel.scrollLeft = startBoundary + (currentScrollLeft - endBoundary);
      }
      // If we've scrolled before the start of the middle set, jump to end of middle set
      else if (currentScrollLeft <= startBoundary - 1) {
        isJumping.current = true;
        carousel.scrollLeft = endBoundary - (startBoundary - currentScrollLeft);
      }

      lastScrollLeft.current = carousel.scrollLeft;
    };

    carousel.addEventListener("scroll", handleScroll);

    return () => {
      carousel.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Auto-scroll animation with slow, continuous scrolling
  useEffect(() => {
    // Don't start animation if conditions aren't met
    if (
      typeof window === "undefined" ||
      !carouselRef.current ||
      prefersReducedMotion ||
      isHovered ||
      isDragging
    ) {
      // Cancel any existing animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    const carousel = carouselRef.current;
    const scrollSpeed = 0.3; // Slow auto-scroll speed

    const animate = () => {
      // Check conditions again in case they changed during animation
      if (
        !carousel ||
        prefersReducedMotion ||
        isHovered ||
        isDragging
      ) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        return;
      }

      const scrollWidth = carousel.scrollWidth;
      const singleSetWidth = scrollWidth / 3;
      const startBoundary = singleSetWidth;
      const endBoundary = singleSetWidth * 2;

      // Continuously scroll in current direction
      carousel.scrollLeft += scrollSpeed * scrollDirection.current;

      // Handle seamless looping in animation loop for smoother transitions
      const currentScroll = carousel.scrollLeft;
      if (currentScroll >= endBoundary) {
        // Seamlessly jump to equivalent position in start of middle set
        isJumping.current = true;
        carousel.scrollLeft = startBoundary + (currentScroll - endBoundary);
      } else if (currentScroll <= startBoundary - 1) {
        // Seamlessly jump to equivalent position in end of middle set
        isJumping.current = true;
        carousel.scrollLeft = endBoundary - (startBoundary - currentScroll);
      }

      lastScrollLeft.current = carousel.scrollLeft;

      // Continue animation loop
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start the animation loop
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup: cancel animation on unmount or when dependencies change
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [prefersReducedMotion, isHovered, isDragging]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    const rect = carouselRef.current.getBoundingClientRect();
    dragStartX.current = e.pageX - rect.left;
    dragScrollLeft.current = carouselRef.current.scrollLeft;
  };

  // Global mouse move handler for dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!carouselRef.current) return;
      e.preventDefault();
      const rect = carouselRef.current.getBoundingClientRect();
      const x = e.pageX - rect.left;
      const walk = (x - dragStartX.current) * 2; // Scroll speed multiplier
      const newScrollLeft = dragScrollLeft.current - walk;
      carouselRef.current.scrollLeft = newScrollLeft;
      
      // Update direction based on drag movement
      // If dragging right (walk > 0), content scrolls left (backward), so direction = -1
      // If dragging left (walk < 0), content scrolls right (forward), so direction = 1
      if (walk > 0) {
        scrollDirection.current = -1; // Backward (left)
      } else if (walk < 0) {
        scrollDirection.current = 1; // Forward (right)
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging]);

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    const rect = carouselRef.current.getBoundingClientRect();
    dragStartX.current = e.touches[0].pageX - rect.left;
    dragScrollLeft.current = carouselRef.current.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault(); // Prevent page scroll
    const rect = carouselRef.current.getBoundingClientRect();
    const x = e.touches[0].pageX - rect.left;
    const walk = (x - dragStartX.current) * 2;
    const newScrollLeft = dragScrollLeft.current - walk;
    carouselRef.current.scrollLeft = newScrollLeft;
    
    // Update direction based on touch movement
    // If swiping right (walk > 0), content scrolls left (backward), so direction = -1
    // If swiping left (walk < 0), content scrolls right (forward), so direction = 1
    if (walk > 0) {
      scrollDirection.current = -1; // Backward (left)
    } else if (walk < 0) {
      scrollDirection.current = 1; // Forward (right)
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Duplicate projects for seamless loop
  const duplicatedProjects = [...projects, ...projects, ...projects];

  return (
    <div
      ref={carouselRef}
      data-carousel="true"
      className="flex gap-4 md:gap-6 overflow-x-auto overflow-y-hidden scrollbar-hide h-full"
      style={{
        alignItems: "stretch",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        width: "100%",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        overflowX: "auto",
        overflowY: "hidden",
        display: "flex",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={(e) => {
        // Update direction based on wheel scroll
        if (e.deltaX > 0) {
          scrollDirection.current = 1; // Forward (right)
        } else if (e.deltaX < 0) {
          scrollDirection.current = -1; // Backward (left)
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {duplicatedProjects.map((project, index) => (
        <Link
          key={`${project.slug}-${index}`}
          href={`/work/${project.slug}`}
          className="flex-shrink-0 block"
          style={{ 
            flex: "0 0 auto",
            height: "100%",
            aspectRatio: "5/7"
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={`/images/projects/${project.slug}/thumb-${project.slug}.jpg`}
              alt={project.title}
              fill
              sizes="(max-width: 768px) calc(80vh * 5 / 7), calc(80vh * 5 / 7)"
              className="object-cover"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
