const cryptoModule = require('crypto-browserify');
const bufferModule = require('buffer');

if (typeof (globalThis as any).require === 'undefined') {
  (globalThis as any).require = function(module: string) {
    if (module === 'crypto' || module === 'node:crypto') {
      return cryptoModule;
    }
    if (module === 'buffer' || module === 'node:buffer') {
      return bufferModule;
    }
    throw new Error(`Module not found: ${module}`);
  };
}
