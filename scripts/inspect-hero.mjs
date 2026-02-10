/**
 * Inspect hero section with Playwright: DOM, computed styles, video state.
 * Run: node scripts/inspect-hero.mjs (dev server must be on port 3002)
 */
import { chromium } from "playwright";

const BASE_URL = "http://localhost:3002";

function pick(obj, keys) {
  return keys.reduce((acc, k) => {
    if (obj[k] !== undefined) acc[k] = obj[k];
    return acc;
  }, {});
}

console.log("Launching Chrome and navigating to", BASE_URL, "\n");

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox"],
});

const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
const page = await context.newPage();

page.on("pageerror", (err) => console.error("[PAGE ERROR]", err.message));

await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
// Let panel animation run (CSS: ~1s panel + 0.9s content delay)
await page.waitForTimeout(2500);

const result = await page.evaluate(() => {
  const hero = document.querySelector(".hero");
  const panel = document.querySelector(".heroPanel");
  const videoWrap = document.querySelector(".hero__video-wrap");
  const video = document.querySelector(".hero__video");
  const content = document.querySelector(".hero__content");

  const getRect = (el) => (el ? el.getBoundingClientRect().toJSON() : null);
  const getStyles = (el, props) => {
    if (!el) return null;
    const s = getComputedStyle(el);
    return props.reduce((acc, p) => {
      acc[p] = s.getPropertyValue(p) || s[p];
      return acc;
    }, {});
  };

  const panelStyles = panel
    ? getStyles(panel, [
        "position",
        "top",
        "left",
        "right",
        "height",
        "transform",
        "animation",
        "animationName",
        "animationDuration",
        "animationFillMode",
      ])
    : null;

  const heroVars = hero
    ? getStyles(hero, ["--panel-height", "--panel-top", "--hero-panel-duration"])
    : null;

  const videoState = video
    ? {
        tagName: video.tagName,
        src: video.currentSrc || video.getAttribute("src"),
        readyState: video.readyState,
        paused: video.paused,
        error: video.error ? video.error.message : null,
        rect: getRect(video),
      }
    : null;

  return {
    viewport: { width: window.innerWidth, height: window.innerHeight },
    hero: {
      exists: !!hero,
      rect: getRect(hero),
      cssVars: heroVars,
    },
    heroPanel: {
      exists: !!panel,
      rect: getRect(panel),
      computedStyle: panelStyles,
    },
    hero__video: {
      exists: !!video,
      rect: getRect(videoWrap),
      video: videoState,
    },
    hero__content: {
      exists: !!content,
      rect: getRect(content),
      computedStyle: content
        ? getStyles(content, ["position", "top", "height", "opacity", "transform"])
        : null,
    },
  };
});

console.log("========== HERO INSPECTION (after animation) ==========\n");
console.log("Viewport:", result.viewport);
console.log("\n.hero");
console.log("  exists:", result.hero.exists);
console.log("  rect:", JSON.stringify(result.hero.rect, null, 2));
console.log("  CSS vars:", JSON.stringify(result.hero.cssVars, null, 2));

console.log("\n.heroPanel");
console.log("  exists:", result.heroPanel.exists);
console.log("  rect (final position):", JSON.stringify(result.heroPanel.rect, null, 2));
console.log("  computed style:", JSON.stringify(result.heroPanel.computedStyle, null, 2));

console.log("\n.hero__video-wrap / video");
console.log("  exists:", result.hero__video.exists);
console.log("  video-wrap rect:", JSON.stringify(result.hero__video.rect, null, 2));
console.log("  video state:", JSON.stringify(result.hero__video.video, null, 2));

console.log("\n.hero__content");
console.log("  exists:", result.hero__content.exists);
console.log("  rect:", JSON.stringify(result.hero__content.rect, null, 2));
console.log("  computed style:", JSON.stringify(result.hero__content.computedStyle, null, 2));

// Assertions / debug summary
const vh = result.viewport.height;
const panelTop = result.heroPanel.rect ? result.heroPanel.rect.top : null;
const panelHeight = result.heroPanel.rect ? result.heroPanel.rect.height : null;
const expectedTopVh = (35 * vh) / 100;
const expectedHeightVh = (65 * vh) / 100;

console.log("\n========== CHECKS ==========");
console.log("Panel top (px):", panelTop, "| Expected ~35vh (px):", Math.round(expectedTopVh));
console.log("Panel height (px):", panelHeight, "| Expected ~65vh (px):", Math.round(expectedHeightVh));
if (panelTop !== null) {
  const topOk = Math.abs(panelTop - expectedTopVh) < 20;
  console.log("Panel top ~35vh?", topOk ? "YES" : "NO (possible issue)");
}
if (result.hero__video.video) {
  console.log("Video playing?", result.hero__video.video.paused ? "NO (paused)" : "YES");
  console.log("Video readyState:", result.hero__video.video.readyState, "(4 = HAVE_ENOUGH_DATA)");
  if (result.hero__video.video.error)
    console.log("Video error:", result.hero__video.video.error);
}

await page.screenshot({ path: "scripts/hero-inspection-screenshot.png", fullPage: false });
console.log("\nScreenshot saved: scripts/hero-inspection-screenshot.png");

await browser.close();
console.log("\nDone.");
