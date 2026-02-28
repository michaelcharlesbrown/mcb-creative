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
  /** When true, fills parent container (e.g. for full-screen cover) */
  fill?: boolean;
  /** When true, skips FadeIn wrapper and passes priority to <Image> for LCP preloading */
  priority?: boolean;
}

export default function MediaBlock({
  image,
  videoUrl,
  aspectRatio = "1400/787.5",
  className = "",
  sizes = "100vw",
  altFallback = "",
  imagePreset = "fullWidth",
  fill = false,
  priority,
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

  const inner = (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${fill ? "size-full" : "w-full rounded-[4px]"} ${className}`}
      style={fill ? undefined : { aspectRatio }}
    >
      {hasImage ? (
        <Image
          src={imageUrl!}
          alt={image?.alt ?? altFallback}
          fill
          sizes={sizes}
          className="object-cover"
          priority={priority}
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
  );

  return priority ? inner : <FadeIn>{inner}</FadeIn>;
}
