"use client";

import { SlideSequence, resolveSlides, type MediaSlideData } from "@/components/SlideSequence";

export type { MediaSlideData };

interface HeroSequenceProps {
  slidesDesktop: MediaSlideData[];
  slidesMobile: MediaSlideData[];
  altFallback?: string;
  priority?: boolean;
  desktopSizes?: string;
  mobileSizes?: string;
}

/**
 * Project grid card slide sequence: hover-triggered on desktop (16:9),
 * viewport-triggered one-shot on mobile (5:4). Hard cuts only.
 */
export default function HeroSequence({
  slidesDesktop,
  slidesMobile,
  altFallback,
  priority,
  desktopSizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
  mobileSizes = "100vw",
}: HeroSequenceProps) {
  const resolvedDesktop = resolveSlides(slidesDesktop, "fullWidth", altFallback);
  const resolvedMobile = resolveSlides(slidesMobile, "portrait", altFallback);

  if (resolvedDesktop.length === 0 && resolvedMobile.length === 0) return null;

  return (
    <div className="relative w-full">
      <SlideSequence
        slides={resolvedDesktop}
        trigger="hover"
        loopForever
        aspectClassName="aspect-video"
        visibilityClassName="hidden md:block"
        sizes={desktopSizes}
        priority={priority}
      />
      <SlideSequence
        slides={resolvedMobile}
        trigger="auto"
        loopForever={false}
        aspectClassName="aspect-[5/4]"
        visibilityClassName="block md:hidden"
        sizes={mobileSizes}
        priority={priority}
      />
    </div>
  );
}
