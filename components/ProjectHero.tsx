import type { Project } from "@/data/projects";

interface ProjectHeroProps {
  project: Project;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  const hasHeroContent =
    project.heroTagline ||
    project.scope?.length ||
    project.team?.length ||
    project.description?.length;

  if (!hasHeroContent) {
    return null;
  }

  const hasScopeOrTeam = project.scope?.length || project.team?.length;

  return (
    <section className="project-hero pt-24 md:pt-32 lg:pt-40 mb-16 md:mb-24">
      {/* Title: full width, above the two-column section */}
      <div className="mb-20 md:mb-24">
        <h1 className="text-5xl font-bold">{project.title}</h1>
      </div>

      {/* Two-column grid: SCOPE/TEAM left (cols 1-6) | Description right (cols 7-12) */}
      {(hasScopeOrTeam || project.description?.length) && (
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-24 gap-y-10 items-start">
          {/* Left column: SCOPE + TEAM, flush left */}
          {hasScopeOrTeam && (
            <div className="lg:col-span-6">
              {project.scope && project.scope.length > 0 && (
                <div className="mb-10">
                  <h3 className="project-hero__label mb-4">SCOPE</h3>
                  <ul className="space-y-2 list-none pl-0 m-0">
                    {project.scope.map((item, i) => (
                      <li key={i} className="project-hero__body">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {project.team && project.team.length > 0 && (
                <div className="mt-12">
                  <h3 className="project-hero__label mb-4">TEAM</h3>
                  <ul className="space-y-2 list-none pl-0 m-0">
                    {project.team.map((item, i) => (
                      <li key={i} className="project-hero__body">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Right column: Description, starts at column 7 (center) */}
          {project.description && project.description.length > 0 && (
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="space-y-8">
                {project.description.map((paragraph, i) => (
                  <p key={i} className="project-hero__body">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
