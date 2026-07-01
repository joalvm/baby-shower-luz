import { test, expect } from "@playwright/test";

test.describe("Invitación - smoke", () => {
  test("carga la página con el título y encabezado correctos", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Baby Shower/i);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Amber Eileen");
  });

  test("muestra familia y cuenta regresiva", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Amber Eileen", { exact: true })).toBeVisible();
    await page.locator("#familia").scrollIntoViewIfNeeded();
    await expect(page.getByText("Aurora", { exact: true })).toBeVisible();
    await expect(page.getByText("Luis", { exact: true })).toBeVisible();
    await expect(page.getByText("Mía Hellen", { exact: true })).toBeVisible();
    await page.locator("#cuenta").scrollIntoViewIfNeeded();
    await expect(page.getByText("¿Cuánto falta?")).toBeVisible();
  });

  test('el botón "Ver mapa" enlaza a Google Maps', async ({ page }) => {
    await page.goto("/");

    await page.locator("#evento").scrollIntoViewIfNeeded();
    const mapa = page.getByRole("link", { name: "Ver mapa" });
    await expect(mapa).toHaveAttribute("href", /google\.com\/maps/);
  });

  test('el botón "Confirmar asistencia" enlaza a WhatsApp', async ({ page }) => {
    await page.goto("/");

    await page.locator("#confirmar").scrollIntoViewIfNeeded();
    const confirmar = page.getByRole("link", { name: "Confirmar asistencia" });
    await expect(confirmar).toHaveAttribute("href", /wa\.me/);
  });
});
