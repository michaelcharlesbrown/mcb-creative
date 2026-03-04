"use client";

import { useState, useEffect, useRef } from "react";
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

export interface DesktopProject {
  slug: string;
  title: string;
  accentColor: string;
  subheadline?: string;
  scope?: string[];
  heroImage: string;
}

interface HomeDesktopLayoutProps {
  projects: DesktopProject[];
}

export default function HomeDesktopLayout({ projects }: HomeDesktopLayoutProps) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const section = sectionRef.current;
    const title = titleRef.current;
    const tagline = taglineRef.current;
    const video = videoRef.current;
    const nav = document.querySelector<HTMLElement>(".nav");
    if (!section || !title || !tagline || !video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      // 1. Hero + video meet — smooth, fluid (first thing)
      tl.fromTo(section, { yPercent: -100 }, { yPercent: 0, duration: 0.7, ease: "smooth-out" }, 0);
      tl.fromTo(video, { y: "100vh" }, { y: 0, duration: 0.7, ease: "smooth-out" }, 0);
      // 2. Title (MCB Creative) — slide up + fade
      tl.fromTo(title, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, ease: "smooth-out" }, ">");
      // 3. Tagline — slide up + fade
      tl.fromTo(tagline, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, ease: "smooth-out" }, ">-0.12");
      // 4. Nav — slide down, last
      if (nav) {
        tl.fromTo(nav, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: "smooth-out" }, ">-0.08");
      }
    }, section);

    return () => ctx.revert();
  }, [isDesktop]);

  // Don't render on mobile or during SSR
  if (!isDesktop) return null;

  return (
    <>
      <BodyClass className="home" />
      <div className="bg-background">
        {/* Hero + video in black container — black visible during slide animations */}
        <div className="overflow-hidden bg-black isolate">
          <HeroSection ref={sectionRef} titleRef={titleRef} taglineRef={taglineRef} animateFromParent />
          <div ref={videoRef} className="hero-video bg-black">
          <video
            className="w-full h-auto block"
            src="/video/hero-placeholder-test.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          </div>
        </div>

        {/* About */}
        <div className="min-h-screen flex items-center bg-background">
          <AboutBlurb />
        </div>

        {/* Featured Work */}
        <div className="bg-background">
          <div className="max-w-[var(--content-max-width)] mx-auto content-inset pt-[max(var(--nav-height),200px)] pb-[200px] md:pt-[max(var(--nav-height),200px)] md:pb-[200px]">
            <div className="flex items-baseline justify-between gap-4 mb-8 md:mb-12">
              <h2 className="text-heading-lg font-normal">
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
        </div>
      </div>

      {/* Outside bg-background so fixed video is not obscured */}
      <LogoVideoReveal />
      <div>
        <Footer />
      </div>
    </>
  );
}
