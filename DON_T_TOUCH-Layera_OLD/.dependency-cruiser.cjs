module.exports = {
  forbidden: [
    { name: 'no-circular', severity: 'error', from: {}, to: { circular: true } },
    { name: 'no-packages-to-apps', severity: 'error', from: { path: '^packages/' }, to: { path: '^apps/' } },
    { name: 'no-cross-app', severity: 'error',
      from: { path: '^apps/([^/]+)/' },
      to:   { path: '^apps/([^/]+)/', pathNot: '^apps/$1/' } }
  ],
  options: {
    doNotFollow: { path: 'node_modules|dist|build' },
    exclude: { path: 'node_modules|dist|build|coverage' },
    tsConfig: { fileName: 'tsconfig.json' },
    reporterOptions: { dot: { collapsePattern: 'node_modules/.*' } }
  }
};