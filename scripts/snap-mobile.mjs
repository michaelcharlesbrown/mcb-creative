import { chromium } from "playwright";
import { mkdirSync } from "fs";

const url = process.argv[2] || "http://localhost:3002";

(async () => {
  mkdirSync("playwright-artifacts", { recursive: true });
  const browser = await chromium.launch({ headless: true, channel: "chrome" });
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148",
  });

  await page.goto(url, { waitUntil: "networkidle", timeout: 20000 });
  await page.waitForTimeout(2000);

  // Full page
  await page.screenshot({
    path: "playwright-artifacts/home-mobile.png",
    fullPage: true,
  });
  console.log("Saved playwright-artifacts/home-mobile.png");

  // Scroll to Featured Work section
  await page.evaluate(() => {
    const sections = document.querySelectorAll('section');
    for (const s of sections) {
      const h2 = s.querySelector('h2');
      if (h2?.textContent?.includes('Featured Work')) {
        s.scrollIntoView();
        break;
      }
    }
  });
  await page.waitForTimeout(800);

  await page.screenshot({
    path: "playwright-artifacts/featured-work-view.png",
    fullPage: false,
  });
  console.log("Saved playwright-artifacts/featured-work-view.png");

  await browser.close();
})().catch((e) => {
  console.error("FAILED:", e);
  process.exit(1);
});
