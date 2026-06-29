import fs from "fs";
import path from "path";
import sharp from "sharp";
import { unstable_noStore as noStore } from "next/cache";
import type { HeroImage, HeroSet } from "@/lib/homepageHeroSlideshow";

const SLIDESHOW_DIR = path.join(
  process.cwd(),
  "public/images/homepage-hero-slideshow",
);
const PUBLIC_PREFIX = "/images/homepage-hero-slideshow";

/** Matches set1-left.jpg, set4-right.png, etc. Ignores other files (e.g. file.svg). */
const SET_FILE = /^set(\d+)-(left|right)\.(jpe?g|png|webp)$/i;

type Side = "left" | "right";

async function imageMeta(
  filename: string,
): Promise<HeroImage> {
  const filePath = path.join(SLIDESHOW_DIR, filename);
  const { width, height } = await sharp(filePath).metadata();

  if (!width || !height) {
    throw new Error(
      `Could not read dimensions for homepage hero image: ${filename}`,
    );
  }

  return {
    src: `${PUBLIC_PREFIX}/${filename}`,
    width,
    height,
    alt: "",
  };
}

/**
 * Scan the slideshow folder and return complete left/right pairs in set order.
 * Incomplete sets (missing a side) are skipped.
 */
export async function getHomepageHeroSets(): Promise<HeroSet[]> {
  if (process.env.NODE_ENV === "development") {
    noStore();
  }

  const files = fs.readdirSync(SLIDESHOW_DIR);
  const bySet = new Map<number, Partial<Record<Side, string>>>();

  for (const file of files) {
    const match = file.match(SET_FILE);
    if (!match) continue;

    const setNum = Number(match[1]);
    const side = match[2].toLowerCase() as Side;

    if (!bySet.has(setNum)) bySet.set(setNum, {});
    bySet.get(setNum)![side] = file;
  }

  const sets: HeroSet[] = [];

  for (const setNum of [...bySet.keys()].sort((a, b) => a - b)) {
    const entry = bySet.get(setNum)!;
    if (!entry.left || !entry.right) continue;

    const [left, right] = await Promise.all([
      imageMeta(entry.left),
      imageMeta(entry.right),
    ]);

    sets.push({ left, right });
  }

  return sets;
}
