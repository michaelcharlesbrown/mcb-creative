import { projects } from "@/data/projects";
import { getProjectHeroImage } from "@/lib/projectImages";
import ProjectsScroll from "@/components/ProjectsScroll";

export default function Projects() {
  // Get hero images for each project (server-side)
  const projectsWithHeroes = projects.map((project) => {
    const heroImage = project.heroImage ?? getProjectHeroImage(project.slug) ?? project.thumbnail;
    return {
      ...project,
      heroImage,
    };
  });

  return <ProjectsScroll projects={projectsWithHeroes} />;
}
