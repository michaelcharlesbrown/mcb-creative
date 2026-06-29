/**
 * Homepage hero slideshow — types and timing.
 *
 * Image sets are discovered automatically from
 * /public/images/homepage-hero-slideshow/ (see getHomepageHeroSets.ts).
 * Drop in `set{n}-left` and `set{n}-right` files — no manual config.
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

/** Hold time per set before snapping to the next (brutalist hard cut, no fade). */
export const HOMEPAGE_HERO_HOLD_MS = 1000;
