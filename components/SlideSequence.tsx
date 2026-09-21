"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image, { getImageProps } from "next/image";
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
/**
 * How far ahead a running sequence keeps its image slides loaded. The first
 * request for an image at a given width makes the CDN generate it — up to
 * ~1.35s measured on the live reel, three beats — so ~2s of cuts load ahead,
 * in parallel, and a cold image is requested long before its cut comes due.
 */
const PRELOAD_LEAD_MS = 2000;
const PRELOAD_AHEAD = Math.ceil(PRELOAD_LEAD_MS / IMAGE_HOLD_MS);

/** The media a slide cuts to. Image wins if both are set, as in resolveSlides. */
function slideMediaUrl(slide: ResolvedSlide | undefined): string | undefined {
  return slide?.imageUrl ?? slide?.videoUrl;
}

/** The slide a sequence cuts to after `index`; null when a one-shot run is done and settles back to slide 0. */
function followingIndex(
  index: number,
  count: number,
  loopForever: boolean,
  startIndex: number
): number | null {
  if (index < count - 1) return index + 1;
  return loopForever ? startIndex : null;
}

/**
 * Fetches and decodes an image exactly as `<Image fill sizes={sizes}>` will
 * request it — same srcset, so the browser picks the same candidate — and
 * resolves once it's ready to paint. The later cut then draws from cache on
 * the next frame instead of waiting on the network.
 */
function preloadImage(src: string, sizes: string): Promise<void> {
  const { props } = getImageProps({ src, alt: "", fill: true, sizes });
  const img = new window.Image();
  if (props.sizes) img.sizes = props.sizes;
  if (props.srcSet) img.srcset = props.srcSet;
  img.src = props.src;
  return img.decode();
}

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
 * Shared slide-sequence engine: hard cuts only, no crossfade. Every cut is
 * gated on its media being ready — an image decoded, a video at `canplay` —
 * and holds the current slide until it is. Cutting on the clock alone froze
 * the last image that happened to load while the beats ran on unseen behind
 * it, then released several at once. Image slides load ahead of their cut;
 * video, the heavy case, preloads only the next slide.
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
  /** Media URLs safe to cut to. */
  const readyUrlsRef = useRef<Set<string>>(new Set());
  /** Image URLs already asked for, so a sliding preload window never requests one twice. */
  const requestedUrlsRef = useRef<Set<string>>(new Set());
  /** A cut held until its media is ready; markReady completes it. */
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
      const url = slideMediaUrl(slides[nextIndex]);
      if (url && !readyUrlsRef.current.has(url)) {
        // Hold the current slide — cutting to media that hasn't arrived
        // leaves an image frozen on the last one that loaded, or shows a
        // video as a black frame. markReady completes the cut on arrival.
        pendingIndexRef.current = nextIndex;
        return;
      }
      commitAdvance(nextIndex);
    },
    [slides, commitAdvance]
  );

  /** Records a slide's media as ready, and completes a cut that was held waiting for it. */
  const markReady = useCallback(
    (url: string) => {
      readyUrlsRef.current.add(url);
      const pending = pendingIndexRef.current;
      if (pending !== null && slideMediaUrl(slides[pending]) === url) {
        commitAdvance(pending);
      }
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
    // A cut still waiting on its media belonged to this visit — drop it so it
    // can't land after the pointer has gone. That slide never showed, so the
    // step below doesn't move past it and the next visit asks for it again.
    pendingIndexRef.current = null;
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

    const nextIndex = followingIndex(activeIndex, slides.length, loopForever, startIndex);
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

  // The slides to have ready before they're due: a hover card's next
  // alternate, or the next PRELOAD_AHEAD cuts of a running sequence. Only once
  // this element is near the viewport (shouldLoad), matching the existing
  // lazy-media convention used elsewhere in the codebase. A "none" sequence
  // never advances, so preloading what comes next would be pure waste — on
  // exactly the breakpoint that can least afford it.
  const slideCount = slides.length;
  const upcomingIndices = useMemo(() => {
    if (!shouldLoad || trigger === "none" || slideCount <= 1) return [];
    if (hoverSingleStep) return [hoverStepIndex];
    const indices: number[] = [];
    let next = followingIndex(activeIndex, slideCount, loopForever, startIndex);
    while (next !== null && indices.length < PRELOAD_AHEAD && !indices.includes(next)) {
      indices.push(next);
      next = followingIndex(next, slideCount, loopForever, startIndex);
    }
    return indices;
  }, [shouldLoad, trigger, slideCount, hoverSingleStep, hoverStepIndex, activeIndex, loopForever, startIndex]);

  // Image slides across the whole window, requested in parallel: a cold image
  // costs latency, not bandwidth, so several in flight at once keep well
  // ahead of the beat.
  useEffect(() => {
    for (const index of upcomingIndices) {
      const url = slides[index]?.imageUrl;
      if (!url || requestedUrlsRef.current.has(url)) continue;
      requestedUrlsRef.current.add(url);
      // A failed load or decode still releases the hold: one broken asset
      // must never freeze the sequence.
      const settle = () => markReady(url);
      preloadImage(url, sizes).then(settle, settle);
    }
  }, [upcomingIndices, slides, sizes, markReady]);

  // Video only for the very next slide — never the full window.
  const upcomingVideoUrl =
    upcomingIndices.length > 0 ? slides[upcomingIndices[0]]?.videoUrl : undefined;

  useEffect(() => {
    if (!upcomingVideoUrl || readyUrlsRef.current.has(upcomingVideoUrl)) return;
    const el = preloadVideoRef.current;
    if (!el) return;
    const onReady = () => markReady(upcomingVideoUrl);
    el.addEventListener("canplay", onReady);
    return () => el.removeEventListener("canplay", onReady);
  }, [upcomingVideoUrl, markReady]);

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
