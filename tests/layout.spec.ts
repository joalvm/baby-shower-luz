import { test, expect } from "@playwright/test";

/**
 * Detecta scroll horizontal no deseado. Ignora decoración (aria-hidden,
 * z-index negativo y clases puramente ornamentales).
 */

const IGNORED_DECORATIVE = [
  "single-watercolor-bg",
  "paper-grain",
];

test("no hay scroll horizontal en el documento", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const result = await page.evaluate((ignored) => {
    const docWidth = document.documentElement.clientWidth;
    const hasScroll = document.documentElement.scrollWidth > docWidth + 1;

    const overflowing = [...document.querySelectorAll("body *")]
      .filter((el) => {
        if (el.getAttribute("aria-hidden") === "true") return false;
        const z = Number(getComputedStyle(el).zIndex);
        if (!Number.isNaN(z) && z < 0) return false;
        const className = el.getAttribute("class") ?? "";
        if (ignored.some((item) => className.includes(item))) return false;
        if (ignored.some((item) => el.closest(`.${item}`))) return false;
        const rect = el.getBoundingClientRect();
        return rect.right > docWidth + 2 || rect.left < -2;
      })
      .slice(0, 12)
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          className: el.getAttribute("class") ?? "",
          left: Math.round(rect.left),
          right: Math.round(rect.right),
        };
      });

    return { hasScroll, overflowing };
  }, IGNORED_DECORATIVE);

  expect(result.overflowing, `Elementos con overflow: ${JSON.stringify(result.overflowing)}`).toEqual([]);
  expect(result.hasScroll, "El documento genera scroll horizontal").toBe(false);
});
