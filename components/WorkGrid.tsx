import WorkCard from "@/components/WorkCard";

interface WorkGridProject {
  slug: string;
  title: string;
  services: string[];
  heroImageLandscape: string;
  accentColor: string;
}

interface WorkGridProps {
  projects: WorkGridProject[];
}

export default function WorkGrid({ projects }: WorkGridProps) {
  return (
    <div className="min-h-screen bg-background text-black">
      <div className="max-w-[var(--content-max-width)] mx-auto content-inset pb-[25vh]">
        <section className="project-intro" aria-labelledby="work-intro-title">
          <header className="project-intro__header">
            <h1 id="work-intro-title" className="project-intro__headline">
              Selected Work
            </h1>
          </header>
        </section>
        <div className="col-2 work-grid">
          {projects.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
