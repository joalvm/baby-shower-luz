import { test, expect } from "@playwright/test";

test.describe("Invitación - smoke", () => {
  test("carga la página con el título y encabezado correctos", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Baby Shower/i);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Una invitación pintada para",
    );
  });

  test('el enlace "Abrir invitación" lleva a la sección inicio', async ({ page }) => {
    await page.goto("/");

    const abrir = page.getByRole("link", { name: "Abrir invitación" });
    await expect(abrir).toBeVisible();
    await abrir.click();

    await expect(page).toHaveURL(/#inicio$/);
    await expect(page.locator("#inicio")).toBeVisible();
  });

  test("muestra el nombre del bebé y los padres", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Amber Eileen", { exact: true })).toBeVisible();
    await expect(page.getByText("Aurora y Luis")).toBeVisible();
  });

  test('el botón "Confirmar asistencia" enlaza a WhatsApp', async ({ page }) => {
    await page.goto("/");

    const confirmar = page.getByRole("link", { name: "Confirmar asistencia" });
    await expect(confirmar).toHaveAttribute("href", /wa\.me/);
  });
});
