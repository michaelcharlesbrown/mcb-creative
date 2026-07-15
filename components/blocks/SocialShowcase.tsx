"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { getSanityImageUrl } from "@/lib/sanityImage";
import { useViewportVideo } from "@/hooks/useViewportVideo";

interface MediaRef {
  alt?: string;
  asset?: { url: string };
}

interface ScreenMedia {
  image?: MediaRef;
  videoFileUrl?: string;
}

interface SocialShowcaseProps {
  backgroundImage?: MediaRef;
  backgroundVideoFileUrl?: string;
  backgroundColorHex?: string;
  screens?: ScreenMedia[];
  width?: "full" | "half";
  layoutStyle?: "grid" | "marquee";
  titleFallback?: string;
}

function Screen({
  screen,
  altFallback,
  sizes,
  shouldLoad,
  registerVideoRef,
}: {
  screen: ScreenMedia;
  altFallback: string;
  sizes: string;
  shouldLoad: boolean;
  registerVideoRef: (el: HTMLVideoElement | null) => void;
}) {
  const imageUrl = getSanityImageUrl(screen.image, "portrait");

  return (
    <div className="social-showcase__screen">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={screen.image?.alt ?? altFallback}
          fill
          sizes={sizes}
          className="social-showcase__screen-media object-cover"
        />
      ) : screen.videoFileUrl && shouldLoad ? (
        <video
          ref={registerVideoRef}
          className="social-showcase__screen-media"
          src={screen.videoFileUrl}
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : null}
    </div>
  );
}

/**
 * Page-builder block: 1–3 vertical (9:16) "phone screen" media items,
 * optionally over a full-bleed background image/video, in a static grid
 * or a continuously scrolling marquee.
 */
export default function SocialShowcase({
  backgroundImage,
  backgroundVideoFileUrl,
  backgroundColorHex,
  screens = [],
  width = "full",
  layoutStyle = "grid",
  titleFallback = "",
}: SocialShowcaseProps) {
  const { elementRef: containerRef, shouldLoad, isVisible } =
    useViewportVideo<HTMLDivElement>();
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const validScreens = screens.filter((s) => s?.image || s?.videoFileUrl);

  // Only ever play what's currently on screen — pausing (not just lazy-starting)
  // is what keeps multiple marquee/grid videos from all running off screen at once.
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (isVisible) video.play().catch(() => {});
      else video.pause();
    });
  }, [isVisible]);

  if (validScreens.length === 0) return null;

  const registerVideoRef = (el: HTMLVideoElement | null) => {
    if (el && !videoRefs.current.includes(el)) videoRefs.current.push(el);
  };

  const backgroundImageUrl = getSanityImageUrl(backgroundImage, "fullWidth");
  const hasBackground = Boolean(backgroundVideoFileUrl || backgroundImageUrl || backgroundColorHex);

  return (
    <div ref={containerRef} className={`social-showcase social-showcase--${width}`}>
      {hasBackground && (
        <div
          className="social-showcase__background"
          style={
            !backgroundVideoFileUrl && !backgroundImageUrl && backgroundColorHex
              ? { backgroundColor: backgroundColorHex }
              : undefined
          }
        >
          {backgroundVideoFileUrl && shouldLoad ? (
            <video
              ref={registerVideoRef}
              src={backgroundVideoFileUrl}
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : backgroundImageUrl ? (
            <Image
              src={backgroundImageUrl}
              alt={backgroundImage?.alt ?? titleFallback}
              fill
              sizes="100vw"
              className="object-cover"
            />
          ) : null}
        </div>
      )}

      <div className="social-showcase__content">
        {layoutStyle === "marquee" ? (
          <div className="social-showcase__marquee">
            <div className="social-showcase__marquee-track">
              {[...validScreens, ...validScreens].map((screen, i) => (
                <Screen
                  key={i}
                  screen={screen}
                  altFallback={titleFallback}
                  sizes="25vw"
                  shouldLoad={shouldLoad}
                  registerVideoRef={registerVideoRef}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="social-showcase__grid">
            {validScreens.map((screen, i) => (
              <Screen
                key={i}
                screen={screen}
                altFallback={titleFallback}
                sizes="25vw"
                shouldLoad={shouldLoad}
                registerVideoRef={registerVideoRef}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
