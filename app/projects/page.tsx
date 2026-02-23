import { projects } from "@/data/projects";
import ProjectsScroll from "@/components/ProjectsScroll";

export default function Projects() {
  // Work page slides use 01.jpg from each project folder (or heroImage override)
  const projectsWithHeroes = projects.map((project) => {
    const heroImage =
      project.heroImage ?? `/images/projects/${project.slug}/01-full.jpg`;
    return {
      ...project,
      heroImage,
    };
  });

  return <ProjectsScroll projects={projectsWithHeroes} />;
}
