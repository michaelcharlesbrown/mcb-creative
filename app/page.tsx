import { projects } from "@/data/projects";
import { sanityFetch } from "@/lib/sanity.fetch";
import { projectsGridQuery } from "@/lib/sanity.queries";
import HomeMobileLayout from "@/components/HomeMobileLayout";
import HomeDesktopLayout from "@/components/HomeDesktopLayout";

type SanityGridProject = {
  slug: string;
  title: string;
  accentColor?: string;
  subheadline?: string;
  scope?: string[];
  thumbnail?: string;
};

export default async function Home() {
  const sanityProjects = await sanityFetch<SanityGridProject[]>(projectsGridQuery).catch(() => []);

  const staticBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

  // If Sanity has grid projects configured, use them as the ordered source of truth.
  // Otherwise fall back to the first 6 static projects.
  const mergedProjects = sanityProjects.length > 0
    ? sanityProjects.slice(0, 6).map((sanity) => {
        const staticProject = staticBySlug[sanity.slug];
        return {
          slug: sanity.slug,
          title: sanity.title ?? staticProject?.title ?? "",
          accentColor: sanity.accentColor ?? staticProject?.accentColor ?? "",
          subheadline: sanity.subheadline ?? staticProject?.tagline,
          scope: sanity.scope ?? staticProject?.services ?? [],
          heroImage: sanity.thumbnail ?? staticProject?.heroImage ?? `/images/projects/${sanity.slug}/01-full.jpg`,
        };
      })
    : projects.slice(0, 6).map((project) => ({
        slug: project.slug,
        title: project.title,
        accentColor: project.accentColor,
        subheadline: project.tagline,
        scope: project.services,
        heroImage: project.heroImage ?? `/images/projects/${project.slug}/01-full.jpg`,
      }));

  return (
    <div className="home text-black">
      <HomeMobileLayout projects={mergedProjects} />
      <HomeDesktopLayout projects={mergedProjects} />
    </div>
  );
}
