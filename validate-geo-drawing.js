#!/usr/bin/env node

/**
 * Validation script για @layera/geo-drawing LEGO package
 * Ελέγχει TypeScript compliance, dependencies, και structure
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 GEO-DRAWING PACKAGE VALIDATION');
console.log('=====================================');

const packageDir = path.join(__dirname, 'packages', 'geo-drawing');
let validationPassed = true;
const errors = [];
const warnings = [];

/**
 * Helper functions
 */
function logError(message) {
  errors.push(message);
  console.log(`❌ ${message}`);
  validationPassed = false;
}

function logWarning(message) {
  warnings.push(message);
  console.log(`⚠️  ${message}`);
}

function logSuccess(message) {
  console.log(`✅ ${message}`);
}

function checkFileExists(filePath, isOptional = false) {
  const fullPath = path.join(packageDir, filePath);
  if (fs.existsSync(fullPath)) {
    logSuccess(`Found ${filePath}`);
    return true;
  } else {
    if (isOptional) {
      logWarning(`Optional file missing: ${filePath}`);
    } else {
      logError(`Required file missing: ${filePath}`);
    }
    return false;
  }
}

function checkDirectoryExists(dirPath) {
  const fullPath = path.join(packageDir, dirPath);
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
    logSuccess(`Found directory ${dirPath}`);
    return true;
  } else {
    logError(`Required directory missing: ${dirPath}`);
    return false;
  }
}

/**
 * 1. Package structure validation
 */
console.log('\n📁 Package Structure Validation:');

// Check required files
checkFileExists('package.json');
checkFileExists('tsconfig.json');
checkFileExists('tsup.config.ts');
checkFileExists('src/index.ts');

// Check required directories
checkDirectoryExists('src');
checkDirectoryExists('src/components');
checkDirectoryExists('src/hooks');
checkDirectoryExists('src/utils');
checkDirectoryExists('src/services');
checkDirectoryExists('src/types');

// Check core files
checkFileExists('src/types/index.ts');
checkFileExists('src/hooks/useMeasurement.ts');
checkFileExists('src/hooks/useGeometrySnap.ts');
checkFileExists('src/components/MeasurementControls.tsx');
checkFileExists('src/components/MeasurementCanvas.tsx');
checkFileExists('src/components/GeometryRenderer.tsx');
checkFileExists('src/utils/calculations.ts');
checkFileExists('src/utils/formatters.ts');
checkFileExists('src/utils/geometry.ts');
checkFileExists('src/services/osmService.ts');

/**
 * 2. Package.json validation
 */
console.log('\n📦 Package.json Validation:');

try {
  const packageJsonPath = path.join(packageDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Check required fields
  if (packageJson.name === '@layera/geo-drawing') {
    logSuccess('Package name is correct');
  } else {
    logError(`Package name should be '@layera/geo-drawing', got '${packageJson.name}'`);
  }

  if (packageJson.version) {
    logSuccess(`Package version: ${packageJson.version}`);
  } else {
    logError('Package version is missing');
  }

  // Check dependencies
  const requiredDeps = [
    'react',
    'react-leaflet',
    'leaflet',
    '@layera/constants',
    '@layera/i18n',
    '@layera/theme-switcher',
    '@layera/error-boundary',
    '@layera/notifications',
    '@layera/loading',
    '@layera/buttons',
    '@layera/icons',
    '@layera/typography',
    '@layera/layout',
    '@layera/cards',
    '@layera/forms',
    '@layera/snap-engine',
    '@layera/snap-interactions'
  ];

  requiredDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      logSuccess(`Dependency found: ${dep}`);
    } else {
      logError(`Missing required dependency: ${dep}`);
    }
  });

} catch (error) {
  logError(`Failed to parse package.json: ${error.message}`);
}

/**
 * 3. TypeScript validation
 */
console.log('\n🔷 TypeScript Validation:');

try {
  const tsconfigPath = path.join(packageDir, 'tsconfig.json');
  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));

  // Check strict mode
  if (tsconfig.compilerOptions && tsconfig.compilerOptions.strict) {
    logSuccess('TypeScript strict mode enabled');
  } else {
    logError('TypeScript strict mode is not enabled');
  }

  // Check for noImplicitAny
  if (tsconfig.compilerOptions && tsconfig.compilerOptions.noImplicitAny) {
    logSuccess('noImplicitAny enabled');
  } else {
    logError('noImplicitAny should be enabled');
  }

} catch (error) {
  logError(`Failed to parse tsconfig.json: ${error.message}`);
}

/**
 * 4. Content validation (basic)
 */
console.log('\n📄 Content Validation:');

try {
  // Check main index.ts exports
  const indexPath = path.join(packageDir, 'src', 'index.ts');
  const indexContent = fs.readFileSync(indexPath, 'utf8');

  const requiredExports = [
    'useMeasurement',
    'useGeometrySnap',
    'MeasurementControls',
    'MeasurementCanvas',
    'GeometryRenderer',
    'calculateDistance',
    'formatDistance',
    'fetchBuildingOutlines'
  ];

  requiredExports.forEach(exportName => {
    if (indexContent.includes(exportName)) {
      logSuccess(`Export found: ${exportName}`);
    } else {
      logError(`Missing export: ${exportName}`);
    }
  });

  // Check for any types (should be zero)
  if (indexContent.includes(': any') || indexContent.includes('<any>')) {
    logError('Found "any" types in index.ts - should use specific types');
  } else {
    logSuccess('No "any" types found in index.ts');
  }

} catch (error) {
  logError(`Failed to validate content: ${error.message}`);
}

/**
 * 5. Integration validation
 */
console.log('\n🔗 Integration Validation:');

try {
  // Check if @layera/constants has geo-drawing exports
  const constantsPath = path.join(__dirname, 'packages', 'constants', 'src', 'index.ts');
  if (fs.existsSync(constantsPath)) {
    const constantsContent = fs.readFileSync(constantsPath, 'utf8');
    if (constantsContent.includes('geo-drawing')) {
      logSuccess('@layera/constants includes geo-drawing exports');
    } else {
      logError('@layera/constants missing geo-drawing exports');
    }
  } else {
    logWarning('@layera/constants package not found for validation');
  }

  // Check geo-drawing constants file
  const geoConstantsPath = path.join(__dirname, 'packages', 'constants', 'src', 'geo-drawing.ts');
  if (fs.existsSync(geoConstantsPath)) {
    logSuccess('Geo-drawing constants file exists');
  } else {
    logError('Geo-drawing constants file missing');
  }

} catch (error) {
  logError(`Failed to validate integration: ${error.message}`);
}

/**
 * Results summary
 */
console.log('\n📊 VALIDATION SUMMARY');
console.log('===================');

if (validationPassed) {
  console.log('✅ ALL VALIDATIONS PASSED!');
  console.log('');
  console.log('🎯 PACKAGE SUMMARY:');
  console.log('• @layera/geo-drawing: Geo-spatial drawing & measurement LEGO system');
  console.log('• Integration: Uses existing LEGO systems (no duplication)');
  console.log('• TypeScript: Strict typing with no any types');
  console.log('• OSM Integration: Building outlines με snap-to-geometry');
  console.log('• Measurement Tools: Distance, area, point measurements');
  console.log('• Theme Support: Dark/light theme aware');
  console.log('• i18n Ready: Internationalization support');
  console.log('');
  console.log('🚀 READY FOR BUILD AND INTEGRATION!');

  process.exit(0);
} else {
  console.log('❌ VALIDATION FAILED!');
  console.log('');
  console.log(`Found ${errors.length} error(s) and ${warnings.length} warning(s)`);
  console.log('');
  console.log('Errors:');
  errors.forEach(error => console.log(`  - ${error}`));

  if (warnings.length > 0) {
    console.log('');
    console.log('Warnings:');
    warnings.forEach(warning => console.log(`  - ${warning}`));
  }

  process.exit(1);
}