import IntroBlock from "./IntroBlock";
import FullWidthBlock from "./FullWidthBlock";
import TwoColumnBlock from "./TwoColumnBlock";
import TextMediaBlock from "./TextMediaBlock";

export interface PageContentBlock {
  _type: string;
  headline?: string;
  subheadline?: string;
  scope?: string[];
  team?: string[];
  description?: unknown;
  heroImage?: { alt?: string; asset?: { url: string } };
  heroVideoFileUrl?: string;
  image?: { alt?: string; asset?: { url: string } };
  videoFileUrl?: string;
  imageLeft?: { alt?: string; asset?: { url: string } };
  videoFileLeftUrl?: string;
  imageRight?: { alt?: string; asset?: { url: string } };
  videoFileRightUrl?: string;
  layout?: "left" | "right";
  textAlignment?: "top" | "middle" | "bottom";
  heading?: string;
  body?: unknown;
}

interface BlockRendererProps {
  block: PageContentBlock;
  index: number;
  titleFallback?: string;
}

export default function BlockRenderer({
  block,
  index,
  titleFallback = "",
}: BlockRendererProps) {
  switch (block._type) {
    case "introBlock":
      return (
        <IntroBlock
          key={index}
          headline={block.headline}
          subheadline={block.subheadline}
          scope={block.scope}
          team={block.team}
          description={block.description}
          heroImage={block.heroImage}
          heroVideoFileUrl={block.heroVideoFileUrl}
          titleFallback={titleFallback}
        />
      );
    case "fullWidthBlock":
      return (
        <FullWidthBlock
          key={index}
          image={block.image}
          videoFileUrl={block.videoFileUrl}
          titleFallback={titleFallback}
        />
      );
    case "twoColumnBlock":
      return (
        <TwoColumnBlock
          key={index}
          imageLeft={block.imageLeft}
          videoFileLeftUrl={block.videoFileLeftUrl}
          imageRight={block.imageRight}
          videoFileRightUrl={block.videoFileRightUrl}
          titleFallback={titleFallback}
        />
      );
    case "textMediaBlock":
      return (
        <TextMediaBlock
          key={index}
          layout={block.layout}
          textAlignment={block.textAlignment}
          heading={block.heading}
          body={block.body}
          image={block.image}
          videoFileUrl={block.videoFileUrl}
          titleFallback={titleFallback}
        />
      );
    default:
      return null;
  }
}
