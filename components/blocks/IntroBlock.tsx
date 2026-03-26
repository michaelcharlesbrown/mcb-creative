import { PortableText, type PortableTextComponents } from "@portabletext/react";

interface IntroBlockProps {
  headline?: string;
  subheadline?: string;
  scope?: string[];
  team?: string[];
  description?: unknown;
  titleFallback?: string;
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === "string"
  );
}

const portableComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="project-hero__body">{children}</p>,
  },
};

export default function IntroBlock({
  headline,
  subheadline,
  scope,
  team,
  description,
  titleFallback = "",
}: IntroBlockProps) {
  const title = headline ?? titleFallback;
  const hasScope = (scope?.length ?? 0) > 0;
  const hasTeam = (team?.length ?? 0) > 0;
  const hasDescriptionBlocks =
    Array.isArray(description) && description.length > 0;

  const hasRightColumn = Boolean(subheadline) || hasDescriptionBlocks;

  return (
    <section
      className="project-hero"
      aria-labelledby="project-hero-title"
    >
      <div className="project-hero__inner max-w-[var(--content-max-width)] mx-auto content-inset">
        <div
          className={`grid grid-cols-1 gap-x-12 lg:gap-x-16 gap-y-10 lg:gap-y-12 items-start text-left ${
            hasRightColumn ? "lg:grid-cols-2" : ""
          }`}
        >
          <div className="flex flex-col gap-8">
            {title && (
              <h1 id="project-hero-title" className="project-hero__title">
                {title}
              </h1>
            )}
            {hasScope && (
              <div className="flex flex-col gap-4">
                <h2 className="project-hero__label">SCOPE</h2>
                <ul className="flex flex-col list-none pl-0 m-0 gap-2">
                  {scope!.map((item, i) => (
                    <li key={i} className="project-hero__body">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {hasTeam && (
              <div className="flex flex-col gap-4">
                <h2 className="project-hero__label">TEAM</h2>
                <ul className="flex flex-col list-none pl-0 m-0 gap-2">
                  {team!.map((item, i) => (
                    <li key={i} className="project-hero__body">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {hasRightColumn && (
            <div className="flex flex-col gap-4">
              {subheadline && (
                <p className="project-hero__headline">{subheadline}</p>
              )}
              {hasDescriptionBlocks && description && (
                <>
                  {isStringArray(description) ? (
                    description.map((para, i) => (
                      <p key={i} className="project-hero__body">
                        {para}
                      </p>
                    ))
                  ) : (
                    <div className="project-hero__richtext flex flex-col gap-4">
                      <PortableText
                        value={description as never}
                        components={portableComponents}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
