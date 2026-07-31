import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "./sanity.client";
import type { SanityImageSource } from "@sanity/image-url";

const builder = createImageUrlBuilder(sanityClient);

/**
 * Base Sanity image URL builder. Chain methods for full control:
 *
 * @example
 * urlFor(image).width(1200).height(800).auto("format").quality(85).url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/** Context presets for optimized CDN delivery at appropriate dimensions */
export const sanityImagePresets = {
  /** Cover/hero images — desktop full-screen (e.g. project page hero, landscape) */
  cover: { width: 3840, quality: 85 },
  /** Full-width landscape content images (fullWidthBlock, textMediaBlock) */
  fullWidth: { width: 3840, quality: 85 },
  /** Two-column split images */
  twoColumn: { width: 2400, quality: 85 },
  /** Portrait card / mobile hero (carousel, mobile grid, mobile page hero) */
  portrait: { width: 1800, quality: 85 },
  /** Small thumbnails — legacy, prefer portrait for card contexts */
  thumbnail: { width: 600, quality: 80 },
} as const;

export type SanityImagePreset = keyof typeof sanityImagePresets;

/**
 * Returns an optimized Sanity CDN URL for the given image and context preset.
 * Uses auto format and sensible defaults for each preset.
 *
 * fit("max") is load-bearing: without it Sanity UPSCALES any source narrower
 * than the preset width, and the soft upscaled file becomes the ceiling for
 * every srcset candidate Next generates from it. With it, a preset wider than
 * the source serves the source's native resolution — never more, never less.
 */
export function getSanityImageUrl(
  source: SanityImageSource | null | undefined,
  preset: SanityImagePreset = "fullWidth"
): string | undefined {
  if (!source) return undefined;
  const { width, quality } = sanityImagePresets[preset];
  return urlFor(source).width(width).fit("max").auto("format").quality(quality).url();
}

/**
 * Open Graph card size — the 1.91:1 box Facebook, LinkedIn, Slack, iMessage
 * and X all crop shared links to. Hero sources are 16:9 (or 4:3 in one case),
 * so the CDN crops to fit, honoring the image's hotspot when the Studio sets
 * one.
 */
export const OG_IMAGE_DIMENSIONS = { width: 1200, height: 630 } as const;

/**
 * Returns a share-card URL for a Sanity image: exactly 1200×630, always JPEG.
 *
 * This is the one place `fit("max")` is deliberately not used — a share card
 * must be exactly the card's dimensions, not the source's. `auto("format")`
 * is skipped for the same reason: social crawlers remain unreliable with
 * WebP/AVIF, and a card that fails to decode is worse than a larger file.
 */
export function getOgImageUrl(
  source: SanityImageSource | null | undefined
): string | undefined {
  if (!source) return undefined;
  return urlFor(source)
    .width(OG_IMAGE_DIMENSIONS.width)
    .height(OG_IMAGE_DIMENSIONS.height)
    .fit("crop")
    .format("jpg")
    .quality(80)
    .url();
}
