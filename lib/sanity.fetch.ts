import { sanityClient } from "./sanity.client";

/**
 * How long (in seconds) a cached Sanity response is served before Next.js
 * refreshes it in the background. Published Studio changes go live within this
 * window with no redeploy. Keep this in sync with the `export const revalidate`
 * value on the pages that render Sanity content (Next requires that route-level
 * export to be a static literal, so it can't import this constant).
 */
export const SANITY_REVALIDATE_SECONDS = 60;

/**
 * Fetch from Sanity with environment-appropriate caching.
 *
 * - Development: `cache: 'no-store'` so published changes appear immediately on
 *   the dev server.
 * - Production: ISR via `next: { revalidate }` — responses are statically
 *   cached and served fast, then transparently revalidated at most every
 *   `SANITY_REVALIDATE_SECONDS`. Without this option a `next-sanity` fetch can
 *   leave the route uncached/dynamic, so we set it explicitly rather than
 *   relying on the route segment default alone.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  const fetchOptions =
    process.env.NODE_ENV === "development"
      ? { cache: "no-store" as RequestCache }
      : { next: { revalidate: SANITY_REVALIDATE_SECONDS } };

  return sanityClient.fetch<T>(query, params, fetchOptions);
}
