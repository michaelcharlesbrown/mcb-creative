import { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/sanity.fetch";
import { homepageSlugsQuery, workPageSlugsQuery } from "@/lib/sanity.queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mcbcreative.design";

  // Only case studies published to the homepage and/or Work page grids are
  // sitemapped — a project left out of both is unlisted end-to-end,
  // reachable only by direct link, not offered to search engines either.
  const [homepageSlugs, workPageSlugs] = await Promise.all([
    sanityFetch<(string | null)[] | null>(homepageSlugsQuery).catch(() => []),
    sanityFetch<(string | null)[] | null>(workPageSlugsQuery).catch(() => []),
  ]);

  const slugs = new Set(
    [...(homepageSlugs ?? []), ...(workPageSlugs ?? [])].filter(
      (slug): slug is string => Boolean(slug)
    )
  );

  const projectUrls = [...slugs].map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/info`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...projectUrls,
  ];
}
