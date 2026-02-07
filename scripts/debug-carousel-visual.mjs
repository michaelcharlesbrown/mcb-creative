import { chromium } from "playwright";

const ROUTE = "/projects/bittorrent";
const BASE_URL = "http://localhost:3002";

console.log(`Opening ${BASE_URL}${ROUTE} in Chrome (non-headless)...`);

// Launch Chrome in non-headless mode
// Try Chrome first, fall back to Chromium if Chrome isn't available
let browser;
try {
  browser = await chromium.launch({
    headless: false,
    channel: "chrome", // Use Chrome browser
  });
} catch (error) {
  console.log("Chrome not found, using Chromium instead...");
  browser = await chromium.launch({
    headless: false,
  });
}

const context = await browser.newContext();
const page = await context.newPage();

// Set up console logging
page.on("console", (msg) => {
  const type = msg.type();
  const text = msg.text();
  console.log(`[${type}] ${text}`);
});

// Set up page errors
page.on("pageerror", (error) => {
  console.error(`[PAGE ERROR] ${error.message}`);
});

// Navigate to the page
await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: "networkidle" });

console.log("\n✅ Page loaded");

// Wait for and confirm carousel element exists
try {
  const carousel = await page.waitForSelector('[data-testid="projects-carousel"]', {
    timeout: 5000,
  });

  if (carousel) {
    const isVisible = await carousel.isVisible();
    const boundingBox = await carousel.boundingBox();
    
    console.log("\n✅ Carousel element found:");
    console.log(`   - Visible: ${isVisible}`);
    console.log(`   - Bounding box:`, boundingBox);
    
    // Also check the track
    const track = await page.locator('[data-testid="projects-carousel-track"]');
    if (await track.count() > 0) {
      const trackTransform = await track.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.transform;
      });
      console.log(`   - Track transform: ${trackTransform}`);
      
      // Count project links
      const links = await page.locator('[data-testid="projects-carousel-track"] a').count();
      console.log(`   - Project links: ${links}`);
    }
  }
} catch (error) {
  console.error("\n❌ Carousel element not found:", error.message);
}

console.log("\n🔍 Browser is open and ready for inspection.");
console.log("   - Open DevTools manually to inspect the carousel");
console.log("   - The browser will stay open until you close it");
console.log("   - Press Ctrl+C in this terminal to stop the script\n");

// Keep the browser open - wait indefinitely until interrupted
process.on('SIGINT', async () => {
  console.log('\n\nClosing browser...');
  await browser.close();
  process.exit(0);
});

// Keep the process alive
console.log("Waiting... (Press Ctrl+C to close browser and exit)\n");
await new Promise(() => {}); // Wait indefinitely
