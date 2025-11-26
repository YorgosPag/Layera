/**
 * TableInfoCardsBuilder - HTML-aligned Enterprise CSS Builder
 *
 * Γενεράει CSS για table info cards components
 * Βασισμένο στο: html\htmlComponents\main\tables\table-info-cards.html
 *
 * ΧΑΡΑΚΤΗΡΙΣΤΙΚΑ:
 * - Document management table με info theming (#2196F3)
 * - Knowledge base workflows με document categorization
 * - Editable table cells με inline inputs και selects
 * - Information action buttons (View, Download, Analyze, Edit)
 * - Document tracking με author και date management
 * - Enterprise documentation patterns
 */

export class TableInfoCardsBuilder {
  /**
   * Κύρια μέθοδος γενεραρίας όλου του Table Info Cards CSS
   */
  static generateAllTableInfoCardsCSS() {
    let css = '/* === TABLE INFO CARDS === */\n\n';

    css += this.generateInfoTableContextCSS();
    css += this.generateDocumentManagementControlsCSS();
    css += this.generateInfoTableStructureCSS();
    css += this.generateDocumentTypeSystemCSS();
    css += this.generateEditableDocumentCellsCSS();
    css += this.generateInformationActionButtonsCSS();
    css += this.generateDocumentTrackingCSS();
    css += this.generateTableDocumentStatsCSS();
    css += this.generateInfoTableResponsiveCSS();
    css += this.generateInfoTableAccessibilityCSS();
    css += this.generateInfoTableInteractionsCSS();

    return css;
  }

  /**
   * Info Table Context - Μπλε θεματική βάση
   */
  static generateInfoTableContextCSS() {
    return `
/* INFO TABLE CONTEXT */
.layera-info-table-context {
  background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%);
  border: 2px solid var(--layera-colors-blue-400, #2196F3);
  border-radius: var(--layera-spacing-md, 8px);
  padding: var(--layera-spacing-lg, 16px);
}

.layera-info-table-theme {
  --info-primary: var(--layera-colors-blue-500, #2196F3);
  --info-light: var(--layera-colors-blue-100, #e1f5fe);
  --info-dark: var(--layera-colors-blue-700, #1976d2);
  --info-text: var(--layera-colors-blue-900, #0d47a1);
}

.layera-document-highlight {
  background: linear-gradient(90deg,
    var(--layera-colors-blue-400, #2196F3) 0%,
    var(--layera-colors-blue-500, #1976d2) 100%
  );
  color: var(--layera-colors-white, #ffffff);
  padding: var(--layera-spacing-sm, 4px) var(--layera-spacing-md, 8px);
  border-radius: var(--layera-spacing-sm, 4px);
  font-weight: var(--layera-typography-weight-medium, 500);
  animation: documentPulse 3s ease-in-out infinite;
}

@keyframes documentPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.01); }
}

`;
  }

  /**
   * Document Management Controls - Search, filters, και controls
   */
  static generateDocumentManagementControlsCSS() {
    return `
/* DOCUMENT MANAGEMENT CONTROLS */
.layera-document-controls {
  margin-bottom: var(--layera-spacing-lg, 16px);
  display: flex;
  gap: var(--layera-spacing-sm, 4px);
  flex-wrap: nowrap;
  align-items: center;
}

.layera-document-search {
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-blue-400, #2196F3);
  border-radius: var(--layera-spacing-sm, 4px);
  width: 150px;
  flex-shrink: 1;
  font-size: var(--layera-typography-size-sm, 14px);
  background: var(--layera-colors-white, #ffffff);
}

.layera-document-search:focus {
  outline: none;
  border-color: var(--layera-colors-blue-500, #1976d2);
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
  background: linear-gradient(135deg, #ffffff 0%, #f8fcff 100%);
}

.layera-document-type-filter {
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-blue-400, #2196F3);
  border-radius: var(--layera-spacing-sm, 4px);
  flex-shrink: 1;
  font-size: var(--layera-typography-size-sm, 14px);
  background: var(--layera-colors-white, #ffffff);
  cursor: pointer;
}

.layera-document-type-filter:hover {
  border-color: var(--layera-colors-blue-500, #1976d2);
  background: linear-gradient(135deg, #ffffff 0%, #f8fcff 100%);
}

.layera-document-category {
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-blue-400, #2196F3);
  border-radius: var(--layera-spacing-sm, 4px);
  flex-shrink: 1;
  font-size: var(--layera-typography-size-sm, 14px);
  background: var(--layera-colors-white, #ffffff);
}

.layera-add-document-btn {
  background: var(--layera-colors-blue-400, #2196F3);
  color: var(--layera-colors-white, #ffffff);
  padding: var(--layera-spacing-sm, 4px) var(--layera-spacing-md, 8px);
  font-size: var(--layera-typography-size-sm, 14px);
  height: auto;
  width: auto;
  flex-shrink: 0;
  border: none;
  border-radius: var(--layera-spacing-sm, 4px);
  cursor: pointer;
  font-weight: var(--layera-typography-weight-medium, 500);
  transition: all 0.2s ease;
}

.layera-add-document-btn:hover {
  background: var(--layera-colors-blue-500, #1976d2);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
}

.layera-add-document-btn:active {
  transform: translateY(0);
}

`;
  }

  /**
   * Info Table Structure - Table layout και header styling
   */
  static generateInfoTableStructureCSS() {
    return `
/* INFO TABLE STRUCTURE */
.layera-info-simple-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--layera-colors-white, #ffffff);
  border-radius: var(--layera-spacing-md, 8px);
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.1);
  border: 1px solid var(--layera-colors-blue-200, #90caf9);
}

.layera-info-table-header {
  background: var(--layera-colors-blue-400, #2196F3);
}

.layera-info-table-header th {
  color: var(--layera-colors-white, #ffffff);
  padding: var(--layera-spacing-md, 8px) var(--layera-spacing-lg, 16px);
  text-align: left;
  font-weight: var(--layera-typography-weight-bold, 700);
  font-size: var(--layera-typography-size-sm, 14px);
  border-bottom: 2px solid var(--layera-colors-blue-500, #1976d2);
  position: relative;
}

.layera-info-table-header th::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg,
    var(--layera-colors-blue-500, #1976d2) 0%,
    var(--layera-colors-blue-600, #1565c0) 100%
  );
}

.layera-info-table-row {
  height: 35px;
  border-bottom: 1px solid var(--layera-colors-blue-100, #e1f5fe);
  transition: all 0.2s ease;
}

.layera-info-table-row:hover {
  background: linear-gradient(135deg, #f8fcff 0%, #e1f5fe 100%);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.1);
}

.layera-info-table-row:nth-child(even) {
  background: var(--layera-colors-gray-50, #fafafa);
}

.layera-info-table-row:nth-child(even):hover {
  background: linear-gradient(135deg, #f8fcff 0%, #e1f5fe 100%);
}

.layera-info-table-cell {
  padding: var(--layera-spacing-xs, 2px) var(--layera-spacing-sm, 4px);
  vertical-align: middle;
  border-right: 1px solid var(--layera-colors-blue-100, #e1f5fe);
}

.layera-info-table-cell:last-child {
  border-right: none;
}

`;
  }

  /**
   * Document Type System - Documentation, Reports, Guides
   */
  static generateDocumentTypeSystemCSS() {
    return `
/* DOCUMENT TYPE SYSTEM */
.layera-document-type-documentation {
  background: linear-gradient(135deg, #1976d2 0%, #2196f3 100%);
  color: var(--layera-colors-white, #ffffff);
  padding: var(--layera-spacing-xs, 2px) var(--layera-spacing-sm, 4px);
  border-radius: var(--layera-spacing-xs, 2px);
  font-weight: var(--layera-typography-weight-bold, 700);
  font-size: var(--layera-typography-size-xs, 11px);
}

.layera-document-type-reports {
  background: linear-gradient(135deg, #388e3c 0%, #4caf50 100%);
  color: var(--layera-colors-white, #ffffff);
  padding: var(--layera-spacing-xs, 2px) var(--layera-spacing-sm, 4px);
  border-radius: var(--layera-spacing-xs, 2px);
  font-weight: var(--layera-typography-weight-bold, 700);
  font-size: var(--layera-typography-size-xs, 11px);
}

.layera-document-type-guides {
  background: linear-gradient(135deg, #f57c00 0%, #ff9800 100%);
  color: var(--layera-colors-white, #ffffff);
  padding: var(--layera-spacing-xs, 2px) var(--layera-spacing-sm, 4px);
  border-radius: var(--layera-spacing-xs, 2px);
  font-weight: var(--layera-typography-weight-bold, 700);
  font-size: var(--layera-typography-size-xs, 11px);
}

.layera-document-type-selector {
  border: none;
  background: transparent;
  padding: var(--layera-spacing-xs, 2px);
  width: 100%;
  cursor: pointer;
  font-size: var(--layera-typography-size-sm, 14px);
}

.layera-document-type-selector:focus {
  outline: 2px solid var(--layera-colors-blue-400, #2196F3);
  outline-offset: 1px;
  background: var(--layera-colors-blue-50, #e1f5fe);
  border-radius: var(--layera-spacing-xs, 2px);
}

.layera-document-type-selector option {
  background: var(--layera-colors-white, #ffffff);
  color: var(--layera-colors-gray-800, #424242);
  padding: var(--layera-spacing-sm, 4px);
}

/* Document Priority Indicators */
.layera-document-priority-high {
  border-left: 3px solid var(--layera-colors-blue-600, #1565c0);
  background: linear-gradient(90deg, rgba(33, 150, 243, 0.1) 0%, transparent 100%);
}

.layera-document-priority-medium {
  border-left: 3px solid var(--layera-colors-blue-400, #2196f3);
  background: linear-gradient(90deg, rgba(33, 150, 243, 0.05) 0%, transparent 100%);
}

.layera-document-priority-low {
  border-left: 3px solid var(--layera-colors-blue-200, #90caf9);
  background: linear-gradient(90deg, rgba(33, 150, 243, 0.03) 0%, transparent 100%);
}

`;
  }

  /**
   * Editable Document Cells - Inline editing functionality
   */
  static generateEditableDocumentCellsCSS() {
    return `
/* EDITABLE DOCUMENT CELLS */
.layera-editable-document-input {
  border: none;
  background: transparent;
  width: 100%;
  padding: var(--layera-spacing-xs, 2px);
  font-size: var(--layera-typography-size-sm, 14px);
  color: var(--layera-colors-gray-800, #424242);
  outline: none;
  transition: all 0.2s ease;
}

.layera-editable-document-input:focus {
  background: var(--layera-colors-blue-50, #e1f5fe);
  border: 1px solid var(--layera-colors-blue-300, #64b5f6);
  border-radius: var(--layera-spacing-xs, 2px);
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
  padding: var(--layera-spacing-xs, 2px) var(--layera-spacing-sm, 4px);
}

.layera-editable-document-input:hover {
  background: var(--layera-colors-gray-50, #fafafa);
  border-radius: var(--layera-spacing-xs, 2px);
}

.layera-document-title-checkbox {
  margin-right: var(--layera-spacing-sm, 4px);
  cursor: pointer;
  transform: scale(1.1);
}

.layera-document-title-checkbox:checked {
  accent-color: var(--layera-colors-blue-400, #2196F3);
}

.layera-document-title {
  font-weight: var(--layera-typography-weight-semibold, 600);
  color: var(--layera-colors-blue-700, #1976d2);
}

.layera-document-author {
  font-style: italic;
  color: var(--layera-colors-gray-700, #616161);
}

.layera-document-date {
  font-family: monospace;
  font-size: var(--layera-typography-size-sm, 14px);
  color: var(--layera-colors-gray-600, #757575);
}

.layera-document-date:focus {
  background: var(--layera-colors-blue-50, #e1f5fe);
  border: 1px solid var(--layera-colors-blue-300, #64b5f6);
}

/* Version indicators */
.layera-document-version {
  background: var(--layera-colors-blue-100, #e1f5fe);
  color: var(--layera-colors-blue-800, #1565c0);
  padding: var(--layera-spacing-xs, 1px) var(--layera-spacing-sm, 4px);
  border-radius: var(--layera-spacing-xs, 2px);
  font-size: var(--layera-typography-size-xs, 10px);
  font-weight: var(--layera-typography-weight-bold, 700);
  margin-left: var(--layera-spacing-xs, 2px);
}

`;
  }

  /**
   * Information Action Buttons - View, Download, Analyze, Edit buttons
   */
  static generateInformationActionButtonsCSS() {
    return `
/* INFORMATION ACTION BUTTONS */
.layera-info-action-btn {
  padding: var(--layera-spacing-xs, 2px) var(--layera-spacing-sm, 4px);
  font-size: var(--layera-typography-size-xs, 12px);
  background: var(--layera-colors-blue-400, #2196F3);
  border: none;
  border-radius: var(--layera-spacing-xs, 3px);
  color: var(--layera-colors-white, #ffffff);
  cursor: pointer;
  font-weight: var(--layera-typography-weight-medium, 500);
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.layera-info-action-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.layera-info-action-btn:hover::before {
  left: 100%;
}

.layera-info-action-btn:hover {
  background: var(--layera-colors-blue-500, #1976d2);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(33, 150, 243, 0.3);
}

.layera-info-action-btn:active {
  transform: translateY(0);
}

/* Specific Information Action Types */
.layera-view-btn {
  background: var(--layera-colors-blue-400, #2196f3);
}

.layera-view-btn:hover {
  background: var(--layera-colors-blue-500, #1976d2);
}

.layera-download-btn {
  background: var(--layera-colors-green-500, #4caf50);
}

.layera-download-btn:hover {
  background: var(--layera-colors-green-600, #388e3c);
}

.layera-analyze-btn {
  background: var(--layera-colors-purple-500, #9c27b0);
}

.layera-analyze-btn:hover {
  background: var(--layera-colors-purple-600, #7b1fa2);
}

.layera-edit-btn {
  background: var(--layera-colors-orange-500, #ff9800);
}

.layera-edit-btn:hover {
  background: var(--layera-colors-orange-600, #f57c00);
}

.layera-info-action-btn:focus {
  outline: 2px solid var(--layera-colors-white, #ffffff);
  outline-offset: 2px;
}

/* Action button with badges */
.layera-info-action-btn .layera-action-badge {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  padding: 2px 4px;
  font-size: var(--layera-typography-size-xs, 9px);
  margin-left: var(--layera-spacing-xs, 2px);
}

`;
  }

  /**
   * Document Tracking - Document management και tracking patterns
   */
  static generateDocumentTrackingCSS() {
    return `
/* DOCUMENT TRACKING */
.layera-document-row-recent {
  border-left: 4px solid var(--layera-colors-green-500, #4caf50);
  background: linear-gradient(90deg, rgba(76, 175, 80, 0.05) 0%, transparent 100%);
}

.layera-document-row-updated {
  border-left: 4px solid var(--layera-colors-blue-500, #2196f3);
  background: linear-gradient(90deg, rgba(33, 150, 243, 0.05) 0%, transparent 100%);
}

.layera-document-row-old {
  border-left: 4px solid var(--layera-colors-orange-500, #ff9800);
  background: linear-gradient(90deg, rgba(255, 152, 0, 0.05) 0%, transparent 100%);
}

.layera-document-status-indicator {
  position: absolute;
  left: -2px;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: documentStatusPulse 2s ease-in-out infinite;
}

.layera-document-status-recent .layera-document-status-indicator {
  background: var(--layera-colors-green-500, #4caf50);
}

.layera-document-status-updated .layera-document-status-indicator {
  background: var(--layera-colors-blue-500, #2196f3);
}

.layera-document-status-old .layera-document-status-indicator {
  background: var(--layera-colors-orange-500, #ff9800);
}

@keyframes documentStatusPulse {
  0%, 100% { opacity: 1; transform: translateY(-50%) scale(1); }
  50% { opacity: 0.6; transform: translateY(-50%) scale(1.2); }
}

.layera-document-last-updated {
  position: relative;
}

.layera-document-last-updated::after {
  content: attr(data-time-ago);
  position: absolute;
  bottom: -15px;
  left: 0;
  font-size: var(--layera-typography-size-xs, 10px);
  color: var(--layera-colors-gray-500, #9e9e9e);
  font-style: italic;
}

/* Document access tracking */
.layera-document-views {
  font-size: var(--layera-typography-size-xs, 10px);
  color: var(--layera-colors-blue-500, #2196f3);
  background: var(--layera-colors-blue-50, #e1f5fe);
  padding: 2px 4px;
  border-radius: var(--layera-spacing-xs, 2px);
  margin-left: var(--layera-spacing-xs, 2px);
}

`;
  }

  /**
   * Table Document Stats - Statistics και pagination
   */
  static generateTableDocumentStatsCSS() {
    return `
/* TABLE DOCUMENT STATS */
.layera-table-document-footer {
  margin-top: var(--layera-spacing-lg, 16px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--layera-spacing-md, 8px) 0;
  border-top: 1px solid var(--layera-colors-blue-200, #90caf9);
}

.layera-document-stats {
  font-size: var(--layera-typography-size-sm, 14px);
  color: var(--layera-colors-gray-600, #757575);
  font-weight: var(--layera-typography-weight-medium, 500);
}

.layera-document-stats .layera-stat-documentation {
  color: var(--layera-colors-blue-600, #1976d2);
  font-weight: var(--layera-typography-weight-bold, 700);
}

.layera-document-stats .layera-stat-reports {
  color: var(--layera-colors-green-600, #388e3c);
  font-weight: var(--layera-typography-weight-bold, 700);
}

.layera-document-stats .layera-stat-guides {
  color: var(--layera-colors-orange-600, #f57c00);
  font-weight: var(--layera-typography-weight-bold, 700);
}

.layera-document-pagination-controls {
  display: flex;
  gap: var(--layera-spacing-sm, 4px);
}

.layera-document-pagination-btn {
  padding: var(--layera-spacing-xs, 2px) var(--layera-spacing-md, 8px);
  font-size: var(--layera-typography-size-xs, 12px);
  border: 1px solid var(--layera-colors-gray-300, #e0e0e0);
  background: var(--layera-colors-white, #ffffff);
  color: var(--layera-colors-gray-700, #616161);
  cursor: pointer;
  border-radius: var(--layera-spacing-sm, 4px);
  transition: all 0.2s ease;
}

.layera-document-pagination-btn:hover {
  border-color: var(--layera-colors-blue-300, #64b5f6);
  background: var(--layera-colors-blue-50, #e1f5fe);
  color: var(--layera-colors-blue-600, #1976d2);
}

.layera-document-pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--layera-colors-gray-100, #f5f5f5);
}

.layera-document-pagination-btn:disabled:hover {
  border-color: var(--layera-colors-gray-300, #e0e0e0);
  background: var(--layera-colors-gray-100, #f5f5f5);
  color: var(--layera-colors-gray-500, #9e9e9e);
}

`;
  }

  /**
   * Info Table Responsive - Mobile and tablet adaptations
   */
  static generateInfoTableResponsiveCSS() {
    return `
/* INFO TABLE RESPONSIVE */
@media (max-width: 768px) {
  .layera-document-controls {
    flex-direction: column;
    gap: var(--layera-spacing-md, 8px);
  }

  .layera-document-search,
  .layera-document-type-filter,
  .layera-document-category,
  .layera-add-document-btn {
    width: 100%;
    flex-shrink: 0;
  }

  .layera-info-simple-table {
    font-size: var(--layera-typography-size-xs, 12px);
  }

  .layera-info-table-header th {
    padding: var(--layera-spacing-sm, 4px);
    font-size: var(--layera-typography-size-xs, 11px);
  }

  .layera-info-table-cell {
    padding: var(--layera-spacing-xs, 2px);
  }

  .layera-info-action-btn {
    font-size: var(--layera-typography-size-xs, 10px);
    padding: var(--layera-spacing-xs, 1px) var(--layera-spacing-xs, 2px);
  }

  .layera-table-document-footer {
    flex-direction: column;
    gap: var(--layera-spacing-md, 8px);
    text-align: center;
  }

  .layera-document-stats {
    font-size: var(--layera-typography-size-xs, 12px);
  }
}

@media (max-width: 480px) {
  .layera-info-simple-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  .layera-info-table-row {
    min-width: 600px;
  }

  .layera-document-controls {
    padding: var(--layera-spacing-sm, 4px);
  }
}

/* Landscape mobile optimization */
@media (max-width: 768px) and (orientation: landscape) {
  .layera-document-controls {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .layera-document-search,
  .layera-document-type-filter,
  .layera-document-category {
    width: calc(33.33% - var(--layera-spacing-sm, 4px));
  }

  .layera-add-document-btn {
    width: 100%;
  }
}

`;
  }

  /**
   * Info Table Accessibility - ARIA and keyboard support
   */
  static generateInfoTableAccessibilityCSS() {
    return `
/* INFO TABLE ACCESSIBILITY */
.layera-info-simple-table {
  border-collapse: separate;
  border-spacing: 0;
}

.layera-info-table-header th {
  position: relative;
}

.layera-info-table-header th[aria-sort] {
  cursor: pointer;
}

.layera-info-table-header th[aria-sort]::after {
  content: '';
  position: absolute;
  right: var(--layera-spacing-sm, 4px);
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid var(--layera-colors-white, #ffffff);
  opacity: 0.5;
}

.layera-info-table-header th[aria-sort="ascending"]::after {
  border-bottom: 4px solid var(--layera-colors-white, #ffffff);
  border-top: none;
  opacity: 1;
}

.layera-info-table-header th[aria-sort="descending"]::after {
  border-top: 4px solid var(--layera-colors-white, #ffffff);
  border-bottom: none;
  opacity: 1;
}

.layera-document-title-checkbox:focus {
  outline: 2px solid var(--layera-colors-blue-400, #2196F3);
  outline-offset: 2px;
}

.layera-editable-document-input:focus {
  outline: 2px solid var(--layera-colors-blue-400, #2196F3);
  outline-offset: 1px;
}

.layera-document-type-selector:focus {
  outline: 2px solid var(--layera-colors-blue-400, #2196F3);
  outline-offset: 1px;
}

.layera-info-action-btn:focus {
  outline: 2px solid var(--layera-colors-white, #ffffff);
  outline-offset: 2px;
}

/* Screen reader support */
.layera-document-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .layera-info-table-header {
    border: 2px solid;
  }

  .layera-info-action-btn {
    border: 1px solid;
  }

  .layera-document-type-documentation,
  .layera-document-type-reports,
  .layera-document-type-guides {
    border: 1px solid;
  }
}

`;
  }

  /**
   * Info Table Interactions - Hover states και interactive effects
   */
  static generateInfoTableInteractionsCSS() {
    return `
/* INFO TABLE INTERACTIONS */
.layera-info-table-row {
  cursor: pointer;
}

.layera-info-table-row:hover .layera-document-title {
  color: var(--layera-colors-blue-800, #1565c0);
  font-weight: var(--layera-typography-weight-bold, 700);
}

.layera-info-table-row:hover .layera-info-action-btn {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(33, 150, 243, 0.4);
}

.layera-editable-document-input:hover {
  background: var(--layera-colors-gray-50, #fafafa);
}

.layera-document-type-selector:hover {
  background: var(--layera-colors-blue-50, #e1f5fe);
}

/* Row selection effects */
.layera-info-table-row.layera-selected {
  background: linear-gradient(135deg, #e1f5fe 0%, #90caf9 100%);
  border-left: 4px solid var(--layera-colors-blue-400, #2196F3);
}

.layera-info-table-row.layera-selected:hover {
  background: linear-gradient(135deg, #90caf9 0%, #64b5f6 100%);
}

/* Document update highlighting */
.layera-info-table-row.layera-recently-updated {
  animation: recentUpdate 3s ease-in-out infinite;
}

@keyframes recentUpdate {
  0%, 100% {
    background: linear-gradient(135deg, #e1f5fe 0%, #90caf9 100%);
    transform: translateY(0);
  }
  50% {
    background: linear-gradient(135deg, #90caf9 0%, #64b5f6 100%);
    transform: translateY(-1px);
  }
}

/* Action button group interactions */
.layera-info-table-cell:hover .layera-info-action-btn {
  transform: scale(1.05);
}

/* Document access animations */
.layera-document-accessed {
  animation: documentAccessed 1s ease-out;
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
}

@keyframes documentAccessed {
  0% {
    opacity: 0.8;
    transform: scale(0.98);
    background: linear-gradient(135deg, #e1f5fe 0%, #90caf9 100%);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
  }
}

.layera-document-downloaded {
  animation: documentDownloaded 1.5s ease-out;
  background: linear-gradient(135deg, #fff3e0 0%, #ffcc80 100%);
}

@keyframes documentDownloaded {
  0% {
    background: linear-gradient(135deg, #e1f5fe 0%, #90caf9 100%);
    transform: scale(1);
  }
  50% {
    background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
    transform: scale(1.02);
  }
  100% {
    background: linear-gradient(135deg, #fff3e0 0%, #ffcc80 100%);
    transform: scale(1);
  }
}

/* Filter interaction effects */
.layera-document-type-filter.layera-active {
  border-color: var(--layera-colors-blue-500, #1976d2);
  background: linear-gradient(135deg, #e1f5fe 0%, #90caf9 100%);
  font-weight: var(--layera-typography-weight-bold, 700);
}

/* Search highlighting */
.layera-document-search-highlight {
  background: linear-gradient(135deg, #fff9c4 0%, #ffeb3b 50%, #fff9c4 100%);
  animation: searchHighlight 2s ease-in-out;
  border-radius: var(--layera-spacing-xs, 2px);
  padding: 0 var(--layera-spacing-xs, 2px);
}

@keyframes searchHighlight {
  0%, 100% { background: transparent; }
  50% { background: linear-gradient(135deg, #fff9c4 0%, #ffeb3b 50%, #fff9c4 100%); }
}

`;
  }
}