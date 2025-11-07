import fs from 'node:fs';

/**
 * 🚨 Smoke test for design tokens
 * Validates that expected number of tokens are generated in dist
 * Note: Source has more tokens (268) but dist filters out _direct variants (232)
 */

const EXPECTED_DIST_COUNT = 232; // Filtered output (exclude/direct)
const DIST_CSS = 'packages/tokens/dist/css/tokens.css';

try {
  const distCss = fs.readFileSync(DIST_CSS, 'utf8');
  const distCount = (distCss.match(/^ *--la-/gm) || []).length;

  if (distCount !== EXPECTED_DIST_COUNT) {
    console.error(`❌ Token count mismatch! Expected: ${EXPECTED_DIST_COUNT}, Found: ${distCount}`);
    process.exit(1);
  }

  console.log(`✅ Smoke test passed: ${distCount} tokens as expected (filtered dist)`);
} catch (error) {
  console.error(`❌ Smoke test failed: ${error.message}`);
  process.exit(1);
}