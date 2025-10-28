module.exports = {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['packages/tokens/**','packages/styles/**','**/*.svg','**/dist/**','**/node_modules/**'],
  rules: {
    // Ήδη: μπλοκάρει hex/rgb/hsl και px
    'color-no-hex': true,
    'declaration-property-value-disallowed-list': {
      '/.*/': [/rgb\(/, /hsl\(/, /#[0-9a-fA-F]+/]
    },
    'unit-disallowed-list': ['px'],

    // ΝΕΑ: επιτρέπουμε ΜΟΝΟ tokens για τις κρίσιμες ιδιότητες
    'declaration-property-value-allowed-list': {
      'font-family': [/^var\(--la-font-/],
      'font-size':   [/^var\(--la-font-size-/],
      'line-height': [/^var\(--la-line-height-/],
      'letter-spacing': [/^var\(--la-letter-spacing-/],
      'z-index':     [/^var\(--la-z-/],
      'border-radius': [/^var\(--la-radius-/],
      'box-shadow':  [/^var\(--la-shadow-/],
      'color':       [/^var\(--la-/],
      'background':  [/^var\(--la-/],
      'background-color': [/^var\(--la-/],
      'border-color': [/^var\(--la-/]
    },

    // ΝΕΑ: ονόματα custom props - ΜΟΝΟ --la- prefixes
    'custom-property-pattern': '^--la-'
  }
};