"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getSanityImageUrl, type SanityImagePreset } from "@/lib/sanityImage";
import FadeIn from "@/components/FadeIn";

interface MediaBlockProps {
  image?: { asset?: { url: string }; alt?: string };
  videoUrl?: string;
  aspectRatio?: string;
  className?: string;
  sizes?: string;
  altFallback?: string;
  /** Image preset for CDN optimization (default: fullWidth) */
  imagePreset?: SanityImagePreset;
}

export default function MediaBlock({
  image,
  videoUrl,
  aspectRatio = "1400/787.5",
  className = "",
  sizes = "100vw",
  altFallback = "",
  imagePreset = "fullWidth",
}: MediaBlockProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!videoUrl || !containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [videoUrl]);

  const imageUrl = getSanityImageUrl(image, imagePreset);
  const hasImage = Boolean(imageUrl);
  const hasVideo = Boolean(videoUrl);
  const showVideo = hasVideo && isInView;

  if (!hasImage && !hasVideo) return null;

  return (
    <FadeIn>
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden rounded-[4px] ${className}`}
        style={{ aspectRatio }}
      >
        {hasImage ? (
          <Image
            src={imageUrl!}
            alt={image?.alt ?? altFallback}
            fill
            sizes={sizes}
            className="object-cover"
            loading="lazy"
          />
        ) : showVideo ? (
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
      </div>
    </FadeIn>
  );
}
