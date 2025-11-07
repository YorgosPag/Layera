import fs from 'node:fs';
import postcss from 'postcss';

const SRC = 'packages/tokens/src/tokens.css';
const OUT = 'packages/tokens/src/tokens.json';

const css = fs.readFileSync(SRC,'utf8');
const root = postcss.parse(css);

const json = {};
const set = (obj, path, value) => {
  const parts = path.split('.');
  let cur = obj;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    // If current node has a value, we need to handle the conflict
    if (cur[part]?.value !== undefined) {
      // Move the existing value to a _base key to preserve it
      const existingValue = cur[part].value;
      cur[part] = { _base: { value: existingValue } };
    }
    cur = cur[part] ??= {};
  }

  const lastPart = parts.at(-1);
  // Handle final level conflicts too
  if (cur[lastPart] && typeof cur[lastPart] === 'object' && !cur[lastPart].value) {
    // There are nested properties, so this is a direct value for a branching node
    cur[lastPart]._direct = { value };
  } else if (cur[lastPart]?.value) {
    // There's already a value here, convert to structure with _base
    const existingValue = cur[lastPart].value;
    cur[lastPart] = { _base: { value: existingValue } };
  } else {
    cur[lastPart] = { value };
  }
};

// First collect all variables
const variables = [];

root.walkRules(r => {
  // Include :root, [data-theme="light"], and [data-theme="dark"] selectors
  if (!r.selectors?.some(s => {
    const selector = s.trim();
    return selector === ':root' ||
           selector.includes('[data-theme="light"]') ||
           selector.includes('[data-theme="dark"]');
  })) return;

  r.walkDecls(/^--la-/, d => {
    const name = d.prop.replace(/^--la-/, '');

    // Handle special cases to avoid JSON key conflicts
    const safeName = name
      // Replace numeric patterns that cause conflicts
      .replace(/^space-1-5$/, 'space-1_5')
      .replace(/^space-2-5$/, 'space-2_5')
      .replace(/(\d)-(\d)/g, '$1_$2'); // General numeric dash pattern

    const path = safeName.split('-').join('.');
    variables.push({
      path,
      value: d.value.trim(),
      original: d.prop
    });
  });
});

// Sort variables by path complexity (simple paths first)
variables.sort((a, b) => {
  const aDepth = a.path.split('.').length;
  const bDepth = b.path.split('.').length;
  if (aDepth !== bDepth) return aDepth - bDepth;
  return a.path.localeCompare(b.path);
});

// Process variables in sorted order
variables.forEach(variable => {
  set(json, variable.path, variable.value);
});

fs.writeFileSync(OUT, JSON.stringify({ ...json }, null, 2));
console.log('Rebuilt tokens.json from tokens.css');