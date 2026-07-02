import type { ReactNode } from "react";

interface IntroBlockProps {
  /** Small eyebrow above the headline — the project name */
  eyebrow?: string;
  /** Page H1 — the project tagline */
  headline?: string;
  scope?: string[];
  team?: string[];
  description?: unknown;
  titleFallback?: string;
  /** Contained landscape hero, rendered between the header and the info section */
  cover?: ReactNode;
}

interface PortableSpan {
  text?: string;
}

interface PortableBlock {
  children?: PortableSpan[];
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === "string"
  );
}

/**
 * Normalise a description into discrete paragraphs so they distribute across
 * the two copy columns. Accepts a plain string array (static data) or Portable
 * Text blocks (Sanity), where a single block may hold multiple paragraphs
 * separated by blank lines.
 */
function toParagraphs(description: unknown): string[] {
  if (isStringArray(description)) {
    return description.map((p) => p.trim()).filter(Boolean);
  }
  if (Array.isArray(description)) {
    return (description as PortableBlock[])
      .flatMap((block) =>
        (block?.children ?? []).map((child) => child?.text ?? "").join("")
      )
      .flatMap((text) => text.split(/\n{2,}/))
      .map((p) => p.trim())
      .filter(Boolean);
  }
  return [];
}

function splitParagraphs(paragraphs: string[]): [string[], string[]] {
  const mid = Math.ceil(paragraphs.length / 2);
  return [paragraphs.slice(0, mid), paragraphs.slice(mid)];
}

export default function IntroBlock({
  eyebrow,
  headline,
  scope,
  team,
  description,
  titleFallback = "",
  cover,
}: IntroBlockProps) {
  const title = headline ?? titleFallback;
  const hasScope = (scope?.length ?? 0) > 0;
  const hasTeam = (team?.length ?? 0) > 0;
  const paragraphs = toParagraphs(description);
  const [copyLeft, copyRight] = splitParagraphs(paragraphs);
  const hasMetaContent = hasScope || hasTeam;
  const hasInfoContent = hasMetaContent || paragraphs.length > 0;

  return (
    <section className="project-intro" aria-labelledby="project-intro-title">
      <header className="project-intro__header max-w-[var(--content-max-width)] mx-auto content-inset">
        {eyebrow && <p className="label">{eyebrow}</p>}
        {title && (
          <h1 id="project-intro-title" className="project-intro__headline">
            {title}
          </h1>
        )}
      </header>

      {cover && (
        <div className="project-intro__cover max-w-[var(--content-max-width)] mx-auto content-inset">
          {cover}
        </div>
      )}

      {hasInfoContent && (
        <div className="project-intro__info max-w-[var(--content-max-width)] mx-auto content-inset">
          <div className="project-info__grid">
            {hasMetaContent && (
              <div className="project-info__meta-col">
                {hasScope && (
                  <div className="project-info__section-group">
                    <p className="project-info__section-title">SCOPE</p>
                    <ul className="project-info__list">
                      {scope!.map((item, i) => (
                        <li key={i}>→ {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {hasTeam && (
                  <div className="project-info__section-group">
                    <p className="project-info__section-title">TEAM</p>
                    <ul className="project-info__list">
                      {team!.map((item, i) => (
                        <li key={i}>→ {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {copyLeft.length > 0 && (
              <div className="project-info__copy-col">
                {copyLeft.map((para) => (
                  <p key={para} className="project-info__body">
                    {para}
                  </p>
                ))}
              </div>
            )}
            {copyRight.length > 0 && (
              <div className="project-info__copy-col">
                {copyRight.map((para) => (
                  <p key={para} className="project-info__body">
                    {para}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
