import { getSanityImageUrl } from './sanityImage';

type SanityImageRef = { alt?: string; asset?: { url: string } } | null | undefined;

interface SanityData {
  slug: string;
  /** Landscape hero / card source (16:9) */
  heroImage?: SanityImageRef;
}

interface StaticData {
  slug: string;
  /** Landscape hero override (optional) */
  heroImage?: string;
}

export interface ResolvedProjectImages {
  /** Landscape image URL — used everywhere: page hero (16:9 desktop / 5:4 mobile), grid cards, carousel */
  landscape: string;
}

/**
 * Resolves the single canonical landscape URL for a project. The site now
 * uses one 16:9 source per project, cropped by CSS to each context (16:9 on
 * desktop, 5:4 on mobile) — so there is no separate portrait source.
 *
 * Priority: Sanity heroImage → static heroImage → /images/projects/{slug}/01-full.jpg
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
  };
}
