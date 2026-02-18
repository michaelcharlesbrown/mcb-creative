import MediaBlock from "./MediaBlock";

interface TwoColumnBlockProps {
  imageLeft?: { alt?: string; asset?: { url: string } };
  videoFileLeftUrl?: string;
  imageRight?: { alt?: string; asset?: { url: string } };
  videoFileRightUrl?: string;
  titleFallback?: string;
}

export default function TwoColumnBlock({
  imageLeft,
  videoFileLeftUrl,
  imageRight,
  videoFileRightUrl,
  titleFallback = "",
}: TwoColumnBlockProps) {
  const hasLeft = imageLeft?.asset?.url || videoFileLeftUrl;
  const hasRight = imageRight?.asset?.url || videoFileRightUrl;
  if (!hasLeft && !hasRight) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[8px] w-full">
        {(imageLeft?.asset?.url || videoFileLeftUrl) && (
          <MediaBlock
            image={imageLeft}
            videoUrl={videoFileLeftUrl}
            aspectRatio="1"
            sizes="50vw"
            altFallback={`${titleFallback} - left`}
          />
        )}
        {(imageRight?.asset?.url || videoFileRightUrl) && (
          <MediaBlock
            image={imageRight}
            videoUrl={videoFileRightUrl}
            aspectRatio="1"
            sizes="50vw"
            altFallback={`${titleFallback} - right`}
          />
        )}
      </div>
  );
}
