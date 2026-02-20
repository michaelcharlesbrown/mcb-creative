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
  const hasMedia = image || videoFileUrl;
  if (!hasMedia) return null;

  return (
    <MediaBlock
      image={image}
      videoUrl={videoFileUrl}
      altFallback={titleFallback}
    />
  );
}
