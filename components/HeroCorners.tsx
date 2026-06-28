/**
 * Fixed corner overlay — the studio line (top, at the 1/2 grid column), the
 * services line (bottom-left) and the contact email (bottom-right), placed
 * within the content band. Shared by the homepage hero and the info page; the
 * top-left wordmark and top-right nav are the global <Navigation>.
 *
 * Rides the site's mix-blend-difference invert on the homepage (over imagery)
 * and is plain foreground on the info page, where it fades on scroll.
 */
export default function HeroCorners() {
  return (
    <div className="home-hero__corners">
      <div className="hero-corners__grid">
        <p className="home-hero__meta hero-corners__studio">
          <span className="home-hero__meta-seg">Independent</span>{" "}
          <span className="home-hero__meta-seg">Creative Studio of</span>{" "}
          <span className="home-hero__meta-seg">Michael Charles Brown</span>
        </p>

        <p className="home-hero__meta hero-corners__services">
          Branding <span className="triple-slash">///</span> Web{" "}
          <span className="triple-slash">///</span> Social{" "}
          <span className="triple-slash">///</span> Motion
        </p>

        <a
          className="home-hero__meta hero-corners__email"
          href="mailto:hello@mcbcreative.com"
        >
          Hello @ mcbcreative.com
        </a>
      </div>
    </div>
  );
}
