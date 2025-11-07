ΕΝΤΟΛΗ: Ενοποίηση σε μία Πηγή Αλήθειας (packages/tokens/src/tokens.json)
Στόχος

Μία πηγή (tokens.json) που παράγει ίδια --la-* variables και TypeScript exports. Καμία χειροκίνητη τιμή εκτός tokens.json.

Παραδοτέα

packages/tokens/src/tokens.json

Build που παράγει:

packages/tokens/dist/css/tokens.css

packages/tokens/dist/ts/index.ts

packages/constants/src/design-tokens.ts → χωρίς literals. Κάνει re-export από @layera/tokens/dist/ts.

Βήματα

Δημιούργησε packages/tokens/src/tokens.json
Κανόνας χαρτογράφησης: --la-color-primary-600 → color.primary.600, --la-space-16 → space.16.

{
  "color": {
    "primary": { "600": { "value": "#2563eb" } }
  },
  "space": {
    "1": { "value": "4px" },
    "2": { "value": "8px" }
  },
  "radius": {
    "md": { "value": "8px" }
  }
}


Style Dictionary config
packages/tokens/style-dictionary.config.cjs

module.exports = {
  source: ['packages/tokens/src/tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'packages/tokens/dist/css/',
      files: [
        { destination: 'tokens.css', format: 'css/variables', options: { selector: ':root' } }
      ]
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'packages/tokens/dist/ts/',
      files: [
        { destination: 'index.ts', format: 'javascript/es6' }
      ]
    }
  }
};


Scripts monorepo
package.json (root)

{
  "scripts": {
    "tokens:build": "style-dictionary build",
    "tokens:clean": "rimraf packages/tokens/dist",
    "tokens:check-diff": "git diff --quiet -- packages/tokens/dist/css/tokens.css || (echo \"Tokens CSS changed. Ensure tokens.json updated.\" && exit 1)"
  },
  "devDependencies": {
    "style-dictionary": "^4.0.0",
    "rimraf": "^6.0.0"
  }
}


Κατανάλωση TS χωρίς literals
packages/constants/src/design-tokens.ts

export * from '@layera/tokens/dist/ts';
// προαιρετικά semantic tokens/aliases:
export const cardPadding = 'var(--la-space-4)' as const;


Αφαίρεσε διπλοεγγραφές

Σήμανε τα παλιά packages/tokens/src/tokens.css και packages/styles/dist/tokens.css ως deprecated ή κάνε τα re-export του generated CSS.

Μοναδική διανομή CSS: @layera/tokens/dist/css/tokens.css.

Lint guards

.stylelintrc.json

{
  "plugins": ["stylelint-declaration-strict-value"],
  "rules": {
    "scale-unlimited/declaration-strict-value": [
      ["/color/", "z-index", "font-size", "line-height", "border-radius", "gap", "margin", "padding"],
      { "ignoreValues": ["inherit", "initial", "unset", "0"], "disableFix": true }
    ]
  }
}


Απλός έλεγχος literals σε TS/TSX: scripts/no-literals-check.mjs

import { readFileSync } from 'node:fs';
import { globby } from 'globby';
const files = await globby(['apps/**/*.{ts,tsx}', 'packages/**/*.{ts,tsx}', '!packages/tokens/**']);
const hex = /#[0-9a-fA-F]{3,8}\b/;
const px  = /\b\d+px\b/;
let bad = 0;
for (const f of files) {
  const s = readFileSync(f, 'utf8');
  if (hex.test(s) || px.test(s)) { console.log('Literal found:', f); bad++; }
}
if (bad) process.exit(1);


package.json

{
  "scripts": {
    "lint:tokens": "node scripts/no-literals-check.mjs"
  },
  "devDependencies": { "globby": "^14.0.0" }
}


CI κανόνας

Βήματα: tokens:clean && tokens:build && tokens:check-diff && lint:tokens.

Αποτυγχάνει αν:

άλλαξε tokens.css χωρίς αλλαγή στο tokens.json, ή

βρέθηκαν literals σε κώδικα.

Μετάβαση από υπάρχον CSS (μία φορά)

Αντιγραφή τιμών από packages/tokens/src/tokens.css → tokens.json με ίδια ονόματα. Μετά τρέξε:

pnpm tokens:clean && pnpm tokens:build


Κάνε diff του παλιού/νέου tokens.css. Πρέπει να είναι ισοδύναμα.

Κριτήρια αποδοχής

Μοναδικό αρχείο συντήρησης τιμών: packages/tokens/src/tokens.json.

Build παράγει @layera/tokens/dist/css/tokens.css και @layera/tokens/dist/ts/index.ts.

Κανένα literal hex/px/z-index σε app/packages εκτός generator.

@layera/constants δεν περιέχει raw τιμές. Μόνο re-exports/semantic aliases.

Εκτέλεσε και κλείσε το ticket όταν τα παραπάνω περάσουν σε CI.