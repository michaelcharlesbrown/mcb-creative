import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="bg-white text-black border-b border-black">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-medium">
          MCB
        </Link>
        <div className="flex gap-6">
          <Link href="/work" className="hover:underline">
            Work
          </Link>
          <Link href="/info" className="hover:underline">
            Info
          </Link>
        </div>
      </div>
    </nav>
  );
}
