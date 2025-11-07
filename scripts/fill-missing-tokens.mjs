import fs from 'node:fs';
import postcss from 'postcss';

const SRC_CSS = 'packages/tokens/src/tokens.css';
const JSON_PATH = 'packages/tokens/src/tokens.json';
const css = fs.readFileSync(SRC_CSS,'utf8');
const root = postcss.parse(css);

const json = JSON.parse(fs.readFileSync(JSON_PATH,'utf8'));

// helper: set deep path
function set(obj, path, value) {
  const parts = path.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]] ??= {};
  if (!cur[parts.at(-1)]) cur[parts.at(-1)] = { value }; // μην overwrite
}
// helper: --la-foo-bar -> foo.bar  | space-1-5 -> space.1.5
function toPath(varName) {
  return varName.replace(/^--la-/, '').split('-').join('.');
}

root.walkRules(r => {
  if (!r.selectors?.some(s => s.trim() === ':root')) return;
  r.walkDecls(/^--la-/, d => {
    const p = toPath(d.prop);
    // Αν έχεις ήδη reference στο JSON, μην αλλάξεις τίποτα
    // Διαφορετικά γράψε την ακριβή τιμή από το παλιό CSS (1:1)
    set(json, p, d.value.trim());
  });
});

fs.writeFileSync(JSON_PATH, JSON.stringify(json, null, 2));
console.log('Filled missing tokens from src/tokens.css');