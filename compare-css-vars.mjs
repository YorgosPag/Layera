import fs from 'fs';
import postcss from 'postcss';

const css = fs.readFileSync('packages/tokens/src/tokens.css', 'utf8');
const root = postcss.parse(css);

const cssVars = new Set();

root.walkRules(r => {
  r.walkDecls(/^--la-/, d => {
    cssVars.add(d.prop);
  });
});

console.log('Source CSS variables found:', cssVars.size);

// Load built CSS and compare
const builtCss = fs.readFileSync('packages/tokens/dist/css/tokens.css', 'utf8');
const builtRoot = postcss.parse(builtCss);
const builtVars = new Set();

builtRoot.walkDecls(/^--la-/, d => {
  builtVars.add(d.prop);
});

console.log('Built CSS variables found:', builtVars.size);

// Find missing variables
const missing = [...cssVars].filter(v => !builtVars.has(v));
console.log('Missing variables (' + missing.length + '):', missing.slice(0, 15));