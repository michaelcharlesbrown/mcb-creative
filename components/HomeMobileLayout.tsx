"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import HeroSection from "@/components/HeroSection";

gsap.registerPlugin(CustomEase);
CustomEase.create("smooth-out", "0.22, 1, 0.36, 1");
import BodyClass from "@/components/BodyClass";
import AboutBlurb from "@/components/AboutBlurb";
import Footer from "@/components/Footer";
import LogoVideoReveal from "@/components/LogoVideoReveal";
import ProjectNavRail from "@/components/ProjectNavRail";

export interface MobileProject {
  slug: string;
  title: string;
  accentColor: string;
  subheadline?: string;
  scope?: string[];
  heroImage: string;
}

interface HomeMobileLayoutProps {
  projects: MobileProject[];
}

export default function HomeMobileLayout({ projects }: HomeMobileLayoutProps) {
  const videoRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(video, { y: "100vh" }, { y: 0, duration: 1.1, ease: "smooth-out" });
    }, video);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <BodyClass className="home" />
      <div
        className="fixed inset-0 overflow-y-scroll scrollbar-hide md:hidden z-10"
      >
      {/* Hero + video in black container — black visible during slide animations */}
      <div className="flex-shrink-0 overflow-hidden bg-black isolate">
        <section className="h-[66.67vh] flex-shrink-0 overflow-hidden">
          <HeroSection disableScrollTrigger />
        </section>
        <section ref={videoRef} className="hero-video flex-shrink-0 bg-black">
        <video
          className="w-full h-auto block"
          src="/video/hero-placeholder-test.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        </section>
      </div>

      {/* About */}
      <section className="flex-shrink-0">
        <AboutBlurb />
      </section>

      {/* Featured Work — full viewport section like About, card peek on right */}
      <section className="flex-shrink-0 bg-background min-h-dvh flex flex-col justify-center">
        <div className="content-inset pt-[200px] pb-[200px]">
          <div className="flex items-baseline justify-between gap-4 mb-6">
            <h2 className="text-heading-sm font-normal">
              Featured Work
            </h2>
            <a
              href="/projects"
              className="uppercase text-ui tracking-widest  hover:opacity-50 transition-opacity shrink-0"
            >
              See All Work →
            </a>
          </div>
          <ProjectNavRail projects={projects} variant="homepage" />
        </div>
      </section>

      {/* Logo video peel-away — same effect as info page */}
      <section className="flex-shrink-0 min-h-screen relative">
        <LogoVideoReveal />
      </section>

      {/* Footer */}
      <section className="flex-shrink-0">
        <Footer />
      </section>
    </div>
    </>
  );
}
