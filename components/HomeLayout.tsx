import HeroSection from "@/components/HeroSection";
import BodyClass from "@/components/BodyClass";
import WorkCard from "@/components/WorkCard";
import type { MediaSlideData } from "@/components/SlideSequence";
import type { HomeProject } from "@/app/page";

interface HomeLayoutProps {
  projects: HomeProject[];
  sizzleReelSlides: MediaSlideData[];
}

/**
 * Single responsive homepage layout. Replaces the former HomeMobileLayout /
 * HomeDesktopLayout pair, which rendered the entire page twice (two hero
 * sections, two h1s, double DOM) and toggled visibility with CSS. Breakpoint
 * behavior lives inside the components (HeroSequence, work-grid CSS) — the
 * layout itself is breakpoint-agnostic.
 */
export default function HomeLayout({ projects, sizzleReelSlides }: HomeLayoutProps) {
  return (
    <>
      <BodyClass className="home" />
      <div className="overflow-hidden bg-background">
        <HeroSection sizzleReelSlides={sizzleReelSlides} />
      </div>

      <div className="bg-background">
        <div className="max-w-[var(--content-max-width)] mx-auto content-inset pb-[var(--page-bottom)]">
          <section className="project-intro" aria-labelledby="work-intro-title">
            <header className="project-intro__header">
              <p className="label">Featured Projects</p>
              <h1 id="work-intro-title" className="project-intro__headline">
                My work spans brand identity, interactive web design, motion, and illustration.
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
    </>
  );
}
