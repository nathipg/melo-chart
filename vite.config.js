import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/melo-chart',
  plugins: [ react() ],
  test: {
    coverage: {
      reporter: [ 'text', 'json', 'html' ],
      exclude: [
        '**/index.js',
      ],
    },
  },
});
