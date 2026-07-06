"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

const DEFAULT_ROOT_MARGIN = "200px 0px";

/**
 * Gates a video to the viewport: `shouldLoad` flips true (and stays true)
 * the first time the observed element nears the viewport, so the source
 * is only requested once. `isVisible` tracks live intersection and is
 * meant to drive play()/pause() so playback stops once scrolled out.
 */
export function useViewportVideo<T extends HTMLElement>(
  rootMargin: string = DEFAULT_ROOT_MARGIN
) {
  const elementRef = useRef<T>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { elementRef, shouldLoad, isVisible };
}

/** Plays/pauses a video element in response to `isVisible`, on top of whatever autoplay/loop attributes it already has. */
export function useVideoPlaybackGate(
  videoRef: RefObject<HTMLVideoElement | null>,
  isVisible: boolean
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isVisible) video.play().catch(() => {});
    else video.pause();
  }, [videoRef, isVisible]);
}
