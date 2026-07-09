"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getSanityImageUrl, type SanityImagePreset } from "@/lib/sanityImage";
import { useViewportVideo, useVideoPlaybackGate } from "@/hooks/useViewportVideo";

export interface MediaSlideData {
  image?: { asset?: { url: string } } | null;
  videoFileUrl?: string | null;
  alt?: string | null;
}

export interface ResolvedSlide {
  imageUrl?: string;
  videoUrl?: string;
  alt?: string;
}

/** Image slides hold ~1s for a rapid sizzle-reel pace; video slides play through, capped at ~4s. Hard cuts only — no crossfade. */
const IMAGE_HOLD_MS = 1000;
const VIDEO_HOLD_CAP_MS = 4000;

export function resolveSlides(
  slides: MediaSlideData[],
  preset: SanityImagePreset,
  altFallback?: string
): ResolvedSlide[] {
  return slides.map((slide) => {
    const imageUrl = getSanityImageUrl(slide.image ?? undefined, preset);
    return {
      imageUrl,
      // Presence-based, like socialShowcase's screen member: image wins if both are set.
      videoUrl: imageUrl ? undefined : slide.videoFileUrl ?? undefined,
      alt: slide.alt ?? altFallback,
    };
  });
}

export interface SlideSequenceProps {
  slides: ResolvedSlide[];
  /** "hover" advances only while hovered (grid cards); "auto" advances on viewport visibility. */
  trigger: "hover" | "auto";
  /** true: loops the full sequence forever while engaged. false: plays through once, then settles on slide 0. */
  loopForever: boolean;
  aspectClassName: string;
  visibilityClassName?: string;
  sizes: string;
  priority?: boolean;
}

/**
 * Shared slide-sequence engine: hard cuts only, no crossfade. Preloads only
 * the next slide's video, and gates the cut into it on that video's
 * `canplay` event so an unready clip never shows as a black frame.
 */
export function SlideSequence({
  slides,
  trigger,
  loopForever,
  aspectClassName,
  visibilityClassName = "",
  sizes,
  priority,
}: SlideSequenceProps) {
  // Grid/hover: slide[0] is already showing at rest, so hover jumps straight
  // to the remaining slides rather than re-playing the resting frame.
  const startIndex = trigger === "hover" && slides.length > 1 ? 1 : 0;
  const [activeIndex, setActiveIndex] = useState(0);
  // Bumped on every advance, even when the loop cuts back to the same index
  // (e.g. exactly 2 slides in hover mode) — activeIndex alone wouldn't change
  // in that case, and React skips re-running effects on a same-value update.
  const [tick, setTick] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const { elementRef, shouldLoad, isVisible } = useViewportVideo<HTMLDivElement>();
  const activeVideoRef = useRef<HTMLVideoElement>(null);
  const preloadVideoRef = useRef<HTMLVideoElement>(null);
  const readyUrlsRef = useRef<Set<string>>(new Set());
  const pendingIndexRef = useRef<number | null>(null);
  const hasPlayedOnceRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isEngaged = trigger === "hover" ? isHovering : isVisible;
  useVideoPlaybackGate(activeVideoRef, isEngaged);

  const clearScheduledAdvance = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const commitAdvance = useCallback((nextIndex: number) => {
    pendingIndexRef.current = null;
    setActiveIndex(nextIndex);
    setTick((t) => t + 1);
  }, []);

  const requestAdvance = useCallback(
    (nextIndex: number) => {
      const next = slides[nextIndex];
      if (next?.videoUrl && !readyUrlsRef.current.has(next.videoUrl)) {
        // Hold the current slide — cutting to an unready video would show a
        // black frame instead of a clean cut. Preload effect resolves this.
        pendingIndexRef.current = nextIndex;
        return;
      }
      commitAdvance(nextIndex);
    },
    [slides, commitAdvance]
  );

  // Reset to the resting slide on mouse-leave (grid) or when a one-shot
  // sequence leaves the viewport (so the next viewport-entry replays it).
  useEffect(() => {
    if (trigger === "hover" && !isHovering) {
      clearScheduledAdvance();
      setActiveIndex(0);
    }
    if (trigger === "auto" && !isVisible && !loopForever) {
      clearScheduledAdvance();
      hasPlayedOnceRef.current = false;
    }
  }, [isHovering, isVisible, trigger, loopForever, clearScheduledAdvance]);

  // Jump straight to the first "remaining" slide the moment hover begins.
  useEffect(() => {
    if (trigger === "hover" && isHovering) {
      setActiveIndex(startIndex);
    }
  }, [isHovering, trigger, startIndex]);

  // Advance timer for whichever slide is currently active.
  useEffect(() => {
    if (!isEngaged) return;
    if (!loopForever && hasPlayedOnceRef.current) return;
    if (slides.length <= 1) return;

    const isLast = activeIndex >= slides.length - 1;
    const nextIndex = isLast ? (loopForever ? startIndex : null) : activeIndex + 1;
    const current = slides[activeIndex];

    const goNext = () => {
      if (nextIndex === null) {
        hasPlayedOnceRef.current = true;
        setActiveIndex(0);
        return;
      }
      requestAdvance(nextIndex);
    };

    if (current?.videoUrl) {
      timeoutRef.current = setTimeout(goNext, VIDEO_HOLD_CAP_MS);
      const videoEl = activeVideoRef.current;
      videoEl?.addEventListener("ended", goNext);
      return () => {
        clearScheduledAdvance();
        videoEl?.removeEventListener("ended", goNext);
      };
    }

    timeoutRef.current = setTimeout(goNext, IMAGE_HOLD_MS);
    return () => clearScheduledAdvance();
    // `tick` forces this effect to re-run even when a loop-back cuts to the
    // same index as before (e.g. exactly 2 slides in hover mode) — a
    // same-value setActiveIndex() alone wouldn't trigger a re-run.
  }, [activeIndex, tick, isEngaged, loopForever, slides, startIndex, requestAdvance, clearScheduledAdvance]);

  // Preload only the next slide's video — never the full array — and only
  // once this element is near the viewport (shouldLoad), matching the
  // existing lazy-video convention used elsewhere in the codebase.
  const upcomingIndex =
    activeIndex >= slides.length - 1 ? (loopForever ? startIndex : null) : activeIndex + 1;
  const upcomingVideoUrl =
    shouldLoad && upcomingIndex !== null ? slides[upcomingIndex]?.videoUrl : undefined;

  useEffect(() => {
    if (!upcomingVideoUrl || readyUrlsRef.current.has(upcomingVideoUrl)) return;
    const el = preloadVideoRef.current;
    if (!el) return;
    const onReady = () => {
      readyUrlsRef.current.add(upcomingVideoUrl);
      if (pendingIndexRef.current !== null && slides[pendingIndexRef.current]?.videoUrl === upcomingVideoUrl) {
        commitAdvance(pendingIndexRef.current);
      }
    };
    el.addEventListener("canplay", onReady);
    return () => el.removeEventListener("canplay", onReady);
  }, [upcomingVideoUrl, slides, commitAdvance]);

  if (slides.length === 0) return null;
  const active = slides[activeIndex];
  const wrapperClass = `slide-sequence relative w-full overflow-hidden ${aspectClassName} ${visibilityClassName}`;

  return (
    <div
      ref={elementRef}
      className={wrapperClass}
      onMouseEnter={trigger === "hover" ? () => setIsHovering(true) : undefined}
      onMouseLeave={trigger === "hover" ? () => setIsHovering(false) : undefined}
    >
      {active?.imageUrl ? (
        <Image
          src={active.imageUrl}
          alt={active.alt ?? ""}
          fill
          sizes={sizes}
          className="object-cover"
          priority={priority}
        />
      ) : active?.videoUrl && shouldLoad ? (
        <video
          // Keyed on `tick`, not just the URL — looping back to the same
          // video slide (e.g. exactly 2 slides, hover mode) must still force
          // a fresh mount so playback restarts from the beginning instead of
          // sitting frozen on the previous play-through's last frame.
          key={`${active.videoUrl}-${tick}`}
          ref={activeVideoRef}
          src={active.videoUrl}
          muted
          playsInline
          autoPlay
          className="object-cover w-full h-full"
        />
      ) : null}

      {upcomingVideoUrl && (
        <video
          key={upcomingVideoUrl}
          ref={preloadVideoRef}
          src={upcomingVideoUrl}
          muted
          playsInline
          preload="auto"
          className="hidden"
        />
      )}
    </div>
  );
}
