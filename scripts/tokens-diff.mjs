import fs from 'node:fs';
const oldCss = fs.readFileSync('packages/tokens/src/tokens.css','utf8');
const neuCss = fs.readFileSync('packages/tokens/dist/css/tokens.css','utf8');
const grab = s => new Set((s.match(/--la-[a-z0-9-]+/g) ?? []).sort());
const a = grab(oldCss), b = grab(neuCss);
const onlyA = [...a].filter(x => !b.has(x));
const onlyB = [...b].filter(x => !a.has(x));
if (onlyA.length || onlyB.length) {
  console.error('Missing in new:', onlyA);
  console.error('New extras  :', onlyB);
  process.exit(1);
} else {
  console.log('OK: same variable set');
}