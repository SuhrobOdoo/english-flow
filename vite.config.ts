import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        newtab: resolve(__dirname, 'newtab.html'),
        popup: resolve(__dirname, 'popup.html'),
      },
    },
    // Don't inline assets in base64
    assetsInlineLimit: 0,
  },
  // Ensure relative paths for Chrome Extension
  base: './',
});
