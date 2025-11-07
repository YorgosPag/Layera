import { readFileSync } from 'node:fs';
import { globby } from 'globby';

const files = await globby([
  '**/*.css',
  '!**/node_modules/**',
  '!packages/tokens/src/**',
  '!packages/tokens/dist/**',
  '!packages/styles/src/tokens.css',
  '!packages/styles/dist/**',
  '!*/*normalize*.css',
  '!*/*reset*.css'
]);

const HEX = /#[0-9a-fA-F]{3,8}\b/;
const PX  = /\b\d+px\b/;
const VAR = /var\(\s*--la-[^)]+\)/;

const isDistPath = p =>
  /(?:^|\/)(dist|build)\/./.test(p.replace(/\\/g,'/')) ||
  p.replace(/\\/g,'/').startsWith('packages/tokens/dist/');

const classify = (p, src) => {
  const head = src.slice(0, 400);
  const tail = src.slice(-400);
  const autoHeader = /Do not edit directly|auto-generated|style-dictionary/i.test(head);
  const hasMap = /# sourceMappingURL=.+\.map/.test(tail);

  if (isDistPath(p) || autoHeader || hasMap) return 'generated';
  return 'manual';
};

const report = { generated: [], manual: [], suspects: [] };

for (const p of files) {
  const src = readFileSync(p, 'utf8');
  const kind = classify(p, src);
  if (kind === 'generated') report.generated.push(p);
  else {
    report.manual.push(p);
    const hasLiterals = HEX.test(src) || PX.test(src);
    const mostlyVars  = (src.match(VAR)||[]).length >= (src.match(/:\s*[^;]+;/g)||[]).length * 0.8;
    if (hasLiterals || !mostlyVars) report.suspects.push(p);
  }
}

console.log('🔍 CSS AUDIT RESULTS');
console.log('===================');
console.log('Generated CSS files:', report.generated.length);
console.log('Manual CSS files   :', report.manual.length);

if (report.generated.length > 0) {
  console.log('\n✅ Generated CSS files:');
  for (const p of report.generated) console.log(' ✓', p);
}

if (report.manual.length > 0) {
  console.log('\n📝 Manual CSS files:');
  for (const p of report.manual) {
    if (!report.suspects.includes(p)) {
      console.log(' ✓', p, '(compliant)');
    }
  }
}

if (report.suspects.length) {
  console.error('\n❌ SUSPECT MANUAL CSS (literals or low var usage):');
  for (const p of report.suspects) console.error(' ⚠️ ', p);
  console.error('\n🚨 ENTERPRISE SST COMPLIANCE VIOLATION DETECTED!');
  console.error('   These files contain hardcoded values instead of design tokens.');
  console.error('   Please migrate to @layera/tokens variables (var(--la-*)).');
  process.exitCode = 1; // fail audit if suspects exist
} else {
  console.log('\n✅ No suspicious manual CSS found.');
  console.log('🏆 ENTERPRISE SST COMPLIANCE: PERFECT');
}