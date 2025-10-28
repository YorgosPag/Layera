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
      'font-family': [/^var\(--layera?-font-/],
      'font-size':   [/^var\(--layera?-font-size-/],
      'line-height': [/^var\(--layera?-line-height-/],
      'letter-spacing': [/^var\(--layera?-letter-spacing-/],
      'z-index':     [/^var\(--layera?-z-/],
      'border-radius': [/^var\(--layera?-radius-/],
      'box-shadow':  [/^var\(--layera?-shadow-/],
      'color':       [/^var\(--layera?-/],
      'background':  [/^var\(--layera?-/],
      'background-color': [/^var\(--layera?-/],
      'border-color': [/^var\(--layera?-/]
    },

    // ΝΕΑ: ονόματα custom props - δεχόμαστε και --la- και --layera-
    'custom-property-pattern': '^--(la|layera)-'
  }
};