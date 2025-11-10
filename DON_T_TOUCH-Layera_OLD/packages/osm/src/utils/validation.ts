/**
 * @layera/osm - Geographic & Data Validation
 *
 * Enterprise-grade validation utilities για geographic data.
 * Comprehensive validation με detailed error reporting.
 */

import type { BBox, Point } from '../types/geo';
import type { OSMElement, OSMNode, OSMWay, OSMRelation, OverpassResponse } from '../types/osm';
import type { Result } from '../types/result';
import { ResultUtils } from '../types/result';

/**
 * Validation error με context information
 */
export interface ValidationError {
  readonly code: string;
  readonly message: string;
  readonly field?: string;
  readonly value?: unknown;
  readonly severity: 'error' | 'warning' | 'info';
  readonly location?: [number, number];
}

/**
 * Validation result με multiple issues
 */
export interface ValidationResult {
  readonly valid: boolean;
  readonly errors: readonly ValidationError[];
  readonly warnings: readonly ValidationError[];
}

/**
 * Geographic coordinate validation
 */
export namespace CoordinateValidation {
  /**
   * Validates latitude value
   */
  export const validateLatitude = (lat: number): Result<number, ValidationError> => {
    if (!Number.isFinite(lat)) {
      return ResultUtils.error({
        code: 'INVALID_LATITUDE_TYPE',
        message: 'Latitude must be a finite number',
        field: 'latitude',
        value: lat,
        severity: "error" as const,
        location: undefined
      });
    }

    if (lat < -90 || lat > 90) {
      return ResultUtils.error({
        code: 'LATITUDE_OUT_OF_RANGE',
        message: 'Latitude must be between -90 and 90 degrees',
        field: 'latitude',
        value: lat,
        severity: "error" as const, location: undefined
      });
    }

    return ResultUtils.ok(lat);
  };

  /**
   * Validates longitude value
   */
  export const validateLongitude = (lng: number): Result<number, ValidationError> => {
    if (!Number.isFinite(lng)) {
      return ResultUtils.error({
        code: 'INVALID_LONGITUDE_TYPE',
        message: 'Longitude must be a finite number',
        field: 'longitude',
        value: lng,
        severity: "error" as const, location: undefined
      });
    }

    if (lng < -180 || lng > 180) {
      return ResultUtils.error({
        code: 'LONGITUDE_OUT_OF_RANGE',
        message: 'Longitude must be between -180 and 180 degrees',
        field: 'longitude',
        value: lng,
        severity: "error" as const, location: undefined
      });
    }

    return ResultUtils.ok(lng);
  };

  /**
   * Validates Point object
   */
  export const validatePoint = (point: Point): ValidationResult => {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    const latResult = validateLatitude(point.lat);
    if (!latResult.ok) {
      errors.push(latResult.error);
    }

    const lngResult = validateLongitude(point.lng);
    if (!lngResult.ok) {
      errors.push(lngResult.error);
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  };

  /**
   * Validates BBox object
   */
  export const validateBBox = (bbox: BBox): ValidationResult => {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    // Validate individual coordinates
    const coords = [
      { value: bbox.south, name: 'south' },
      { value: bbox.west, name: 'west' },
      { value: bbox.north, name: 'north' },
      { value: bbox.east, name: 'east' }
    ];

    for (const coord of coords) {
      if (!Number.isFinite(coord.value)) {
        errors.push({
          code: 'INVALID_COORDINATE_TYPE',
          message: `${coord.name} must be a finite number`,
          field: coord.name,
          value: coord.value,
          severity: 'error'
        });
      }
    }

    // Validate coordinate ranges
    const southResult = validateLatitude(bbox.south);
    if (!southResult.ok) {
      errors.push({ ...southResult.error, field: 'south' });
    }

    const northResult = validateLatitude(bbox.north);
    if (!northResult.ok) {
      errors.push({ ...northResult.error, field: 'north' });
    }

    const westResult = validateLongitude(bbox.west);
    if (!westResult.ok) {
      errors.push({ ...westResult.error, field: 'west' });
    }

    const eastResult = validateLongitude(bbox.east);
    if (!eastResult.ok) {
      errors.push({ ...eastResult.error, field: 'east' });
    }

    // Validate bbox logic
    if (bbox.south >= bbox.north) {
      errors.push({
        code: 'INVALID_BBOX_LATITUDE_ORDER',
        message: 'South latitude must be less than north latitude',
        field: 'bbox',
        value: bbox,
        severity: 'error'
      });
    }

    if (bbox.west >= bbox.east) {
      errors.push({
        code: 'INVALID_BBOX_LONGITUDE_ORDER',
        message: 'West longitude must be less than east longitude',
        field: 'bbox',
        value: bbox,
        severity: 'error'
      });
    }

    // Check for reasonable area size
    const area = (bbox.north - bbox.south) * (bbox.east - bbox.west);
    if (area > 100) { // > 100 square degrees
      warnings.push({
        code: 'LARGE_BBOX_AREA',
        message: 'BBox area is very large, may cause performance issues',
        field: 'bbox',
        value: area,
        severity: 'warning'
      });
    }

    if (area < 0.0001) { // < 0.0001 square degrees
      warnings.push({
        code: 'SMALL_BBOX_AREA',
        message: 'BBox area is very small, may not contain any features',
        field: 'bbox',
        value: area,
        severity: 'warning'
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  };
}

/**
 * OSM data validation
 */
export namespace OSMValidation {
  /**
   * Validates OSM Node
   */
  export const validateNode = (node: OSMNode): ValidationResult => {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    if (node.type !== 'node') {
      errors.push({
        code: 'INVALID_NODE_TYPE',
        message: 'Element type must be "node"',
        field: 'type',
        value: node.type,
        severity: 'error'
      });
    }

    if (!Number.isInteger(node.id) || node.id <= 0) {
      errors.push({
        code: 'INVALID_NODE_ID',
        message: 'Node ID must be a positive integer',
        field: 'id',
        value: node.id,
        severity: 'error'
      });
    }

    const pointValidation = CoordinateValidation.validatePoint({
      lat: node.lat,
      lng: node.lon
    });

    errors.push(...pointValidation.errors);
    warnings.push(...pointValidation.warnings);

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  };

  /**
   * Validates OSM Way
   */
  export const validateWay = (way: OSMWay): ValidationResult => {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    if (way.type !== 'way') {
      errors.push({
        code: 'INVALID_WAY_TYPE',
        message: 'Element type must be "way"',
        field: 'type',
        value: way.type,
        severity: 'error'
      });
    }

    if (!Number.isInteger(way.id) || way.id <= 0) {
      errors.push({
        code: 'INVALID_WAY_ID',
        message: 'Way ID must be a positive integer',
        field: 'id',
        value: way.id,
        severity: 'error'
      });
    }

    if (!Array.isArray(way.nodes)) {
      errors.push({
        code: 'INVALID_WAY_NODES_TYPE',
        message: 'Way nodes must be an array',
        field: 'nodes',
        value: way.nodes,
        severity: 'error'
      });
    } else {
      if (way.nodes.length < 2) {
        errors.push({
          code: 'INSUFFICIENT_WAY_NODES',
          message: 'Way must have at least 2 nodes',
          field: 'nodes',
          value: way.nodes.length,
          severity: 'error'
        });
      }

      // Validate each node ID
      for (let i = 0; i < way.nodes.length; i++) {
        const nodeId = way.nodes[i];
        if (!Number.isInteger(nodeId) || nodeId <= 0) {
          errors.push({
            code: 'INVALID_WAY_NODE_ID',
            message: `Node ID at index ${i} must be a positive integer`,
            field: `nodes[${i}]`,
            value: nodeId,
            severity: 'error'
          });
        }
      }

      // Check for closed way (polygon)
      if (way.nodes.length > 3 && way.nodes[0] === way.nodes[way.nodes.length - 1]) {
        // This is a closed way, which is good for areas
        if (way.nodes.length < 4) {
          warnings.push({
            code: 'MINIMAL_POLYGON',
            message: 'Closed way has minimal number of nodes',
            field: 'nodes',
            value: way.nodes.length,
            severity: 'warning'
          });
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  };

  /**
   * Validates OSM Relation
   */
  export const validateRelation = (relation: OSMRelation): ValidationResult => {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    if (relation.type !== 'relation') {
      errors.push({
        code: 'INVALID_RELATION_TYPE',
        message: 'Element type must be "relation"',
        field: 'type',
        value: relation.type,
        severity: 'error'
      });
    }

    if (!Number.isInteger(relation.id) || relation.id <= 0) {
      errors.push({
        code: 'INVALID_RELATION_ID',
        message: 'Relation ID must be a positive integer',
        field: 'id',
        value: relation.id,
        severity: 'error'
      });
    }

    if (!Array.isArray(relation.members)) {
      errors.push({
        code: 'INVALID_RELATION_MEMBERS_TYPE',
        message: 'Relation members must be an array',
        field: 'members',
        value: relation.members,
        severity: 'error'
      });
    } else {
      if (relation.members.length === 0) {
        warnings.push({
          code: 'EMPTY_RELATION',
          message: 'Relation has no members',
          field: 'members',
          value: relation.members.length,
          severity: 'warning'
        });
      }

      // Validate each member
      for (let i = 0; i < relation.members.length; i++) {
        const member = relation.members[i];
        if (!member) continue;

        if (!['node', 'way', 'relation'].includes(member.type)) {
          errors.push({
            code: 'INVALID_MEMBER_TYPE',
            message: `Member type at index ${i} must be node, way, or relation`,
            field: `members[${i}].type`,
            value: member.type,
            severity: 'error'
          });
        }

        if (!Number.isInteger(member.ref) || member.ref <= 0) {
          errors.push({
            code: 'INVALID_MEMBER_REF',
            message: `Member ref at index ${i} must be a positive integer`,
            field: `members[${i}].ref`,
            value: member.ref,
            severity: 'error'
          });
        }

        if (typeof member.role !== 'string') {
          errors.push({
            code: 'INVALID_MEMBER_ROLE',
            message: `Member role at index ${i} must be a string`,
            field: `members[${i}].role`,
            value: member.role,
            severity: 'error'
          });
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  };

  /**
   * Validates complete OSM element
   */
  export const validateElement = (element: OSMElement): ValidationResult => {
    switch (element.type) {
      case 'node':
        return validateNode(element);
      case 'way':
        return validateWay(element);
      case 'relation':
        return validateRelation(element);
      default:
        return {
          valid: false,
          errors: [{
            code: 'UNKNOWN_ELEMENT_TYPE',
            message: 'Unknown OSM element type',
            field: 'type',
            value: (element as any).type,
            severity: 'error'
          }],
          warnings: []
        };
    }
  };

  /**
   * Validates Overpass API response
   */
  export const validateOverpassResponse = (response: OverpassResponse): ValidationResult => {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    if (typeof response.version !== 'number') {
      errors.push({
        code: 'INVALID_RESPONSE_VERSION',
        message: 'Response version must be a number',
        field: 'version',
        value: response.version,
        severity: 'error'
      });
    }

    if (typeof response.generator !== 'string') {
      errors.push({
        code: 'INVALID_RESPONSE_GENERATOR',
        message: 'Response generator must be a string',
        field: 'generator',
        value: response.generator,
        severity: 'error'
      });
    }

    if (!Array.isArray(response.elements)) {
      errors.push({
        code: 'INVALID_RESPONSE_ELEMENTS',
        message: 'Response elements must be an array',
        field: 'elements',
        value: response.elements,
        severity: 'error'
      });
    } else {
      // Validate each element
      const elementValidations = response.elements.map(validateElement);
      const allErrors = elementValidations.flatMap(v => v.errors);
      const allWarnings = elementValidations.flatMap(v => v.warnings);

      errors.push(...allErrors);
      warnings.push(...allWarnings);

      // Statistics (commented out unused variables to avoid TS errors)
      // const nodeCount = response.elements.filter(e => e.type === 'node').length;
      // const wayCount = response.elements.filter(e => e.type === 'way').length;
      // const relationCount = response.elements.filter(e => e.type === 'relation').length;

      if (response.elements.length === 0) {
        warnings.push({
          code: 'EMPTY_RESPONSE',
          message: 'Response contains no elements',
          field: 'elements',
          value: 0,
          severity: 'warning'
        });
      }

      if (response.elements.length > 10000) {
        warnings.push({
          code: 'LARGE_RESPONSE',
          message: 'Response contains many elements, may cause performance issues',
          field: 'elements',
          value: response.elements.length,
          severity: 'warning'
        });
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  };
}

/**
 * Query parameter validation
 */
export namespace QueryValidation {
  /**
   * Validates search timeout
   */
  export const validateTimeout = (timeout: number): Result<number, ValidationError> => {
    if (!Number.isInteger(timeout) || timeout <= 0) {
      return ResultUtils.error({
        code: 'INVALID_TIMEOUT',
        message: 'Timeout must be a positive integer',
        field: 'timeout',
        value: timeout,
        severity: "error" as const, location: undefined
      });
    }

    if (timeout > 60) {
      return ResultUtils.error({
        code: 'TIMEOUT_TOO_LARGE',
        message: 'Timeout cannot exceed 60 seconds',
        field: 'timeout',
        value: timeout,
        severity: "error" as const, location: undefined
      });
    }

    return ResultUtils.ok(timeout);
  };

  /**
   * Validates admin level
   */
  export const validateAdminLevel = (level: number): Result<number, ValidationError> => {
    if (!Number.isInteger(level)) {
      return ResultUtils.error({
        code: 'INVALID_ADMIN_LEVEL_TYPE',
        message: 'Admin level must be an integer',
        field: 'adminLevel',
        value: level,
        severity: "error" as const, location: undefined
      });
    }

    if (level < 1 || level > 11) {
      return ResultUtils.error({
        code: 'ADMIN_LEVEL_OUT_OF_RANGE',
        message: 'Admin level must be between 1 and 11',
        field: 'adminLevel',
        value: level,
        severity: "error" as const, location: undefined
      });
    }

    return ResultUtils.ok(level);
  };

  /**
   * Validates search limit
   */
  export const validateLimit = (limit: number): Result<number, ValidationError> => {
    if (!Number.isInteger(limit) || limit <= 0) {
      return ResultUtils.error({
        code: 'INVALID_LIMIT',
        message: 'Limit must be a positive integer',
        field: 'limit',
        value: limit,
        severity: "error" as const, location: undefined
      });
    }

    if (limit > 1000) {
      return ResultUtils.error({
        code: 'LIMIT_TOO_LARGE',
        message: 'Limit cannot exceed 1000',
        field: 'limit',
        value: limit,
        severity: "error" as const, location: undefined
      });
    }

    return ResultUtils.ok(limit);
  };
}

/**
 * Validation constants
 */
export const ValidationConstants = {
  /** Maximum allowed timeout για queries (seconds) */
  MAX_TIMEOUT_SECONDS: 60,

  /** Maximum allowed search limit */
  MAX_SEARCH_LIMIT: 1000,

  /** Maximum reasonable BBox area (square degrees) */
  MAX_BBOX_AREA: 100,

  /** Minimum meaningful BBox area (square degrees) */
  MIN_BBOX_AREA: 0.0001,

  /** Maximum elements in response before warning */
  MAX_RESPONSE_ELEMENTS: 10000,

  /** Valid admin levels για Greece */
  VALID_ADMIN_LEVELS: [2, 4, 6, 8, 9, 10] as const,

  /** Coordinate precision για validation */
  COORDINATE_PRECISION: 1e-8,
} as const;
