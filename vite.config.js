import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/melo-chart',
  plugins: [ react() ],
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
