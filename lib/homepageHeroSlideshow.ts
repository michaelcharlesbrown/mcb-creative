/**
 * Homepage hero slideshow — phase 1 config (local files only).
 *
 * Sets live in /public/images/homepage-hero-slideshow/ following the
 * `set{n}-left` / `set{n}-right` convention. To add a set, drop the two
 * files in that folder and append an entry here — no schema, no CMS.
 * Images are pre-cropped to their final aspect ratio; width/height are the
 * intrinsic pixel dimensions and exist only to reserve correct ratio.
 */

export interface HeroImage {
  src: string;
  width: number;
  height: number;
  /** Decorative slideshow — alt is intentionally empty. */
  alt: string;
}

export interface HeroSet {
  left: HeroImage;
  right: HeroImage;
}

const DIR = "/images/homepage-hero-slideshow";

export const HOMEPAGE_HERO_SETS: HeroSet[] = [
  {
    left: { src: `${DIR}/set1-left.jpg`, width: 930, height: 678, alt: "" },
    right: { src: `${DIR}/set1-right.jpg`, width: 929, height: 925, alt: "" },
  },
  {
    left: { src: `${DIR}/set2-left.jpg`, width: 930, height: 930, alt: "" },
    right: { src: `${DIR}/set2-right.jpg`, width: 930, height: 620, alt: "" },
  },
];

/** Hold time per set before snapping to the next (brutalist hard cut, no fade). */
export const HOMEPAGE_HERO_HOLD_MS = 1000;
