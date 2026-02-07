import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, getAdjacentProjects } from "@/data/projects";
import ProjectNavRail from "@/components/ProjectNavRail";

export async function generateStaticParams() {
  try {
    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch (error) {
    return [];
  }
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
    <div className="min-h-screen bg-white text-black">
      <main className="max-w-[2400px] mx-auto px-8 py-16">
        {/* Project Header Section */}
        <section className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-6 text-gray-700">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-600">
            <span>{project.client}</span>
            <span>•</span>
            <span>{project.year}</span>
            <span>•</span>
            <span>{project.services.join(", ")}</span>
          </div>
        </section>

        {/* Project Media */}
        <section className="mb-16 md:mb-24">
          {project.slug === 'bittorrent' ? (
            <div className="flex flex-col gap-4 md:gap-6">
              {/* First Full-Width Image */}
              <div className="w-full">
                <div className="relative w-full" style={{ aspectRatio: '1400/787.5' }}>
                  <Image
                    src="/images/projects/bittorrent/01-full.jpg"
                    alt={`${project.title} - Hero`}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Second Full-Width Image */}
              <div className="w-full">
                <div className="relative w-full" style={{ aspectRatio: '1400/787.5' }}>
                  <Image
                    src="/images/projects/bittorrent/02-full.png"
                    alt={`${project.title} - Content`}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Two Square Images Side-by-Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                <div className="relative w-full aspect-square">
                  <Image
                    src="/images/projects/bittorrent/03-two-a.png"
                    alt={`${project.title} - Left`}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative w-full aspect-square">
                  <Image
                    src="/images/projects/bittorrent/04-two-b.png"
                    alt={`${project.title} - Right`}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ) : project.media.length === 0 ? (
            <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-lg">
              <p className="text-gray-500 text-lg">Project content coming soon</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 md:gap-6">
              {project.media.map((row, rowIndex) => {
                if (row.layout === 'full') {
                  const item = row.items[0];
                  return (
                    <div key={rowIndex} className="w-full">
                      <div className="relative w-full aspect-video">
                        {item.type === 'image' ? (
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
                    <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                      {row.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="relative w-full aspect-square">
                          {item.type === 'image' ? (
                            <Image
                              src={item.src}
                              alt={item.alt || `${project.title} - ${rowIndex + 1}-${itemIndex + 1}`}
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
        </section>

        {/* Next/Previous Navigation */}
        <section className="mb-16 md:mb-24">
          <div className="flex justify-between items-center gap-8">
            {previous ? (
              <Link
                href={`/projects/${previous.slug}`}
                className="flex-1 group"
              >
                <div className="text-sm text-gray-500 mb-2">Previous Project</div>
                <div className="text-lg md:text-xl font-bold group-hover:underline">
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
                <div className="text-sm text-gray-500 mb-2">Next Project</div>
                <div className="text-lg md:text-xl font-bold group-hover:underline">
                  {next.title}
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </section>

        {/* Project Nav Rail */}
        <section className="mb-8">
          <div style={{ height: '80vh' }}>
            <ProjectNavRail currentSlug={slug} />
          </div>
        </section>
      </main>
    </div>
  );
}
