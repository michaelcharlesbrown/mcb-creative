/**
 * @deprecated Import urlFor and getSanityImageUrl from @/lib/sanityImage instead.
 * This file re-exports for backward compatibility.
 */
export { urlFor, getSanityImageUrl, sanityImagePresets } from "./sanityImage";
export type { SanityImagePreset } from "./sanityImage";

/** @deprecated Use Sanity coverImage for project pages. Returns null. */
export function getProjectHeroImage(_slug: string): string | null {
  return null;
}
