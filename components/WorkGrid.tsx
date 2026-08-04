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
        {/* Page load sequence, same cadence as the homepage: eyebrow, then
            headline, then the grid. The nav is already in place by the time a
            viewer reaches this page, so it takes no step here. */}
        <section className="project-intro" aria-labelledby="work-intro-title">
          <header className="project-intro__header">
            <p className="label intro-beat intro-beat--1">Selected Work</p>
            <h1
              id="work-intro-title"
              className="project-intro__headline intro-beat intro-beat--2"
            >
              A collection of brand, product, and visual identity work.
            </h1>
          </header>
        </section>
        <div className="col-2 work-grid intro-beat intro-beat--3">
          {projects.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
