import type { Metadata } from "next";

/**
 * Single source of truth for the site's public origin and its default
 * identity metadata. Anything that needs an absolute site URL — metadataBase,
 * the sitemap, robots.txt — reads it from here rather than restating it.
 */
export const SITE_URL = "https://mcbcreative.design";

export const SITE_NAME = "MCB Creative";

export const SITE_TITLE = "MCB Creative — Independent Design Studio";

export const SITE_DESCRIPTION =
  "MCB Creative is the independent design studio of Michael Charles Brown — brand identity, interactive web design, motion, and illustration.";

export type OgImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

/** Studio-wide share card, used by any page without an image of its own. */
const DEFAULT_OG_IMAGE: OgImage = {
  url: "/images/og.png",
  width: 1200,
  height: 630,
  alt: "MCB Creative — Independent Design Studio of Michael Charles Brown",
};

type PageMetadataOptions = {
  /** Route-absolute path for this page, e.g. `/projects/superspatial`. */
  path: string;
  title?: string;
  description?: string;
  /** Page-specific share card — e.g. a project's hero. Falls back to the studio card. */
  image?: OgImage;
};

/**
 * Builds a page's canonical / Open Graph / Twitter block.
 *
 * Next.js merges metadata shallowly: a route that declares `openGraph` or
 * `alternates` replaces the parent's object outright instead of merging into
 * it, and a route that declares neither inherits the parent's verbatim —
 * which is how every page ended up advertising the homepage as its `og:url`.
 * Each page therefore has to restate the whole block with its own path, and
 * this helper is the one place that happens.
 *
 * Paths stay relative: Next resolves them against `metadataBase` (set from
 * `SITE_URL` in the root layout) when it renders the tags.
 */
export function pageMetadata({
  path,
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
  image = DEFAULT_OG_IMAGE,
}: PageMetadataOptions): Metadata {
  return {
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
