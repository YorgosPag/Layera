#!/usr/bin/env ts-node

/**
 * 🧪 ESCO Import Test Script
 *
 * Tests the import script με sample data για verification
 */

import * as path from 'path';
import { ESCOImportService, DataTransformer } from './import-esco';

async function testDataTransformation() {
  console.log('🧪 Testing data transformation...');

  // Sample CSV data
  const sampleOccupation = {
    ORIGINURI: 'http://data.europa.eu/esco/occupation/test',
    ID: 'test_123',
    UUIDHISTORY: 'uuid-123',
    ISCOGROUPCODE: '2654',
    CODE: '2654.1.7',
    PREFERREDLABEL: 'Software Developer',
    ALTLABELS: 'Programmer\nCoder\nSoftware Engineer',
    DESCRIPTION: 'Develops software applications and systems',
    DEFINITION: 'Technical definition here',
    SCOPENOTE: 'Scope information',
    REGULATEDPROFESSIONNOTE: 'http://data.europa.eu/esco/regulated-professions/unregulated',
    OCCUPATIONTYPE: 'escooccupation',
    ISLOCALIZED: 'false'
  };

  const sampleSkill = {
    ORIGINURI: 'http://data.europa.eu/esco/skill/test',
    ID: 'skill_123',
    UUIDHISTORY: 'skill-uuid-123',
    SKILLTYPE: 'skill/competence',
    REUSELEVEL: 'cross-sector',
    PREFERREDLABEL: 'JavaScript Programming',
    ALTLABELS: 'JS\nJavaScript Development',
    DESCRIPTION: 'Programming in JavaScript language',
    DEFINITION: 'Technical skill definition',
    SCOPENOTE: 'Usage scope'
  };

  // Transform data
  const occupation = DataTransformer.transformOccupation(sampleOccupation);
  const skill = DataTransformer.transformSkill(sampleSkill);

  console.log('✅ Transformed Occupation:', {
    id: occupation.id,
    preferredLabel: occupation.preferredLabel,
    alternativeLabels: occupation.alternativeLabels,
    searchTerms: occupation.searchTerms.slice(0, 5),
    iscoGroupCode: occupation.iscoGroupCode
  });

  console.log('✅ Transformed Skill:', {
    id: skill.id,
    preferredLabel: skill.preferredLabel,
    skillType: skill.skillType,
    reuseLevel: skill.reuseLevel,
    searchTerms: skill.searchTerms.slice(0, 5)
  });

  return { occupation, skill };
}

async function testDryRun() {
  console.log('🔍 Testing dry run import...');

  const config = {
    projectId: 'layera-esco-test',
    sourceDir: path.resolve('./voithitika_docs/tabiya-open-dataset/tabiya-esco-v1.1.1/csv'),
    useEmulator: true,
    batchSize: 10, // Small batch για testing
    dryRun: true,
    skipValidation: false,
    logLevel: 'debug' as const
  };

  console.log('📊 Test Configuration:', config);

  // Check if source files exist
  const fs = require('fs');
  const requiredFiles = ['occupations.csv', 'skills.csv', 'occupation_skill_relations.csv'];

  console.log('🔍 Checking source files...');
  for (const file of requiredFiles) {
    const filePath = path.join(config.sourceDir, file);
    if (fs.existsSync(filePath)) {
      console.log(`✅ Found: ${file}`);
    } else {
      console.log(`❌ Missing: ${file}`);
      throw new Error(`Required file missing: ${file}`);
    }
  }

  // Run dry run import
  console.log('🚀 Starting dry run import...');
  const importService = new ESCOImportService(config);

  try {
    await importService.importAll();
    console.log('✅ Dry run completed successfully!');
  } catch (error) {
    console.error('❌ Dry run failed:', error);
    throw error;
  }
}

async function main() {
  try {
    console.log('🧪 Starting ESCO import tests...\n');

    // Test 1: Data transformation
    await testDataTransformation();
    console.log('\n');

    // Test 2: Dry run import
    await testDryRun();

    console.log('\n✅ All tests passed! Ready για production import.');

  } catch (error) {
    console.error('\n❌ Tests failed:', error);
    process.exit(1);
  }
}

// Run tests
if (require.main === module) {
  main();
}