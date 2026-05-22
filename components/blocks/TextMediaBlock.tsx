import { PortableText } from "@portabletext/react";
import MediaBlock from "./MediaBlock";

interface TextMediaBlockProps {
  layout?: "left" | "right";
  textAlignment?: "top" | "middle" | "bottom";
  heading?: string;
  body?: unknown;
  image?: { alt?: string; asset?: { url: string } };
  videoFileUrl?: string;
  titleFallback?: string;
}

export default function TextMediaBlock({
  layout = "left",
  textAlignment = "top",
  heading,
  body,
  image,
  videoFileUrl,
  titleFallback = "",
}: TextMediaBlockProps) {
  const hasText = heading || (Array.isArray(body) && body.length > 0);
  const hasMedia = image || videoFileUrl;
  if (!hasText && !hasMedia) return null;

  const justifyClass =
    textAlignment === "middle"
      ? "justify-center"
      : textAlignment === "bottom"
        ? "justify-end"
        : "justify-start";

  const textContent = (
    <div
      className={`flex flex-col ${justifyClass} gap-6 py-20 px-12 max-w-[83.33%] text-left h-full min-h-0`}
    >
      {heading && (
        <h2 className="text-media__heading">
          {heading}
        </h2>
      )}
      {Array.isArray(body) && body.length > 0 ? (
        <div className="flex flex-col gap-4">
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
      imagePreset="twoColumn"
    />
  ) : null;

  const isTextLeft = layout === "left";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[8px] items-stretch">
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
  );
}
