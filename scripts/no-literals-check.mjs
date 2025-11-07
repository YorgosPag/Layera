import { readFileSync } from 'node:fs';
import { globby } from 'globby';
const files = await globby([
  'apps/**/src/**/*.{ts,tsx,css,scss}',
  'packages/**/src/**/*.{ts,tsx,css,scss}',
  '!packages/tokens/**',
  '!**/node_modules/**'
]);
const hex = /#[0-9a-fA-F]{3,8}\b/;
const px  = /\b\d+px\b/;
let bad = 0;
for (const f of files) {
  const s = readFileSync(f, 'utf8');
  if (hex.test(s) || px.test(s)) { console.log('Literal:', f); bad++; }
}
if (bad) process.exit(1);
console.log('OK: no literals');