/**
 * Layout Shortcuts Constants - Separate constants file
 * Διαχωρισμός των constants από τα React components για fast refresh compliance
 */

/**
 * Migration helpers - για automated replacement
 */
export const LAYOUT_SHORTCUTS_MAP = {
  // FlexCenter shortcuts
  "display: 'flex', alignItems: 'center', justifyContent: 'center'": "FlexCenter",
  "display: 'flex', alignItems: 'center'": "FlexCenter align='center' justify='start'",
  "display: 'flex', justifyContent: 'center'": "FlexCenter align='start' justify='center'",

  // FlexBetween shortcuts
  "display: 'flex', justifyContent: 'space-between'": "FlexBetween",
  "display: 'flex', justifyContent: 'space-between', alignItems: 'center'": "FlexBetween",

  // FlexColumn shortcuts
  "display: 'flex', flexDirection: 'column'": "FlexColumn",
  "display: 'flex', flexDirection: 'column', alignItems: 'center'": "FlexColumn align='center'",

  // Base Flex
  "display: 'flex'": "Flex"
} as const;

/**
 * Statistics από Φάση 1.1 Analysis
 */
export const SHORTCUT_USAGE_STATS = {
  FlexCenter: {
    pattern: 'alignItems: center + justifyContent: center',
    instances: 51,
    replacement: '<FlexCenter>'
  },
  FlexBetween: {
    pattern: 'justifyContent: space-between',
    instances: 9,
    replacement: '<FlexBetween>'
  },
  FlexColumn: {
    pattern: 'flexDirection: column',
    instances: 143,
    replacement: '<FlexColumn>'
  }
} as const;