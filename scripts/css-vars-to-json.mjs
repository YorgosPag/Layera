/**
 * 🎯 CSS Variables to JSON Extractor - Perfect 1:1 Migration
 *
 * Extracts CSS custom properties from tokens.css and creates
 * a perfect JSON representation maintaining all names and values.
 */

import fs from 'node:fs';
import postcss from 'postcss';

const SRC = 'packages/tokens/src/tokens.css';

console.log('🔄 Extracting CSS variables to JSON...');

try {
  const css = fs.readFileSync(SRC, 'utf8');

  // Parse CSS without plugins to maintain exact values
  const root = postcss.parse(css);

  const tokens = {};

  /**
   * Set nested property in object
   * Example: set(obj, 'color.brand.primary', '#000') creates nested structure
   */
  function set(obj, path, value) {
    const parts = path.split('.');
    let current = obj;

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!(part in current)) {
        current[part] = {};
      }
      current = current[part];
    }

    current[parts[parts.length - 1]] = { value };
  }

  /**
   * Convert CSS custom property name to JSON path
   * --la-color-brand-primary -> color.brand.primary
   * --la-space-16 -> space.16
   */
  function toPath(cssVarName) {
    return cssVarName
      .replace(/^--la-/, '') // Remove --la- prefix
      .split('-')           // Split by dashes
      .join('.');           // Join with dots
  }

  // Walk through all CSS rules
  root.walkRules(rule => {
    // Only process :root rules
    const isRoot = rule.selectors?.some(selector => selector.trim() === ':root');
    if (!isRoot) return;

    // Walk through all declarations in :root
    rule.walkDecls(/^--la-/, declaration => {
      const path = toPath(declaration.prop);
      const value = declaration.value.trim();

      console.log(`  ${declaration.prop} -> ${path} = "${value}"`);
      set(tokens, path, value);
    });
  });

  // Ensure output directory exists
  fs.mkdirSync('packages/tokens/src', { recursive: true });

  // Write JSON with proper formatting
  const jsonContent = JSON.stringify(tokens, null, 2);
  fs.writeFileSync('packages/tokens/src/tokens.json', jsonContent);

  console.log('✅ Successfully wrote packages/tokens/src/tokens.json');
  console.log(`📊 Extracted ${Object.keys(tokens).length} token categories`);

} catch (error) {
  console.error('❌ Error during extraction:', error.message);
  process.exit(1);
}