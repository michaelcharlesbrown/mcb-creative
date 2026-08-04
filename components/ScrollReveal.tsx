"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  /** Applied to the wrapper element, which is also what gets observed. */
  className?: string;
  /**
   * How far the element must travel into the viewport before it plays.
   * The default holds until it is a fifth of the way in, so the reveal reads
   * as a response to arriving rather than something already half over.
   */
  rootMargin?: string;
}

const DEFAULT_ROOT_MARGIN = "0px 0px -20% 0px";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Plays a staggered entrance when the wrapped content scrolls into view.
 *
 * Wrap the row of content itself, never an outer section. The observed element
 * is what decides the trigger point, and a tall section's top edge crosses the
 * viewport long before the copy inside it does — put this on the section and
 * the sequence is over before the reader can see any of it.
 *
 * The safety rule this follows: content is visible at rest and nothing is
 * hidden until JS has proved it can run. The wrapper ships with no state
 * attribute at all, so the server HTML — and any visitor whose JS never
 * executes — simply shows the content.
 *
 * It also only ever arms elements that are *below the viewport* at mount. An
 * element already on screen is left permanently alone: arming it would blink
 * visible content out and animate it back in, which is worse than not
 * animating at all. That check is what makes hiding safe here — the hidden
 * state is only ever applied where nobody can see it happen.
 */
export default function ScrollReveal({
  children,
  className,
  rootMargin = DEFAULT_ROOT_MARGIN,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  // The reveal state is written straight to the DOM rather than held in React
  // state. Nothing about it affects what React renders — it only decides which
  // CSS rules match — so a re-render would be pure overhead, and arming it
  // through setState would cascade a second render on mount for no gain.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver !== "function") return;
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

    // Already on screen when we hydrated — leave it visible, forever.
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    node.dataset.reveal = "armed";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.dataset.reveal = "revealed";
        observer.disconnect();
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      // Never leave the section armed-but-unrevealed behind us: without this,
      // unmounting mid-reveal would strand hidden content.
      delete node.dataset.reveal;
    };
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
