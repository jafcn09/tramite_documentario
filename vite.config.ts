import { defineConfig } from 'vite';
import { angularBuilder } from '@angular/build';

export default defineConfig({
  build: {
    target: ['es2022'],
    outDir: 'dist/tramite_documentario/browser',
  },
  server: {
    port: 4200,
    historyApiFallback: true,
  },
  plugins: [
    angularBuilder(),
  ],
});
