"use client";

import { useEffect, useRef } from "react";
import { useTransition } from "./TransitionContext";

export default function TransitionOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const { 
    isTransitioning, 
    heroImageLoaded,
    imageSrc, 
    completeTransition 
  } = useTransition();

  // Set overlay to cover viewport immediately when transition starts
  useEffect(() => {
    if (!overlayRef.current || !imgRef.current || !isTransitioning) {
      return;
    }

    const overlay = overlayRef.current;
    const img = imgRef.current;

    // Full-screen overlay covering viewport
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.zIndex = "9999";
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "none";
    overlay.style.transition = "none";
    overlay.style.overflow = "hidden";

    // Set image source and styles
    if (imageSrc) {
      img.src = imageSrc;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      img.style.display = "block";
    }
  }, [isTransitioning, imageSrc]);

  // Remove overlay when hero image is loaded and visible
  useEffect(() => {
    if (heroImageLoaded && isTransitioning) {
      // Small delay to ensure hero is fully visible, then remove overlay
      const timer = setTimeout(() => {
        completeTransition();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [heroImageLoaded, isTransitioning, completeTransition]);

  // Cleanup: Remove all overlay styles when transition ends
  useEffect(() => {
    if (!isTransitioning && overlayRef.current) {
      const overlay = overlayRef.current;
      overlay.style.position = "";
      overlay.style.left = "";
      overlay.style.top = "";
      overlay.style.width = "";
      overlay.style.height = "";
      overlay.style.zIndex = "";
      overlay.style.opacity = "";
      overlay.style.pointerEvents = "";
      overlay.style.transition = "";
      overlay.style.overflow = "";
    }
  }, [isTransitioning]);

  // Unmount when no image or transition is not active
  if (!imageSrc || !isTransitioning) {
    return null;
  }

  return (
    <div ref={overlayRef} className="fixed pointer-events-none">
      <img ref={imgRef} alt="Transition" />
    </div>
  );
}
