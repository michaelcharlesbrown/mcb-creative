import { sanityClient } from "./sanity.client";

/**
 * Fetch from Sanity with cache disabled for immediate updates in development.
 * Pass { cache: 'no-store' } so Next.js doesn't cache the response - published
 * changes in Sanity Studio will reflect immediately on the dev server.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  const fetchOptions =
    process.env.NODE_ENV === "development"
      ? { cache: "no-store" as RequestCache }
      : undefined;

  return sanityClient.fetch<T>(query, params, fetchOptions);
}
