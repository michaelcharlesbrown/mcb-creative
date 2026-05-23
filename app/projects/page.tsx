import { projects } from "@/data/projects";
import { sanityFetch } from "@/lib/sanity.fetch";
import { projectsGridQuery } from "@/lib/sanity.queries";
import { resolveProjectImages } from "@/lib/resolveProjectImages";
import WorkGrid from "@/components/WorkGrid";

type SanityGridProject = {
  slug: string;
  accentColor?: string;
  subheadline?: string;
  scope?: string[];
  heroImage?: { alt?: string; asset?: { url: string } };
  thumbnail?: { alt?: string; asset?: { url: string } };
};

export default async function Projects() {
  const sanityProjects = await sanityFetch<SanityGridProject[]>(projectsGridQuery).catch(() => []);
  const sanityBySlug = Object.fromEntries(sanityProjects.map((p) => [p.slug, p]));

  const gridProjects = projects.map((stat) => {
    const sanity = sanityBySlug[stat.slug];
    const { landscape } = resolveProjectImages(
      sanity ? { slug: stat.slug, heroImage: sanity.heroImage, thumbnail: sanity.thumbnail } : null,
      { slug: stat.slug, heroImage: stat.heroImage, thumbnail: stat.thumbnail },
    );
    return {
      slug: stat.slug,
      title: stat.title,
      services: stat.services,
      heroImageLandscape: landscape,
      accentColor: sanity?.accentColor ?? stat.accentColor,
    };
  });

  return <WorkGrid projects={gridProjects} />;
}
