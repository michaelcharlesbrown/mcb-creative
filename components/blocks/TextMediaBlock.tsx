import { PortableText } from "@portabletext/react";
import MediaBlock from "./MediaBlock";

interface TextMediaBlockProps {
  layout?: "left" | "right";
  heading?: string;
  body?: unknown;
  image?: { alt?: string; asset?: { url: string } };
  videoFileUrl?: string;
  titleFallback?: string;
}

export default function TextMediaBlock({
  layout = "left",
  heading,
  body,
  image,
  videoFileUrl,
  titleFallback = "",
}: TextMediaBlockProps) {
  const hasText = heading || (Array.isArray(body) && body.length > 0);
  const hasMedia = image?.asset?.url || videoFileUrl;
  if (!hasText && !hasMedia) return null;

  const textContent = (
    <div className="space-y-4">
      {heading && (
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{heading}</h2>
      )}
      {Array.isArray(body) && body.length > 0 ? (
        <div className="project-hero__body">
          <PortableText value={body} />
        </div>
      ) : null}
    </div>
  );

  const mediaContent = hasMedia ? (
    <MediaBlock
      image={image}
      videoUrl={videoFileUrl}
      aspectRatio="1"
      sizes="50vw"
      altFallback={heading ?? titleFallback}
    />
  ) : null;

  const isTextLeft = layout === "left";

  return (
    <section className="mb-16 md:mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {isTextLeft ? (
          <>
            <div>{textContent}</div>
            <div>{mediaContent}</div>
          </>
        ) : (
          <>
            <div className="md:order-2">{textContent}</div>
            <div className="md:order-1">{mediaContent}</div>
          </>
        )}
      </div>
    </section>
  );
}
