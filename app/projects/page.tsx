import { projects } from "@/data/projects";
import { sanityFetch } from "@/lib/sanity.fetch";
import { projectsGridQuery } from "@/lib/sanity.queries";
import ProjectsScroll from "@/components/ProjectsScroll";

type SanityGridProject = {
  slug: string;
  accentColor?: string;
  subheadline?: string;
  scope?: string[];
};

export default async function Projects() {
  const sanityProjects = await sanityFetch<SanityGridProject[]>(projectsGridQuery).catch(() => []);
  const sanityBySlug = Object.fromEntries(sanityProjects.map((p) => [p.slug, p]));

  const projectsWithHeroes = projects.map((project) => {
    const heroImage =
      project.heroImage ?? `/images/projects/${project.slug}/01-full.jpg`;
    const sanity = sanityBySlug[project.slug];
    const firstScope = sanity?.scope?.[0] ?? project.services[0] ?? "";
    return {
      ...project,
      heroImage,
      firstScope,
      accentColor: sanity?.accentColor ?? project.accentColor,
    };
  });

  return <ProjectsScroll projects={projectsWithHeroes} />;
}
