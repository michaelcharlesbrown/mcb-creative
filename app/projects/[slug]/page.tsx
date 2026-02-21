import Link from "next/link";
import { sanityClient } from "@/lib/sanity.client";
import { projectBySlugQuery } from "@/lib/sanity.queries";
import BlockRenderer, { type PageContentBlock } from "@/components/blocks/BlockRenderer";
import MediaBlock from "@/components/blocks/MediaBlock";
import ProjectNavRail from "@/components/ProjectNavRail";

export async function generateStaticParams() {
  const result = await sanityClient.fetch<{ slug: string }[]>(
    `*[_type == "project"]{ "slug": slug.current }`
  );
  const slugs = (result ?? []).map((r) => r.slug).filter(Boolean);
  return slugs.map((slug) => ({ slug }));
}

export type SanityProject = {
  title: string;
  slug: string;
  coverImage?: { alt?: string; asset?: { url: string } };
  pageContent?: PageContentBlock[];
};

async function getAdjacentProjectsFromSanity(slug: string) {
  const projectList = await sanityClient.fetch<{ slug: string; title: string }[]>(
    `*[_type=="project" && defined(slug.current)]|order(_createdAt asc){ "slug": slug.current, title }`
  );
  const currentIndex = projectList.findIndex((p) => p.slug === slug);
  const previous =
    currentIndex > 0 ? projectList[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < projectList.length - 1
      ? projectList[currentIndex + 1]
      : null;
  return { previous, next };
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const sanityProject = await sanityClient
    .fetch<SanityProject>(projectBySlugQuery, { slug })
    .catch(() => null);

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
      <main className="pt-[var(--nav-height)] pb-16">
        <div className="max-w-[var(--content-max-width)] mx-auto content-inset">
          <div className="flex flex-col gap-[8px]">
            {!hasBlocks && (
              <section>
                <h1 className="text-5xl font-bold">{sanityProject.title}</h1>
              </section>
            )}
            {sanityProject.coverImage && (
              <MediaBlock
                image={sanityProject.coverImage}
                altFallback={sanityProject.title}
                imagePreset="cover"
              />
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
          <section className="mt-16 mb-16 md:mb-24">
            <div className="flex justify-between items-center gap-8">
              {previous ? (
                <Link href={`/projects/${previous.slug}`} className="flex-1 group">
                  <div className="text-gray-500 mb-2">Previous Project</div>
                  <div className="font-bold font-display text-5xl md:text-6xl">{previous.title}</div>
                </Link>
              ) : <div className="flex-1" />}
              {next ? (
                <Link href={`/projects/${next.slug}`} className="flex-1 text-right group">
                  <div className="text-gray-500 mb-2">Next Project</div>
                  <div className="font-bold font-display text-5xl md:text-6xl">{next.title}</div>
                </Link>
              ) : <div className="flex-1" />}
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
