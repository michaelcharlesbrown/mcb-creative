"use client";

import Image from "next/image";

export default function ProjectHero() {
  return (
    <div className="w-full mb-8">
      <div
        className="relative w-full"
        style={{
          aspectRatio: "16/9",
        }}
      >
        <Image
          src="/images/transition-placeholder.jpg"
          alt="BitTorrent"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
