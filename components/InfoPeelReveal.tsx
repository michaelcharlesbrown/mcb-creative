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
      onto the fixed background video sits between adjacent panels. Two panels
      therefore read as: panel → video → panel → footer. The reveal is a beat
      *between* sections, so the last panel hands straight off to the footer
      rather than peeling to the same video twice. */
  children: ReactNode;
  /** Applied to the scrolling content element, e.g. "info-page info-intro". */
  className?: string;
  "aria-label"?: string;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Ceiling on how long the idle warm-up may be deferred once the page is loaded. */
const WARM_IDLE_TIMEOUT_MS = 2000;
/** Stand-in delay where requestIdleCallback is unavailable (older Safari). */
const WARM_FALLBACK_DELAY_MS = 600;

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
  // The heavy source is never part of the page's own load: it is requested on
  // the first idle tick *after* the load event, so it is already buffered by
  // the time the viewer scrolls to a reveal.
  const [shouldLoad, setShouldLoad] = useState(false);

  useVideoPlaybackGate(videoRef, videoActive);

  // Requesting the source at the reveal was the whole problem: fetch, decode and
  // first paint all landed while the window was already on-screen, so the peel
  // showed the page behind the video and then jumped as playback began. The file
  // is instead warmed on the first idle tick after the load event — off the
  // critical path, so the page still renders and settles first, but long done by
  // the time anyone has read the intro and scrolled.
  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;

    const warm = () => {
      const load = () => {
        if (!cancelled) setShouldLoad(true);
      };
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(load, { timeout: WARM_IDLE_TIMEOUT_MS });
      } else {
        window.setTimeout(load, WARM_FALLBACK_DELAY_MS);
      }
    };

    if (document.readyState === "complete") warm();
    else window.addEventListener("load", warm, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", warm);
    };
  }, [reducedMotion]);

  // The peel is pure CSS — opaque panels slide up over the fixed video as the
  // page scrolls. This observer only drives play/pause: the panels cover the
  // video the rest of the time, so decoding then is waste. The half-viewport
  // margin starts playback before the window appears, so the reveal opens onto
  // a running loop rather than a still frame that lurches into motion.
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
          if (entry.isIntersecting) onScreen.add(entry.target);
          else onScreen.delete(entry.target);
        }
        setVideoActive(onScreen.size > 0);
      },
      { rootMargin: "50% 0px" }
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
          preload="auto"
        />
      </div>

      <main
        className={["info-peel__content", className].filter(Boolean).join(" ")}
        aria-label={ariaLabel}
      >
        {panels.map((panel, i) => (
          <Fragment key={i}>
            <div className="info-peel__panel">{panel}</div>
            {i < panels.length - 1 && (
              <div
                className="info-peel__reveal"
                aria-hidden="true"
                ref={(el) => {
                  revealsRef.current[i] = el;
                }}
              />
            )}
          </Fragment>
        ))}
      </main>
    </div>
  );
}
