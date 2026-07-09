"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import BodyClass from "@/components/BodyClass";
import Footer from "@/components/Footer";
import WorkCard from "@/components/WorkCard";
import { homepageIntro, HOMEPAGE_INTRO_EASE } from "@/lib/homepageIntro";
import type { MediaSlideData } from "@/components/SlideSequence";
import type { HomeProject } from "@/app/page";

interface HomeMobileLayoutProps {
  projects: HomeProject[];
  sizzleReelSlides: MediaSlideData[];
}

export default function HomeMobileLayout({ projects, sizzleReelSlides }: HomeMobileLayoutProps) {
  return (
    <div className="block md:hidden">
      <BodyClass className="home" />
      <div className="overflow-hidden bg-background">
        <HeroSection sizzleReelSlides={sizzleReelSlides} />
      </div>

      <motion.div
        className="bg-background"
        initial={{ opacity: 0, y: homepageIntro.featured.y }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: homepageIntro.featured.duration,
          ease: HOMEPAGE_INTRO_EASE,
          delay: homepageIntro.featured.delay,
        }}
      >
        <div className="content-inset pb-[25vh]">
          <section className="project-intro" aria-labelledby="work-intro-title-mobile">
            <header className="project-intro__header">
              <p className="label">Featured Projects</p>
              <h1 id="work-intro-title-mobile" className="project-intro__headline">
                My work spans brand identity, interactive web design, motion, and illustration.
              </h1>
            </header>
          </section>
          <div className="col-2 work-grid">
            {projects.map((project) => (
              <WorkCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}
