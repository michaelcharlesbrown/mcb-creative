import { projects } from "@/data/projects";
import { sanityFetch } from "@/lib/sanity.fetch";
import { homepageProjectsQuery, homepageSizzleReelQuery } from "@/lib/sanity.queries";
import { resolveProjectImages } from "@/lib/resolveProjectImages";
import HomeMobileLayout from "@/components/HomeMobileLayout";
import HomeDesktopLayout from "@/components/HomeDesktopLayout";
import type { MediaSlideData } from "@/components/SlideSequence";

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
  // explicitly added — there is no automatic fallback. The local `projects`
  // array only fills in images/services/accentColor that haven't been set in
  // Sanity yet; it never controls inclusion or ordering.
  const sanityProjects =
    (await sanityFetch<(SanityHomepageProject | null)[] | null>(
      homepageProjectsQuery
    ).catch(() => [])) ?? [];

  const sizzleReelSlides =
    (await sanityFetch<MediaSlideData[] | null>(homepageSizzleReelQuery).catch(() => [])) ?? [];

  const staticBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

  const allProjects: HomeProject[] = sanityProjects
    .filter((sanity): sanity is SanityHomepageProject => Boolean(sanity))
    .map((sanity) => {
      const stat = staticBySlug[sanity.slug];
      const { landscape } = resolveProjectImages(
        { slug: sanity.slug, heroImage: sanity.heroImage },
        stat ? { slug: stat.slug, heroImage: stat.heroImage } : null,
      );
      return {
        slug: sanity.slug,
        title: sanity.title,
        services: sanity.scope ?? stat?.services ?? [],
        heroImageLandscape: landscape,
        accentColor: sanity.accentColor ?? stat?.accentColor ?? DEFAULT_ACCENT_COLOR,
        cardSlides: sanity.cardSlides,
      };
    });

  return (
    <div className="home text-black">
      <HomeMobileLayout projects={allProjects} sizzleReelSlides={sizzleReelSlides} />
      <HomeDesktopLayout projects={allProjects} sizzleReelSlides={sizzleReelSlides} />
    </div>
  );
}
