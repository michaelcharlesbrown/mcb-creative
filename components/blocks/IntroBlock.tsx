import { PortableText, type PortableTextComponents } from "@portabletext/react";

interface IntroBlockProps {
  headline?: string;
  subheadline?: string;
  scope?: string[];
  team?: string[];
  description?: unknown;
  titleFallback?: string;
  coverAbove?: boolean;
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
  coverAbove = false,
}: IntroBlockProps) {
  const title = headline ?? titleFallback;
  const hasScope = (scope?.length ?? 0) > 0;
  const hasTeam = (team?.length ?? 0) > 0;
  const hasDescriptionBlocks = Array.isArray(description) && description.length > 0;
  const hasSubheadline = Boolean(subheadline);
  const hasRightContent = hasSubheadline || hasDescriptionBlocks || hasScope || hasTeam;

  return (
    <section className={`project-hero${coverAbove ? " project-hero--cover-above" : ""}`} aria-labelledby="project-hero-title">
      <div className={`project-hero__inner max-w-[var(--content-max-width)] mx-auto content-inset${coverAbove ? " project-hero__inner--cover-above" : ""}`}>
        <div className="col-2 project-hero__grid">

          {/* Left: project title only */}
          <div className="project-hero__left-col">
            {title && (
              <h1 id="project-hero-title" className="project-hero__title">
                {title}
              </h1>
            )}
          </div>

          {/* Right: tagline (as lead paragraph), description, scope, team */}
          {hasRightContent && (
            <div className="project-hero__right-col">
              {hasSubheadline && (
                <p className="project-hero__lead">{subheadline}</p>
              )}
              {hasDescriptionBlocks && description && (
                isStringArray(description) ? (
                  description.map((para, i) => (
                    <p key={i} className="project-hero__body">{para}</p>
                  ))
                ) : (
                  <div className="project-hero__richtext">
                    <PortableText
                      value={description as never}
                      components={portableComponents}
                    />
                  </div>
                )
              )}
              {hasScope && (
                <div className="project-hero__section-group">
                  <p className="label">SCOPE</p>
                  <ul className="project-hero__list">
                    {scope!.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {hasTeam && (
                <div className="project-hero__section-group">
                  <p className="label">TEAM</p>
                  <ul className="project-hero__list">
                    {team!.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
