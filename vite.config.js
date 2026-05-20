import { defineConfig } from 'vite';

export default defineConfig({
  // Relative base works reliably on github.io/ClickMorphy/
  base: './',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
  },
});
