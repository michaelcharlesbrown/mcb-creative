import { projects } from "@/data/projects";
import { sanityFetch } from "@/lib/sanity.fetch";
import { projectsGridQuery } from "@/lib/sanity.queries";
import ProjectCard from "@/components/ProjectCard";
import HeroSection from "@/components/HeroSection";
import AboutBlurb from "@/components/AboutBlurb";

type SanityGridProject = {
  slug: string;
  title: string;
  accentColor?: string;
  subheadline?: string;
  scope?: string[];
  thumbnail?: string;
  thumbnailAlt?: string;
};

export default async function Home() {
  const sanityProjects = await sanityFetch<SanityGridProject[]>(projectsGridQuery).catch(() => []);

  const staticBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

  // If Sanity has grid projects configured, use them as the ordered source of truth.
  // Otherwise fall back to the first 6 static projects.
  const mergedProjects = sanityProjects.length > 0
    ? sanityProjects.slice(0, 6).map((sanity) => {
        const staticProject = staticBySlug[sanity.slug];
        return {
          slug: sanity.slug,
          title: sanity.title ?? staticProject?.title ?? '',
          accentColor: sanity.accentColor ?? staticProject?.accentColor ?? '',
          subheadline: sanity.subheadline ?? staticProject?.tagline,
          scope: sanity.scope ?? staticProject?.services ?? [],
          thumbnail: sanity.thumbnail ?? staticProject?.thumbnail ?? '',
          thumbnailAlt: sanity.thumbnailAlt,
        };
      })
    : projects.slice(0, 6).map((project) => ({
        slug: project.slug,
        title: project.title,
        accentColor: project.accentColor,
        subheadline: project.tagline,
        scope: project.services,
        thumbnail: project.thumbnail,
        thumbnailAlt: undefined,
      }));

  return (
    <div className="home min-h-screen bg-background text-black">

      <HeroSection />
      <AboutBlurb />

      <main className="max-w-[var(--content-max-width)] mx-auto">
        {/* Project grid */}
        <section className="content-inset pt-[max(var(--nav-height),4rem)] pb-16 md:pt-[max(var(--nav-height),6rem)] md:pb-24">
          <h2 className="text-left font-bold mb-8 md:mb-12" style={{ fontSize: '20px' }}>Featured Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[8px] gap-y-16 md:gap-y-20">
            {mergedProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </main>

    </div>
  );
}