/**
 * 📊 LAYERA TABLES COMPONENT SYSTEM - Class Implementation
 *
 * Enterprise-grade table component system που συνδυάζει variables, variants και
 * business logic για complete table management.
 *
 * Features:
 * - CSS generation από token combinations
 * - TypeScript validation & type safety
 * - Component props generation για React/Vue tables
 * - Enterprise configuration management
 * - Responsive table behavior
 */

import {
  TABLE_VARIABLES,
  TABLE_SIZE_VARIABLES,
  TABLE_DENSITY_VARIABLES,
  TABLE_BORDER_VARIABLES,
  TABLE_SEMANTIC_VARIABLES,
  RESPONSIVE_TABLE_VARIABLES,
  type TableVariant,
  type TableSize,
  type TableDensity,
  type TableBorderStyle
} from './tables.variables';

import {
  TABLE_VARIANTS,
  TABLE_SIZES,
  TABLE_DENSITIES,
  TABLE_BORDERS,
  TABLE_SEMANTIC_VARIANTS,
  TABLE_STATES,
  TABLE_INTERACTIVE,
  TABLE_UTILITIES,
  generateTableClasses,
  type TableVariantType,
  type TableSizeType,
  type TableDensityType,
  type TableBorderType,
  type TableSemanticType
} from './tables.variants';

// TABLE COMPONENT INTERFACE
export interface TableComponentProps {
  variant: TableVariant;
  size: TableSize;
  density: TableDensity;
  borderStyle: TableBorderStyle;
  semantic?: TableSemanticType;
  striped?: boolean;
  hoverable?: boolean;
  sortable?: boolean;
  selectable?: boolean;
  responsive?: boolean;
  sticky?: boolean;
  loading?: boolean;
  empty?: boolean;
  caption?: string;
  description?: string;
  className?: string;
}

// TABLE COLUMN DEFINITION
export interface TableColumnDef {
  key: string;
  title: string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  sortable?: boolean;
  resizable?: boolean;
  align?: 'left' | 'center' | 'right';
  type?: 'text' | 'numeric' | 'date' | 'boolean' | 'actions';
  render?: (value: any, row: any) => React.ReactNode | string;
}

// TABLE COMPONENT CONFIGURATION
export interface TableComponentConfig {
  variant: TableVariant;
  size: TableSize;
  density: TableDensity;
  borderStyle: TableBorderStyle;
  semantic?: TableSemanticType;
  columns: TableColumnDef[];
  responsive?: boolean;
  pagination?: boolean;
}

// TABLE COMPONENT CSS RESULT
export interface TableComponentCSS {
  variables: Record<string, string>;
  classes: {
    table: string;
    container: string;
    header: string;
    body: string;
    row: string;
    cell: string;
    headerCell: string;
    caption?: string;
  };
  utilities?: Record<string, string>;
}

/**
 * TableComponentSystem Class
 *
 * Κεντρικό σύστημα διαχείρισης table components με full enterprise support.
 * Παρέχει CSS generation, validation, responsive behavior και accessibility.
 */
export class TableComponentSystem {
  /**
   * Validates table component configuration
   */
  static validateConfig(config: TableComponentConfig): boolean {
    const validVariants: TableVariant[] = ['default', 'striped', 'bordered', 'hover', 'compact', 'responsive'];
    const validSizes: TableSize[] = ['sm', 'md', 'lg', 'xl'];
    const validDensities: TableDensity[] = ['compact', 'normal', 'spacious'];
    const validBorderStyles: TableBorderStyle[] = ['none', 'horizontal', 'vertical', 'all', 'outline'];

    if (!validVariants.includes(config.variant)) {
      console.warn(`Invalid table variant: ${config.variant}`);
      return false;
    }

    if (!validSizes.includes(config.size)) {
      console.warn(`Invalid table size: ${config.size}`);
      return false;
    }

    if (!validDensities.includes(config.density)) {
      console.warn(`Invalid table density: ${config.density}`);
      return false;
    }

    if (!validBorderStyles.includes(config.borderStyle)) {
      console.warn(`Invalid table border style: ${config.borderStyle}`);
      return false;
    }

    if (!config.columns || config.columns.length === 0) {
      console.warn(`Table configuration must include columns`);
      return false;
    }

    return true;
  }

  /**
   * Generates complete CSS για table component
   */
  static generateCSS(config: TableComponentConfig): TableComponentCSS {
    if (!this.validateConfig(config)) {
      throw new Error(`Invalid table configuration: ${JSON.stringify(config)}`);
    }

    // Base variables
    const variables = { ...TABLE_VARIABLES };

    // Size-specific variables
    if (TABLE_SIZE_VARIABLES[config.size]) {
      Object.assign(variables, TABLE_SIZE_VARIABLES[config.size]);
    }

    // Density-specific variables
    if (TABLE_DENSITY_VARIABLES[config.density]) {
      Object.assign(variables, TABLE_DENSITY_VARIABLES[config.density]);
    }

    // Border-specific variables
    if (TABLE_BORDER_VARIABLES[config.borderStyle]) {
      Object.assign(variables, TABLE_BORDER_VARIABLES[config.borderStyle]);
    }

    // Semantic-specific variables
    if (config.semantic && TABLE_SEMANTIC_VARIABLES[config.semantic]) {
      Object.assign(variables, TABLE_SEMANTIC_VARIABLES[config.semantic]);
    }

    // Responsive variables για mobile-first
    if (config.responsive) {
      Object.assign(variables, RESPONSIVE_TABLE_VARIABLES.mobile);
    }

    // Generate classes using helper function
    const classes = generateTableClasses(
      config.variant as TableVariantType,
      config.size as TableSizeType,
      config.density as TableDensityType,
      config.borderStyle as TableBorderType,
      config.semantic
    );

    return {
      variables,
      classes: {
        table: classes.table,
        container: classes.container,
        header: classes.header,
        body: 'layera-table__body',
        row: classes.row,
        cell: classes.cell,
        headerCell: classes.header,
        caption: 'layera-table__caption',
      },
      utilities: TABLE_UTILITIES,
    };
  }

  /**
   * Gets component props για React/Vue table components
   */
  static getComponentProps(
    variant: TableVariant = 'default',
    size: TableSize = 'md',
    density: TableDensity = 'normal',
    borderStyle: TableBorderStyle = 'horizontal',
    semantic?: TableSemanticType
  ): TableComponentProps {
    const config = {
      variant,
      size,
      density,
      borderStyle,
      semantic,
      columns: [] // Will be filled by component
    };

    if (!this.validateConfig({ ...config, columns: [{ key: 'test', title: 'Test' }] })) {
      throw new Error(`Invalid table configuration`);
    }

    return {
      variant,
      size,
      density,
      borderStyle,
      semantic,
      striped: variant === 'striped',
      hoverable: variant === 'hover',
      responsive: variant === 'responsive',
      sortable: false,
      selectable: false,
      sticky: false,
      loading: false,
      empty: false,
    };
  }

  /**
   * Generates inline styles object για table elements
   */
  static getInlineStyles(config: TableComponentConfig): Record<string, string> {
    const css = this.generateCSS(config);
    const inlineStyles: Record<string, string> = {};

    // Convert CSS variables to inline styles
    Object.entries(css.variables).forEach(([key, value]) => {
      // Convert kebab-case to camelCase για React styling
      const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      inlineStyles[camelKey] = value;
    });

    return inlineStyles;
  }

  /**
   * Gets CSS class string για table component
   */
  static getClassName(
    variant: TableVariant,
    size: TableSize,
    density: TableDensity,
    borderStyle: TableBorderStyle,
    semantic?: TableSemanticType,
    states?: string[]
  ): string {
    const classes = generateTableClasses(
      variant as TableVariantType,
      size as TableSizeType,
      density as TableDensityType,
      borderStyle as TableBorderType,
      semantic
    );

    let className = classes.table;

    // Add state classes
    if (states) {
      states.forEach(state => {
        if (TABLE_STATES[state as keyof typeof TABLE_STATES]) {
          className += ` ${TABLE_STATES[state as keyof typeof TABLE_STATES]}`;
        }
      });
    }

    return className;
  }

  /**
   * Gets responsive classes για different breakpoints
   */
  static getResponsiveClasses(breakpoint: 'mobile' | 'tablet' | 'desktop') {
    const breakpointVariables = RESPONSIVE_TABLE_VARIABLES[breakpoint];

    return {
      table: `layera-table--${breakpoint}`,
      variables: breakpointVariables,
    };
  }

  /**
   * Gets accessibility attributes για table elements
   */
  static getAccessibilityProps(config: TableComponentConfig) {
    const baseProps = {
      role: 'table',
      'aria-label': config.semantic ? `${config.semantic} table` : 'data table',
    };

    const headerProps = {
      role: 'columnheader',
      scope: 'col',
    };

    const rowProps = {
      role: 'row',
    };

    const cellProps = {
      role: 'cell',
    };

    return {
      table: baseProps,
      header: headerProps,
      row: rowProps,
      cell: cellProps,
    };
  }

  /**
   * Gets column-specific classes based on column type
   */
  static getColumnClasses(column: TableColumnDef): string {
    const classes = ['layera-table__cell'];

    // Type-specific classes
    if (column.type) {
      classes.push(`layera-table__cell--${column.type}`);
    }

    // Alignment classes
    if (column.align) {
      classes.push(`layera-table--text-${column.align}`);
    }

    // Interactive classes
    if (column.sortable) {
      classes.push(TABLE_INTERACTIVE['header-sortable']);
    }

    if (column.resizable) {
      classes.push(TABLE_INTERACTIVE['header-resizable']);
    }

    return classes.join(' ');
  }

  /**
   * Enterprise configuration presets για common table types
   */
  static readonly ENTERPRISE_PRESETS = {
    // Data tables για admin dashboards
    DATA_ADMIN: {
      variant: 'bordered' as const,
      size: 'md' as const,
      density: 'normal' as const,
      borderStyle: 'all' as const,
      semantic: 'data' as const,
    },

    // Dashboard metrics tables
    DASHBOARD_METRICS: {
      variant: 'striped' as const,
      size: 'lg' as const,
      density: 'spacious' as const,
      borderStyle: 'horizontal' as const,
      semantic: 'dashboard' as const,
    },

    // Compact data lists
    COMPACT_LIST: {
      variant: 'compact' as const,
      size: 'sm' as const,
      density: 'compact' as const,
      borderStyle: 'none' as const,
    },

    // Report tables
    REPORT_TABLE: {
      variant: 'default' as const,
      size: 'md' as const,
      density: 'normal' as const,
      borderStyle: 'outline' as const,
      semantic: 'report' as const,
    },

    // Comparison tables
    COMPARISON_TABLE: {
      variant: 'bordered' as const,
      size: 'lg' as const,
      density: 'spacious' as const,
      borderStyle: 'all' as const,
      semantic: 'comparison' as const,
    },

    // Mobile-responsive tables
    MOBILE_RESPONSIVE: {
      variant: 'responsive' as const,
      size: 'sm' as const,
      density: 'compact' as const,
      borderStyle: 'horizontal' as const,
    },
  } as const;

  /**
   * Gets enterprise preset configuration
   */
  static getEnterprisePreset(preset: keyof typeof TableComponentSystem.ENTERPRISE_PRESETS): Omit<TableComponentConfig, 'columns'> {
    return this.ENTERPRISE_PRESETS[preset];
  }

  /**
   * Generates table configuration για common use cases
   */
  static createQuickConfig(
    type: 'data' | 'dashboard' | 'report' | 'compact' | 'comparison',
    columns: TableColumnDef[]
  ): TableComponentConfig {
    const presetMap = {
      data: 'DATA_ADMIN',
      dashboard: 'DASHBOARD_METRICS',
      report: 'REPORT_TABLE',
      compact: 'COMPACT_LIST',
      comparison: 'COMPARISON_TABLE',
    } as const;

    const preset = this.getEnterprisePreset(presetMap[type]);

    return {
      ...preset,
      columns,
      responsive: true,
      pagination: columns.length > 50, // Auto-enable pagination για large datasets
    };
  }
}