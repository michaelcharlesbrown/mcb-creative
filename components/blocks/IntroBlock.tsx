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
          className={
            hasRightColumn
              ? "project-hero__grid project-hero__grid--split"
              : "project-hero__grid"
          }
        >
          <div className="project-hero__left-col">
            {title && (
              <h1 id="project-hero-title" className="project-hero__title">
                {title}
              </h1>
            )}
            {hasScope && (
              <div className="project-hero__section-group">
                <p className="project-hero__label">SCOPE</p>
                <ul className="project-hero__list">
                  {scope!.map((item, i) => (
                    <li key={i} className="project-hero__body">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {hasTeam && (
              <div className="project-hero__section-group">
                <p className="project-hero__label">TEAM</p>
                <ul className="project-hero__list">
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
            <div className="project-hero__right-col">
              {subheadline && (
                <h2 className="project-hero__headline">{subheadline}</h2>
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
                    <div className="project-hero__richtext">
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
