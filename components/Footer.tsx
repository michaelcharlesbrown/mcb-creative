export default function Footer() {
  return (
    <footer className="bg-[#131212] text-[#424242]">
      <div className="max-w-[var(--content-max-width)] mx-auto content-inset py-16 md:py-24">
        <p
          className="font-[var(--font-clash)] font-bold text-[clamp(5rem,14vw,17rem)] leading-[1.23]"
          aria-hidden
        >
          MCB Creative
        </p>
        <p className="mt-8 text-sm opacity-80">© {new Date().getFullYear()} MCB Creative</p>
      </div>
    </footer>
  );
}
