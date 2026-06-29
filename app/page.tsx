import { projects, type Project } from "@/data/projects";
import { sanityFetch } from "@/lib/sanity.fetch";
import { projectsGridQuery } from "@/lib/sanity.queries";
import { resolveProjectImages } from "@/lib/resolveProjectImages";
import HomeMobileLayout from "@/components/HomeMobileLayout";
import HomeDesktopLayout from "@/components/HomeDesktopLayout";

type SanityGridProject = {
  slug: string;
  title: string;
  accentColor?: string;
  subheadline?: string;
  scope?: string[];
  heroImage?: { alt?: string; asset?: { url: string } };
  thumbnail?: { alt?: string; asset?: { url: string } };
};

/** Fixed order for the homepage featured grid */
const FEATURED_HOME_SLUGS = [
  "shiftdrink",
  "protools",
  "bittorrent",
  "alluvial",
] as const;

type HomeFeaturedProject = {
  slug: string;
  title: string;
  accentColor: string;
  subheadline?: string;
  scope?: string[];
  heroImageLandscape: string;
  heroImagePortrait: string;
};

function buildFeaturedProject(
  sanity: SanityGridProject | undefined,
  stat: Project | undefined,
): HomeFeaturedProject | null {
  if (!sanity && !stat) return null;

  const slug = sanity?.slug ?? stat?.slug ?? "";
  const { landscape, portrait } = resolveProjectImages(
    sanity ? { slug, heroImage: sanity.heroImage, thumbnail: sanity.thumbnail } : null,
    stat ? { slug, heroImage: stat.heroImage, thumbnail: stat.thumbnail } : null,
  );

  return {
    slug,
    title: sanity?.title ?? stat?.title ?? "",
    accentColor: sanity?.accentColor ?? stat?.accentColor ?? "",
    subheadline: sanity?.subheadline ?? stat?.tagline,
    scope: sanity?.scope ?? stat?.services ?? [],
    heroImageLandscape: landscape,
    heroImagePortrait: portrait,
  };
}

export default async function Home() {
  const sanityProjects =
    await sanityFetch<SanityGridProject[]>(projectsGridQuery).catch(() => []);

  const staticBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
  const sanityBySlug = Object.fromEntries(sanityProjects.map((p) => [p.slug, p]));

  const featuredProjects: HomeFeaturedProject[] = FEATURED_HOME_SLUGS
    .map((slug) => buildFeaturedProject(sanityBySlug[slug], staticBySlug[slug]))
    .filter((p): p is HomeFeaturedProject => p !== null);

  return (
    <div className="home text-black">
      <HomeMobileLayout projects={featuredProjects} />
      <HomeDesktopLayout projects={featuredProjects} />
    </div>
  );
}
