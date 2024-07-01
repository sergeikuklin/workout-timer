import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      pages: path.join(__dirname, 'src/pages/'),
      features: path.join(__dirname, 'src/features/'),
      shared: path.join(__dirname, 'src/shared/'),
    },
  },
});
