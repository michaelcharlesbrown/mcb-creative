"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getSanityImageUrl, type SanityImagePreset } from "@/lib/sanityImage";
import FadeIn from "@/components/FadeIn";

interface MediaBlockProps {
  image?: { asset?: { url: string }; alt?: string };
  /** Portrait image for mobile — when provided, switches to this via <picture> art direction */
  imageMobile?: { asset?: { url: string }; alt?: string };
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
  imageMobile,
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
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [videoUrl]);

  const imageUrl = getSanityImageUrl(image, imagePreset);
  const imageMobileUrl = getSanityImageUrl(imageMobile, "portrait");
  const hasImage = Boolean(imageUrl);
  const hasMobileImage = Boolean(imageMobileUrl);
  const hasVideo = Boolean(videoUrl);
  const showVideo = hasVideo && isInView;

  if (!hasImage && !hasVideo) return null;

  const containerClass = `relative overflow-hidden ${fill ? "size-full" : "w-full"} ${className}`;

  /**
   * Art-direction mode: portrait mobile / landscape desktop.
   * Uses a native <picture> element so the browser downloads only the
   * matching source — no double-loading. Sanity CDN handles WebP/AVIF
   * via auto=format in the URL, so no next/image needed here.
   */
  const artDirectionInner = hasImage && hasMobileImage ? (
    <div
      ref={containerRef}
      className={containerClass}
      style={fill ? undefined : { aspectRatio }}
    >
      <picture className="absolute inset-0 w-full h-full">
        {/* Portrait source for mobile */}
        <source media="(max-width: 767px)" srcSet={imageMobileUrl!} />
        {/* Landscape source (or video placeholder) for desktop */}
        <img
          src={imageUrl!}
          alt={image?.alt ?? altFallback}
          fetchPriority={priority ? "high" : undefined}
          decoding={priority ? "sync" : "async"}
          className="w-full h-full object-cover"
        />
      </picture>
      {/* Desktop video overlay — hidden on mobile */}
      {showVideo && (
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  ) : null;

  /** Standard single-image / video render */
  const standardInner = (
    <div
      ref={containerRef}
      className={containerClass}
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

  const inner = artDirectionInner ?? standardInner;
  return priority ? inner : <FadeIn>{inner}</FadeIn>;
}
