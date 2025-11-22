/**
 * 📊 LAYERA TABLES VARIANTS - CSS Classes & Component Combinations
 *
 * Pre-built CSS class combinations που συνδυάζουν variables για
 * complete table component styling. Enterprise-grade table system.
 */

// TYPE DEFINITIONS
export type TableVariantType = 'default' | 'striped' | 'bordered' | 'hover' | 'compact' | 'responsive';
export type TableSizeType = 'sm' | 'md' | 'lg' | 'xl';
export type TableDensityType = 'compact' | 'normal' | 'spacious';
export type TableBorderType = 'none' | 'horizontal' | 'vertical' | 'all' | 'outline';
export type TableSemanticType = 'data' | 'dashboard' | 'report' | 'comparison';

// BASE TABLE CSS CLASSES
export const TABLE_BASE_CLASSES = {
  // Base table elements
  table: 'layera-table layera-table--base',
  thead: 'layera-table__head',
  tbody: 'layera-table__body',
  tfoot: 'layera-table__foot',
  tr: 'layera-table__row',
  th: 'layera-table__header',
  td: 'layera-table__cell',

  // Container classes
  container: 'layera-table__container',
  wrapper: 'layera-table__wrapper',
  scrollable: 'layera-table__scrollable',

  // Caption & meta
  caption: 'layera-table__caption',
  description: 'layera-table__description',

  // Interactive elements
  sortable: 'layera-table__sortable',
  sortIcon: 'layera-table__sort-icon',
  checkbox: 'layera-table__checkbox',
} as const;

// VARIANT CLASSES - Συνδυασμοί styling
export const TABLE_VARIANTS = {
  default: {
    table: 'layera-table layera-table--default',
    row: 'layera-table__row layera-table__row--default',
    header: 'layera-table__header layera-table__header--default',
    cell: 'layera-table__cell layera-table__cell--default',
  },

  striped: {
    table: 'layera-table layera-table--striped',
    row: 'layera-table__row layera-table__row--striped',
    header: 'layera-table__header layera-table__header--striped',
    cell: 'layera-table__cell layera-table__cell--striped',
  },

  bordered: {
    table: 'layera-table layera-table--bordered',
    row: 'layera-table__row layera-table__row--bordered',
    header: 'layera-table__header layera-table__header--bordered',
    cell: 'layera-table__cell layera-table__cell--bordered',
  },

  hover: {
    table: 'layera-table layera-table--hover',
    row: 'layera-table__row layera-table__row--hover',
    header: 'layera-table__header layera-table__header--hover',
    cell: 'layera-table__cell layera-table__cell--hover',
  },

  compact: {
    table: 'layera-table layera-table--compact',
    row: 'layera-table__row layera-table__row--compact',
    header: 'layera-table__header layera-table__header--compact',
    cell: 'layera-table__cell layera-table__cell--compact',
  },

  responsive: {
    table: 'layera-table layera-table--responsive',
    row: 'layera-table__row layera-table__row--responsive',
    header: 'layera-table__header layera-table__header--responsive',
    cell: 'layera-table__cell layera-table__cell--responsive',
  },
} as const;

// SIZE CLASSES
export const TABLE_SIZES = {
  sm: {
    table: 'layera-table layera-table--sm',
    row: 'layera-table__row layera-table__row--sm',
    header: 'layera-table__header layera-table__header--sm',
    cell: 'layera-table__cell layera-table__cell--sm',
    container: 'layera-table__container layera-table__container--sm',
  },

  md: {
    table: 'layera-table layera-table--md',
    row: 'layera-table__row layera-table__row--md',
    header: 'layera-table__header layera-table__header--md',
    cell: 'layera-table__cell layera-table__cell--md',
    container: 'layera-table__container layera-table__container--md',
  },

  lg: {
    table: 'layera-table layera-table--lg',
    row: 'layera-table__row layera-table__row--lg',
    header: 'layera-table__header layera-table__header--lg',
    cell: 'layera-table__cell layera-table__cell--lg',
    container: 'layera-table__container layera-table__container--lg',
  },

  xl: {
    table: 'layera-table layera-table--xl',
    row: 'layera-table__row layera-table__row--xl',
    header: 'layera-table__header layera-table__header--xl',
    cell: 'layera-table__cell layera-table__cell--xl',
    container: 'layera-table__container layera-table__container--xl',
  },
} as const;

// DENSITY CLASSES
export const TABLE_DENSITIES = {
  compact: {
    table: 'layera-table layera-table--density-compact',
    row: 'layera-table__row layera-table__row--compact',
    header: 'layera-table__header layera-table__header--compact',
    cell: 'layera-table__cell layera-table__cell--compact',
  },

  normal: {
    table: 'layera-table layera-table--density-normal',
    row: 'layera-table__row layera-table__row--normal',
    header: 'layera-table__header layera-table__header--normal',
    cell: 'layera-table__cell layera-table__cell--normal',
  },

  spacious: {
    table: 'layera-table layera-table--density-spacious',
    row: 'layera-table__row layera-table__row--spacious',
    header: 'layera-table__header layera-table__header--spacious',
    cell: 'layera-table__cell layera-table__cell--spacious',
  },
} as const;

// BORDER CLASSES
export const TABLE_BORDERS = {
  none: {
    table: 'layera-table layera-table--border-none',
    row: 'layera-table__row layera-table__row--border-none',
    header: 'layera-table__header layera-table__header--border-none',
    cell: 'layera-table__cell layera-table__cell--border-none',
  },

  horizontal: {
    table: 'layera-table layera-table--border-horizontal',
    row: 'layera-table__row layera-table__row--border-horizontal',
    header: 'layera-table__header layera-table__header--border-horizontal',
    cell: 'layera-table__cell layera-table__cell--border-horizontal',
  },

  vertical: {
    table: 'layera-table layera-table--border-vertical',
    row: 'layera-table__row layera-table__row--border-vertical',
    header: 'layera-table__header layera-table__header--border-vertical',
    cell: 'layera-table__cell layera-table__cell--border-vertical',
  },

  all: {
    table: 'layera-table layera-table--border-all',
    row: 'layera-table__row layera-table__row--border-all',
    header: 'layera-table__header layera-table__header--border-all',
    cell: 'layera-table__cell layera-table__cell--border-all',
  },

  outline: {
    table: 'layera-table layera-table--border-outline',
    row: 'layera-table__row layera-table__row--border-outline',
    header: 'layera-table__header layera-table__header--border-outline',
    cell: 'layera-table__cell layera-table__cell--border-outline',
  },
} as const;

// SEMANTIC CLASSES
export const TABLE_SEMANTIC_VARIANTS = {
  data: {
    table: 'layera-table layera-table--data',
    container: 'layera-table__container layera-table__container--data',
    header: 'layera-table__header layera-table__header--data',
  },

  dashboard: {
    table: 'layera-table layera-table--dashboard',
    container: 'layera-table__container layera-table__container--dashboard',
    header: 'layera-table__header layera-table__header--dashboard',
  },

  report: {
    table: 'layera-table layera-table--report',
    container: 'layera-table__container layera-table__container--report',
    header: 'layera-table__header layera-table__header--report',
  },

  comparison: {
    table: 'layera-table layera-table--comparison',
    container: 'layera-table__container layera-table__container--comparison',
    header: 'layera-table__header layera-table__header--comparison',
  },
} as const;

// STATE CLASSES
export const TABLE_STATES = {
  loading: 'layera-table--loading',
  empty: 'layera-table--empty',
  error: 'layera-table--error',
  success: 'layera-table--success',
  selected: 'layera-table--selected',
  sortable: 'layera-table--sortable',
  sorted: 'layera-table--sorted',
  filterable: 'layera-table--filterable',
  filtered: 'layera-table--filtered',
} as const;

// INTERACTIVE CLASSES
export const TABLE_INTERACTIVE = {
  // Row states
  'row-hover': 'layera-table__row--hover',
  'row-active': 'layera-table__row--active',
  'row-selected': 'layera-table__row--selected',
  'row-disabled': 'layera-table__row--disabled',

  // Header states
  'header-sortable': 'layera-table__header--sortable',
  'header-sorted-asc': 'layera-table__header--sorted-asc',
  'header-sorted-desc': 'layera-table__header--sorted-desc',
  'header-resizable': 'layera-table__header--resizable',

  // Cell states
  'cell-numeric': 'layera-table__cell--numeric',
  'cell-actions': 'layera-table__cell--actions',
  'cell-checkbox': 'layera-table__cell--checkbox',
  'cell-expandable': 'layera-table__cell--expandable',
} as const;

// COMPREHENSIVE TABLE VARIANTS - Όλα μαζί
export const TABLE_FULL_VARIANTS = {
  // Basic variants
  'default-md-normal': {
    table: `${TABLE_VARIANTS.default.table} ${TABLE_SIZES.md.table} ${TABLE_DENSITIES.normal.table}`,
    header: `${TABLE_VARIANTS.default.header} ${TABLE_SIZES.md.header} ${TABLE_DENSITIES.normal.header}`,
    row: `${TABLE_VARIANTS.default.row} ${TABLE_SIZES.md.row} ${TABLE_DENSITIES.normal.row}`,
    cell: `${TABLE_VARIANTS.default.cell} ${TABLE_SIZES.md.cell} ${TABLE_DENSITIES.normal.cell}`,
  },

  // Striped variants
  'striped-lg-spacious': {
    table: `${TABLE_VARIANTS.striped.table} ${TABLE_SIZES.lg.table} ${TABLE_DENSITIES.spacious.table}`,
    header: `${TABLE_VARIANTS.striped.header} ${TABLE_SIZES.lg.header} ${TABLE_DENSITIES.spacious.header}`,
    row: `${TABLE_VARIANTS.striped.row} ${TABLE_SIZES.lg.row} ${TABLE_DENSITIES.spacious.row}`,
    cell: `${TABLE_VARIANTS.striped.cell} ${TABLE_SIZES.lg.cell} ${TABLE_DENSITIES.spacious.cell}`,
  },

  // Bordered hover variants
  'bordered-hover-md': {
    table: `${TABLE_VARIANTS.bordered.table} ${TABLE_VARIANTS.hover.table} ${TABLE_SIZES.md.table}`,
    header: `${TABLE_VARIANTS.bordered.header} ${TABLE_VARIANTS.hover.header} ${TABLE_SIZES.md.header}`,
    row: `${TABLE_VARIANTS.bordered.row} ${TABLE_VARIANTS.hover.row} ${TABLE_SIZES.md.row}`,
    cell: `${TABLE_VARIANTS.bordered.cell} ${TABLE_VARIANTS.hover.cell} ${TABLE_SIZES.md.cell}`,
  },

  // Compact responsive variants
  'compact-responsive-sm': {
    table: `${TABLE_VARIANTS.compact.table} ${TABLE_VARIANTS.responsive.table} ${TABLE_SIZES.sm.table}`,
    header: `${TABLE_VARIANTS.compact.header} ${TABLE_VARIANTS.responsive.header} ${TABLE_SIZES.sm.header}`,
    row: `${TABLE_VARIANTS.compact.row} ${TABLE_VARIANTS.responsive.row} ${TABLE_SIZES.sm.row}`,
    cell: `${TABLE_VARIANTS.compact.cell} ${TABLE_VARIANTS.responsive.cell} ${TABLE_SIZES.sm.cell}`,
  },

  // Dashboard semantic variants
  'dashboard-bordered-lg': {
    table: `${TABLE_SEMANTIC_VARIANTS.dashboard.table} ${TABLE_VARIANTS.bordered.table} ${TABLE_SIZES.lg.table}`,
    container: `${TABLE_SEMANTIC_VARIANTS.dashboard.container} ${TABLE_SIZES.lg.container}`,
    header: `${TABLE_SEMANTIC_VARIANTS.dashboard.header} ${TABLE_VARIANTS.bordered.header} ${TABLE_SIZES.lg.header}`,
  },
} as const;

// UTILITY CLASSES
export const TABLE_UTILITIES = {
  // Layout utilities
  'table-fixed': 'layera-table--fixed',
  'table-auto': 'layera-table--auto',
  'table-full-width': 'layera-table--full-width',

  // Scroll utilities
  'table-scroll-x': 'layera-table--scroll-x',
  'table-scroll-y': 'layera-table--scroll-y',
  'table-scroll-both': 'layera-table--scroll-both',

  // Alignment utilities
  'text-left': 'layera-table--text-left',
  'text-center': 'layera-table--text-center',
  'text-right': 'layera-table--text-right',
  'text-justify': 'layera-table--text-justify',

  // Spacing utilities
  'no-wrap': 'layera-table--no-wrap',
  'wrap': 'layera-table--wrap',
  'truncate': 'layera-table--truncate',
} as const;

// HELPER FUNCTIONS για variant generation
export const generateTableClasses = (
  variant: TableVariantType = 'default',
  size: TableSizeType = 'md',
  density: TableDensityType = 'normal',
  borderStyle: TableBorderType = 'horizontal',
  semantic?: TableSemanticType
) => {
  const variantClasses = TABLE_VARIANTS[variant];
  const sizeClasses = TABLE_SIZES[size];
  const densityClasses = TABLE_DENSITIES[density];
  const borderClasses = TABLE_BORDERS[borderStyle];
  const semanticClasses = semantic ? TABLE_SEMANTIC_VARIANTS[semantic] : null;

  return {
    table: [
      variantClasses.table,
      sizeClasses.table,
      densityClasses.table,
      borderClasses.table,
      semanticClasses?.table
    ].filter(Boolean).join(' '),

    container: [
      TABLE_BASE_CLASSES.container,
      sizeClasses.container,
      semanticClasses?.container
    ].filter(Boolean).join(' '),

    header: [
      variantClasses.header,
      sizeClasses.header,
      densityClasses.header,
      borderClasses.header,
      semanticClasses?.header
    ].filter(Boolean).join(' '),

    row: [
      variantClasses.row,
      sizeClasses.row,
      densityClasses.row,
      borderClasses.row
    ].filter(Boolean).join(' '),

    cell: [
      variantClasses.cell,
      sizeClasses.cell,
      densityClasses.cell,
      borderClasses.cell
    ].filter(Boolean).join(' '),
  };
};