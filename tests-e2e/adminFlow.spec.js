import { test, expect } from '@playwright/test';

test('Flujo de Administrador: Validar protección de ruta (Auth Guard) frente a usuarios anónimos', async ({ page }) => {
  // 1. Ir a la página de login admin
  await page.goto('/admin');

  // 2. Verificamos que el muro de Login funciona protegiendo el panel
  await expect(page.locator('text=Panel Admin')).toBeVisible();

  // 3. Intentamos un ataque de fuerza con credenciales falsas 
  // Esto valida la conexión Firebase -> Auth -> React UI sin contaminar / borrar datos reales
  await page.fill('input[type="email"]', 'intruso@test.com');
  await page.fill('input[type="password"]', 'contraseñaFalsa123');
  await page.click('button[type="submit"]');

  // 4. Verificar el rechazo
  await expect(page.locator('text=Credenciales incorrectas')).toBeVisible({ timeout: 10000 });
});
