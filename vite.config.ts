import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
    }),
  ],
  base: process.env.NODE_ENV === 'production' ? '/workout-timer/' : '/',
  resolve: {
    alias: {
      pages: path.join(__dirname, 'src/pages/'),
      features: path.join(__dirname, 'src/features/'),
      shared: path.join(__dirname, 'src/shared/'),
    },
  },
});
