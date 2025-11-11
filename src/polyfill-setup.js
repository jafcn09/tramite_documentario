(function() {
  const stub = function(m) { return {}; };
  if (typeof globalThis !== 'undefined') {
    globalThis.require = stub;
    globalThis.__require = stub;
  }
  if (typeof window !== 'undefined') {
    window.require = stub;
    window.__require = stub;
  }
})();
