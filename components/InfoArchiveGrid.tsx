import Image from "next/image";
import { INFO_ARCHIVE_IMAGES } from "@/lib/infoArchive";

/**
 * Info page image archive — CSS multi-column masonry below the intro copy.
 * Images flow at their natural aspect ratio for a ragged editorial rhythm.
 */
export default function InfoArchiveGrid() {
  return (
    <div className="info-archive">
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
