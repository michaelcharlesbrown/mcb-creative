import fs from 'fs';
import path from 'path';

interface ImageItem {
  number: number;
  type: 'full' | 'half';
  src: string;
  alt?: string;
}

interface HalfPair {
  number: number;
  a: string;
  b: string;
}

/**
 * Scans a project's image directory and returns images organized by the naming convention:
 * - Full width: XX-full.{ext}
 * - Half width pairs: XX-a.{ext} and XX-b.{ext}
 * 
 * Images are sorted by their number prefix and returned in order.
 */
export function getProjectImages(slug: string): ImageItem[] {
  const projectDir = path.join(process.cwd(), 'public', 'images', 'projects', slug);
  
  // Check if directory exists
  if (!fs.existsSync(projectDir)) {
    return [];
  }

  const files = fs.readdirSync(projectDir);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  
  // Filter image files and parse their naming pattern
  const fullImages: { number: number; src: string }[] = [];
  const halfPairs: Map<number, HalfPair> = new Map();

  files.forEach((file) => {
    const ext = path.extname(file).toLowerCase();
    if (!imageExtensions.includes(ext)) {
      return;
    }

    const baseName = path.basename(file, ext);
    const basePath = `/images/projects/${slug}/${file}`;

    // Match XX-full pattern
    const fullMatch = baseName.match(/^(\d+)-full$/);
    if (fullMatch) {
      const number = parseInt(fullMatch[1], 10);
      fullImages.push({ number, src: basePath });
      return;
    }

    // Match XX-a or XX-b pattern
    const halfMatch = baseName.match(/^(\d+)-(a|b)$/);
    if (halfMatch) {
      const number = parseInt(halfMatch[1], 10);
      const side = halfMatch[2] as 'a' | 'b';
      
      if (!halfPairs.has(number)) {
        halfPairs.set(number, { number, a: '', b: '' });
      }
      
      const pair = halfPairs.get(number)!;
      if (side === 'a') {
        pair.a = basePath;
      } else {
        pair.b = basePath;
      }
    }
  });

  // Combine and sort all items
  const result: ImageItem[] = [];
  const allNumbers = new Set<number>();
  
  fullImages.forEach(img => allNumbers.add(img.number));
  halfPairs.forEach(pair => {
    allNumbers.add(pair.number);
    // Only add pairs where both a and b exist
    if (pair.a && pair.b) {
      allNumbers.add(pair.number);
    }
  });

  const sortedNumbers = Array.from(allNumbers).sort((a, b) => a - b);

  sortedNumbers.forEach((number) => {
    // Check if it's a full image
    const fullImage = fullImages.find(img => img.number === number);
    if (fullImage) {
      result.push({
        number,
        type: 'full',
        src: fullImage.src,
      });
    }

    // Check if it's a half pair
    const pair = halfPairs.get(number);
    if (pair && pair.a && pair.b) {
      // Add both a and b as separate items, but mark them as half
      // We'll use the same number for both, and groupProjectImages will pair them
      result.push({
        number,
        type: 'half',
        src: pair.a,
      });
      result.push({
        number,
        type: 'half',
        src: pair.b,
      });
    }
  });

  return result;
}

/**
 * Groups images into rows based on their type
 * Full images become single-item rows, half images are paired together by their number
 */
export function groupProjectImages(images: ImageItem[]): Array<{
  layout: 'full' | 'half';
  items: Array<{ type: 'image'; src: string; alt?: string }>;
}> {
  const rows: Array<{
    layout: 'full' | 'half';
    items: Array<{ type: 'image'; src: string; alt?: string }>;
  }> = [];

  // Group half images by their number
  const halfGroups = new Map<number, string[]>();
  const fullImages: Array<{ number: number; src: string }> = [];

  images.forEach((image) => {
    if (image.type === 'full') {
      fullImages.push({ number: image.number, src: image.src });
    } else {
      if (!halfGroups.has(image.number)) {
        halfGroups.set(image.number, []);
      }
      halfGroups.get(image.number)!.push(image.src);
    }
  });

  // Combine and sort all numbers
  const allNumbers = new Set<number>();
  fullImages.forEach(img => allNumbers.add(img.number));
  halfGroups.forEach((_, number) => allNumbers.add(number));
  const sortedNumbers = Array.from(allNumbers).sort((a, b) => a - b);

  // Build rows in order
  sortedNumbers.forEach((number) => {
    // Check for full image first
    const fullImage = fullImages.find(img => img.number === number);
    if (fullImage) {
      rows.push({
        layout: 'full',
        items: [{ type: 'image', src: fullImage.src }],
      });
    }

    // Check for half pair
    const halfPair = halfGroups.get(number);
    if (halfPair && halfPair.length === 2) {
      rows.push({
        layout: 'half',
        items: [
          { type: 'image', src: halfPair[0] },
          { type: 'image', src: halfPair[1] },
        ],
      });
    } else if (halfPair && halfPair.length === 1) {
      // If only one half image exists, render it as full width
      rows.push({
        layout: 'full',
        items: [{ type: 'image', src: halfPair[0] }],
      });
    }
  });

  return rows;
}

/**
 * Gets the first hero image (01-full) for a project
 * Falls back to thumbnail if no 01-full image exists
 */
export function getProjectHeroImage(slug: string): string | null {
  const projectImages = getProjectImages(slug);
  const firstImage = projectImages.find(img => img.number === 1 && img.type === 'full');
  
  if (firstImage) {
    return firstImage.src;
  }
  
  // Fallback: try to find any first full image
  const anyFirstFull = projectImages.find(img => img.type === 'full');
  if (anyFirstFull) {
    return anyFirstFull.src;
  }
  
  return null;
}
