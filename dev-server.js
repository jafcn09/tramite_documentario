const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 4200;
const DIST_DIR = path.join(__dirname, 'dist/tramite_documentario/browser');

// Middleware para servir archivos estáticos desde dist
app.use(express.static(DIST_DIR));

// Para cualquier petición que no sea un archivo estático,
// servir index.html (SPA fallback)
app.use((req, res, next) => {
  // Si es una petición a un archivo (tiene extensión), dejar pasar
  if (path.extname(req.path)) {
    return next();
  }

  // Para cualquier ruta sin extensión, servir index.html
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✓ Development server running at http://localhost:${PORT}`);
  console.log(`✓ Serving static files from: ${DIST_DIR}`);
});
