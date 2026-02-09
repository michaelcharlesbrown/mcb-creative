import { projects } from "@/data/projects";
import { getProjectHeroImage } from "@/lib/projectImages";
import ProjectsScroll from "@/components/ProjectsScroll";

export default function Projects() {
  // Get hero images for each project (server-side)
  const projectsWithHeroes = projects.map((project) => {
    const heroImage = getProjectHeroImage(project.slug);
    return {
      ...project,
      heroImage: heroImage || project.thumbnail,
    };
  });

  return <ProjectsScroll projects={projectsWithHeroes} />;
}
