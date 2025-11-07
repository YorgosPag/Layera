Προχωράς σωστά. Συνέχισε. Τα κρίσιμα για να μην “σπάσει” τίποτα:

Τι να κάνεις τώρα

Κράτα 1:1 τα ονόματα
Τα --la-* πρέπει να βγουν από το JSON με ίδια dashed names. Καμία μετονομασία.

Εξαγωγή μόνο από :root αρχικά
Θέματα ([data-theme="dark"]) τα περνάς σε δεύτερο χρόνο. Πρώτα σταθεροποίησε τη βάση.

Μην “διορθώνεις” μονάδες ή τιμές
Ό,τι έχεις σε CSS μένει ίδιο στο JSON (px, %, calc(), var()).

Αριθμητικά keys ως strings
space.16 στο JSON, όχι αριθμοί-κλειδιά χωρίς quotes.

Έλεγχος ισοδυναμίας
Μετά το build, κάνε diff παλιού/νέου tokens.css. Θέλεις ίδιο σετ variables και τιμές.

Εργαλείο εξαγωγής (1ο βήμα)
pnpm add -D postcss postcss-safe-parser

// scripts/css-vars-to-json.mjs
import fs from 'node:fs';
import postcss from 'postcss';
import safe from 'postcss-safe-parser';

const SRC = 'packages/tokens/src/tokens.css';
const css = fs.readFileSync(SRC, 'utf8');
const root = postcss.parse(css, { parser: safe });

const base = {};
function set(obj, path, value) {
  const parts = path.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]] ??= {};
  cur[parts.at(-1)] = { value };
}
function toPath(varName) {
  // --la-color-primary-600 -> color.primary.600
  return varName.replace(/^--la-/, '').split('-').join('.');
}

root.walkRules(rule => {
  const isRoot = rule.selectors?.some(s => s.trim() === ':root');
  if (!isRoot) return;
  rule.walkDecls(/^--la-/, decl => {
    const path = toPath(decl.prop);
    set(base, path, decl.value.trim());
  });
});

fs.mkdirSync('packages/tokens/src', { recursive: true });
fs.writeFileSync('packages/tokens/src/tokens.json', JSON.stringify(base, null, 2));
console.log('Wrote packages/tokens/src/tokens.json');

Ελάχιστη ρύθμιση Style Dictionary
pnpm add -D style-dictionary

// packages/tokens/style-dictionary.config.cjs
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
      files: [{ destination: 'index.ts', format: 'javascript/es6' }]
    }
  }
};

// package.json (root)
{
  "scripts": {
    "tokens:build": "style-dictionary build",
    "tokens:clean": "rimraf packages/tokens/dist",
    "tokens:migrate": "node scripts/css-vars-to-json.mjs && pnpm tokens:clean && pnpm tokens:build",
    "tokens:diff": "git diff --no-index -- packages/tokens/src/tokens.css packages/tokens/dist/css/tokens.css || true"
  },
  "devDependencies": { "style-dictionary": "^4.0.0", "rimraf": "^6.0.0" }
}

Μετά το build

Diff: τρέξε pnpm tokens:diff. Αν οι τιμές/ονόματα ταιριάζουν, είσαι ΟΚ.

design-tokens.ts: σταμάτα τα literals. Κάνε re-export από το generated TS ή όρισε μόνο semantic aliases.

// packages/constants/src/design-tokens.ts
export * from '@layera/tokens/dist/ts';
export const cardPadding = 'var(--la-space-4)' as const;

Συχνά λάθη που μπλοκάρουν το build

Μετονομασία μεταβλητών κατά την εξαγωγή. Απόφυγέ την.

Θέματα ανακατεμένα με :root. Άστα για 2ο βήμα.

JSON με numbers ως keys χωρίς quotes.

Κριτήρια “προχωρά σωστά”

Υπάρχει packages/tokens/src/tokens.json.

Το νέο dist/css/tokens.css ισούται λειτουργικά με το παλιό.

Δεν υπάρχουν νέα literals σε packages/constants ή apps.