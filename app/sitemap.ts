import { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/sanity.fetch";
import { projectSlugsQuery } from "@/lib/sanity.queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mcbcreative.design";

  const slugs = await sanityFetch<{ slug: string }[]>(projectSlugsQuery).catch(() => []);

  const projectUrls = slugs.map(({ slug }) => ({
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
