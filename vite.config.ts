/// <reference types='vitest' />
/// <reference types='vite/client' />

import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
  css: {
    modules: {
      localsConvention: 'dashes',
      scopeBehaviour: 'local'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/')
    }
  }
});
