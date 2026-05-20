/**
 * In-place swaps of `public/video/mcb-creative-hp-video.mp4` reuse the URL and stay cached — bump after each replace so clients refetch.
 */
export const HOMEPAGE_HERO_VIDEO_CACHE_KEY = "2";

export const HOMEPAGE_HERO_VIDEO_SRC = `/video/mcb-creative-hp-video.mp4?v=${HOMEPAGE_HERO_VIDEO_CACHE_KEY}`;
