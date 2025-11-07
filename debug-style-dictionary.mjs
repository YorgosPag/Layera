import StyleDictionary from 'style-dictionary';
import config from './packages/tokens/style-dictionary.config.mjs';

const sd = new StyleDictionary(config);
await sd.buildAllPlatforms();

console.log('Total tokens:', sd.tokens.allTokens?.length || 'undefined');
console.log('Sample tokens:', sd.tokens.allTokens?.slice(0, 5).map(t => ({
  name: t.name,
  path: t.path.join('-'),
  value: t.value
})) || 'undefined');

// Check for specific missing tokens
const missingKeys = ['bg-success-light', 'color-brand-active', 'color-surface-overlay'];
missingKeys.forEach(key => {
  const token = sd.tokens.allTokens?.find(t => t.path.join('-') === key);
  console.log(`${key}:`, token ? `found - ${token.value}` : 'NOT FOUND');
});