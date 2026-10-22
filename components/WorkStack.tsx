import Image from "next/image";
import Link from "next/link";
import { getSanityImageUrl } from "@/lib/sanityImage";

export interface WorkStackProject {
  slug: string;
  title: string;
  image: { url: string; alt?: string; width: number; height: number };
}

interface WorkStackProps {
  projects: WorkStackProject[];
}

/**
 * Homepage work: a full-bleed, two-column stack of project images, each at
 * its natural proportions — equal widths, heights wherever the image falls.
 * Image only; the card is the link.
 *
 * Projects alternate between the two columns (1 left, 2 right, 3 left…). On
 * mobile the columns dissolve into one and each card's --stack-order puts
 * them back in curated order, so the single column reads left, right, left.
 */
export default function WorkStack({ projects }: WorkStackProps) {
  const columns = [0, 1].map((column) =>
    projects
      .map((project, index) => ({ project, index }))
      .filter(({ index }) => index % 2 === column)
  );

  return (
    <section className="work-stack" aria-label="Work">
      {columns.map((cards, column) => (
        <div key={column} className="work-stack__column">
          {cards.map(({ project, index }) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="work-stack__card"
              // The order is data, not a design value — it restores curated
              // sequence when the columns collapse to one on mobile.
              style={{ "--stack-order": index } as React.CSSProperties}
            >
              <Image
                src={getSanityImageUrl({ asset: { url: project.image.url } }, "cover")!}
                alt={project.image.alt ?? project.title}
                width={project.image.width}
                height={project.image.height}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="work-stack__img"
              />
            </Link>
          ))}
        </div>
      ))}
    </section>
  );
}
