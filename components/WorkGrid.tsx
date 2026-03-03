import WorkCard from "@/components/WorkCard";

interface WorkGridProject {
  slug: string;
  title: string;
  services: string[];
  heroImage: string;
  accentColor: string;
}

interface WorkGridProps {
  projects: WorkGridProject[];
}

export default function WorkGrid({ projects }: WorkGridProps) {
  return (
    <div className="min-h-screen bg-background text-black">
      {/* Hero — 2/3 viewport, title at bottom to match homepage */}
      <section className="projects-hero relative h-[66.67vh] overflow-hidden">
        <div className="projects-hero__content">
          <div className="projects-hero__content-inner">
            <h1 className="hero__headline m-0">Portfolio</h1>
          </div>
        </div>
      </section>

      <div className="max-w-[var(--content-max-width)] mx-auto content-inset pt-[max(var(--nav-height),4rem)] pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-14">
          {projects.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>

      </div>
    </div>
  );
}
