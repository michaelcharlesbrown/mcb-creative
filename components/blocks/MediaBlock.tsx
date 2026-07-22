"use client";

import { useRef } from "react";
import Image from "next/image";
import { getSanityImageUrl, type SanityImagePreset } from "@/lib/sanityImage";
import { useViewportVideo, useVideoPlaybackGate } from "@/hooks/useViewportVideo";

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
  /** When true, passes priority to <Image> for LCP preloading */
  priority?: boolean;
  /**
   * When true and BOTH an image and a video are set, the video plays and the
   * image becomes its poster/fallback — shown instantly while the video loads,
   * and left in place under reduced-motion. Without this, the image wins and
   * the video is ignored (the default everywhere except the project hero).
   */
  preferVideo?: boolean;
}

export default function MediaBlock({
  image,
  videoUrl,
  aspectRatio = "1400/787.5",
  className = "",
  // Full-width blocks are capped by --content-max-width (2400px), so above
  // that viewport the image stops growing — don't request wider sources.
  sizes = "(max-width: 2400px) 100vw, 2400px",
  altFallback = "",
  imagePreset = "fullWidth",
  fill = false,
  priority,
  preferVideo = false,
}: MediaBlockProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { elementRef: containerRef, shouldLoad: isInView, isVisible } =
    useViewportVideo<HTMLDivElement>();
  useVideoPlaybackGate(videoRef, isVisible);

  const imageUrl = getSanityImageUrl(image, imagePreset);
  const hasImage = Boolean(imageUrl);
  const hasVideo = Boolean(videoUrl);
  const showVideo = hasVideo && isInView;
  // Poster mode: video plays over the image, image stays as poster/fallback.
  const posterMode = preferVideo && hasImage && hasVideo;

  if (!hasImage && !hasVideo) return null;

  // `media-frame` carries the corner radius on this overflow-hidden clip
  // container (see globals.css) — engine-proof rounding for every image/video
  // MediaBlock renders, unlike an <img>'s own border-radius under object-fit.
  const containerClass = `media-frame relative overflow-hidden ${fill ? "size-full" : "w-full"} ${className}`;

  // Single landscape source, cropped to its container by object-cover — 16:9
  // on desktop, 5:4 on mobile (aspect set by the container / CSS token).
  const inner = (
    <div
      ref={containerRef}
      className={containerClass}
      style={fill ? undefined : { aspectRatio }}
    >
      {posterMode ? (
        <>
          {/* Poster: shown instantly, remains the fallback under reduced-motion */}
          <Image
            src={imageUrl!}
            alt={image?.alt ?? altFallback}
            fill
            sizes={sizes}
            className="object-cover"
            priority={priority}
          />
          {/* Video overlays the poster once in view; hidden under reduced-motion (see globals.css) */}
          {showVideo && (
            <video
              ref={videoRef}
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="media-video-cover absolute inset-0 w-full h-full object-cover"
            />
          )}
        </>
      ) : hasImage ? (
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

  return inner;
}
