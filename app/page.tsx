import { projects, type Project } from "@/data/projects";
import { sanityFetch } from "@/lib/sanity.fetch";
import { projectsGridQuery } from "@/lib/sanity.queries";
import { getSanityImageUrl } from "@/lib/sanityImage";
import HomeMobileLayout from "@/components/HomeMobileLayout";
import HomeDesktopLayout from "@/components/HomeDesktopLayout";

type SanityGridProject = {
  slug: string;
  title: string;
  accentColor?: string;
  subheadline?: string;
  scope?: string[];
  heroImage?: { alt?: string; asset?: { url: string } };
  thumbnail?: string;
};

/** Homepage FluidWork grid: two stacked rows × two tiles — fixed order */
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
  heroImage: string;
};

function featuredFromSanity(
  sanity: SanityGridProject,
  stat?: Project,
): HomeFeaturedProject {
  return {
    slug: sanity.slug,
    title: sanity.title ?? stat?.title ?? "",
    accentColor: sanity.accentColor ?? stat?.accentColor ?? "",
    subheadline: sanity.subheadline ?? stat?.tagline,
    scope: sanity.scope ?? stat?.services ?? [],
    /** Match work page hero (MediaBlock): Sanity hero image first, then grid thumbnail, then static/local */
    heroImage:
      getSanityImageUrl(sanity.heroImage, "twoColumn") ??
      sanity.thumbnail ??
      stat?.heroImage ??
      `/images/projects/${sanity.slug}/01-full.jpg`,
  };
}

function featuredFromStatic(stat: Project): HomeFeaturedProject {
  return {
    slug: stat.slug,
    title: stat.title,
    accentColor: stat.accentColor,
    subheadline: stat.tagline,
    scope: stat.services,
    heroImage: stat.heroImage ?? `/images/projects/${stat.slug}/01-full.jpg`,
  };
}

export default async function Home() {
  const sanityProjects =
    await sanityFetch<SanityGridProject[]>(projectsGridQuery).catch(() => []);

  const staticBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

  const featuredHomeProjects: HomeFeaturedProject[] = FEATURED_HOME_SLUGS.map(
    (slug) => {
      const fromSanity = sanityProjects.find((p) => p.slug === slug);
      const stat = staticBySlug[slug];
      if (fromSanity) return featuredFromSanity(fromSanity, stat);
      if (stat) return featuredFromStatic(stat);
      return null;
    },
  ).filter((p): p is HomeFeaturedProject => p !== null);

  return (
    <div className="home text-black">
      <HomeMobileLayout projects={featuredHomeProjects} />
      <HomeDesktopLayout projects={featuredHomeProjects} />
    </div>
  );
}
