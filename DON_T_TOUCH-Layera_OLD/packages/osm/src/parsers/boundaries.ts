/**
 * @layera/osm - Administrative Boundaries Parser
 *
 * Specialized parser για OSM administrative boundary data με complex
 * multipolygon assembly, Greek administrative hierarchy support,
 * και enterprise-grade validation.
 *
 * Features:
 * - Greek administrative level support (2-10)
 * - Complex multipolygon geometry assembly
 * - Name variant processing (Greek, English, official)
 * - Population and area calculations
 * - Wikidata integration support
 * - Comprehensive boundary validation
 */

import type { Polygon, MultiPolygon } from 'geojson';
import type {
  OSMNode,
  OSMWay,
  OSMRelation,
  OSMBoundaryFeature,
  OSMBoundaryCollection,
  OverpassResponse,
  ValidationIssue,
  AdminLevel
} from '../types/osm';
import { ADMIN_LEVELS } from '../types/osm';
import type { Result } from '../types/result';
import { ResultUtils } from '../types/result';
import { OSMValidation } from '../utils/validation';
import { normalizeAreaName, generateSearchVariants } from '../utils/strings';

/**
 * Greek administrative hierarchy helper
 */
export namespace GreekAdminHierarchy {
  /**
   * Gets human-readable name για admin level
   */
  export const getAdminLevelName = (level: AdminLevel): string => {
    const names: Record<AdminLevel, string> = {
      [ADMIN_LEVELS.COUNTRY]: 'Χώρα',
      [ADMIN_LEVELS.REGION]: 'Περιφέρεια',
      [ADMIN_LEVELS.REGIONAL_UNIT]: 'Περιφερειακή Ενότητα',
      [ADMIN_LEVELS.MUNICIPALITY]: 'Δήμος',
      [ADMIN_LEVELS.COMMUNITY]: 'Κοινότητα',
      [ADMIN_LEVELS.SETTLEMENT]: 'Οικισμός'
    };

    return names[level] || `Επίπεδο ${level}`;
  };

  /**
   * Validates admin level για Greece
   */
  export const isValidGreekAdminLevel = (level: number): level is AdminLevel => {
    const validLevels = Object.values(ADMIN_LEVELS) as number[];
    return validLevels.includes(level);
  };

  /**
   * Gets parent admin level
   */
  export const getParentAdminLevel = (level: AdminLevel): AdminLevel | undefined => {
    switch (level) {
      case ADMIN_LEVELS.SETTLEMENT: return ADMIN_LEVELS.COMMUNITY;
      case ADMIN_LEVELS.COMMUNITY: return ADMIN_LEVELS.MUNICIPALITY;
      case ADMIN_LEVELS.MUNICIPALITY: return ADMIN_LEVELS.REGIONAL_UNIT;
      case ADMIN_LEVELS.REGIONAL_UNIT: return ADMIN_LEVELS.REGION;
      case ADMIN_LEVELS.REGION: return ADMIN_LEVELS.COUNTRY;
      case ADMIN_LEVELS.COUNTRY: return undefined;
      default: return undefined;
    }
  };

  /**
   * Gets child admin levels
   */
  export const getChildAdminLevels = (level: AdminLevel): AdminLevel[] => {
    switch (level) {
      case ADMIN_LEVELS.COUNTRY: return [ADMIN_LEVELS.REGION];
      case ADMIN_LEVELS.REGION: return [ADMIN_LEVELS.REGIONAL_UNIT];
      case ADMIN_LEVELS.REGIONAL_UNIT: return [ADMIN_LEVELS.MUNICIPALITY];
      case ADMIN_LEVELS.MUNICIPALITY: return [ADMIN_LEVELS.COMMUNITY];
      case ADMIN_LEVELS.COMMUNITY: return [ADMIN_LEVELS.SETTLEMENT];
      case ADMIN_LEVELS.SETTLEMENT: return [];
      default: return [];
    }
  };
}

/**
 * Name processing utilities για boundaries
 */
export namespace BoundaryNameProcessor {
  /**
   * Extracts all name variants από OSM tags
   */
  export const extractNameVariants = (tags: Record<string, string>): {
    primary: string | undefined;
    greek: string | undefined;
    english: string | undefined;
    official: string | undefined;
    variants: string[];
  } => {
    const nameEl = tags['name:el'];
    const nameEn = tags['name:en'];
    const name = tags.name;
    const officialName = tags.official_name;

    // Determine primary name (prefer Greek)
    const primary = nameEl || name || nameEn || officialName;

    // Generate all variants
    const allNames = [name, nameEl, nameEn, officialName].filter((n): n is string => Boolean(n));
    const variants = [...new Set(allNames)];

    return {
      primary,
      greek: nameEl,
      english: nameEn,
      official: officialName,
      variants
    };
  };

  /**
   * Normalizes boundary name για searching
   */
  export const normalizeBoundaryName = (name: string): string => {
    return normalizeAreaName(name);
  };

  /**
   * Generates search variants για boundary
   */
  export const generateBoundarySearchVariants = (tags: Record<string, string>): string[] => {
    const nameData = extractNameVariants(tags);
    const allVariants = new Set<string>();

    // Add normalized versions of all name variants
    for (const name of nameData.variants) {
      const variants = generateSearchVariants(name);
      variants.forEach(v => allVariants.add(v));
    }

    return Array.from(allVariants);
  };

  /**
   * Validates name completeness
   */
  export const validateNames = (tags: Record<string, string>): ValidationIssue[] => {
    const issues: ValidationIssue[] = [];
    const nameData = extractNameVariants(tags);

    if (!nameData.primary) {
      issues.push({
        severity: 'error',
        code: 'MISSING_NAME',
        message: 'Boundary must have at least one name',
        location: undefined
      });
    }

    if (!nameData.greek && nameData.primary) {
      issues.push({
        severity: 'warning',
        code: 'MISSING_GREEK_NAME',
        message: 'Boundary missing Greek name (name:el)',
        location: undefined
      });
    }

    if (!nameData.english && nameData.primary) {
      issues.push({
        severity: 'info',
        code: 'MISSING_ENGLISH_NAME',
        message: 'Boundary missing English name (name:en)',
        location: undefined
      });
    }

    return issues;
  };
}

/**
 * Population and statistics processor
 */
export namespace BoundaryStatsProcessor {
  /**
   * Parses population value
   */
  export const parsePopulation = (population: string): number | undefined => {
    if (!population) return undefined;

    const cleaned = population.replace(/[,.\s]/g, '');
    const parsed = parseInt(cleaned, 10);

    if (!Number.isInteger(parsed) || parsed <= 0) return undefined;

    // Reasonable population limits
    if (parsed > 100000000) return undefined; // Too large

    return parsed;
  };

  /**
   * Parses area value σε square kilometers
   */
  export const parseArea = (area: string): number | undefined => {
    if (!area) return undefined;

    const trimmed = area.trim().toLowerCase();
    let sqKm: number;

    if (trimmed.includes('km')) {
      sqKm = parseFloat(trimmed.replace(/km²?|km2/g, ''));
    } else if (trimmed.includes('m²') || trimmed.includes('m2')) {
      const sqM = parseFloat(trimmed.replace(/m²?|m2/g, ''));
      sqKm = sqM / 1000000; // Convert to km²
    } else {
      sqKm = parseFloat(trimmed);
    }

    if (!Number.isFinite(sqKm) || sqKm <= 0) return undefined;

    // Reasonable area limits για Greek administrative units
    if (sqKm > 200000) return undefined; // Larger than Greece

    return Math.round(sqKm * 100) / 100; // Round to 2 decimal places
  };

  /**
   * Formats population για display
   */
  export const formatPopulation = (population: number): string => {
    return population.toLocaleString('el-GR');
  };

  /**
   * Formats area για display
   */
  export const formatArea = (area: number): string => {
    return `${area.toLocaleString('el-GR')} km²`;
  };
}

/**
 * Ring assembly για complex multipolygons
 */
export namespace RingAssembler {
  /**
   * Assembles way segments σε complete rings
   * This is a simplified implementation - full multipolygon assembly is complex
   */
  export const assembleRings = (
    members: OSMRelation['members'],
    ways: Map<number, OSMWay>,
    nodes: Map<number, OSMNode>
  ): Result<{ outer: [number, number][][]; inner: [number, number][][] }, ValidationIssue[]> => {
    const issues: ValidationIssue[] = [];
    const outer: [number, number][][] = [];
    const inner: [number, number][][] = [];

    // Separate outer and inner members
    const outerMembers = members.filter(m => m.role === 'outer' && m.type === 'way');
    const innerMembers = members.filter(m => m.role === 'inner' && m.type === 'way');

    // Process outer rings
    for (const member of outerMembers) {
      const way = ways.get(member.ref);
      if (!way) {
        issues.push({
          severity: 'warning',
          code: 'MISSING_OUTER_WAY',
          message: `Outer way ${member.ref} not found`,
          location: undefined
        });
        continue;
      }

      const coordinates = RingAssembler.wayToCoordinates(way, nodes);
      if (coordinates.length >= 3) {
        outer.push(coordinates);
      }
    }

    // Process inner rings (holes)
    for (const member of innerMembers) {
      const way = ways.get(member.ref);
      if (!way) {
        issues.push({
          severity: 'warning',
          code: 'MISSING_INNER_WAY',
          message: `Inner way ${member.ref} not found`,
          location: undefined
        });
        continue;
      }

      const coordinates = RingAssembler.wayToCoordinates(way, nodes);
      if (coordinates.length >= 3) {
        inner.push(coordinates);
      }
    }

    if (outer.length === 0) {
      return ResultUtils.error([{
        severity: 'error',
        code: 'NO_OUTER_RINGS',
        message: 'Multipolygon must have at least one outer ring',
        location: undefined
      }]);
    }

    return ResultUtils.ok({ outer, inner });
  };

  export const wayToCoordinates = (way: OSMWay, nodes: Map<number, OSMNode>): [number, number][] => {
    const coordinates: [number, number][] = [];

    for (const nodeId of way.nodes) {
      const node = nodes.get(nodeId);
      if (node) {
        coordinates.push([node.lon, node.lat]);
      }
    }

    // Ensure closed ring
    if (coordinates.length >= 3) {
      const first = coordinates[0];
      const last = coordinates[coordinates.length - 1];
      if (first && last && (first[0] !== last[0] || first[1] !== last[1])) {
        coordinates.push(first);
      }
    }

    return coordinates;
  }
}

/**
 * Main boundaries parser
 */
export class BoundariesParser {
  /**
   * Parses Overpass response σε boundary features
   */
  static parseOverpassResponse(response: OverpassResponse): Result<OSMBoundaryCollection, ValidationIssue[]> {
    const validation = OSMValidation.validateOverpassResponse(response);
    const issues: ValidationIssue[] = [...validation.errors, ...validation.warnings];

    if (!validation.valid) {
      return ResultUtils.error(issues);
    }

    const nodes = new Map<number, OSMNode>();
    const ways = new Map<number, OSMWay>();
    const relations: OSMRelation[] = [];

    // Categorize elements
    for (const element of response.elements) {
      switch (element.type) {
        case 'node':
          nodes.set(element.id, element);
          break;
        case 'way':
          ways.set(element.id, element);
          break;
        case 'relation':
          if (element.tags?.boundary === 'administrative') {
            relations.push(element);
          }
          break;
      }
    }

    const features: OSMBoundaryFeature[] = [];

    // Process relations (administrative boundaries are typically relations)
    for (const relation of relations) {
      const result = this.parseAdminBoundary(relation, ways, nodes);
      if (result.ok) {
        features.push(result.data);
      } else {
        issues.push(...result.error);
      }
    }

    const collection: OSMBoundaryCollection = {
      type: 'FeatureCollection',
      features
    };

    return ResultUtils.ok(collection);
  }

  /**
   * Parses relation-based administrative boundary
   */
  private static parseAdminBoundary(
    relation: OSMRelation,
    ways: Map<number, OSMWay>,
    nodes: Map<number, OSMNode>
  ): Result<OSMBoundaryFeature, ValidationIssue[]> {
    const issues: ValidationIssue[] = [];

    // Validate relation
    const relationValidation = OSMValidation.validateRelation(relation);
    issues.push(...relationValidation.errors, ...relationValidation.warnings);

    if (!relationValidation.valid) {
      return ResultUtils.error(issues);
    }

    const tags = relation.tags || {};

    // Validate admin level
    const adminLevelStr = tags.admin_level;
    if (!adminLevelStr) {
      return ResultUtils.error([{
        severity: 'error',
        code: 'MISSING_ADMIN_LEVEL',
        message: 'Administrative boundary must have admin_level tag',
        element: relation
      }]);
    }

    const adminLevel = parseInt(adminLevelStr, 10);
    if (!GreekAdminHierarchy.isValidGreekAdminLevel(adminLevel)) {
      issues.push({
        severity: 'warning',
        code: 'INVALID_ADMIN_LEVEL',
        message: `Admin level ${adminLevel} is not standard για Greece`,
        element: relation
      });
    }

    // Validate names
    issues.push(...BoundaryNameProcessor.validateNames(tags));

    // Assemble geometry
    const ringsResult = RingAssembler.assembleRings(relation.members, ways, nodes);
    if (!ringsResult.ok) {
      return ResultUtils.error(ringsResult.error);
    }

    const { outer, inner } = ringsResult.data;

    // Create geometry
    let geometry: Polygon | MultiPolygon;

    if (outer.length === 1) {
      // Simple polygon
      const coordinates = inner.length > 0 ? [outer[0]!, ...inner] : [outer[0]!];
      geometry = {
        type: 'Polygon',
        coordinates
      };
    } else {
      // MultiPolygon
      const polygons = outer.map(ring => [ring]);
      geometry = {
        type: 'MultiPolygon',
        coordinates: polygons
      };
    }

    // Process properties
    const properties = this.processProperties(tags, relation.id);

    const feature: OSMBoundaryFeature = {
      type: 'Feature',
      geometry,
      properties
    };

    return ResultUtils.ok(feature);
  }

  /**
   * Processes OSM tags σε feature properties
   */
  private static processProperties(
    tags: Record<string, string>,
    id: number
  ): OSMBoundaryFeature['properties'] {
    const nameData = BoundaryNameProcessor.extractNameVariants(tags);
    const adminLevel = parseInt(tags.admin_level || '0', 10);

    return {
      id,
      type: 'relation',
      admin_level: adminLevel.toString(),
      admin_level_name: GreekAdminHierarchy.getAdminLevelName(adminLevel as AdminLevel),
      name: nameData.primary,
      name_el: nameData.greek,
      name_en: nameData.english,
      official_name: nameData.official,
      boundary: tags.boundary || 'administrative',
      place: tags.place,
      population: tags.population,
      population_formatted: tags.population ?
        BoundaryStatsProcessor.formatPopulation(BoundaryStatsProcessor.parsePopulation(tags.population) || 0) :
        undefined,
      area: tags.area,
      area_formatted: tags.area ?
        BoundaryStatsProcessor.formatArea(BoundaryStatsProcessor.parseArea(tags.area) || 0) :
        undefined,
      wikidata: tags.wikidata,
      wikipedia: tags.wikipedia,
      search_variants: BoundaryNameProcessor.generateBoundarySearchVariants(tags),
      // Include all original tags για flexibility
      ...tags
    };
  }
}