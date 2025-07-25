import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/melo-chart',
  plugins: [ react() ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    coverage: {
      reporter: [ 'text', 'json', 'html' ],
      exclude: [
        '**/index.js',
      ],
    },
  },
});
