import { test, expect } from "@playwright/test";

/**
 * Smoke tests: the failure modes that have actually reached production.
 * Content must be visible at rest — no reveal animation may gate it — and
 * every page renders exactly one site footer (`footer.w-full`; the semantic
 * <footer> tags inside /info testimonials are not site footers).
 */

test("homepage renders with visible content and one footer", async ({ page }) => {
  await page.goto("/");

  // Headline content visible immediately — the intro must never gate it.
  // (Exactly one *visible* wordmark: the dual mobile/desktop layouts each
  // render one, CSS-hiding the other; more than one visible is a regression.)
  await expect(page.locator(".hero__wordmark-img:visible")).toHaveCount(1);
  await expect(
    page.getByRole("heading", { level: 1, name: /my work spans/i }).first()
  ).toBeVisible();

  // Exactly one site footer, and its CTA is real rendered content.
  await expect(page.locator("footer.w-full")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: /let's work/i })).toBeVisible();
});

test("work page renders grid and one footer", async ({ page }) => {
  await page.goto("/projects");

  await expect(
    page.getByRole("heading", { level: 1, name: /a collection of/i })
  ).toBeVisible();
  await expect(page.locator("footer.w-full")).toHaveCount(1);
});

test("info page renders and has one site footer", async ({ page }) => {
  await page.goto("/info");

  await expect(
    page.getByRole("heading", { level: 1, name: /visual identities/i })
  ).toBeVisible();
  await expect(page.locator("footer.w-full")).toHaveCount(1);
});

test("project detail page renders media blocks with alt text", async ({ page }) => {
  await page.goto("/projects/superspatial");

  const frames = page.locator(".media-frame");
  await expect(frames.first()).toBeVisible();
  expect(await frames.count()).toBeGreaterThan(5);

  // Alt coverage: no Sanity-served image may render without alt text.
  const missingAlt = await page
    .locator('img[src*="cdn.sanity.io"]:not([alt]), img[src*="cdn.sanity.io"][alt=""]')
    .count();
  expect(missingAlt).toBe(0);
});
