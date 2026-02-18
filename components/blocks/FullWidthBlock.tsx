import MediaBlock from "./MediaBlock";

interface FullWidthBlockProps {
  image?: { alt?: string; asset?: { url: string } };
  videoFileUrl?: string;
  titleFallback?: string;
}

export default function FullWidthBlock({
  image,
  videoFileUrl,
  titleFallback = "",
}: FullWidthBlockProps) {
  const hasMedia = image?.asset?.url || videoFileUrl;
  if (!hasMedia) return null;

  return (
    <section className="mb-16 md:mb-24">
      <div className="flex flex-col gap-[8px]">
        <MediaBlock
          image={image}
          videoUrl={videoFileUrl}
          altFallback={titleFallback}
        />
      </div>
    </section>
  );
}
