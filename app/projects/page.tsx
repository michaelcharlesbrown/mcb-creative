import { sanityFetch } from "@/lib/sanity.fetch";
import { workPageProjectsQuery } from "@/lib/sanity.queries";
import { resolveProjectImages } from "@/lib/resolveProjectImages";
import WorkGrid from "@/components/WorkGrid";
import type { MediaSlideData } from "@/components/SlideSequence";
import { pageMetadata } from "@/lib/siteConfig";

export const metadata = pageMetadata({ path: "/projects" });

// ISR: statically cache this page but refresh it from Sanity at most every
// 60s, so Work Page curation/order changes go live without a redeploy. Keep in
// sync with SANITY_REVALIDATE_SECONDS in lib/sanity.fetch.ts (must be a literal).
export const revalidate = 60;

type SanityGridProject = {
  slug: string;
  title: string;
  accentColor?: string;
  scope?: string[];
  heroImage?: { alt?: string; asset?: { url: string } };
  cardSlides?: MediaSlideData[];
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

  const gridProjects = sanityProjects
    .filter((sanity): sanity is SanityGridProject => Boolean(sanity))
    .map((sanity) => {
      const { landscape } = resolveProjectImages({
        slug: sanity.slug,
        heroImage: sanity.heroImage,
      });
      return {
        slug: sanity.slug,
        title: sanity.title,
        services: sanity.scope ?? [],
        heroImageLandscape: landscape,
        accentColor: sanity.accentColor ?? "#000000",
        cardSlides: sanity.cardSlides,
      };
    });

  return <WorkGrid projects={gridProjects} />;
}
