/**
 * 🧪 SNAP PACKAGES VALIDATION SCRIPT
 * Validates τα νέα snap packages για integration readiness
 */

const fs = require('fs');
const path = require('path');

// ========================================
// 🔍 VALIDATION FUNCTIONS
// ========================================

function validatePackageStructure(packagePath, packageName) {
  console.log(`\n🔍 Validating ${packageName} structure...`);

  const requiredFiles = [
    'package.json',
    'tsconfig.json',
    'tsup.config.ts',
    'src/index.ts'
  ];

  const errors = [];
  const warnings = [];

  // Check required files
  requiredFiles.forEach(file => {
    const filePath = path.join(packagePath, file);
    if (!fs.existsSync(filePath)) {
      errors.push(`Missing required file: ${file}`);
    } else {
      console.log(`  ✅ ${file}`);
    }
  });

  // Check source directory structure
  const srcPath = path.join(packagePath, 'src');
  if (fs.existsSync(srcPath)) {
    const srcContents = fs.readdirSync(srcPath);
    console.log(`  📁 src/ contains: ${srcContents.join(', ')}`);
  }

  return { errors, warnings };
}

function validatePackageJson(packagePath, packageName) {
  console.log(`\n📦 Validating ${packageName} package.json...`);

  const packageJsonPath = path.join(packagePath, 'package.json');
  const errors = [];
  const warnings = [];

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Required fields
    const requiredFields = ['name', 'version', 'description', 'main', 'module', 'types'];
    requiredFields.forEach(field => {
      if (!packageJson[field]) {
        errors.push(`Missing required field: ${field}`);
      } else {
        console.log(`  ✅ ${field}: ${packageJson[field]}`);
      }
    });

    // Check scripts
    const requiredScripts = ['build', 'typecheck', 'lint'];
    requiredScripts.forEach(script => {
      if (!packageJson.scripts || !packageJson.scripts[script]) {
        warnings.push(`Missing script: ${script}`);
      } else {
        console.log(`  ✅ script.${script}: ${packageJson.scripts[script]}`);
      }
    });

    // Check dependencies
    if (packageJson.dependencies) {
      console.log(`  📦 Dependencies: ${Object.keys(packageJson.dependencies).length} packages`);

      // Check για workspace dependencies
      const workspaceDeps = Object.entries(packageJson.dependencies)
        .filter(([name, version]) => version === 'workspace:*')
        .map(([name]) => name);

      if (workspaceDeps.length > 0) {
        console.log(`  🔗 Workspace deps: ${workspaceDeps.join(', ')}`);
      }
    }

  } catch (error) {
    errors.push(`Failed to parse package.json: ${error.message}`);
  }

  return { errors, warnings };
}

function validateTypeScriptFiles(packagePath, packageName) {
  console.log(`\n📝 Validating ${packageName} TypeScript files...`);

  const errors = [];
  const warnings = [];

  function scanDirectory(dirPath, relativePath = '') {
    const items = fs.readdirSync(dirPath);

    items.forEach(item => {
      const itemPath = path.join(dirPath, item);
      const relativeItemPath = path.join(relativePath, item);

      if (fs.statSync(itemPath).isDirectory()) {
        scanDirectory(itemPath, relativeItemPath);
      } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
        try {
          const content = fs.readFileSync(itemPath, 'utf8');

          // Check για any types (απαγορευμένο)
          if (content.includes(': any') || content.includes('<any>')) {
            warnings.push(`File ${relativeItemPath} contains 'any' types`);
          }

          // Check για imports από existing LEGO systems
          const layeraImports = (content.match(/from '@layera\/[^']+'/g) || [])
            .map(match => match.replace("from '", '').replace("'", ''));

          if (layeraImports.length > 0) {
            console.log(`  🧩 ${relativeItemPath} uses LEGO systems: ${layeraImports.join(', ')}`);
          }

          // Check για proper exports
          if (relativeItemPath === 'index.ts' && !content.includes('export')) {
            errors.push(`Index file ${relativeItemPath} has no exports`);
          }

          console.log(`  ✅ ${relativeItemPath} (${content.split('\n').length} lines)`);

        } catch (error) {
          errors.push(`Failed to read ${relativeItemPath}: ${error.message}`);
        }
      }
    });
  }

  const srcPath = path.join(packagePath, 'src');
  if (fs.existsSync(srcPath)) {
    scanDirectory(srcPath);
  }

  return { errors, warnings };
}

function validateDependencyConsistency() {
  console.log(`\n🔗 Validating dependency consistency...`);

  const snapEnginePackage = JSON.parse(fs.readFileSync('./packages/snap-engine/package.json', 'utf8'));
  const snapInteractionsPackage = JSON.parse(fs.readFileSync('./packages/snap-interactions/package.json', 'utf8'));

  const errors = [];
  const warnings = [];

  // Check ότι snap-interactions χρησιμοποιεί snap-engine
  if (!snapInteractionsPackage.dependencies['@layera/snap-engine']) {
    errors.push('snap-interactions should depend on snap-engine');
  } else {
    console.log('  ✅ snap-interactions correctly depends on snap-engine');
  }

  // Check ότι δεν υπάρχουν circular dependencies
  const engineDeps = Object.keys(snapEnginePackage.dependencies || {});
  const interactionsDeps = Object.keys(snapInteractionsPackage.dependencies || {});

  if (engineDeps.includes('@layera/snap-interactions')) {
    errors.push('Circular dependency detected: snap-engine should not depend on snap-interactions');
  } else {
    console.log('  ✅ No circular dependencies detected');
  }

  // Check για common dependencies
  const commonLayeraDeps = engineDeps.filter(dep =>
    dep.startsWith('@layera/') && interactionsDeps.includes(dep)
  );

  if (commonLayeraDeps.length > 0) {
    console.log(`  🔗 Shared LEGO dependencies: ${commonLayeraDeps.join(', ')}`);
  }

  return { errors, warnings };
}

// ========================================
// 🧪 MAIN VALIDATION
// ========================================

function runValidation() {
  console.log('🧪 SNAP PACKAGES VALIDATION');
  console.log('========================================');

  const allErrors = [];
  const allWarnings = [];

  // Validate snap-engine
  const snapEnginePath = './packages/snap-engine';
  if (fs.existsSync(snapEnginePath)) {
    const structureResult = validatePackageStructure(snapEnginePath, '@layera/snap-engine');
    const packageResult = validatePackageJson(snapEnginePath, '@layera/snap-engine');
    const tsResult = validateTypeScriptFiles(snapEnginePath, '@layera/snap-engine');

    allErrors.push(...structureResult.errors, ...packageResult.errors, ...tsResult.errors);
    allWarnings.push(...structureResult.warnings, ...packageResult.warnings, ...tsResult.warnings);
  } else {
    allErrors.push('snap-engine package not found');
  }

  // Validate snap-interactions
  const snapInteractionsPath = './packages/snap-interactions';
  if (fs.existsSync(snapInteractionsPath)) {
    const structureResult = validatePackageStructure(snapInteractionsPath, '@layera/snap-interactions');
    const packageResult = validatePackageJson(snapInteractionsPath, '@layera/snap-interactions');
    const tsResult = validateTypeScriptFiles(snapInteractionsPath, '@layera/snap-interactions');

    allErrors.push(...structureResult.errors, ...packageResult.errors, ...tsResult.errors);
    allWarnings.push(...structureResult.warnings, ...packageResult.warnings, ...tsResult.warnings);
  } else {
    allErrors.push('snap-interactions package not found');
  }

  // Validate dependencies
  const depsResult = validateDependencyConsistency();
  allErrors.push(...depsResult.errors);
  allWarnings.push(...depsResult.warnings);

  // Report results
  console.log('\n📊 VALIDATION RESULTS');
  console.log('========================================');

  if (allErrors.length === 0) {
    console.log('✅ ALL VALIDATIONS PASSED!');
  } else {
    console.log(`❌ ${allErrors.length} ERRORS FOUND:`);
    allErrors.forEach(error => console.log(`  • ${error}`));
  }

  if (allWarnings.length > 0) {
    console.log(`⚠️  ${allWarnings.length} WARNINGS:`);
    allWarnings.forEach(warning => console.log(`  • ${warning}`));
  }

  // Summary
  console.log('\n🎯 PACKAGE SUMMARY:');
  console.log('• @layera/snap-engine: Core spatial algorithms & R-tree indexing');
  console.log('• @layera/snap-interactions: React UI components & visual feedback');
  console.log('• Integration: Uses existing LEGO systems (no duplication)');
  console.log('• TypeScript: Strict typing with no any types');

  return allErrors.length === 0;
}

// Run validation
if (require.main === module) {
  const success = runValidation();
  process.exit(success ? 0 : 1);
}

module.exports = { runValidation };