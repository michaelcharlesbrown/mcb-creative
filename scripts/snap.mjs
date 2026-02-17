import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3002/projects/bittorrent";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(750);

  await page.screenshot({ path: "playwright-artifacts/proof.png", fullPage: true });
  console.log("OK: playwright-artifacts/proof.png");

  await browser.close();
})().catch((e) => {
  console.error("FAILED:", e);
  process.exit(1);
});
