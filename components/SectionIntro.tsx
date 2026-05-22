interface SectionIntroProps {
  label: string;
  tagline: string;
}

export default function SectionIntro({ label, tagline }: SectionIntroProps) {
  return (
    <section className="section-intro">
      <p className="section-intro__display">{label}</p>
      <h1 className="section-intro__body">{tagline}</h1>
    </section>
  );
}
