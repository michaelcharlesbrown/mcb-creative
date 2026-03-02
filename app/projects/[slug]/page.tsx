import { sanityFetch } from "@/lib/sanity.fetch";
import { projectBySlugQuery, projectsGridQuery } from "@/lib/sanity.queries";
import BlockRenderer, { type PageContentBlock } from "@/components/blocks/BlockRenderer";
import MediaBlock from "@/components/blocks/MediaBlock";
import ProjectNavRail, { type NavRailProject } from "@/components/ProjectNavRail";
import ProjectNavLinks from "@/components/ProjectNavLinks";
import { projects as hardcodedProjects } from "@/data/projects";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export type SanityProject = {
  title: string;
  slug: string;
  accentColor?: string;
  heroImage?: { alt?: string; asset?: { url: string } };
  heroVideoFileUrl?: string;
  pageContent?: PageContentBlock[];
};

type SanityGridProject = {
  slug: string;
  title: string;
  accentColor?: string;
  thumbnail?: string;
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

  const sanityGridProjects = await sanityFetch<SanityGridProject[]>(projectsGridQuery).catch(() => []);
  const sanityBySlug = Object.fromEntries(sanityGridProjects.map((p) => [p.slug, p]));
  const navRailProjects: NavRailProject[] = hardcodedProjects.map((p) => {
    const sanity = sanityBySlug[p.slug];
    return {
      slug: p.slug,
      title: sanity?.title ?? p.title,
      accentColor: sanity?.accentColor ?? p.accentColor,
      heroImage: sanity?.thumbnail ?? p.heroImage ?? `/images/projects/${p.slug}/01-full.jpg`,
    };
  });

  return (
    <div className="min-h-screen bg-background text-black">
      <main>
        {/* Hero image: full screen, full bleed */}
        {sanityProject.heroImage && (
          <div
            className="relative w-full h-screen overflow-hidden [&>*]:size-full"
          >
            <MediaBlock
              image={sanityProject.heroImage}
              altFallback={sanityProject.title}
              imagePreset="cover"
              fill
              sizes="100vw"
              priority
            />
          </div>
        )}

        <div className="max-w-[var(--content-max-width)] mx-auto content-inset pt-16 pb-16">
          <div className="flex flex-col gap-[8px]">
            {!hasBlocks && !sanityProject.heroImage && (
              <section>
                <h1 className="text-5xl font-normal uppercase">{sanityProject.title}</h1>
              </section>
            )}
            {pageContent.map((block, index) => (
              <BlockRenderer
                key={index}
                block={block}
                index={index}
                titleFallback={sanityProject.title}
                heroVideoFileUrl={sanityProject.heroVideoFileUrl}
              />
            ))}
          </div>

          {/* Next/Previous Navigation */}
          <ProjectNavLinks previous={previous} next={next} />
        </div>

        {/* Project Nav Rail */}
        <div className="max-w-[var(--content-max-width)] mx-auto content-inset mt-8 pb-48">
          <ProjectNavRail currentSlug={slug} projects={navRailProjects} />
        </div>
      </main>
    </div>
  );
}
