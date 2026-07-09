"use client";

import { SlideSequence, resolveSlides, type MediaSlideData } from "@/components/SlideSequence";

export type { MediaSlideData };

interface SizzleReelProps {
  slides: MediaSlideData[];
  altFallback?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Homepage hero slide sequence: the only hero on the page, so it autoplays
 * and loops on viewport entry — no hover needed. Hard cuts only.
 */
export default function SizzleReel({
  slides,
  altFallback,
  priority,
  sizes = "100vw",
}: SizzleReelProps) {
  const resolved = resolveSlides(slides, "cover", altFallback);
  if (resolved.length === 0) return null;

  return (
    <SlideSequence
      slides={resolved}
      trigger="auto"
      loopForever
      aspectClassName="aspect-[5/4] md:aspect-video"
      sizes={sizes}
      priority={priority}
    />
  );
}
