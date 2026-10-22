import BodyClass from "@/components/BodyClass";
import HeroMarquee from "@/components/HeroMarquee";
import WorkStack, { type WorkStackProject } from "@/components/WorkStack";
import type { MediaSlideData } from "@/components/SlideSequence";

interface HomeLayoutProps {
  projects: WorkStackProject[];
  sizzleReelSlides: MediaSlideData[];
}

/**
 * Homepage: you land on the work. A full-viewport marquee hero — the reel's
 * images drifting under the name — stays pinned while every project rises
 * over it in a full-bleed two-column stack. Breakpoint behavior lives in the
 * components' CSS.
 */
export default function HomeLayout({ projects, sizzleReelSlides }: HomeLayoutProps) {
  return (
    <>
      <BodyClass className="home" />
      {/* The stage pins the hero while the work stack scrolls up over it. */}
      <div className="home-stage">
        <HeroMarquee slides={sizzleReelSlides} variant="horizontal" typeLayout="band" />
        <WorkStack projects={projects} />
      </div>
    </>
  );
}
