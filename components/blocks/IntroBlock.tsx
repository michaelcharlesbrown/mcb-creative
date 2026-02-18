import { PortableText } from "@portabletext/react";
import MediaBlock from "./MediaBlock";

interface IntroBlockProps {
  headline?: string;
  subheadline?: string;
  scope?: string[];
  team?: string[];
  description?: unknown;
  heroImage?: { alt?: string; asset?: { url: string } };
  heroVideoFileUrl?: string;
  titleFallback?: string;
}

export default function IntroBlock({
  headline,
  subheadline,
  scope,
  team,
  description,
  heroImage,
  heroVideoFileUrl,
  titleFallback = "",
}: IntroBlockProps) {
  const hasScopeOrTeam = (scope?.length ?? 0) > 0 || (team?.length ?? 0) > 0;
  const hasDescription = Array.isArray(description) && description.length > 0;
  const hasMedia = heroImage?.asset?.url || heroVideoFileUrl;

  return (
    <section className="project-hero pt-24 md:pt-32 lg:pt-40 mb-16 md:mb-24">
      <div className="mb-20 md:mb-24">
        {headline && (
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {headline}
          </h1>
        )}
        {subheadline && (
          <p className="text-xl text-gray-700 mb-6">{subheadline}</p>
        )}
      </div>

      {(hasScopeOrTeam || hasDescription) && (
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-24 gap-y-10 items-start">
          {hasScopeOrTeam && (
            <div className="lg:col-span-6">
              {scope && scope.length > 0 && (
                <div className="mb-10">
                  <h3 className="project-hero__label mb-4">SCOPE</h3>
                  <ul className="space-y-2 list-none pl-0 m-0">
                    {scope.map((item, i) => (
                      <li key={i} className="project-hero__body">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {team && team.length > 0 && (
                <div>
                  <h3 className="project-hero__label mb-4">TEAM</h3>
                  <ul className="space-y-2 list-none pl-0 m-0">
                    {team.map((item, i) => (
                      <li key={i} className="project-hero__body">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {hasDescription && description && (
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="project-hero__body space-y-4">
                <PortableText value={Array.isArray(description) ? description : []} />
              </div>
            </div>
          )}
        </div>
      )}

      {hasMedia && (
        <div className="mt-12">
          <MediaBlock
            image={heroImage}
            videoUrl={heroVideoFileUrl}
            altFallback={headline ?? titleFallback}
          />
        </div>
      )}
    </section>
  );
}
