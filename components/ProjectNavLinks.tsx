interface AdjacentProject {
  slug: string;
  title: string;
  accentColor?: string;
}

interface ProjectNavLinksProps {
  previous: AdjacentProject | null;
  next: AdjacentProject | null;
}

export default function ProjectNavLinks({ previous, next }: ProjectNavLinksProps) {
  return (
    <section className="mt-16 mb-16 md:mb-24">
      <div className="flex justify-between items-center gap-8">
        {previous ? (
          <a
            href={`/projects/${previous.slug}`}
            className="flex-1 group cursor-pointer"
          >
            <div className="text-gray-500 mb-2">Previous Project</div>
            <div className="uppercase text-heading-sm font-normal">
              {previous.title}
            </div>
          </a>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <a
            href={`/projects/${next.slug}`}
            className="flex-1 text-right group cursor-pointer"
          >
            <div className="text-gray-500 mb-2">Next Project</div>
            <div className="uppercase text-heading-sm font-normal">
              {next.title}
            </div>
          </a>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </section>
  );
}
