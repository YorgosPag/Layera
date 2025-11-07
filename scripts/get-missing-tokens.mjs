import { readFileSync } from 'node:fs';

const grab = p => new Set((readFileSync(p,'utf8').match(/--la-[a-z0-9-]+/g)||[]));
const a = grab('packages/tokens/src/tokens.css');
const b = grab('packages/tokens/dist/css/tokens.css');
const missing = [...a].filter(x => !b.has(x));
console.log(missing.join('\n'));