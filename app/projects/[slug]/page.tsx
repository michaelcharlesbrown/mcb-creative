import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, getAdjacentProjects } from "@/data/projects";
import ProjectNavRail from "@/components/ProjectNavRail";
import { getProjectImages, groupProjectImages } from "@/lib/projectImages";

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

  // Get images using the naming convention (XX-full, XX-a, XX-b)
  const projectImages = getProjectImages(slug);
  const imageRows = projectImages.length > 0 
    ? groupProjectImages(projectImages)
    : project.media;

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="max-w-[var(--content-max-width)] mx-auto content-inset pt-[var(--nav-height)] pb-16">
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
          {imageRows.length === 0 ? (
            <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-lg">
              <p className="text-gray-500 text-lg">Project content coming soon</p>
            </div>
          ) : (
            <div className="flex flex-col gap-[8px]">
              {imageRows.map((row, rowIndex) => {
                if (row.layout === 'full') {
                  const item = row.items[0];
                  return (
                    <div key={rowIndex} className="w-full">
                      <div className="relative w-full overflow-hidden rounded-[4px]" style={{ aspectRatio: '1400/787.5' }}>
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
                    <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 gap-[8px] w-full">
                      {row.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="relative w-full aspect-square overflow-hidden rounded-[4px]">
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
