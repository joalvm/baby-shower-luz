import { test } from "@playwright/test";

/**
 * Capturas de pantalla estandarizadas.
 * Cada captura se guarda en screenshots/<proyecto>/<nombre>.png
 * Ejecutar:  pnpm screenshots
 */

const SECTIONS = [
  { id: "abrir", label: "opening" },
  { id: "inicio", label: "hero" },
  { id: "nombre", label: "nombre" },
  { id: "familia", label: "familia" },
  { id: "cuenta", label: "cuenta" },
  { id: "datos", label: "datos" },
  { id: "confirmar", label: "rsvp" },
  { id: "final", label: "final" },
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
