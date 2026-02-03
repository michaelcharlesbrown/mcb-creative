import ProjectNavRail from "./ProjectNavRail";

export default function ProjectCarousel() {
  return (
    <section className="py-16 md:py-24 overflow-hidden w-full h-[80vh] flex flex-col">
      <h2 className="text-left mb-4 md:mb-6 flex-shrink-0">Featured Work</h2>
      <div className="flex-1 min-h-0">
        <ProjectNavRail />
      </div>
    </section>
  );
}
