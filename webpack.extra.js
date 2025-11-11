module.exports = {
  externals: {
    crypto: 'commonjs crypto',
    net: 'commonjs net',
    tls: 'commonjs tls',
    fs: 'commonjs fs'
  },
  node: {
    crypto: false,
    net: false,
    tls: false,
    fs: false
  }
};
