"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { projects } from "@/data/projects";
import { useTransition } from "@/components/TransitionContext";

export default function Home() {
  const router = useRouter();
  const { startTransition } = useTransition();
  const firstCardRef = useRef<HTMLDivElement>(null);

  const handleFirstCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!firstCardRef.current) return;

    const rect = firstCardRef.current.getBoundingClientRect();
    startTransition("/images/transition-placeholder.jpg", rect);

    // Navigate after a tiny delay to ensure overlay is created
    setTimeout(() => {
      router.push("/work/bittorrent");
    }, 10);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="max-w-[2400px] mx-auto">
        {/* Hero Section */}
        <section className="px-8 pt-16 pb-8">
          {/* Headline */}
          <div className="mb-12">
            <p className="text-sm uppercase tracking-wider text-gray-600 mb-4">
              Independent Creative Studio Of
            </p>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
              Michael Charles Brown
            </h1>
          </div>

          {/* Hero Image */}
          <div className="w-full">
            <div className="relative w-full aspect-video">
              <Image
                src="/images/hero-placeholder.jpg"
                alt="Hero"
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Message Section */}
        <section className="px-8 py-24 md:py-32 lg:py-40">
          <div className="grid grid-cols-12 gap-4">
            <p className="col-span-12 md:[grid-column:5/span_4] text-left text-xl md:text-2xl lg:text-3xl">
              Independent Creative specializing in visual design, motion graphics, and brand identity.
            </p>
          </div>
        </section>

        {/* Portfolio Grid Section */}
        <section className="px-8 py-16 md:py-24">
          <h2 className="text-left mb-8 md:mb-12 text-2xl md:text-3xl font-bold">Featured Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Show first 9 projects, reusing if needed */}
            {Array.from({ length: 9 }, (_, index) => {
              const project = projects[index % projects.length];
              const isFirstCard = index === 0;
              
              // First card: clickable with shared-element transition
              if (isFirstCard) {
                return (
                  <div
                    key={`${project.slug}-${index}`}
                    ref={firstCardRef}
                    onClick={handleFirstCardClick}
                    className="relative w-full cursor-pointer"
                    style={{ aspectRatio: "5/7" }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src="/images/transition-placeholder.jpg"
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                );
              }
              
              // Other cards: static
              return (
                <div
                  key={`${project.slug}-${index}`}
                  className="relative w-full"
                  style={{ aspectRatio: "5/7" }}
                >
                  <Image
                    src={`/images/work/${project.slug}/thumb-${project.slug}.jpg`}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
}
