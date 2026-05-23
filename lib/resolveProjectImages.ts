import { getSanityImageUrl } from './sanityImage';

type SanityImageRef = { alt?: string; asset?: { url: string } } | null | undefined;

interface SanityData {
  slug: string;
  /** Landscape desktop hero */
  heroImage?: SanityImageRef;
  /** Portrait mobile hero / card */
  thumbnail?: SanityImageRef;
}

interface StaticData {
  slug: string;
  /** Landscape desktop hero override (optional) */
  heroImage?: string;
  /** Portrait card path — points to /public/images/projects/{slug}/thumb.jpg */
  thumbnail?: string;
}

export interface ResolvedProjectImages {
  /** Landscape image URL — desktop page hero, desktop grid cards */
  landscape: string;
  /** Portrait image URL — mobile page hero, all portrait cards, carousel */
  portrait: string;
}

/**
 * Resolves the two canonical image URLs for a project.
 *
 * Priority:
 *   landscape: Sanity heroImage → static heroImage → /images/projects/{slug}/01-full.jpg
 *   portrait:  Sanity thumbnail → static thumbnail → /images/projects/{slug}/thumb.jpg
 */
export function resolveProjectImages(
  sanity: SanityData | null | undefined,
  stat: StaticData | null | undefined,
): ResolvedProjectImages {
  const slug = sanity?.slug ?? stat?.slug ?? '';

  return {
    landscape:
      getSanityImageUrl(sanity?.heroImage, 'fullWidth') ??
      stat?.heroImage ??
      `/images/projects/${slug}/01-full.jpg`,

    portrait:
      getSanityImageUrl(sanity?.thumbnail, 'portrait') ??
      stat?.thumbnail ??
      `/images/projects/${slug}/thumb.jpg`,
  };
}
