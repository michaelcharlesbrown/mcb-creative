import Image from "next/image";
import { INFO_ARCHIVE_IMAGES } from "@/lib/infoArchive";

/**
 * The archive masonry that scrolls up behind the pinned info typography.
 * Two-column CSS multi-column layout (one column on mobile); images flow at
 * their natural aspect ratio for a ragged, homepage-set rhythm. Purely
 * presentational — the pin/invert behaviour is CSS on the parent page.
 */
export default function InfoArchiveGrid() {
  return (
    <div className="info-archive" aria-hidden="true">
      <div className="info-archive__grid">
        {INFO_ARCHIVE_IMAGES.map((img) => (
          <figure key={img.src} className="info-archive__item">
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(max-width: 767px) 100vw, 50vw"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
