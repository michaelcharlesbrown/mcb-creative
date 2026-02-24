#!/usr/bin/env node
/**
 * Investigate "web design" spacing in the browser
 */
import { chromium } from "playwright";

const BASE = "http://localhost:3002";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log("=== INFO PAGE (/info) ===\n");

  await page.goto(`${BASE}/info`, { waitUntil: "domcontentloaded", timeout: 5000 });

  const infoParagraph = page.locator(".info-page__text").first();
  const infoText = await infoParagraph.textContent();

  // Find "web design" and inspect chars
  const webDesignIdx = infoText.indexOf("web");
  if (webDesignIdx >= 0) {
    const snippet = infoText.slice(webDesignIdx, webDesignIdx + 15);
    console.log("Snippet around 'web':", JSON.stringify(snippet));
    for (let i = 0; i < snippet.length; i++) {
      const c = snippet[i];
      console.log(`  [${i}] '${c}' U+${c.charCodeAt(0).toString(16).padStart(4, "0")} (${c === " " ? "SPACE" : c === "\u00a0" ? "NBSP" : "char"})`);
    }
  }

  // Check for multiple consecutive spaces
  const doubleSpaceIdx = infoText.indexOf("  ");
  console.log("\nFirst double-space index:", doubleSpaceIdx);
  if (doubleSpaceIdx >= 0) {
    console.log("Context:", JSON.stringify(infoText.slice(doubleSpaceIdx - 5, doubleSpaceIdx + 15)));
  }

  console.log("\n=== HOME PAGE (/) - AboutBlurb ===\n");

  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 5000 });

  await new Promise((r) => setTimeout(r, 500));

  const aboutText = await page.locator(".about-blurb__text").textContent();
  console.log("AboutBlurb text (first 200 chars):", JSON.stringify(aboutText?.slice(0, 200)));

  const webIdx = aboutText?.indexOf("web") ?? -1;
  if (webIdx >= 0) {
    const snippet = aboutText.slice(webIdx, webIdx + 15);
    console.log("\nSnippet around 'web':", JSON.stringify(snippet));
    for (let i = 0; i < snippet.length; i++) {
      const c = snippet[i];
      console.log(`  [${i}] '${c}' U+${c.charCodeAt(0).toString(16).padStart(4, "0")} (${c === " " ? "SPACE" : c === "\u00a0" ? "NBSP" : "char"})`);
    }
  }

  // Check AboutBlurb DOM: are "web" and "design" in same span or separate?
  const words = await page.locator(".about-blurb__word").allTextContents();
  const webWord = words.find((w) => w.includes("web"));
  const designWord = words.find((w) => w.includes("design"));
  console.log("\nWord containing 'web':", JSON.stringify(webWord));
  console.log("Word containing 'design':", JSON.stringify(designWord));

  await browser.close();
}

main().catch(console.error);
