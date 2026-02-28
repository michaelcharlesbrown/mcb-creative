import { projects } from "@/data/projects";
import { sanityFetch } from "@/lib/sanity.fetch";
import { projectsGridQuery } from "@/lib/sanity.queries";
import WorkGrid from "@/components/WorkGrid";

type SanityGridProject = {
  slug: string;
  accentColor?: string;
  subheadline?: string;
  scope?: string[];
};

export default async function Projects() {
  const sanityProjects = await sanityFetch<SanityGridProject[]>(projectsGridQuery).catch(() => []);
  const sanityBySlug = Object.fromEntries(sanityProjects.map((p) => [p.slug, p]));

  const gridProjects = projects.map((project) => {
    const sanity = sanityBySlug[project.slug];
    return {
      slug: project.slug,
      title: project.title,
      services: project.services,
      heroImage: project.heroImage ?? `/images/projects/${project.slug}/01-full.jpg`,
      accentColor: sanity?.accentColor ?? project.accentColor,
    };
  });

  return <WorkGrid projects={gridProjects} />;
}
