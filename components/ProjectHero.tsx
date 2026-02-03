"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTransition } from "./TransitionContext";

export default function ProjectHero() {
  const { isTransitioning, setHeroImageLoaded } = useTransition();

  // Handle image load - signal to context when hero image is ready
  const handleImageLoad = () => {
    if (isTransitioning) {
      setHeroImageLoaded(true);
    }
  };

  return (
    <div className="w-full mb-8">
      <div 
        className="relative w-full" 
        style={{ 
          aspectRatio: "16/9"
        }}
      >
        <Image
          src="/images/transition-placeholder.jpg"
          alt="BitTorrent"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          onLoad={handleImageLoad}
        />
      </div>
    </div>
  );
}
