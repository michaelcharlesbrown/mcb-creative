import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity.fetch";
import {
  allProjectSlugsQuery,
  projectBySlugQuery,
  workPageProjectsQuery,
} from "@/lib/sanity.queries";
import { resolveProjectImages } from "@/lib/resolveProjectImages";
import { portableTextToPlainText, truncateAtWord } from "@/lib/portableTextToPlainText";
import { pageMetadata } from "@/lib/siteConfig";
import { OG_IMAGE_DIMENSIONS, getOgImageUrl } from "@/lib/sanityImage";
import BlockRenderer, { type PageContentBlock } from "@/components/blocks/BlockRenderer";
import MediaBlock from "@/components/blocks/MediaBlock";
import IntroBlock from "@/components/blocks/IntroBlock";
import ProjectNavRail, { type NavRailProject } from "@/components/ProjectNavRail";
import ProjectNavLinks from "@/components/ProjectNavLinks";
import SetAccentColor from "@/components/SetAccentColor";

// ISR: cache each project page and refresh it from Sanity at most every 60s,
// so published edits go live without a redeploy. Replaces the previous
// force-dynamic setup (which re-rendered on every request and skipped caching
// entirely). Keep in sync with SANITY_REVALIDATE_SECONDS in
// lib/sanity.fetch.ts (must be a literal).
export const revalidate = 60;

// Prebuild every published case study at deploy time; ISR keeps them fresh.
// Slugs added after a deploy are still rendered on first request.
export async function generateStaticParams() {
  const slugs =
    (await sanityFetch<(string | null)[] | null>(allProjectSlugsQuery).catch(() => [])) ?? [];
  return slugs
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

/**
 * A Sanity image as this page's query projects it: the dereferenced asset URL
 * plus the alt text and the editor's hotspot/crop, so the CDN can crop around
 * the chosen focal point rather than the geometric center.
 */
type SanityImageWithAlt = {
  alt?: string;
  asset?: { url: string };
  hotspot?: { x: number; y: number; width: number; height: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type SanityProject = {
  title: string;
  slug: string;
  year?: string;
  accentColor?: string;
  heroImage?: SanityImageWithAlt;
  heroVideoFileUrl?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImageWithAlt;
  };
  pageContent?: PageContentBlock[];
};

const META_DESCRIPTION_LENGTH = 155;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const sanityProject = await sanityFetch<SanityProject | null>(
    projectBySlugQuery,
    { slug }
  ).catch(() => null);

  if (!sanityProject) return {};

  const title = sanityProject.seo?.metaTitle || `${sanityProject.title} — MCB Creative`;

  const introBlock = (sanityProject.pageContent ?? []).find(
    (block) => block._type === "introBlock"
  );
  const bodyPlainText = portableTextToPlainText(introBlock?.description);
  const description =
    sanityProject.seo?.metaDescription ||
    (bodyPlainText ? truncateAtWord(bodyPlainText, META_DESCRIPTION_LENGTH) : undefined);

  // Share-card precedence: a card purpose-built in the Studio, else the hero
  // cropped to 1.91:1, else (no imagery at all) the studio-wide card.
  const shareImage = sanityProject.seo?.ogImage ?? sanityProject.heroImage;
  const shareImageUrl = getOgImageUrl(shareImage);
  const image = shareImageUrl
    ? {
        url: shareImageUrl,
        ...OG_IMAGE_DIMENSIONS,
        alt: shareImage?.alt || title,
      }
    : undefined;

  return {
    title,
    description,
    // Without this, the project page would inherit the root layout's canonical
    // and `og:url` and advertise itself as the homepage.
    ...pageMetadata({ path: `/projects/${slug}`, title, description, image }),
  };
}

type SanityGridProject = {
  slug: string;
  title: string;
  accentColor?: string;
  scope?: string[];
  heroImage?: { alt?: string; asset?: { url: string } };
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

  const introEyebrow = introBlock?.headline ?? sanityProject.title;
  const introHeadline = introBlock?.subheadline ?? sanityProject.title;
  const introScope = introBlock?.scope;
  const introYear = sanityProject.year;
  const introTeam = introBlock?.team;
  const introDescription = introBlock?.description;

  const hasHeroMedia = Boolean(sanityProject.heroImage || sanityProject.heroVideoFileUrl);

  // Build the project carousel from the Work Page's curated list — the same
  // set and order as the Work grid — so a project left out of that grid is
  // also left out of the carousel.
  const sanityGridProjects =
    (await sanityFetch<(SanityGridProject | null)[] | null>(workPageProjectsQuery).catch(
      () => []
    )) ?? [];

  const navRailProjects: NavRailProject[] = sanityGridProjects
    .filter((sanity): sanity is SanityGridProject => Boolean(sanity))
    .map((sanity) => {
      const { landscape } = resolveProjectImages({
        slug: sanity.slug,
        heroImage: sanity.heroImage,
      });
      return {
        slug: sanity.slug,
        title: sanity.title,
        accentColor: sanity.accentColor,
        scope: sanity.scope ?? [],
        heroImageLandscape: landscape,
      };
    });

  return (
    <div className="min-h-screen bg-background text-black">
      <SetAccentColor color={sanityProject.accentColor} />
      <main>
        <IntroBlock
          isPageIntro
          eyebrow={introEyebrow}
          headline={introHeadline}
          scope={introScope}
          year={introYear}
          team={introTeam}
          description={introDescription}
          titleFallback={sanityProject.title}
          cover={
            hasHeroMedia ? (
              <div className="project-intro__cover-media">
                <MediaBlock
                  image={sanityProject.heroImage}
                  videoUrl={sanityProject.heroVideoFileUrl}
                  altFallback={sanityProject.title}
                  sizes="(max-width: 2400px) 100vw, 2256px"
                  fill
                  priority
                  preferVideo
                />
              </div>
            ) : null
          }
        />

        <div className="max-w-[var(--content-max-width)] mx-auto content-inset pt-[var(--flow-section)] pb-[var(--flow-section)]">
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

        <div className="max-w-[var(--content-max-width)] mx-auto content-inset mt-[var(--flow-block)] pb-[var(--page-bottom)]">
          <ProjectNavRail currentSlug={slug} projects={navRailProjects} />
        </div>
      </main>
    </div>
  );
}
