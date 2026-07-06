"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import BodyClass from "@/components/BodyClass";
import {
  INFO_PEEL_VIDEO_POSTER,
  INFO_PEEL_VIDEO_SRC,
} from "@/lib/infoPeelVideo";
import { useVideoPlaybackGate } from "@/hooks/useViewportVideo";

gsap.registerPlugin(ScrollTrigger);

interface InfoPeelRevealProps {
  children: ReactNode;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function InfoPeelReveal({ children }: InfoPeelRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoActive, setVideoActive] = useState(false);

  useVideoPlaybackGate(videoRef, videoActive);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const container = containerRef.current;
    const content = contentRef.current;
    const videoWrap = videoWrapRef.current;
    if (!container || !content || !videoWrap) return;

    ScrollTrigger.normalizeScroll(true);

    const ctx = gsap.context(() => {
      gsap.set(videoWrap, { autoAlpha: 0 });

      gsap.to(content, {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: content,
          start: "bottom bottom",
          end: () => `+=${window.innerHeight}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => {
            gsap.set(videoWrap, { autoAlpha: 1 });
            setVideoActive(true);
          },
          onEnterBack: () => {
            gsap.set(videoWrap, { autoAlpha: 1 });
            setVideoActive(true);
          },
          onLeaveBack: () => {
            gsap.set(videoWrap, { autoAlpha: 0 });
            setVideoActive(false);
          },
        },
      });
    }, container);

    const refresh = () => ScrollTrigger.refresh();
    refresh();
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("resize", refresh);
      ctx.revert();
      ScrollTrigger.normalizeScroll(false);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <>
        <BodyClass className="info-peel-active" />
        {children}
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
    <div ref={containerRef} className="info-peel">
      <BodyClass className="info-peel-active" />

      <div ref={videoWrapRef} className="info-peel__video-wrap" aria-hidden="true">
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

      <div ref={contentRef} className="info-peel__content">
        {children}
      </div>
    </div>
  );
}
