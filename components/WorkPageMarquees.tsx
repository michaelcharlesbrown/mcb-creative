const BOOKING_SEGMENT =
  "Currently booking projects for Spring / Summer 2026 /// ";
const SERVICES_SEGMENT =
  "Brand identity /// Interactive web design /// Motion /// Album covers /// Social media /// ";

function repeatSegment(segment: string, times: number): string {
  /* Do not trim — trailing space after /// must remain so duplicate spans don’t read as ///BRAND at the seam */
  return segment.repeat(times);
}

/** Matched total width (mono ≈ char count) so both rows move at the same px/s at a shared duration */
const BOOKING_REPEAT_TIMES = 13;
const SERVICES_REPEAT_TIMES = 8;

export default function WorkPageMarquees() {
  const bookingLine = repeatSegment(BOOKING_SEGMENT, BOOKING_REPEAT_TIMES);
  const servicesLine = repeatSegment(SERVICES_SEGMENT, SERVICES_REPEAT_TIMES);

  return (
    <section className="work-page-marquees" aria-label="Availability and services">
      <div className="work-page-marquee work-page-marquee--dark">
        <div className="work-page-marquee__track">
          <span className="work-page-marquee__chunk">{bookingLine}</span>
          <span className="work-page-marquee__chunk" aria-hidden="true">
            {bookingLine}
          </span>
        </div>
      </div>
      <div className="work-page-marquee work-page-marquee--light">
        <div className="work-page-marquee__track">
          <span className="work-page-marquee__chunk">{servicesLine}</span>
          <span className="work-page-marquee__chunk" aria-hidden="true">
            {servicesLine}
          </span>
        </div>
      </div>
    </section>
  );
}
