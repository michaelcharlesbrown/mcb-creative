"use client";

import { SlideSequence, resolveSlides, type MediaSlideData } from "@/components/SlideSequence";

export type { MediaSlideData };

interface HeroSequenceProps {
  slides: MediaSlideData[];
  altFallback?: string;
  priority?: boolean;
  desktopSizes?: string;
  mobileSizes?: string;
}

/**
 * Project grid card slide sequence. One curated slide set drives both
 * breakpoints from a single 16:9 source: on desktop, each hover reveals one
 * alternate slide then returns to the cover; repeated hovers walk through the
 * set. Inert on mobile — the card rests on its cover slide as a still.
 * Both 16:9 for launch (mobile was 5:4 — see globals.css MOBILE CROP SWITCH).
 * Hard cuts only.
 */
export default function HeroSequence({
  slides,
  altFallback,
  priority,
  desktopSizes = "(max-width: 767px) 100vw, (max-width: 2400px) 48vw, 1120px",
  mobileSizes = "100vw",
}: HeroSequenceProps) {
  const resolvedDesktop = resolveSlides(slides, "fullWidth", altFallback);
  const resolvedMobile = resolveSlides(slides, "portrait", altFallback);

  if (resolvedDesktop.length === 0) return null;

  return (
    <div className="relative w-full">
      <SlideSequence
        slides={resolvedDesktop}
        trigger="hover"
        loopForever={false}
        hoverSingleStep
        aspectClassName="aspect-video"
        visibilityClassName="hidden md:block"
        sizes={desktopSizes}
        priority={priority}
      />
      <SlideSequence
        slides={resolvedMobile}
        trigger="none"
        loopForever={false}
        aspectClassName="aspect-video"
        visibilityClassName="block md:hidden"
        sizes={mobileSizes}
        priority={priority}
      />
    </div>
  );
}
