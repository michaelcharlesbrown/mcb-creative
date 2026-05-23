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
  cover: { width: 2800, quality: 85 },
  /** Full-width landscape content images (fullWidthBlock, textMediaBlock) */
  fullWidth: { width: 2400, quality: 85 },
  /** Two-column split images */
  twoColumn: { width: 1200, quality: 85 },
  /** Portrait card / mobile hero (carousel, mobile grid, mobile page hero) */
  portrait: { width: 900, quality: 85 },
  /** Small thumbnails — legacy, prefer portrait for card contexts */
  thumbnail: { width: 600, quality: 80 },
} as const;

export type SanityImagePreset = keyof typeof sanityImagePresets;

/**
 * Returns an optimized Sanity CDN URL for the given image and context preset.
 * Uses auto format and sensible defaults for each preset.
 */
export function getSanityImageUrl(
  source: SanityImageSource | null | undefined,
  preset: SanityImagePreset = "fullWidth"
): string | undefined {
  if (!source) return undefined;
  const { width, quality } = sanityImagePresets[preset];
  return urlFor(source).width(width).auto("format").quality(quality).url();
}
