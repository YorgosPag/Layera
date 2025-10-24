#!/usr/bin/env ts-node

/**
 * 🔥 ESCO Firestore Import Script - Enterprise Edition
 *
 * Imports ESCO CSV data into Firestore με:
 * - Batch processing για performance
 * - Data validation και cleaning
 * - Progress tracking
 * - Error handling και recovery
 * - Search optimization
 *
 * Usage:
 *   npm run import:esco -- --project=layera-esco-prod --source=./tabiya-esco-v1.1.1/csv
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, collection, writeBatch, doc, Timestamp } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import { createHash } from 'crypto';
import { Command } from 'commander';

import type {
  Occupation,
  Skill,
  Category,
  OccupationSkillRelation,
  ESCOStats,
  CSVOccupationRow,
  CSVSkillRow,
  CSVRelationRow,
  ImportProgress,
  ImportStage,
  ImportError,
  ValidationResult,
  BatchResult
} from '../schemas/types';

// ===================================
// 🎯 Configuration
// ===================================

interface ImportConfig {
  projectId: string;
  sourceDir: string;
  useEmulator: boolean;
  batchSize: number;
  dryRun: boolean;
  skipValidation: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

const DEFAULT_CONFIG: Partial<ImportConfig> = {
  batchSize: 500,
  dryRun: false,
  skipValidation: false,
  logLevel: 'info',
  useEmulator: false
};

// ===================================
// 🎯 Firebase Setup
// ===================================

class FirebaseService {
  private db;
  private config: ImportConfig;

  constructor(config: ImportConfig) {
    this.config = config;

    const firebaseConfig = {
      projectId: config.projectId,
      // Add other config as needed
    };

    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);

    if (config.useEmulator) {
      connectFirestoreEmulator(this.db, 'localhost', 8080);
      console.log('🔧 Connected to Firestore Emulator');
    }
  }

  getDb() {
    return this.db;
  }

  async batchWrite<T extends Record<string, unknown>>(operations: Array<{ collection: string; id: string; data: T }>): Promise<BatchResult> {
    const batch = writeBatch(this.db);
    let successful = 0;
    const errors: Array<{ operation: any; error: string }> = [];

    try {
      operations.forEach(({ collection: collectionName, id, data }) => {
        const docRef = doc(this.db, collectionName, id);
        batch.set(docRef, data);
      });

      await batch.commit();
      successful = operations.length;

      this.log('debug', `✅ Batch write successful: ${successful} operations`);
    } catch (error) {
      this.log('error', `❌ Batch write failed: ${error}`);
      errors.push({ operation: operations, error: String(error) });
    }

    return { successful, failed: errors.length, errors };
  }

  private log(level: ImportConfig['logLevel'], message: string) {
    const levels = { debug: 0, info: 1, warn: 2, error: 3 };
    if (levels[level] >= levels[this.config.logLevel]) {
      console.log(`[${level.toUpperCase()}] ${message}`);
    }
  }
}

// ===================================
// 🎯 CSV Parsing
// ===================================

class CSVParser {
  static async parseOccupations(filePath: string): Promise<CSVOccupationRow[]> {
    return new Promise((resolve, reject) => {
      const results: CSVOccupationRow[] = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: CSVOccupationRow) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', reject);
    });
  }

  static async parseSkills(filePath: string): Promise<CSVSkillRow[]> {
    return new Promise((resolve, reject) => {
      const results: CSVSkillRow[] = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: CSVSkillRow) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', reject);
    });
  }

  static async parseRelations(filePath: string): Promise<CSVRelationRow[]> {
    return new Promise((resolve, reject) => {
      const results: CSVRelationRow[] = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: CSVRelationRow) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', reject);
    });
  }
}

// ===================================
// 🎯 Data Transformation
// ===================================

class DataTransformer {
  static transformOccupation(row: CSVOccupationRow): Occupation {
    const now = Timestamp.now();

    // Parse alternative labels
    const altLabels = row.ALTLABELS
      ? row.ALTLABELS.split('\n').map(label => label.trim()).filter(Boolean)
      : [];

    // Generate search terms
    const searchTerms = DataTransformer.generateSearchTerms([
      row.PREFERREDLABEL,
      ...altLabels,
      row.DESCRIPTION
    ]);

    return {
      id: row.ID,
      originalUri: row.ORIGINURI,
      escoVersion: 'v1.1.1',
      iscoGroupCode: row.ISCOGROUPCODE,
      iscoSubCode: row.CODE !== row.ISCOGROUPCODE ? row.CODE : '',
      preferredLabel: row.PREFERREDLABEL?.trim() || '',
      alternativeLabels: altLabels,
      description: row.DESCRIPTION?.trim() || '',
      definition: row.DEFINITION?.trim() || '',
      scopeNote: row.SCOPENOTE?.trim() || '',
      occupationType: row.OCCUPATIONTYPE,
      regulatedProfession: row.REGULATEDPROFESSIONNOTE?.includes('unregulated') ? 'unregulated' : 'regulated',
      isLocalized: row.ISLOCALIZED === 'true',
      essentialSkills: [], // Will be populated during relations import
      skillsCount: 0,
      searchTerms,
      createdAt: now,
      updatedAt: now,
      importedAt: now
    };
  }

  static transformSkill(row: CSVSkillRow): Skill {
    const now = Timestamp.now();

    const altLabels = row.ALTLABELS
      ? row.ALTLABELS.split('\n').map(label => label.trim()).filter(Boolean)
      : [];

    const searchTerms = DataTransformer.generateSearchTerms([
      row.PREFERREDLABEL,
      ...altLabels,
      row.DESCRIPTION
    ]);

    return {
      id: row.ID,
      originalUri: row.ORIGINURI,
      escoVersion: 'v1.1.1',
      skillType: row.SKILLTYPE,
      reuseLevel: row.REUSELEVEL,
      preferredLabel: row.PREFERREDLABEL?.trim() || '',
      alternativeLabels: altLabels,
      description: row.DESCRIPTION?.trim() || '',
      definition: row.DEFINITION?.trim() || '',
      scopeNote: row.SCOPENOTE?.trim() || '',
      relatedOccupations: [], // Will be populated during relations import
      occupationsCount: 0,
      searchTerms,
      createdAt: now,
      updatedAt: now,
      importedAt: now
    };
  }

  static transformRelation(row: CSVRelationRow): OccupationSkillRelation {
    const now = Timestamp.now();

    return {
      id: `${row.OCCUPATIONID}_${row.SKILLID}`,
      occupationId: row.OCCUPATIONID,
      skillId: row.SKILLID,
      relationType: row.RELATIONTYPE as 'essential' | 'optional',
      createdAt: now,
      importedAt: now
    };
  }

  private static generateSearchTerms(texts: string[]): string[] {
    const terms = new Set<string>();

    texts.forEach(text => {
      if (!text) return;

      // Split by common delimiters and normalize
      const words = text.toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 2);

      words.forEach(word => terms.add(word));

      // Add bigrams για better search
      for (let i = 0; i < words.length - 1; i++) {
        terms.add(`${words[i]} ${words[i + 1]}`);
      }
    });

    return Array.from(terms).slice(0, 50); // Limit για Firestore array size
  }
}

// ===================================
// 🎯 Data Validation
// ===================================

class DataValidator {
  static validateOccupation(occupation: Occupation): ValidationResult {
    const errors: Array<{ field: string; message: string }> = [];

    if (!occupation.id) {
      errors.push({ field: 'id', message: 'ID is required' });
    }

    if (!occupation.preferredLabel) {
      errors.push({ field: 'preferredLabel', message: 'Preferred label is required' });
    }

    if (!occupation.iscoGroupCode) {
      errors.push({ field: 'iscoGroupCode', message: 'ISCO group code is required' });
    }

    if (occupation.searchTerms.length === 0) {
      errors.push({ field: 'searchTerms', message: 'Search terms cannot be empty' });
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  static validateSkill(skill: Skill): ValidationResult {
    const errors: Array<{ field: string; message: string }> = [];

    if (!skill.id) {
      errors.push({ field: 'id', message: 'ID is required' });
    }

    if (!skill.preferredLabel) {
      errors.push({ field: 'preferredLabel', message: 'Preferred label is required' });
    }

    if (!skill.skillType) {
      errors.push({ field: 'skillType', message: 'Skill type is required' });
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// ===================================
// 🎯 Import Progress Tracking
// ===================================

class ProgressTracker {
  private progress: ImportProgress;
  private firebase: FirebaseService;

  constructor(firebase: FirebaseService) {
    this.firebase = firebase;
    this.progress = {
      stage: 'parsing_csv',
      processedCount: 0,
      totalCount: 0,
      errors: [],
      startedAt: Timestamp.now()
    };
  }

  updateStage(stage: ImportStage, totalCount?: number) {
    this.progress.stage = stage;
    this.progress.processedCount = 0;
    if (totalCount) {
      this.progress.totalCount = totalCount;
    }
    this.logProgress();
  }

  incrementProgress(count = 1) {
    this.progress.processedCount += count;
    if (this.progress.processedCount % 100 === 0) {
      this.logProgress();
    }
  }

  addError(stage: ImportStage, error: string, item?: string) {
    this.progress.errors.push({
      stage,
      item,
      error,
      timestamp: Timestamp.now()
    });
  }

  private logProgress() {
    const { stage, processedCount, totalCount } = this.progress;
    const percentage = totalCount > 0 ? Math.round((processedCount / totalCount) * 100) : 0;

    console.log(`📊 ${stage}: ${processedCount}/${totalCount} (${percentage}%)`);
  }

  getProgress(): ImportProgress {
    return { ...this.progress };
  }
}

// ===================================
// 🎯 Main Import Service
// ===================================

class ESCOImportService {
  private firebase: FirebaseService;
  private config: ImportConfig;
  private progress: ProgressTracker;

  constructor(config: ImportConfig) {
    this.config = config;
    this.firebase = new FirebaseService(config);
    this.progress = new ProgressTracker(this.firebase);
  }

  async importAll(): Promise<void> {
    try {
      console.log('🚀 Starting ESCO import...');
      console.log(`📁 Source: ${this.config.sourceDir}`);
      console.log(`🔥 Project: ${this.config.projectId}`);
      console.log(`📊 Batch size: ${this.config.batchSize}`);

      if (this.config.dryRun) {
        console.log('🔍 DRY RUN MODE - No data will be written');
      }

      // Step 1: Parse CSV files
      this.progress.updateStage('parsing_csv');
      const { occupations, skills, relations } = await this.parseCSVFiles();

      // Step 2: Import occupations
      await this.importOccupations(occupations);

      // Step 3: Import skills
      await this.importSkills(skills);

      // Step 4: Import relations and update denormalized data
      await this.importRelations(relations, occupations, skills);

      // Step 5: Generate metadata
      await this.generateMetadata(occupations, skills, relations);

      this.progress.updateStage('completed');
      console.log('✅ Import completed successfully!');

    } catch (error) {
      this.progress.updateStage('error');
      this.progress.addError('error', String(error));
      console.error('❌ Import failed:', error);
      throw error;
    }
  }

  private async parseCSVFiles() {
    console.log('📋 Parsing CSV files...');

    const occupationsPath = path.join(this.config.sourceDir, 'occupations.csv');
    const skillsPath = path.join(this.config.sourceDir, 'skills.csv');
    const relationsPath = path.join(this.config.sourceDir, 'occupation_skill_relations.csv');

    const [occupationsData, skillsData, relationsData] = await Promise.all([
      CSVParser.parseOccupations(occupationsPath),
      CSVParser.parseSkills(skillsPath),
      CSVParser.parseRelations(relationsPath)
    ]);

    console.log(`📊 Parsed: ${occupationsData.length} occupations, ${skillsData.length} skills, ${relationsData.length} relations`);

    return {
      occupations: occupationsData.map(DataTransformer.transformOccupation),
      skills: skillsData.map(DataTransformer.transformSkill),
      relations: relationsData.map(DataTransformer.transformRelation)
    };
  }

  private async importOccupations(occupations: Occupation[]): Promise<void> {
    this.progress.updateStage('importing_occupations', occupations.length);
    console.log(`👔 Importing ${occupations.length} occupations...`);

    await this.processBatches(occupations, 'occupations', (occ) => {
      if (!this.config.skipValidation) {
        const validation = DataValidator.validateOccupation(occ);
        if (!validation.valid) {
          throw new Error(`Validation failed: ${validation.errors.map(e => e.message).join(', ')}`);
        }
      }
      return { collection: 'occupations', id: occ.id, data: occ };
    });
  }

  private async importSkills(skills: Skill[]): Promise<void> {
    this.progress.updateStage('importing_skills', skills.length);
    console.log(`🔧 Importing ${skills.length} skills...`);

    await this.processBatches(skills, 'skills', (skill) => {
      if (!this.config.skipValidation) {
        const validation = DataValidator.validateSkill(skill);
        if (!validation.valid) {
          throw new Error(`Validation failed: ${validation.errors.map(e => e.message).join(', ')}`);
        }
      }
      return { collection: 'skills', id: skill.id, data: skill };
    });
  }

  private async importRelations(
    relations: OccupationSkillRelation[],
    occupations: Occupation[],
    skills: Skill[]
  ): Promise<void> {
    this.progress.updateStage('importing_relations', relations.length);
    console.log(`🔗 Importing ${relations.length} relations...`);

    // Import relations
    await this.processBatches(relations, 'relations', (rel) => ({
      collection: 'relations',
      id: rel.id,
      data: rel
    }));

    // Update denormalized data στα occupations και skills
    console.log('🔄 Updating denormalized relations...');
    await this.updateDenormalizedRelations(relations, occupations, skills);
  }

  private async updateDenormalizedRelations(
    relations: OccupationSkillRelation[],
    occupations: Occupation[],
    skills: Skill[]
  ): Promise<void> {
    // Build maps για faster lookups
    const occupationSkills = new Map<string, string[]>();
    const skillOccupations = new Map<string, string[]>();

    relations.forEach(rel => {
      if (rel.relationType === 'essential') {
        // Add skill to occupation
        if (!occupationSkills.has(rel.occupationId)) {
          occupationSkills.set(rel.occupationId, []);
        }
        occupationSkills.get(rel.occupationId)!.push(rel.skillId);

        // Add occupation to skill
        if (!skillOccupations.has(rel.skillId)) {
          skillOccupations.set(rel.skillId, []);
        }
        skillOccupations.get(rel.skillId)!.push(rel.occupationId);
      }
    });

    // Update occupations με skills
    const updatedOccupations = occupations.map(occ => ({
      ...occ,
      essentialSkills: occupationSkills.get(occ.id) || [],
      skillsCount: (occupationSkills.get(occ.id) || []).length
    }));

    // Update skills με occupations
    const updatedSkills = skills.map(skill => ({
      ...skill,
      relatedOccupations: skillOccupations.get(skill.id) || [],
      occupationsCount: (skillOccupations.get(skill.id) || []).length
    }));

    // Batch update
    console.log('💾 Updating occupations με skills...');
    await this.processBatches(updatedOccupations, 'occupations-update', (occ) => ({
      collection: 'occupations',
      id: occ.id,
      data: occ
    }));

    console.log('💾 Updating skills με occupations...');
    await this.processBatches(updatedSkills, 'skills-update', (skill) => ({
      collection: 'skills',
      id: skill.id,
      data: skill
    }));
  }

  private async generateMetadata(
    occupations: Occupation[],
    skills: Skill[],
    relations: OccupationSkillRelation[]
  ): Promise<void> {
    console.log('📊 Generating metadata...');

    const stats: ESCOStats = {
      totalOccupations: occupations.length,
      totalSkills: skills.length,
      totalRelations: relations.length,
      totalCategories: 0, // TODO: Calculate from ISCO groups
      lastImport: Timestamp.now(),
      escoVersion: 'v1.1.1',
      popularOccupations: [], // TODO: Calculate από search frequency
      popularSkills: [], // TODO: Calculate από usage frequency
      updatedAt: Timestamp.now()
    };

    if (!this.config.dryRun) {
      await this.firebase.batchWrite([{
        collection: 'metadata',
        id: 'stats',
        data: stats
      }]);
    }

    console.log('📈 Metadata generated:', stats);
  }

  private async processBatches<T>(
    items: T[],
    stage: string,
    mapper: (item: T) => { collection: string; id: string; data: any }
  ): Promise<void> {
    const batches = this.createBatches(items, this.config.batchSize);

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      if (!batch) continue;

      const operations = batch.map(mapper);

      if (!this.config.dryRun) {
        const result = await this.firebase.batchWrite(operations);
        if (result.failed > 0) {
          this.progress.addError('importing_occupations', `Batch ${i + 1} failed: ${result.errors.length} errors`);
        }
      }

      this.progress.incrementProgress(batch.length);
    }
  }

  private createBatches<T>(items: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }
    return batches;
  }
}

// ===================================
// 🎯 CLI Interface
// ===================================

async function main() {
  const program = new Command();

  program
    .name('import-esco')
    .description('Import ESCO dataset into Firestore')
    .version('1.0.0')
    .requiredOption('-p, --project <projectId>', 'Firebase project ID')
    .option('-s, --source <sourceDir>', 'Source directory με CSV files', './voithitika_docs/tabiya-open-dataset/tabiya-esco-v1.1.1/csv')
    .option('-b, --batch-size <size>', 'Batch size για Firestore writes', '500')
    .option('--dry-run', 'Run without writing to Firestore')
    .option('--skip-validation', 'Skip data validation')
    .option('--use-emulator', 'Connect to Firestore emulator')
    .option('--log-level <level>', 'Log level (debug|info|warn|error)', 'info');

  program.parse();

  const options = program.opts();

  const config: ImportConfig = {
    ...DEFAULT_CONFIG,
    projectId: options.project,
    sourceDir: path.resolve(options.source),
    batchSize: parseInt(options.batchSize),
    dryRun: options.dryRun || false,
    skipValidation: options.skipValidation || false,
    useEmulator: options.useEmulator || false,
    logLevel: options.logLevel
  };

  console.log('🔧 Import Configuration:');
  console.log(JSON.stringify(config, null, 2));

  // Verify source directory exists
  if (!fs.existsSync(config.sourceDir)) {
    console.error(`❌ Source directory not found: ${config.sourceDir}`);
    process.exit(1);
  }

  const importService = new ESCOImportService(config);
  await importService.importAll();
}

// Run CLI if this file is executed directly
if (require.main === module) {
  main().catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });
}

export { ESCOImportService, DataTransformer, DataValidator };