import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    exclude: ['node_modules', 'tests-e2e/**'], // Excluimos los tests E2E de Vitest
  },
});
