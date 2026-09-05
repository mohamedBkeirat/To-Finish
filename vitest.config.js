// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./setupTests.ts'],
    coverage: {
      enabled: true
    },
    thresholds: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
});
