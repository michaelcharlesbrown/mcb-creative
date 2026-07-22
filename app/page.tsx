import { sanityFetch } from "@/lib/sanity.fetch";
import { homepageProjectsQuery, homepageSizzleReelQuery } from "@/lib/sanity.queries";
import { resolveProjectImages } from "@/lib/resolveProjectImages";
import HomeLayout from "@/components/HomeLayout";
import type { MediaSlideData } from "@/components/SlideSequence";

// ISR: statically cache this page but refresh it from Sanity at most every
// 60s, so curated homepage changes go live without a redeploy. Keep in sync
// with SANITY_REVALIDATE_SECONDS in lib/sanity.fetch.ts (must be a literal).
export const revalidate = 60;

const DEFAULT_ACCENT_COLOR = "#000000";

type SanityHomepageProject = {
  slug: string;
  title: string;
  accentColor?: string;
  scope?: string[];
  heroImage?: { alt?: string; asset?: { url: string } };
  cardSlides?: MediaSlideData[];
};

export type HomeProject = {
  slug: string;
  title: string;
  services: string[];
  heroImageLandscape: string;
  accentColor: string;
  cardSlides?: MediaSlideData[];
};

export default async function Home() {
  // The Homepage singleton's `featuredProjects` array (drag-reordered in the
  // Studio) is the single source of truth for which projects appear on the
  // homepage and in what order. A project only shows up here if it has been
  // explicitly added — there is no automatic fallback. Sanity is the single
  // content source: services come from the intro block's scope, images and
  // accent colors from the project document.
  const sanityProjects =
    (await sanityFetch<(SanityHomepageProject | null)[] | null>(
      homepageProjectsQuery
    ).catch(() => [])) ?? [];

  const sizzleReelSlides =
    (await sanityFetch<MediaSlideData[] | null>(homepageSizzleReelQuery).catch(() => [])) ?? [];

  const allProjects: HomeProject[] = sanityProjects
    .filter((sanity): sanity is SanityHomepageProject => Boolean(sanity))
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
        accentColor: sanity.accentColor ?? DEFAULT_ACCENT_COLOR,
        cardSlides: sanity.cardSlides,
      };
    });

  return (
    <div className="home text-black">
      <HomeLayout projects={allProjects} sizzleReelSlides={sizzleReelSlides} />
    </div>
  );
}
