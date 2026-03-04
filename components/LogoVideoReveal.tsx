"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAccentColor } from "@/components/AccentColorContext";

/**
 * Transparent section that creates a "peel away" moment — as the previous
 * section scrolls up, the fixed logo video is revealed. The footer then
 * scrolls up over the video. Same effect as the info page.
 *
 * Video is portaled to body so it avoids stacking-context/background issues.
 * On project pages, uses accent color overlay. Other pages: no overlay.
 */
export default function LogoVideoReveal() {
  const [mounted, setMounted] = useState(false);
  const { accentColor } = useAccentColor();

  useEffect(() => {
    setMounted(true);
  }, []);

  const videoContent = (
    <div className="fixed inset-0 -z-10">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/mcb-creative.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
      {accentColor && (
        <div
          className="logo-video-accent-overlay absolute inset-0 pointer-events-none"
          aria-hidden
        />
      )}
    </div>
  );

  return (
    <>
      {mounted && typeof document !== "undefined" && createPortal(videoContent, document.body)}
      <section
        className="min-h-screen relative z-10"
        aria-hidden
      />
    </>
  );
}
