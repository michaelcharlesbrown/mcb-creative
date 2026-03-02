import { PortableText } from "@portabletext/react";
import MediaBlock from "./MediaBlock";

interface IntroBlockProps {
  headline?: string;
  subheadline?: string;
  scope?: string[];
  team?: string[];
  description?: unknown;
  heroVideoFileUrl?: string;
  titleFallback?: string;
}

export default function IntroBlock({
  headline,
  subheadline,
  scope,
  team,
  description,
  heroVideoFileUrl,
  titleFallback = "",
}: IntroBlockProps) {
  const hasScopeOrTeam = (scope?.length ?? 0) > 0 || (team?.length ?? 0) > 0;
  const hasDescription = Array.isArray(description) && description.length > 0;
  const hasMedia = Boolean(heroVideoFileUrl);

  const hasTwoColumn = hasScopeOrTeam || hasDescription || subheadline;

  return (
    <div className="project-hero flex flex-col">
      {headline && (
        <h1 className="pt-[240px] font-normal text-left text-display-project-h1 uppercase">
          {headline}
        </h1>
      )}

      {hasTwoColumn && (
        <div className="mt-20 max-w-[83.33%] self-start grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-16 items-start justify-items-start text-left">
          {hasScopeOrTeam && (
            <div className="w-full flex flex-col gap-4 justify-self-start">
              {scope && scope.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h3 className="project-hero__label">SCOPE</h3>
                  <ul className="flex flex-col gap-2 list-none pl-0 m-0">
                    {scope.map((item, i) => (
                      <li key={i} className="project-hero__body">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {team && team.length > 0 && (
                <div className="flex flex-col gap-2 mt-8">
                  <h3 className="project-hero__label">TEAM</h3>
                  <ul className="flex flex-col gap-2 list-none pl-0 m-0">
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

          {(subheadline || hasDescription) && (
            <div
              className={`w-full flex flex-col gap-4 justify-self-start ${!hasScopeOrTeam ? "lg:col-span-2" : ""}`}
            >
              {subheadline && (
                <p className="text-heading-sm font-normal text-gray-700 uppercase">{subheadline}</p>
              )}
              {hasDescription && description && (
                <div className="project-hero__body flex flex-col gap-4">
                  <PortableText value={Array.isArray(description) ? description : []} />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {hasTwoColumn && <div className="pb-[180px]" />}

      {hasMedia && (
        <MediaBlock
          videoUrl={heroVideoFileUrl}
          altFallback={headline ?? titleFallback}
          imagePreset="cover"
        />
      )}
    </div>
  );
}
