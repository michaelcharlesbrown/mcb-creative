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
      <div className="max-w-[var(--content-max-width)] mx-auto content-inset pt-[max(var(--nav-height),4rem)] pb-24">

        <h1 className="uppercase text-ui tracking-widest mb-16 md:mb-20">
          All Work
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-14">
          {projects.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>

      </div>
    </div>
  );
}
