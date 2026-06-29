import { projects } from "@/data/projects";
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

export type HomeGridProject = {
  slug: string;
  title: string;
  services: string[];
  heroImageLandscape: string;
  heroImagePortrait: string;
  accentColor: string;
};

export default async function Home() {
  const sanityProjects =
    await sanityFetch<SanityGridProject[]>(projectsGridQuery).catch(() => []);

  const sanityBySlug = Object.fromEntries(sanityProjects.map((p) => [p.slug, p]));

  const gridProjects: HomeGridProject[] = projects.map((stat) => {
    const sanity = sanityBySlug[stat.slug];
    const { landscape, portrait } = resolveProjectImages(
      sanity ? { slug: stat.slug, heroImage: sanity.heroImage, thumbnail: sanity.thumbnail } : null,
      { slug: stat.slug, heroImage: stat.heroImage, thumbnail: stat.thumbnail },
    );
    return {
      slug: stat.slug,
      title: stat.title,
      services: stat.services,
      heroImageLandscape: landscape,
      heroImagePortrait: portrait,
      accentColor: sanity?.accentColor ?? stat.accentColor,
    };
  });

  return (
    <div className="home text-black">
      <HomeMobileLayout projects={gridProjects} />
      <HomeDesktopLayout projects={gridProjects} />
    </div>
  );
}
