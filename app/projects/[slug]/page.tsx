import { sanityFetch } from "@/lib/sanity.fetch";
import { projectBySlugQuery } from "@/lib/sanity.queries";
import BlockRenderer, { type PageContentBlock } from "@/components/blocks/BlockRenderer";
import MediaBlock from "@/components/blocks/MediaBlock";
import ProjectNavRail from "@/components/ProjectNavRail";
import ProjectNavLinks from "@/components/ProjectNavLinks";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export type SanityProject = {
  title: string;
  slug: string;
  accentColor?: string;
  coverImage?: { alt?: string; asset?: { url: string } };
  pageContent?: PageContentBlock[];
};

async function getAdjacentProjectsFromSanity(slug: string) {
  const projectList = await sanityFetch<{ slug: string; title: string; accentColor?: string }[]>(
    `*[_type=="project" && defined(slug.current)]|order(_createdAt asc){ "slug": slug.current, title, "accentColor": accentColor.hex }`
  );
  const currentIndex = projectList.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  const len = projectList.length;
  const previousIndex = currentIndex === 0 ? len - 1 : currentIndex - 1;
  const nextIndex = currentIndex === len - 1 ? 0 : currentIndex + 1;

  return {
    previous: projectList[previousIndex] ?? null,
    next: projectList[nextIndex] ?? null,
  };
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const sanityProject = await sanityFetch<SanityProject | null>(
    projectBySlugQuery,
    { slug }
  ).catch(() => null);

  if (!sanityProject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Project coming soon.</p>
      </div>
    );
  }

  const { previous, next } = await getAdjacentProjectsFromSanity(slug);
  const pageContent = sanityProject.pageContent ?? [];
  const hasBlocks = pageContent.length > 0;

  return (
    <div className="min-h-screen bg-background text-black">
      <main>
        {/* Cover image: full screen, full bleed */}
        {sanityProject.coverImage && (
          <div className="relative w-full h-screen overflow-hidden [&>*]:size-full">
            <MediaBlock
              image={sanityProject.coverImage}
              altFallback={sanityProject.title}
              imagePreset="cover"
              fill
              sizes="100vw"
            />
          </div>
        )}

        <div className="max-w-[var(--content-max-width)] mx-auto content-inset pt-16 pb-16">
          <div className="flex flex-col gap-[8px]">
            {!hasBlocks && !sanityProject.coverImage && (
              <section>
                <h1 className="text-5xl font-bold">{sanityProject.title}</h1>
              </section>
            )}
            {pageContent.map((block, index) => (
              <BlockRenderer
                key={index}
                block={block}
                index={index}
                titleFallback={sanityProject.title}
              />
            ))}
          </div>

          {/* Next/Previous Navigation */}
          <ProjectNavLinks previous={previous} next={next} />
        </div>

        {/* Project Nav Rail */}
        <div className="max-w-[var(--content-max-width)] mx-auto content-inset mt-8">
          <ProjectNavRail currentSlug={slug} />
        </div>
      </main>
    </div>
  );
}
