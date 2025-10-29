const fs = require('fs');
const path = require('path');

console.log('🔍 SEARCHING FOR THE LAST HARDCODED COLOR');
console.log('=========================================');

function scanForColors(dir) {
  const results = [];

  function scanDir(currentDir) {
    if (!fs.existsSync(currentDir)) return;
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      if (item === 'node_modules' || item === '.git' || item === 'dist') continue;

      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
        // Skip acceptable files
        const acceptableFiles = [
          'design-tokens.ts', 'config.ts', 'constants.ts',
          'cadRenderer.ts', 'canvasUtils.ts'
        ];

        const isAcceptableFile = acceptableFiles.some(acceptableFile =>
          fullPath.includes(acceptableFile)
        );

        if (isAcceptableFile) continue;

        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const matches = content.match(/#[0-9a-fA-F]{3,6}/g);
          if (matches) {
            // Show first few lines around each match
            const lines = content.split('\n');
            const colorDetails = [];

            matches.forEach(color => {
              const lineIndex = lines.findIndex(line => line.includes(color));
              if (lineIndex !== -1) {
                colorDetails.push({
                  color,
                  line: lineIndex + 1,
                  context: lines[lineIndex].trim(),
                  before: lineIndex > 0 ? lines[lineIndex - 1].trim() : '',
                  after: lineIndex < lines.length - 1 ? lines[lineIndex + 1].trim() : ''
                });
              }
            });

            results.push({
              file: path.relative(process.cwd(), fullPath),
              colors: matches.length,
              uniqueColors: [...new Set(matches)],
              details: colorDetails
            });
          }
        } catch (error) {
          // Skip files that can't be read
        }
      }
    }
  }

  scanDir(dir);
  return results;
}

const appsColors = scanForColors('apps');
const packagesColors = scanForColors('packages');
const allResults = [...appsColors, ...packagesColors];

if (allResults.length === 0) {
  console.log('✅ NO HARDCODED COLORS FOUND!');
  console.log('🎯 All colors have been tokenized successfully');
} else {
  console.log(`❌ Found ${allResults.length} file(s) with hardcoded colors:`);
  console.log('');

  allResults.forEach(result => {
    console.log(`📁 ${result.file}`);
    console.log(`   Colors: ${result.colors} (${result.uniqueColors.join(', ')})`);
    console.log('');

    result.details.forEach((detail, index) => {
      console.log(`   ${index + 1}. Color: ${detail.color} (line ${detail.line})`);
      if (detail.before) console.log(`      Before: ${detail.before}`);
      console.log(`   >>> Current: ${detail.context}`);
      if (detail.after) console.log(`      After: ${detail.after}`);
      console.log('');
    });
  });
}

console.log(`📊 TOTAL: ${allResults.reduce((sum, r) => sum + r.colors, 0)} colors in ${allResults.length} files`);