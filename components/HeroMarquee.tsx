import Image from "next/image";
import { getSanityImageUrl } from "@/lib/sanityImage";
import type { MediaSlideData } from "@/components/SlideSequence";

interface HeroMarqueeProps {
  slides: MediaSlideData[];
  /**
   * How the images move. "horizontal": an end-to-end strip drifting right.
   * "vertical": stacked full-width, drifting up.
   */
  variant?: "horizontal" | "vertical";
  /**
   * How the type sits over them. "fill": the full phrase on one line, caps
   * spanning the viewport height. "split": name and tagline each take half the
   * viewport, counter-running. "band": the full phrase on one line, caps
   * spanning the middle third. Defaults to "fill" for horizontal, "split" for
   * vertical.
   */
  typeLayout?: "fill" | "split" | "band";
  /**
   * Horizontal only: flips both tracks, so the images drift left and the
   * single-line type drifts right.
   */
  reverse?: boolean;
}

const NAME = "Michael Charles Brown /// ";
const TAGLINE = "Independent Creative /// ";

/**
 * One marquee line of type. Holds its phrase twice and travels half its
 * width — a seamless loop. Exported so the line can run over other media
 * (e.g. the Info page's reel video); it fills whatever positioned box it's in.
 */
export function TypeRow({
  phrase,
  position,
}: {
  phrase: string;
  position: "full" | "band" | "top" | "bottom";
}) {
  return (
    <div className={`hero-marquee__type hero-marquee__type--${position}`} aria-hidden="true">
      <span className="hero-marquee__phrase">{phrase}</span>
      <span className="hero-marquee__phrase">{phrase}</span>
    </div>
  );
}

/**
 * 2026 experiment: a full-viewport hero built from counter-running marquees.
 * Every sizzle-reel image sits end to end in a strip; the name runs over it
 * in white with a difference blend, inverting whatever passes behind. Pure
 * CSS animation — no JS, so the first frame is the resting frame.
 *
 * Each track holds its content twice and animates by half its length, which
 * loops seamlessly (same technique as the SocialShowcase marquee). Only
 * still images are used: video slides are skipped rather than autoplaying
 * dozens of files at once.
 */
export default function HeroMarquee({
  slides,
  variant = "horizontal",
  typeLayout = variant === "horizontal" ? "fill" : "split",
  reverse = false,
}: HeroMarqueeProps) {
  // Built here rather than with SlideSequence's resolveSlides, which lives in a
  // client module and can't be called from this server component.
  const images = slides.flatMap((slide) => {
    const imageUrl = getSanityImageUrl(slide.image ?? undefined, "cover");
    return imageUrl ? [{ imageUrl, alt: slide.alt ?? "" }] : [];
  });
  if (images.length === 0) return null;

  // The image track's loop length scales with the number of images, so the
  // strip moves at the same speed however many slides the Studio holds. The
  // count is data, not a design value — the per-image pace is a token.
  const trackStyle = { "--hero-marquee-count": images.length } as React.CSSProperties;
  // Horizontal frames are full viewport height at 16:9; vertical frames are full width.
  const sizes = variant === "horizontal" ? "178vh" : "100vw";

  return (
    <section
      className={`hero-marquee hero-marquee--${variant}${reverse ? " hero-marquee--reverse" : ""}`}
      aria-label="Michael Charles Brown, Independent Creative"
    >
      <div className="hero-marquee__images" style={trackStyle}>
        {[0, 1].map((copy) =>
          images.map((slide, index) => (
            <div
              key={`${copy}-${index}`}
              className="hero-marquee__frame"
              aria-hidden={copy === 1 || undefined}
            >
              <Image
                src={slide.imageUrl}
                alt={copy === 0 ? slide.alt : ""}
                fill
                sizes={sizes}
                className="hero-marquee__img"
                priority={copy === 0 && index === 0}
              />
            </div>
          ))
        )}
      </div>

      {typeLayout === "split" ? (
        <>
          <TypeRow phrase={NAME} position="top" />
          <TypeRow phrase={TAGLINE} position="bottom" />
        </>
      ) : (
        <TypeRow phrase={NAME + TAGLINE} position={typeLayout === "band" ? "band" : "full"} />
      )}
    </section>
  );
}
