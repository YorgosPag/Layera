const fs = require('fs');
const path = require('path');

console.log('🔑 LAYERA TRANSLATION KEYS ANALYSIS');
console.log('===================================\n');

// Find translation files
const translationFiles = [];

function findTranslationFiles(dir, depth = 0) {
  if (!fs.existsSync(dir) || depth > 3) return;

  const items = fs.readdirSync(dir);
  items.forEach(item => {
    if (item === 'node_modules' || item === '.git') return;

    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      findTranslationFiles(fullPath, depth + 1);
    } else if (item.endsWith('.json') && (dir.includes('locales') || dir.includes('translations'))) {
      translationFiles.push(fullPath);
    }
  });
}

findTranslationFiles('packages/tolgee');

console.log(`📄 Found ${translationFiles.length} translation files:`);
translationFiles.forEach(file => console.log(`   ${path.basename(file)} (${file.includes('el') ? '🇬🇷' : '🇺🇸'})`));

// Analyze translation files
const translations = { el: {}, en: {} };

translationFiles.forEach(file => {
  try {
    const content = JSON.parse(fs.readFileSync(file, 'utf8'));
    const normalizedPath = file.replace(/\\/g, '/');
    const lang = normalizedPath.includes('/el/') ? 'el' : normalizedPath.includes('/en/') ? 'en' : null;

    if (lang) {
      function extractKeys(obj, prefix = '') {
        Object.keys(obj).forEach(key => {
          const fullKey = prefix ? `${prefix}.${key}` : key;
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            extractKeys(obj[key], fullKey);
          } else {
            translations[lang][fullKey] = obj[key];
          }
        });
      }

      extractKeys(content);
    }
  } catch (parseError) {
    console.log(`❌ Could not parse ${file}: ${parseError.message}`);
  }
});

// Check for potential untranslated keys
const allKeys = new Set([...Object.keys(translations.el), ...Object.keys(translations.en)]);
const untranslatedKeys = [];

allKeys.forEach(key => {
  const elValue = translations.el[key];
  const enValue = translations.en[key];

  // Check for more obvious untranslated key patterns
  const isObviouslyUntranslated = (value, lang) => {
    if (!value) return false;

    return (
      value === key || // Exactly same as key
      value.startsWith('{{') && value.endsWith('}}') || // Template placeholder {{key}}
      value.toLowerCase().includes('todo:') || // TODO: markers
      value.toLowerCase().includes('fixme:') || // FIXME: markers
      value === 'PLACEHOLDER' || // Common placeholder text
      value === 'NOT_TRANSLATED' || // Explicit marker
      /^[A-Z_]{3,}$/.test(value) || // Long ALL_CAPS constants (3+ chars)
      (lang === 'el' && /^[a-zA-Z\s.]+$/.test(value) && value.split(' ').every(word => /^[a-zA-Z.]+$/.test(word))) || // Greek text with only Latin chars
      (lang === 'en' && /^[α-ωΑ-Ω\s.]+$/.test(value) && value.split(' ').every(word => /^[α-ωΑ-Ω.]+$/.test(word))) // English text with only Greek chars
    );
  };

  if (isObviouslyUntranslated(elValue, 'el')) {
    untranslatedKeys.push({
      key,
      elValue,
      enValue,
      issue: 'Greek translation appears untranslated'
    });
  }

  if (isObviouslyUntranslated(enValue, 'en')) {
    untranslatedKeys.push({
      key,
      elValue,
      enValue,
      issue: 'English translation appears untranslated'
    });
  }
});

// Report results
console.log(`\n📊 ANALYSIS RESULTS:`);
console.log(`   Total unique keys: ${allKeys.size}`);
console.log(`   🇬🇷 Greek translations: ${Object.keys(translations.el).length}`);
console.log(`   🇺🇸 English translations: ${Object.keys(translations.en).length}`);
console.log(`   Coverage: ${Math.round((Math.min(Object.keys(translations.el).length, Object.keys(translations.en).length) / allKeys.size) * 100)}%`);

if (untranslatedKeys.length > 0) {
  console.log(`\n❌ Found ${untranslatedKeys.length} potentially untranslated keys:`);
  untranslatedKeys.slice(0, 5).forEach(item => {
    console.log(`\n🔑 ${item.key}:`);
    console.log(`   🇬🇷 "${item.elValue}"`);
    console.log(`   🇺🇸 "${item.enValue}"`);
    console.log(`   ⚠️  ${item.issue}`);
  });
  if (untranslatedKeys.length > 5) {
    console.log(`   ... και ${untranslatedKeys.length - 5} ακόμη`);
  }

  console.log(`\n💡 SUGGESTION:`);
  console.log(`   Review these keys and ensure they have proper translations.`);
  console.log(`   Keys like "Email", "Layera" may be intentionally the same in both languages.`);
} else {
  console.log(`\n✅ No obviously untranslated keys detected!`);
  console.log(`   All translation keys appear to have proper values.`);
}

console.log('\n✨ Translation analysis complete!');