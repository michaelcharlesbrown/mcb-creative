import WorkCard from "@/components/WorkCard";
import SectionIntro from "@/components/SectionIntro";

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
      <div className="pt-[max(var(--nav-height),4rem)]">
        <SectionIntro
          label="Selected Projects"
          tagline="My work spans brand identity, interactive web design, motion and illustration."
        />
      </div>

      <div className="max-w-[var(--content-max-width)] mx-auto content-inset pb-[50vh]">
        <div className="col-2">
          {projects.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
