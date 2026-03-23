import { test, expect } from '@playwright/test';

test('Navega desde Inicio a la página de Sabores y verifica el renderizado de la DB Viva', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Descubre nuestra carta');
  await expect(page).toHaveURL(/.*flavors/);

  // Verificamos que la página principal (UI per se) cargó
  await expect(page.locator('h1:has-text("Nuestros Sabores")')).toBeVisible();

  // Dependiendo del estado de tu base de datos real, o hay helados listados, o aparece el empty state
  const emptyStateLocator = page.getByText(/Próximamente/i);
  const flavorsLocator = page.locator('.group h3').first();

  // Playwright espera a que una de las dos condiciones se cumpla orgánicamente
  await expect(emptyStateLocator.or(flavorsLocator)).toBeVisible({ timeout: 15000 });
});
