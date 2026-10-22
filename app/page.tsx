import { sanityFetch } from "@/lib/sanity.fetch";
import { homeWorkStackQuery, homepageSizzleReelQuery } from "@/lib/sanity.queries";
import HomeLayout from "@/components/HomeLayout";
import type { MediaSlideData } from "@/components/SlideSequence";
import type { WorkStackProject } from "@/components/WorkStack";

// ISR: statically cache this page but refresh it from Sanity at most every
// 60s, so curated homepage changes go live without a redeploy. Keep in sync
// with SANITY_REVALIDATE_SECONDS in lib/sanity.fetch.ts (must be a literal).
export const revalidate = 60;

type SanityStackProject = {
  slug: string;
  title: string;
  image?: { alt?: string; url?: string; width?: number; height?: number } | null;
};

export default async function Home() {
  // The "Work Page" singleton's `projects` array (drag-reordered in the
  // Studio) is the single source of truth for the homepage stack, same as
  // /projects — one list to curate. A project without an image is skipped.
  const sanityProjects =
    (await sanityFetch<(SanityStackProject | null)[] | null>(homeWorkStackQuery).catch(
      () => []
    )) ?? [];

  const sizzleReelSlides =
    (await sanityFetch<MediaSlideData[] | null>(homepageSizzleReelQuery).catch(() => [])) ?? [];

  const projects: WorkStackProject[] = sanityProjects.flatMap((project) => {
    const image = project?.image;
    if (!project || !image?.url || !image.width || !image.height) return [];
    return [
      {
        slug: project.slug,
        title: project.title,
        image: { url: image.url, alt: image.alt, width: image.width, height: image.height },
      },
    ];
  });

  return (
    <div className="home text-black">
      <HomeLayout projects={projects} sizzleReelSlides={sizzleReelSlides} />
    </div>
  );
}
