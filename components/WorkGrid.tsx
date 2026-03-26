import WorkCard from "@/components/WorkCard";
import WorkPageCta from "@/components/WorkPageCta";

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
      <div className="max-w-[var(--content-max-width)] mx-auto content-inset pt-[max(var(--nav-height),4rem)] pb-[clamp(4rem,10vw,120px)]">
        {/* Spacer — top white section so first row of projects sits nicely in viewport */}
        <div className="min-h-[calc(28vh-max(var(--nav-height),4rem))]" aria-hidden />

        <h1 className="work-page__label mb-6 md:mb-8">Selected Work</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-14">
          {projects.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>

        <WorkPageCta />
      </div>
    </div>
  );
}
