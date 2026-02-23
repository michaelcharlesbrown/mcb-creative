import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, getAdjacentProjects } from "@/data/projects";
import ProjectNavRail from "@/components/ProjectNavRail";
import ProjectHero from "@/components/ProjectHero";

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const { previous, next } = getAdjacentProjects(slug);

  return (
    <div className="min-h-screen bg-background text-black">
      <main className="pt-[var(--nav-height)] pb-16">
        <div className="max-w-[var(--content-max-width)] mx-auto content-inset">
          <ProjectHero project={project} />

          {/* Project Media */}
          {project.media.length > 0 && (
            <div className="flex flex-col gap-[8px]">
              {project.media.map((row, rowIndex) => {
                if (row.layout === "full") {
                  const item = row.items[0];
                  return (
                    <div key={rowIndex} className="w-full">
                      <div
                        className="relative w-full overflow-hidden rounded-[4px]"
                        style={{ aspectRatio: "1400/787.5" }}
                      >
                        {item.type === "image" ? (
                          <Image
                            src={item.src}
                            alt={item.alt || `${project.title} - ${rowIndex + 1}`}
                            fill
                            sizes="100vw"
                            className="object-cover"
                          />
                        ) : (
                          <video
                            src={item.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="object-cover w-full h-full"
                          />
                        )}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={rowIndex}
                      className="grid grid-cols-1 md:grid-cols-2 gap-[8px] w-full"
                    >
                      {row.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="relative w-full aspect-square overflow-hidden rounded-[4px]"
                        >
                          {item.type === "image" ? (
                            <Image
                              src={item.src}
                              alt={
                                item.alt ||
                                `${project.title} - ${rowIndex + 1}-${itemIndex + 1}`
                              }
                              fill
                              sizes="50vw"
                              className="object-cover"
                            />
                          ) : (
                            <video
                              src={item.src}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="object-cover w-full h-full"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  );
                }
              })}
            </div>
          )}

          {/* Next/Previous Navigation */}
          <section className="mt-16 mb-16 md:mb-24">
            <div className="flex justify-between items-center gap-8">
              {previous ? (
                <Link
                  href={`/projects/${previous.slug}`}
                  className="flex-1 group"
                >
                  <div className="text-gray-500 mb-2">Previous Project</div>
                  <div className="font-bold font-display text-5xl md:text-6xl group-hover:underline">
                    {previous.title}
                  </div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {next ? (
                <Link
                  href={`/projects/${next.slug}`}
                  className="flex-1 text-right group"
                >
                  <div className="text-gray-500 mb-2">Next Project</div>
                  <div className="font-bold font-display text-5xl md:text-6xl group-hover:underline">
                    {next.title}
                  </div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </div>
          </section>
        </div>

        {/* Project Nav Rail */}
        <div className="max-w-[var(--content-max-width)] mx-auto content-inset mt-8">
          <ProjectNavRail currentSlug={slug} />
        </div>
      </main>
    </div>
  );
}
