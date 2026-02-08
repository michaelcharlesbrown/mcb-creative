import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  return (
    <nav className="bg-white text-black">
      <div className="max-w-[2400px] mx-auto px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/mcb-creative-logo.svg"
            alt="MCB Creative"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
        </Link>
        <div className="flex gap-6">
          <Link href="/projects" className="hover:underline">
            Projects
          </Link>
          <Link href="/info" className="hover:underline">
            Info
          </Link>
        </div>
      </div>
    </nav>
  );
}
