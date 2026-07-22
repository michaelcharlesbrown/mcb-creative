"use client";

import {
  Children,
  Fragment,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import BodyClass from "@/components/BodyClass";
import { INFO_PEEL_VIDEO_SRC } from "@/lib/infoPeelVideo";
import { useVideoPlaybackGate } from "@/hooks/useViewportVideo";

interface InfoPeelRevealProps {
  /** Each direct child is one opaque foreground panel; a full-viewport window
      onto the fixed background video follows each one. Two panels therefore
      read as: panel → video → panel → video → footer. */
  children: ReactNode;
  /** Applied to the scrolling content element, e.g. "info-page info-intro". */
  className?: string;
  "aria-label"?: string;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
/** SSR renders the full peel; reduced-motion users get the static layout after hydration. */
const getReducedMotionServerSnapshot = () => false;

export default function InfoPeelReveal({
  children,
  className,
  "aria-label": ariaLabel,
}: InfoPeelRevealProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const staticSectionRef = useRef<HTMLElement>(null);
  const revealsRef = useRef<(HTMLDivElement | null)[]>([]);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServerSnapshot
  );
  const [videoActive, setVideoActive] = useState(false);
  // The heavy source is only requested once a reveal (or the static reel under
  // reduced motion) nears the viewport — never on initial load. The poster
  // covers any brief buffer, so the reveal never shows a blank window.
  const [shouldLoad, setShouldLoad] = useState(false);

  useVideoPlaybackGate(videoRef, videoActive);

  // The peel is pure CSS — opaque panels slide up over the fixed video as the
  // page scrolls. JS only requests and plays the video while a reveal window is
  // actually on-screen; the panels cover it the rest of the time, so loading or
  // playing before then is pure waste. The first reveal sits exactly at the
  // fold, so a plain 0px margin reads as "intersecting" at rest (sub-pixel) and
  // would load the file immediately. The negative bottom margin requires the
  // window to scroll ~15% into view before it triggers, so nothing is requested
  // until the viewer actually reaches it; the poster covers the brief buffer.
  useEffect(() => {
    if (reducedMotion) return;
    const reveals = revealsRef.current.filter(
      (el): el is HTMLDivElement => el !== null
    );
    if (reveals.length === 0) return;

    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            onScreen.add(entry.target);
            setShouldLoad(true);
          } else {
            onScreen.delete(entry.target);
          }
        }
        setVideoActive(onScreen.size > 0);
      },
      { rootMargin: "0px 0px -15% 0px" }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reducedMotion]);

  // Reduced motion: the reel is a static block in natural flow, so gate its
  // source on that block nearing the viewport rather than force-loading it.
  useEffect(() => {
    if (!reducedMotion) return;
    const node = staticSectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "50% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const panels = Children.toArray(children);

  // Reduced motion: no fixed background, no reveals — panels stack in natural
  // flow and the reel plays once as a single static block before the footer.
  if (reducedMotion) {
    return (
      <>
        <BodyClass className="info-peel-active" />
        <main className={className} aria-label={ariaLabel}>
          {children}
        </main>
        <section
          ref={staticSectionRef}
          className="info-peel__static"
          aria-label="Studio reel"
        >
          <video
            className="info-peel__static-video"
            src={shouldLoad ? INFO_PEEL_VIDEO_SRC : undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </section>
      </>
    );
  }

  return (
    <div className="info-peel">
      <BodyClass className="info-peel-active" />

      <div className="info-peel__video-wrap" aria-hidden="true">
        <video
          ref={videoRef}
          className="info-peel__video"
          src={shouldLoad ? INFO_PEEL_VIDEO_SRC : undefined}
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>

      <main
        className={["info-peel__content", className].filter(Boolean).join(" ")}
        aria-label={ariaLabel}
      >
        {panels.map((panel, i) => (
          <Fragment key={i}>
            <div className="info-peel__panel">{panel}</div>
            <div
              className="info-peel__reveal"
              aria-hidden="true"
              ref={(el) => {
                revealsRef.current[i] = el;
              }}
            />
          </Fragment>
        ))}
      </main>
    </div>
  );
}
