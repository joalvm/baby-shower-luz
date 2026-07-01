import { test } from "@playwright/test";

/**
 * Capturas de pantalla estandarizadas.
 * Cada captura se guarda en screenshots/<proyecto>/<nombre>.png
 * Ejecutar:  pnpm screenshots
 */

const SECTIONS = [
  { id: "inicio", label: "hero" },
  { id: "familia", label: "familia" },
  { id: "cuenta", label: "cuenta" },
  { id: "evento", label: "evento" },
  { id: "confirmar", label: "rsvp" },
  { id: "despedida", label: "despedida" },
] as const;

test.describe("Screenshots", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("full-page", async ({ page }, testInfo) => {
    const dir = `screenshots/${testInfo.project.name}`;
    await page.screenshot({ path: `${dir}/full-page.png`, fullPage: true });
  });

  for (const section of SECTIONS) {
    test(`section-${section.label}`, async ({ page }, testInfo) => {
      const dir = `screenshots/${testInfo.project.name}`;
      await page.locator(`#${section.id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await page.screenshot({ path: `${dir}/section-${section.label}.png` });
    });
  }
});
