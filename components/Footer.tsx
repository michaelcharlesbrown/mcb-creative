export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--dark-background)' }} className="w-full">
      {/* Frame wrapper */}
      <div className="max-w-[var(--content-max-width)] mx-auto">
        <div
          className="relative w-full min-h-screen overflow-hidden flex flex-col"
          style={{ backgroundColor: 'var(--dark-background)' }}
        >
          {/* Upper content — CTA block, vertically centered above wordmark */}
          <div className="relative z-10 flex-1 flex items-center">
            <div className="col-2 w-full content-inset py-10">
              <div>
                <h2 className="footer__cta-headline">
                  Let&apos;s work<br />
                  together.
                </h2>
              </div>

              <div className="flex flex-col justify-center gap-8">
                <p className="footer__cta-body">
                  Got A Project In Mind?<br />
                  I&apos;d Love To Hear About It.<br />
                  Get In Touch.
                </p>
                <div className="flex flex-col gap-2">
                  <a href="mailto:hello@mcbcreative.design" className="footer__cta-link">
                    <span className="flip-link">
                      <span className="flip-link__inner" data-text="hello@mcbcreative.design">
                        hello@mcbcreative.design
                      </span>
                    </span>
                    <img
                      src="/images/arrow-light.svg"
                      alt=""
                      className="footer__cta-arrow"
                      width={30}
                      height={30}
                      decoding="async"
                      loading="lazy"
                      aria-hidden
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/michaelcharlesbrown/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__cta-link"
                  >
                    <span className="flip-link">
                      <span className="flip-link__inner" data-text="LinkedIn">LinkedIn</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Wordmark — full width matches nav + body (content-inset inside max-width) */}
          <div className="overflow-hidden flex items-end w-full content-inset box-border mt-auto">
            <img
              src="/images/mcb-creative-light.svg"
              alt="MCB Creative"
              width="100%"
              height="auto"
              loading="lazy"
              className="footer__wordmark"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
