import { defineConfig } from 'vite';
import { angularBuilder } from '@angular/build';

export default defineConfig({
  build: {
    target: ['es2022'],
    outDir: 'dist/tramite_documentario/browser',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 4200,
    hmr: {
      overlay: true
    }
  },
  optimizeDeps: {
    include: [
      'chart.js',
      'ng2-charts',
      'chart.js/auto'
    ],
    exclude: ['@angular/build']
  },
  plugins: [
    angularBuilder(),
  ],
});
