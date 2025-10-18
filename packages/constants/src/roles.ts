/**
 * User roles and permissions constants
 */

export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  EDITOR: 'editor',
  MODERATOR: 'moderator',
  USER: 'user',
  VIEWER: 'viewer',
  GUEST: 'guest'
} as const;

export const ROLE_HIERARCHY = {
  [USER_ROLES.SUPER_ADMIN]: 100,
  [USER_ROLES.ADMIN]: 90,
  [USER_ROLES.MANAGER]: 80,
  [USER_ROLES.EDITOR]: 70,
  [USER_ROLES.MODERATOR]: 60,
  [USER_ROLES.USER]: 50,
  [USER_ROLES.VIEWER]: 30,
  [USER_ROLES.GUEST]: 10
} as const;

export const PERMISSIONS = {
  // User management
  USER_CREATE: 'user:create',
  USER_READ: 'user:read',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  USER_MANAGE_ROLES: 'user:manage_roles',

  // System administration
  SYSTEM_ADMIN: 'system:admin',
  SYSTEM_CONFIG: 'system:config',
  SYSTEM_LOGS: 'system:logs',
  SYSTEM_BACKUP: 'system:backup',

  // Data management
  DATA_READ: 'data:read',
  DATA_WRITE: 'data:write',
  DATA_DELETE: 'data:delete',
  DATA_EXPORT: 'data:export',
  DATA_IMPORT: 'data:import',

  // Geographic data
  GEO_READ: 'geo:read',
  GEO_WRITE: 'geo:write',
  GEO_ALERT: 'geo:alert',
  GEO_MONITOR: 'geo:monitor'
} as const;

export const ROLE_PERMISSIONS = {
  [USER_ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [USER_ROLES.ADMIN]: [
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.USER_DELETE,
    PERMISSIONS.USER_MANAGE_ROLES,
    PERMISSIONS.SYSTEM_CONFIG,
    PERMISSIONS.SYSTEM_LOGS,
    PERMISSIONS.DATA_READ,
    PERMISSIONS.DATA_WRITE,
    PERMISSIONS.DATA_DELETE,
    PERMISSIONS.DATA_EXPORT,
    PERMISSIONS.GEO_READ,
    PERMISSIONS.GEO_WRITE,
    PERMISSIONS.GEO_ALERT,
    PERMISSIONS.GEO_MONITOR
  ],
  [USER_ROLES.MANAGER]: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.DATA_READ,
    PERMISSIONS.DATA_WRITE,
    PERMISSIONS.DATA_EXPORT,
    PERMISSIONS.GEO_READ,
    PERMISSIONS.GEO_WRITE,
    PERMISSIONS.GEO_ALERT
  ],
  [USER_ROLES.EDITOR]: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.DATA_READ,
    PERMISSIONS.DATA_WRITE,
    PERMISSIONS.GEO_READ,
    PERMISSIONS.GEO_WRITE
  ],
  [USER_ROLES.MODERATOR]: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.DATA_READ,
    PERMISSIONS.GEO_READ,
    PERMISSIONS.GEO_MONITOR
  ],
  [USER_ROLES.USER]: [
    PERMISSIONS.DATA_READ,
    PERMISSIONS.GEO_READ
  ],
  [USER_ROLES.VIEWER]: [
    PERMISSIONS.DATA_READ,
    PERMISSIONS.GEO_READ
  ],
  [USER_ROLES.GUEST]: [
    PERMISSIONS.DATA_READ
  ]
} as const;

// Type exports
export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];
export type RoleHierarchy = typeof ROLE_HIERARCHY[keyof typeof ROLE_HIERARCHY];