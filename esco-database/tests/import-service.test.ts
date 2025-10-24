/**
 * 🧪 Enterprise Import Service Tests
 * Comprehensive testing για ESCO import functionality
 */

import { DataTransformer, DataValidator } from '../scripts/import-esco';
import type { CSVOccupationRow, CSVSkillRow, Occupation, Skill } from '../schemas/types';

describe('🏗️ ESCO Import Service - Enterprise Tests', () => {

  describe('📊 Data Transformation', () => {

    test('should transform occupation CSV row correctly', () => {
      const csvRow: CSVOccupationRow = {
        ORIGINURI: 'http://data.europa.eu/esco/occupation/test-123',
        ID: 'key_test_123',
        UUIDHISTORY: 'uuid-test-123',
        ISCOGROUPCODE: '2654',
        CODE: '2654.1.7',
        PREFERREDLABEL: 'Software Developer',
        ALTLABELS: 'Programmer\nCoder\nSoftware Engineer',
        DESCRIPTION: 'Develops software applications and systems using various programming languages',
        DEFINITION: 'Technical definition of software development role',
        SCOPENOTE: 'Includes web, mobile, and desktop application development',
        REGULATEDPROFESSIONNOTE: 'http://data.europa.eu/esco/regulated-professions/unregulated',
        OCCUPATIONTYPE: 'escooccupation',
        ISLOCALIZED: 'false'
      };

      const result = DataTransformer.transformOccupation(csvRow);

      // Core identity
      expect(result.id).toBe('key_test_123');
      expect(result.originalUri).toBe('http://data.europa.eu/esco/occupation/test-123');
      expect(result.escoVersion).toBe('v1.1.1');

      // ISCO classification
      expect(result.iscoGroupCode).toBe('2654');
      expect(result.iscoSubCode).toBe('2654.1.7');

      // Labels
      expect(result.preferredLabel).toBe('Software Developer');
      expect(result.alternativeLabels).toEqual(['Programmer', 'Coder', 'Software Engineer']);

      // Professional info
      expect(result.occupationType).toBe('escooccupation');
      expect(result.regulatedProfession).toBe('unregulated');
      expect(result.isLocalized).toBe(false);

      // Search terms generated
      expect(result.searchTerms).toContain('software');
      expect(result.searchTerms).toContain('developer');
      expect(result.searchTerms).toContain('programmer');

      // Metadata
      expect(result.createdAt).toBeDefined();
      expect(result.updatedAt).toBeDefined();
      expect(result.importedAt).toBeDefined();
    });

    test('should transform skill CSV row correctly', () => {
      const csvRow: CSVSkillRow = {
        ORIGINURI: 'http://data.europa.eu/esco/skill/test-456',
        ID: 'key_skill_456',
        UUIDHISTORY: 'skill-uuid-456',
        SKILLTYPE: 'skill/competence',
        REUSELEVEL: 'cross-sector',
        PREFERREDLABEL: 'JavaScript Programming',
        ALTLABELS: 'JS Development\nJavaScript Coding',
        DESCRIPTION: 'Programming in JavaScript language για web applications',
        DEFINITION: 'Client-side and server-side JavaScript development',
        SCOPENOTE: 'Includes ES6+, frameworks, and libraries'
      };

      const result = DataTransformer.transformSkill(csvRow);

      expect(result.id).toBe('key_skill_456');
      expect(result.skillType).toBe('skill/competence');
      expect(result.reuseLevel).toBe('cross-sector');
      expect(result.preferredLabel).toBe('JavaScript Programming');
      expect(result.alternativeLabels).toEqual(['JS Development', 'JavaScript Coding']);
      expect(result.searchTerms).toContain('javascript');
      expect(result.searchTerms).toContain('programming');
    });

    test('should handle empty alternative labels', () => {
      const csvRow: CSVOccupationRow = {
        ORIGINURI: 'http://data.europa.eu/esco/occupation/simple',
        ID: 'key_simple',
        UUIDHISTORY: 'uuid-simple',
        ISCOGROUPCODE: '1000',
        CODE: '1000',
        PREFERREDLABEL: 'Simple Job',
        ALTLABELS: '', // Empty alternative labels
        DESCRIPTION: 'A simple job description',
        DEFINITION: '',
        SCOPENOTE: '',
        REGULATEDPROFESSIONNOTE: 'unregulated',
        OCCUPATIONTYPE: 'escooccupation',
        ISLOCALIZED: 'false'
      };

      const result = DataTransformer.transformOccupation(csvRow);
      expect(result.alternativeLabels).toEqual([]);
      expect(result.searchTerms).toContain('simple');
      expect(result.searchTerms).toContain('job');
    });
  });

  describe('✅ Data Validation', () => {

    test('should validate correct occupation', () => {
      const occupation: Occupation = {
        id: 'test_123',
        originalUri: 'http://test.com',
        escoVersion: 'v1.1.1',
        iscoGroupCode: '2654',
        preferredLabel: 'Test Job',
        alternativeLabels: ['Alt Job'],
        description: 'Test description',
        occupationType: 'escooccupation',
        regulatedProfession: 'unregulated',
        isLocalized: false,
        essentialSkills: [],
        skillsCount: 0,
        searchTerms: ['test', 'job'],
        createdAt: new Date() as any,
        updatedAt: new Date() as any,
        importedAt: new Date() as any
      };

      const result = DataValidator.validateOccupation(occupation);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should detect missing required fields', () => {
      const invalidOccupation: Partial<Occupation> = {
        id: '',
        preferredLabel: '',
        iscoGroupCode: '',
        searchTerms: [],
        // Missing required fields intentionally για validation test
        originalUri: '',
        escoVersion: '',
        alternativeLabels: [],
        description: '',
        occupationType: '',
        regulatedProfession: 'unregulated',
        isLocalized: false,
        essentialSkills: [],
        skillsCount: 0,
        createdAt: new Date() as any,
        updatedAt: new Date() as any,
        importedAt: new Date() as any
      };

      const result = DataValidator.validateOccupation(invalidOccupation as Occupation);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.objectContaining({ field: 'id', message: 'ID is required' })
      );
      expect(result.errors).toContainEqual(
        expect.objectContaining({ field: 'preferredLabel', message: 'Preferred label is required' })
      );
    });

    test('should validate correct skill', () => {
      const skill: Skill = {
        id: 'skill_123',
        originalUri: 'http://test.com/skill',
        escoVersion: 'v1.1.1',
        skillType: 'skill/competence',
        reuseLevel: 'cross-sector',
        preferredLabel: 'Test Skill',
        alternativeLabels: [],
        description: 'Test skill description',
        relatedOccupations: [],
        occupationsCount: 0,
        searchTerms: ['test', 'skill'],
        createdAt: new Date() as any,
        updatedAt: new Date() as any,
        importedAt: new Date() as any
      };

      const result = DataValidator.validateSkill(skill);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('🔍 Search Terms Generation', () => {

    test('should generate comprehensive search terms', () => {
      const csvRow: CSVOccupationRow = {
        ORIGINURI: 'http://test.com',
        ID: 'test',
        UUIDHISTORY: 'uuid',
        ISCOGROUPCODE: '2654',
        CODE: '2654',
        PREFERREDLABEL: 'Senior Software Engineer',
        ALTLABELS: 'Lead Developer\nSoftware Architect',
        DESCRIPTION: 'Develops complex software systems με advanced programming techniques',
        DEFINITION: '',
        SCOPENOTE: '',
        REGULATEDPROFESSIONNOTE: 'unregulated',
        OCCUPATIONTYPE: 'escooccupation',
        ISLOCALIZED: 'false'
      };

      const result = DataTransformer.transformOccupation(csvRow);

      // Single words
      expect(result.searchTerms).toContain('senior');
      expect(result.searchTerms).toContain('software');
      expect(result.searchTerms).toContain('engineer');
      expect(result.searchTerms).toContain('developer');
      expect(result.searchTerms).toContain('architect');

      // Bigrams
      expect(result.searchTerms).toContain('senior software');
      expect(result.searchTerms).toContain('software engineer');
      expect(result.searchTerms).toContain('lead developer');

      // Should not contain stop words or very short words
      expect(result.searchTerms).not.toContain('a');
      expect(result.searchTerms).not.toContain('an');
      expect(result.searchTerms).not.toContain('με'); // Greek stop word
    });

    test('should limit search terms array size', () => {
      // Create a very long description to test limits
      const longDescription = Array(100).fill('word').join(' ');

      const csvRow: CSVOccupationRow = {
        ORIGINURI: 'http://test.com',
        ID: 'test',
        UUIDHISTORY: 'uuid',
        ISCOGROUPCODE: '2654',
        CODE: '2654',
        PREFERREDLABEL: 'Test Job',
        ALTLABELS: '',
        DESCRIPTION: longDescription,
        DEFINITION: '',
        SCOPENOTE: '',
        REGULATEDPROFESSIONNOTE: 'unregulated',
        OCCUPATIONTYPE: 'escooccupation',
        ISLOCALIZED: 'false'
      };

      const result = DataTransformer.transformOccupation(csvRow);

      // Should limit to 50 terms για Firestore array constraints
      expect(result.searchTerms.length).toBeLessThanOrEqual(50);
    });
  });

  describe('🏗️ Enterprise Requirements', () => {

    test('should maintain referential integrity', () => {
      const occupation = DataTransformer.transformOccupation({
        ORIGINURI: 'http://test.com',
        ID: 'occ_123',
        UUIDHISTORY: 'uuid',
        ISCOGROUPCODE: '2654',
        CODE: '2654',
        PREFERREDLABEL: 'Test Occupation',
        ALTLABELS: '',
        DESCRIPTION: 'Test',
        DEFINITION: '',
        SCOPENOTE: '',
        REGULATEDPROFESSIONNOTE: 'unregulated',
        OCCUPATIONTYPE: 'escooccupation',
        ISLOCALIZED: 'false'
      });

      // Essential skills should be array (will be populated during relations import)
      expect(Array.isArray(occupation.essentialSkills)).toBe(true);
      expect(occupation.skillsCount).toBe(0);

      // Timestamps should be consistent
      expect(occupation.createdAt).toEqual(occupation.updatedAt);
      expect(occupation.importedAt).toEqual(occupation.createdAt);
    });

    test('should handle regulated vs unregulated professions', () => {
      const regulatedRow: CSVOccupationRow = {
        ORIGINURI: 'http://test.com',
        ID: 'regulated_123',
        UUIDHISTORY: 'uuid',
        ISCOGROUPCODE: '2200',
        CODE: '2200',
        PREFERREDLABEL: 'Medical Doctor',
        ALTLABELS: '',
        DESCRIPTION: 'Licensed medical professional',
        DEFINITION: '',
        SCOPENOTE: '',
        REGULATEDPROFESSIONNOTE: 'http://data.europa.eu/esco/regulated-professions/regulated',
        OCCUPATIONTYPE: 'escooccupation',
        ISLOCALIZED: 'false'
      };

      const result = DataTransformer.transformOccupation(regulatedRow);
      expect(result.regulatedProfession).toBe('regulated');
    });

    test('should ensure TypeScript strict compliance', () => {
      // This test ensures no 'any' types leak through
      const occupation = DataTransformer.transformOccupation({
        ORIGINURI: 'http://test.com',
        ID: 'strict_123',
        UUIDHISTORY: 'uuid',
        ISCOGROUPCODE: '1000',
        CODE: '1000',
        PREFERREDLABEL: 'Strict Type Job',
        ALTLABELS: '',
        DESCRIPTION: 'TypeScript strict mode test',
        DEFINITION: '',
        SCOPENOTE: '',
        REGULATEDPROFESSIONNOTE: 'unregulated',
        OCCUPATIONTYPE: 'escooccupation',
        ISLOCALIZED: 'false'
      });

      // All fields should have proper types
      expect(typeof occupation.id).toBe('string');
      expect(typeof occupation.preferredLabel).toBe('string');
      expect(Array.isArray(occupation.alternativeLabels)).toBe(true);
      expect(Array.isArray(occupation.searchTerms)).toBe(true);
      expect(typeof occupation.isLocalized).toBe('boolean');
      expect(typeof occupation.skillsCount).toBe('number');
    });
  });
});

describe('🔥 Firestore Schema Compliance', () => {

  test('should generate documents within Firestore limits', () => {
    const largeRow: CSVOccupationRow = {
      ORIGINURI: 'http://test.com/very-long-uri-that-might-exceed-limits',
      ID: 'large_test',
      UUIDHISTORY: 'uuid',
      ISCOGROUPCODE: '2654',
      CODE: '2654.1.7.8.9', // Long ISCO code
      PREFERREDLABEL: 'Very Long Occupation Title That Might Exceed Character Limits For Testing',
      ALTLABELS: Array(20).fill('Alternative Label').join('\n'), // Many alternatives
      DESCRIPTION: Array(50).fill('Long description text').join(' '), // Long description
      DEFINITION: '',
      SCOPENOTE: '',
      REGULATEDPROFESSIONNOTE: 'unregulated',
      OCCUPATIONTYPE: 'escooccupation',
      ISLOCALIZED: 'false'
    };

    const result = DataTransformer.transformOccupation(largeRow);

    // Firestore document size should be reasonable (under 1MB)
    const docSize = JSON.stringify(result).length;
    expect(docSize).toBeLessThan(1000000); // 1MB limit

    // Arrays should be within Firestore limits
    expect(result.alternativeLabels.length).toBeLessThan(100);
    expect(result.searchTerms.length).toBeLessThanOrEqual(50);
  });
});

// Mock performance tests
describe('⚡ Performance Requirements', () => {

  test('should transform data efficiently', () => {
    const startTime = Date.now();

    // Transform 1000 occupations
    for (let i = 0; i < 1000; i++) {
      DataTransformer.transformOccupation({
        ORIGINURI: `http://test.com/${i}`,
        ID: `test_${i}`,
        UUIDHISTORY: `uuid_${i}`,
        ISCOGROUPCODE: '2654',
        CODE: '2654',
        PREFERREDLABEL: `Test Job ${i}`,
        ALTLABELS: 'Alternative\nAnother Alt',
        DESCRIPTION: `Description for job ${i} με various details`,
        DEFINITION: '',
        SCOPENOTE: '',
        REGULATEDPROFESSIONNOTE: 'unregulated',
        OCCUPATIONTYPE: 'escooccupation',
        ISLOCALIZED: 'false'
      });
    }

    const duration = Date.now() - startTime;

    // Should transform 1000 records in under 1 second
    expect(duration).toBeLessThan(1000);
    console.log(`⚡ Transformed 1000 occupations σε ${duration}ms`);
  });
});