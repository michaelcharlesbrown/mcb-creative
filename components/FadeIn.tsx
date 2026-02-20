"use client";

import { motion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  /** Override default y offset (default: 20) */
  yOffset?: number;
  /** Override default duration (default: 0.6) */
  duration?: number;
  /** Override viewport threshold (default: 0.1) */
  threshold?: number;
}

/**
 * Fades content in as it scrolls into view.
 * Opacity 0→1, subtle y slide (20→0), duration 0.6s, easeOut, once.
 */
export default function FadeIn({
  children,
  className = "",
  yOffset = 20,
  duration = 0.6,
  threshold = 0.1,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={{ duration, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
