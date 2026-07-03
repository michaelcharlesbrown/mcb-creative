import { projects } from "@/data/projects";
import { sanityFetch } from "@/lib/sanity.fetch";
import { workPageProjectsQuery } from "@/lib/sanity.queries";
import { resolveProjectImages } from "@/lib/resolveProjectImages";
import WorkGrid from "@/components/WorkGrid";

type SanityGridProject = {
  slug: string;
  title: string;
  accentColor?: string;
  scope?: string[];
  heroImage?: { alt?: string; asset?: { url: string } };
  thumbnail?: { alt?: string; asset?: { url: string } };
};

export default async function Projects() {
  // The "Work Page" singleton's `projects` array (drag-reordered in the
  // Studio) is the single source of truth for which case studies appear here
  // and in what order. A project only shows up if it has been explicitly
  // added — there is no automatic fallback.
  const sanityProjects =
    (await sanityFetch<(SanityGridProject | null)[] | null>(
      workPageProjectsQuery
    ).catch(() => [])) ?? [];
  const staticBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

  const gridProjects = sanityProjects
    .filter((sanity): sanity is SanityGridProject => Boolean(sanity))
    .map((sanity) => {
      const stat = staticBySlug[sanity.slug];
      const { landscape } = resolveProjectImages(
        { slug: sanity.slug, heroImage: sanity.heroImage, thumbnail: sanity.thumbnail },
        stat ? { slug: stat.slug, heroImage: stat.heroImage, thumbnail: stat.thumbnail } : null,
      );
      return {
        slug: sanity.slug,
        title: sanity.title,
        services: sanity.scope ?? stat?.services ?? [],
        heroImageLandscape: landscape,
        accentColor: sanity.accentColor ?? stat?.accentColor ?? "#000000",
      };
    });

  return <WorkGrid projects={gridProjects} />;
}
