import { chromium } from "playwright";
import { mkdirSync } from "fs";

const url = process.argv[2] || "http://localhost:3002/projects/bittorrent";

(async () => {
  mkdirSync("playwright-artifacts", { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    channel: "chrome",
  });
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148",
  });

  await page.goto(url, { waitUntil: "networkidle", timeout: 20000 });
  await page.waitForTimeout(2000);

  // Scroll to bottom where Project Nav Rail lives
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(800);

  await page.screenshot({
    path: "playwright-artifacts/project-nav-rail-mobile.png",
    fullPage: false,
  });
  console.log("Saved playwright-artifacts/project-nav-rail-mobile.png");

  // Also get full page
  await page.screenshot({
    path: "playwright-artifacts/project-page-mobile-full.png",
    fullPage: true,
  });
  console.log("Saved playwright-artifacts/project-page-mobile-full.png");

  await browser.close();
})().catch((e) => {
  console.error("FAILED:", e);
  process.exit(1);
});
