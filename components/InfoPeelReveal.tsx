"use client";

import {
  Children,
  Fragment,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import BodyClass from "@/components/BodyClass";
import {
  INFO_PEEL_VIDEO_POSTER,
  INFO_PEEL_VIDEO_SRC,
} from "@/lib/infoPeelVideo";
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

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function InfoPeelReveal({
  children,
  className,
  "aria-label": ariaLabel,
}: InfoPeelRevealProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const revealsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoActive, setVideoActive] = useState(false);

  useVideoPlaybackGate(videoRef, videoActive);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  // The peel is pure CSS — opaque panels slide up over the fixed video as the
  // page scrolls. JS only decodes the video while a reveal window is actually
  // on-screen; the panels cover it the rest of the time, so playing then is waste.
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
      { rootMargin: "10% 0px" }
    );

    reveals.forEach((el) => observer.observe(el));
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
        <section className="info-peel__static" aria-label="Studio reel">
          <video
            className="info-peel__static-video"
            src={INFO_PEEL_VIDEO_SRC}
            poster={INFO_PEEL_VIDEO_POSTER}
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
          src={INFO_PEEL_VIDEO_SRC}
          poster={INFO_PEEL_VIDEO_POSTER}
          autoPlay
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
