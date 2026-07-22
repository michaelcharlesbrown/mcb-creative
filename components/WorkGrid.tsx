import WorkCard from "@/components/WorkCard";
import type { MediaSlideData } from "@/components/SlideSequence";

interface WorkGridProject {
  slug: string;
  title: string;
  services: string[];
  heroImageLandscape: string;
  accentColor: string;
  cardSlides?: MediaSlideData[];
}

interface WorkGridProps {
  projects: WorkGridProject[];
}

export default function WorkGrid({ projects }: WorkGridProps) {
  return (
    <div className="min-h-screen bg-background text-black">
      <div className="max-w-[var(--content-max-width)] mx-auto content-inset pb-[var(--page-bottom)]">
        <section className="project-intro" aria-labelledby="work-intro-title">
          <header className="project-intro__header">
            <p className="label">Selected Work</p>
            <h1 id="work-intro-title" className="project-intro__headline">
              Helping founders and creators bring their ideas from the spark of
              inspiration to complete visual systems.
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
