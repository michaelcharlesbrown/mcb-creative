import { sanityFetch } from "@/lib/sanity.fetch";
import { projectBySlugQuery, workPageProjectsQuery } from "@/lib/sanity.queries";
import { resolveProjectImages } from "@/lib/resolveProjectImages";
import BlockRenderer, { type PageContentBlock } from "@/components/blocks/BlockRenderer";
import MediaBlock from "@/components/blocks/MediaBlock";
import IntroBlock from "@/components/blocks/IntroBlock";
import ProjectNavRail, { type NavRailProject } from "@/components/ProjectNavRail";
import ProjectNavLinks from "@/components/ProjectNavLinks";
import SetAccentColor from "@/components/SetAccentColor";
import { projects as hardcodedProjects } from "@/data/projects";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export type SanityProject = {
  title: string;
  slug: string;
  accentColor?: string;
  heroImage?: { alt?: string; asset?: { url: string } };
  thumbnail?: { alt?: string; asset?: { url: string } };
  heroVideoFileUrl?: string;
  pageContent?: PageContentBlock[];
};

type SanityGridProject = {
  slug: string;
  title: string;
  accentColor?: string;
  scope?: string[];
  heroImage?: { alt?: string; asset?: { url: string } };
  thumbnail?: { alt?: string; asset?: { url: string } };
};

/**
 * Previous/next are computed over the Work Page's curated, ordered project
 * list — the same set and order shown in the Work grid — so a project left
 * out of that grid is also left out of site-wide navigation, reachable only
 * by its direct URL.
 */
async function getAdjacentProjectsFromSanity(slug: string) {
  const projectList =
    (await sanityFetch<({ slug: string; title: string; accentColor?: string } | null)[] | null>(
      workPageProjectsQuery
    ).catch(() => [])) ?? [];
  const filteredList = projectList.filter((p): p is { slug: string; title: string; accentColor?: string } => Boolean(p));
  const currentIndex = filteredList.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) return { previous: null, next: null };

  const len = filteredList.length;
  const previousIndex = currentIndex === 0 ? len - 1 : currentIndex - 1;
  const nextIndex = currentIndex === len - 1 ? 0 : currentIndex + 1;

  return {
    previous: filteredList[previousIndex] ?? null,
    next: filteredList[nextIndex] ?? null,
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
  const introBlock = pageContent.find((b) => b._type === "introBlock");
  const restBlocks = pageContent.filter((b) => b._type !== "introBlock");
  const hasRestBlocks = restBlocks.length > 0;

  const hardcoded = hardcodedProjects.find((p) => p.slug === slug);

  const introEyebrow = introBlock?.headline ?? sanityProject.title;
  const introHeadline = introBlock?.subheadline ?? hardcoded?.heroTagline ?? sanityProject.title;
  const introScope = introBlock?.scope ?? hardcoded?.scope;
  const introTeam = introBlock?.team ?? hardcoded?.team;
  const introDescription = introBlock?.description ?? hardcoded?.description;

  const hasHeroMedia = Boolean(sanityProject.heroImage || sanityProject.heroVideoFileUrl);

  // Build the project carousel from the Work Page's curated list — the same
  // set and order as the Work grid — so a project left out of that grid is
  // also left out of the carousel. `hardcodedProjects` only fills in
  // images/services that haven't been set in Sanity yet.
  const sanityGridProjects =
    (await sanityFetch<(SanityGridProject | null)[] | null>(workPageProjectsQuery).catch(
      () => []
    )) ?? [];
  const hardcodedBySlug = Object.fromEntries(hardcodedProjects.map((p) => [p.slug, p]));

  const navRailProjects: NavRailProject[] = sanityGridProjects
    .filter((sanity): sanity is SanityGridProject => Boolean(sanity))
    .map((sanity) => {
      const stat = hardcodedBySlug[sanity.slug];
      const { portrait } = resolveProjectImages(
        { slug: sanity.slug, heroImage: sanity.heroImage, thumbnail: sanity.thumbnail },
        stat ? { slug: stat.slug, heroImage: stat.heroImage, thumbnail: stat.thumbnail } : null,
      );
      return {
        slug: sanity.slug,
        title: sanity.title,
        accentColor: sanity.accentColor ?? stat?.accentColor,
        scope: sanity.scope ?? stat?.scope ?? stat?.services ?? [],
        heroImagePortrait: portrait,
      };
    });

  return (
    <div className="min-h-screen bg-background text-black">
      <SetAccentColor color={sanityProject.accentColor} />
      <main>
        <IntroBlock
          eyebrow={introEyebrow}
          headline={introHeadline}
          scope={introScope}
          team={introTeam}
          description={introDescription}
          titleFallback={sanityProject.title}
          cover={
            hasHeroMedia ? (
              <div className="project-intro__cover-media">
                <MediaBlock
                  image={sanityProject.heroImage}
                  imageMobile={sanityProject.thumbnail}
                  videoUrl={sanityProject.heroVideoFileUrl}
                  altFallback={sanityProject.title}
                  sizes="(min-width: 768px) 92vw, 100vw"
                  fill
                  priority
                />
              </div>
            ) : null
          }
        />

        <div className="max-w-[var(--content-max-width)] mx-auto content-inset pt-16 pb-16">
          <div className="flex flex-col gap-[var(--gap-grid)]">
            {hasRestBlocks &&
              restBlocks.map((block, index) => (
                <BlockRenderer
                  key={index}
                  block={block}
                  index={index}
                  titleFallback={sanityProject.title}
                />
              ))}
          </div>

          <ProjectNavLinks previous={previous} next={next} />
        </div>

        <div className="max-w-[var(--content-max-width)] mx-auto content-inset mt-8 pb-48">
          <ProjectNavRail currentSlug={slug} projects={navRailProjects} />
        </div>
      </main>
    </div>
  );
}
