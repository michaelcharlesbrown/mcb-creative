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

/** Image slides hold ~0.45s for a rapid sizzle-reel pace; video slides play through, capped at ~4s. Hard cuts only — no crossfade. */
const IMAGE_HOLD_MS = 450;
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
  /**
   * "hover" advances while hovered — use hoverSingleStep for one slide per
   * visit (grid cards) or loopForever for a full reel on hover. "auto"
   * advances on viewport visibility; "none" never advances — slide 0 only.
   */
  trigger: "hover" | "auto" | "none";
  /** true: loops the full sequence forever while engaged. false: plays through once, then settles on slide 0. */
  loopForever: boolean;
  /**
   * Grid cards only (trigger="hover"). Each hover shows one alternate slide
   * (starting at index 1), then returns to slide 0 on mouse leave. The next
   * hover shows the following slide; wraps after the last slide.
   */
  hoverSingleStep?: boolean;
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
  hoverSingleStep = false,
  aspectClassName,
  visibilityClassName = "",
  sizes,
  priority,
}: SlideSequenceProps) {
  // Grid/hover sequence: slide[0] is already showing at rest, so hover jumps
  // straight to the remaining slides rather than re-playing the resting frame.
  const startIndex = trigger === "hover" && slides.length > 1 && !hoverSingleStep ? 1 : 0;
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
  const settleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Timestamp the current slide's beat began — lets mouse-leave settle after
  // only the *remaining* beat, so the exiting slide gets one natural beat, not
  // a bonus full one on top of the time it has already been showing.
  const beatStartRef = useRef(0);
  /** Next alternate slide to show on hover (1 … slides.length - 1, wraps).
      State rather than a ref — it feeds the preload target computed during
      render below, and render output must never read a mutable ref. */
  const [hoverStepIndex, setHoverStepIndex] = useState(1);

  const isEngaged = trigger === "hover" ? isHovering : trigger === "auto" ? isVisible : false;
  const hoverRunsSequence = trigger === "hover" && !hoverSingleStep;
  useVideoPlaybackGate(activeVideoRef, isEngaged);

  const clearScheduledAdvance = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const clearSettle = useCallback(() => {
    if (settleTimeoutRef.current) {
      clearTimeout(settleTimeoutRef.current);
      settleTimeoutRef.current = null;
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

  // Hover enter/leave live in the event handlers themselves — state updates
  // in response to user events belong in handlers, not in effects reacting to
  // an isHovering flag (which cascades an extra render per transition).
  const handleMouseEnter = () => {
    // Cancel a pending settle so a resumed hover isn't yanked back to the
    // cover mid-loop.
    clearSettle();
    setIsHovering(true);
    if (hoverSingleStep && slides.length > 1) {
      requestAdvance(hoverStepIndex);
    } else {
      setActiveIndex(startIndex);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    clearScheduledAdvance();
    if (hoverSingleStep) {
      if (activeIndex > 0) {
        setHoverStepIndex(activeIndex >= slides.length - 1 ? 1 : activeIndex + 1);
        setActiveIndex(0);
      }
      return;
    }
    // Don't hard-cut back to the cover at the same instant an advance is
    // firing — the two updates race and flash. Let the slide that's showing
    // finish the beat it's already partway through, then settle to the cover.
    if (activeIndex !== 0) {
      const remaining = Math.max(0, IMAGE_HOLD_MS - (performance.now() - beatStartRef.current));
      settleTimeoutRef.current = setTimeout(() => {
        settleTimeoutRef.current = null;
        setActiveIndex(0);
      }, remaining);
    }
  };

  // One-shot auto sequences replay on the next viewport entry.
  useEffect(() => {
    if (trigger === "auto" && !isVisible && !loopForever) {
      clearScheduledAdvance();
      hasPlayedOnceRef.current = false;
    }
  }, [isVisible, trigger, loopForever, clearScheduledAdvance]);

  // Unmount: cancel anything scheduled.
  useEffect(
    () => () => {
      clearScheduledAdvance();
      clearSettle();
    },
    [clearScheduledAdvance, clearSettle]
  );

  // Advance timer for whichever slide is currently active.
  useEffect(() => {
    if (hoverRunsSequence && !isEngaged) return;
    if (!hoverRunsSequence && hoverSingleStep) return;
    if (!isEngaged) return;
    if (!loopForever && hasPlayedOnceRef.current) return;
    if (slides.length <= 1) return;

    const isLast = activeIndex >= slides.length - 1;
    const nextIndex = isLast ? (loopForever ? startIndex : null) : activeIndex + 1;
    const current = slides[activeIndex];
    beatStartRef.current = performance.now();

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
  }, [activeIndex, tick, isEngaged, hoverRunsSequence, hoverSingleStep, loopForever, slides, startIndex, requestAdvance, clearScheduledAdvance]);

  // Preload only the next slide's video — never the full array — and only
  // once this element is near the viewport (shouldLoad), matching the
  // existing lazy-video convention used elsewhere in the codebase.
  const upcomingIndex = hoverSingleStep
    ? hoverStepIndex
    : activeIndex >= slides.length - 1
      ? loopForever
        ? startIndex
        : null
      : activeIndex + 1;
  // A "none" sequence never advances, so preloading what comes next would be
  // pure waste — on exactly the breakpoint that can least afford it.
  const upcomingVideoUrl =
    shouldLoad && trigger !== "none" && upcomingIndex !== null && upcomingIndex < slides.length
      ? slides[upcomingIndex]?.videoUrl
      : undefined;

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
      onMouseEnter={trigger === "hover" ? handleMouseEnter : undefined}
      onMouseLeave={trigger === "hover" ? handleMouseLeave : undefined}
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
