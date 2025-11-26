/**
 * TableDangerCardsBuilder - HTML-aligned Enterprise CSS Builder
 *
 * Γενεράει CSS για table danger cards components
 * Βασισμένο στο: html\htmlComponents\main\tables\table-danger-cards.html
 *
 * ΧΑΡΑΚΤΗΡΙΣΤΙΚΑ:
 * - Incident management table με danger theming (#F44336)
 * - Emergency workflows με severity levels (Critical, Major, Minor)
 * - Editable table cells με inline inputs και selects
 * - Emergency action buttons (Escalate, Secure, Restore, Backup)
 * - Real-time incident tracking με search και filtering
 * - Enterprise incident management patterns
 */

export class TableDangerCardsBuilder {
  /**
   * Κύρια μέθοδος γενεραρίας όλου του Table Danger Cards CSS
   */
  static generateAllTableDangerCardsCSS() {
    let css = '/* === TABLE DANGER CARDS === */\n\n';

    css += this.generateDangerTableContextCSS();
    css += this.generateIncidentManagementControlsCSS();
    css += this.generateDangerTableStructureCSS();
    css += this.generateSeverityLevelSystemCSS();
    css += this.generateEditableTableCellsCSS();
    css += this.generateEmergencyActionButtonsCSS();
    css += this.generateIncidentTrackingCSS();
    css += this.generateTableFooterStatsCSS();
    css += this.generateDangerTableResponsiveCSS();
    css += this.generateDangerTableAccessibilityCSS();
    css += this.generateDangerTableInteractionsCSS();

    return css;
  }

  /**
   * Danger Table Context - Κόκκινη θεματική βάση
   */
  static generateDangerTableContextCSS() {
    return `
/* DANGER TABLE CONTEXT */
.layera-danger-table-context {
  background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
  border: 2px solid var(--layera-colors-red-500, #F44336);
  border-radius: var(--layera-spacing-md, 8px);
  padding: var(--layera-spacing-lg, 16px);
}

.layera-danger-table-theme {
  --danger-primary: var(--layera-colors-red-600, #F44336);
  --danger-light: var(--layera-colors-red-100, #ffebee);
  --danger-dark: var(--layera-colors-red-800, #c62828);
  --danger-text: var(--layera-colors-red-900, #b71c1c);
}

.layera-incident-alert {
  background: linear-gradient(90deg,
    var(--layera-colors-red-500, #F44336) 0%,
    var(--layera-colors-red-600, #d32f2f) 100%
  );
  color: var(--layera-colors-white, #ffffff);
  padding: var(--layera-spacing-sm, 4px) var(--layera-spacing-md, 8px);
  border-radius: var(--layera-spacing-sm, 4px);
  font-weight: var(--layera-typography-weight-bold, 700);
  animation: dangerPulse 2s ease-in-out infinite;
}

@keyframes dangerPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.02); }
}

`;
  }

  /**
   * Incident Management Controls - Search, filters, και controls
   */
  static generateIncidentManagementControlsCSS() {
    return `
/* INCIDENT MANAGEMENT CONTROLS */
.layera-incident-controls {
  margin-bottom: var(--layera-spacing-lg, 16px);
  display: flex;
  gap: var(--layera-spacing-sm, 4px);
  flex-wrap: nowrap;
  align-items: center;
}

.layera-incident-search {
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-red-500, #F44336);
  border-radius: var(--layera-spacing-sm, 4px);
  width: 150px;
  flex-shrink: 1;
  font-size: var(--layera-typography-size-sm, 14px);
  background: var(--layera-colors-white, #ffffff);
}

.layera-incident-search:focus {
  outline: none;
  border-color: var(--layera-colors-red-600, #d32f2f);
  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
  background: linear-gradient(135deg, #ffffff 0%, #fff8f8 100%);
}

.layera-severity-filter {
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-red-500, #F44336);
  border-radius: var(--layera-spacing-sm, 4px);
  flex-shrink: 1;
  font-size: var(--layera-typography-size-sm, 14px);
  background: var(--layera-colors-white, #ffffff);
  cursor: pointer;
}

.layera-severity-filter:hover {
  border-color: var(--layera-colors-red-600, #d32f2f);
  background: linear-gradient(135deg, #ffffff 0%, #fff8f8 100%);
}

.layera-incident-datetime {
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-red-500, #F44336);
  border-radius: var(--layera-spacing-sm, 4px);
  flex-shrink: 1;
  font-size: var(--layera-typography-size-sm, 14px);
  background: var(--layera-colors-white, #ffffff);
  font-family: monospace;
}

.layera-add-incident-btn {
  background: var(--layera-colors-red-500, #F44336);
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

.layera-add-incident-btn:hover {
  background: var(--layera-colors-red-600, #d32f2f);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
}

.layera-add-incident-btn:active {
  transform: translateY(0);
}

`;
  }

  /**
   * Danger Table Structure - Table layout και header styling
   */
  static generateDangerTableStructureCSS() {
    return `
/* DANGER TABLE STRUCTURE */
.layera-simple-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--layera-colors-white, #ffffff);
  border-radius: var(--layera-spacing-md, 8px);
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.1);
  border: 1px solid var(--layera-colors-red-200, #ffcdd2);
}

.layera-danger-table-header {
  background: var(--layera-colors-red-500, #F44336);
}

.layera-danger-table-header th {
  color: var(--layera-colors-white, #ffffff);
  padding: var(--layera-spacing-md, 8px) var(--layera-spacing-lg, 16px);
  text-align: left;
  font-weight: var(--layera-typography-weight-bold, 700);
  font-size: var(--layera-typography-size-sm, 14px);
  border-bottom: 2px solid var(--layera-colors-red-600, #d32f2f);
  position: relative;
}

.layera-danger-table-header th::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg,
    var(--layera-colors-red-600, #d32f2f) 0%,
    var(--layera-colors-red-700, #c62828) 100%
  );
}

.layera-danger-table-row {
  height: 35px;
  border-bottom: 1px solid var(--layera-colors-red-100, #ffebee);
  transition: all 0.2s ease;
}

.layera-danger-table-row:hover {
  background: linear-gradient(135deg, #fff8f8 0%, #ffebee 100%);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(244, 67, 54, 0.1);
}

.layera-danger-table-row:nth-child(even) {
  background: var(--layera-colors-gray-50, #fafafa);
}

.layera-danger-table-row:nth-child(even):hover {
  background: linear-gradient(135deg, #fff8f8 0%, #ffebee 100%);
}

.layera-danger-table-cell {
  padding: var(--layera-spacing-xs, 2px) var(--layera-spacing-sm, 4px);
  vertical-align: middle;
  border-right: 1px solid var(--layera-colors-red-100, #ffebee);
}

.layera-danger-table-cell:last-child {
  border-right: none;
}

`;
  }

  /**
   * Severity Level System - Critical, Major, Minor severity levels
   */
  static generateSeverityLevelSystemCSS() {
    return `
/* SEVERITY LEVEL SYSTEM */
.layera-severity-critical {
  background: linear-gradient(135deg, #d32f2f 0%, #f44336 100%);
  color: var(--layera-colors-white, #ffffff);
  padding: var(--layera-spacing-xs, 2px) var(--layera-spacing-sm, 4px);
  border-radius: var(--layera-spacing-xs, 2px);
  font-weight: var(--layera-typography-weight-bold, 700);
  font-size: var(--layera-typography-size-xs, 11px);
  animation: criticalFlash 3s ease-in-out infinite;
}

@keyframes criticalFlash {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.layera-severity-major {
  background: linear-gradient(135deg, #f57c00 0%, #ff9800 100%);
  color: var(--layera-colors-white, #ffffff);
  padding: var(--layera-spacing-xs, 2px) var(--layera-spacing-sm, 4px);
  border-radius: var(--layera-spacing-xs, 2px);
  font-weight: var(--layera-typography-weight-bold, 700);
  font-size: var(--layera-typography-size-xs, 11px);
}

.layera-severity-minor {
  background: linear-gradient(135deg, #fbc02d 0%, #ffeb3b 100%);
  color: var(--layera-colors-gray-800, #424242);
  padding: var(--layera-spacing-xs, 2px) var(--layera-spacing-sm, 4px);
  border-radius: var(--layera-spacing-xs, 2px);
  font-weight: var(--layera-typography-weight-bold, 700);
  font-size: var(--layera-typography-size-xs, 11px);
}

.layera-severity-selector {
  border: none;
  background: transparent;
  padding: var(--layera-spacing-xs, 2px);
  width: 100%;
  cursor: pointer;
  font-size: var(--layera-typography-size-sm, 14px);
}

.layera-severity-selector:focus {
  outline: 2px solid var(--layera-colors-red-500, #F44336);
  outline-offset: 1px;
  background: var(--layera-colors-red-50, #ffebee);
  border-radius: var(--layera-spacing-xs, 2px);
}

.layera-severity-selector option {
  background: var(--layera-colors-white, #ffffff);
  color: var(--layera-colors-gray-800, #424242);
  padding: var(--layera-spacing-sm, 4px);
}

`;
  }

  /**
   * Editable Table Cells - Inline editing functionality
   */
  static generateEditableTableCellsCSS() {
    return `
/* EDITABLE TABLE CELLS */
.layera-editable-cell-input {
  border: none;
  background: transparent;
  width: 100%;
  padding: var(--layera-spacing-xs, 2px);
  font-size: var(--layera-typography-size-sm, 14px);
  color: var(--layera-colors-gray-800, #424242);
  outline: none;
  transition: all 0.2s ease;
}

.layera-editable-cell-input:focus {
  background: var(--layera-colors-red-50, #ffebee);
  border: 1px solid var(--layera-colors-red-300, #ef5350);
  border-radius: var(--layera-spacing-xs, 2px);
  box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.1);
  padding: var(--layera-spacing-xs, 2px) var(--layera-spacing-sm, 4px);
}

.layera-editable-cell-input:hover {
  background: var(--layera-colors-gray-50, #fafafa);
  border-radius: var(--layera-spacing-xs, 2px);
}

.layera-incident-id-checkbox {
  margin-right: var(--layera-spacing-sm, 4px);
  cursor: pointer;
  transform: scale(1.1);
}

.layera-incident-id-checkbox:checked {
  accent-color: var(--layera-colors-red-500, #F44336);
}

.layera-incident-id {
  font-family: monospace;
  font-weight: var(--layera-typography-weight-bold, 700);
  color: var(--layera-colors-red-700, #c62828);
}

.layera-incident-description {
  font-weight: var(--layera-typography-weight-medium, 500);
}

.layera-incident-time {
  font-family: monospace;
  font-size: var(--layera-typography-size-sm, 14px);
  color: var(--layera-colors-gray-700, #616161);
}

.layera-incident-time:focus {
  background: var(--layera-colors-blue-50, #e3f2fd);
  border: 1px solid var(--layera-colors-blue-300, #64b5f6);
}

`;
  }

  /**
   * Emergency Action Buttons - Escalate, Secure, Restore, Backup buttons
   */
  static generateEmergencyActionButtonsCSS() {
    return `
/* EMERGENCY ACTION BUTTONS */
.layera-emergency-btn {
  padding: var(--layera-spacing-xs, 2px) var(--layera-spacing-sm, 4px);
  font-size: var(--layera-typography-size-xs, 12px);
  background: var(--layera-colors-red-500, #F44336);
  border: none;
  border-radius: var(--layera-spacing-xs, 3px);
  color: var(--layera-colors-white, #ffffff);
  cursor: pointer;
  font-weight: var(--layera-typography-weight-medium, 500);
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.layera-emergency-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.layera-emergency-btn:hover::before {
  left: 100%;
}

.layera-emergency-btn:hover {
  background: var(--layera-colors-red-600, #d32f2f);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(244, 67, 54, 0.3);
}

.layera-emergency-btn:active {
  transform: translateY(0);
}

/* Specific Emergency Action Types */
.layera-escalate-btn {
  background: var(--layera-colors-red-600, #d32f2f);
}

.layera-escalate-btn:hover {
  background: var(--layera-colors-red-700, #c62828);
  animation: escalateUrgent 0.5s ease-in-out;
}

@keyframes escalateUrgent {
  0%, 100% { transform: scale(1) translateY(-1px); }
  50% { transform: scale(1.05) translateY(-2px); }
}

.layera-secure-btn {
  background: var(--layera-colors-red-500, #F44336);
  border-left: 3px solid var(--layera-colors-yellow-500, #ffc107);
}

.layera-secure-btn:hover {
  background: var(--layera-colors-red-600, #d32f2f);
  border-left-color: var(--layera-colors-yellow-600, #ff8f00);
}

.layera-restore-btn {
  background: var(--layera-colors-orange-600, #f57c00);
}

.layera-restore-btn:hover {
  background: var(--layera-colors-orange-700, #ef6c00);
}

.layera-backup-btn {
  background: var(--layera-colors-red-700, #c62828);
}

.layera-backup-btn:hover {
  background: var(--layera-colors-red-800, #b71c1c);
}

.layera-emergency-btn:focus {
  outline: 2px solid var(--layera-colors-white, #ffffff);
  outline-offset: 2px;
}

`;
  }

  /**
   * Incident Tracking - Real-time incident tracking patterns
   */
  static generateIncidentTrackingCSS() {
    return `
/* INCIDENT TRACKING */
.layera-incident-row-critical {
  border-left: 4px solid var(--layera-colors-red-600, #d32f2f);
  background: linear-gradient(90deg, rgba(244, 67, 54, 0.05) 0%, transparent 100%);
}

.layera-incident-row-major {
  border-left: 4px solid var(--layera-colors-orange-600, #f57c00);
  background: linear-gradient(90deg, rgba(255, 152, 0, 0.05) 0%, transparent 100%);
}

.layera-incident-row-minor {
  border-left: 4px solid var(--layera-colors-yellow-600, #fbc02d);
  background: linear-gradient(90deg, rgba(255, 235, 59, 0.05) 0%, transparent 100%);
}

.layera-incident-status-indicator {
  position: absolute;
  left: -2px;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: statusPulse 2s ease-in-out infinite;
}

.layera-incident-status-critical .layera-incident-status-indicator {
  background: var(--layera-colors-red-500, #F44336);
}

.layera-incident-status-major .layera-incident-status-indicator {
  background: var(--layera-colors-orange-500, #FF9800);
}

.layera-incident-status-minor .layera-incident-status-indicator {
  background: var(--layera-colors-yellow-500, #fbc02d);
}

@keyframes statusPulse {
  0%, 100% { opacity: 1; transform: translateY(-50%) scale(1); }
  50% { opacity: 0.6; transform: translateY(-50%) scale(1.2); }
}

.layera-incident-timestamp {
  position: relative;
}

.layera-incident-timestamp::after {
  content: attr(data-time-ago);
  position: absolute;
  bottom: -15px;
  left: 0;
  font-size: var(--layera-typography-size-xs, 10px);
  color: var(--layera-colors-gray-500, #9e9e9e);
  font-style: italic;
}

`;
  }

  /**
   * Table Footer Stats - Statistics και pagination
   */
  static generateTableFooterStatsCSS() {
    return `
/* TABLE FOOTER STATS */
.layera-table-footer {
  margin-top: var(--layera-spacing-lg, 16px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--layera-spacing-md, 8px) 0;
  border-top: 1px solid var(--layera-colors-red-200, #ffcdd2);
}

.layera-incident-stats {
  font-size: var(--layera-typography-size-sm, 14px);
  color: var(--layera-colors-gray-600, #757575);
  font-weight: var(--layera-typography-weight-medium, 500);
}

.layera-incident-stats .layera-stat-critical {
  color: var(--layera-colors-red-600, #d32f2f);
  font-weight: var(--layera-typography-weight-bold, 700);
}

.layera-incident-stats .layera-stat-major {
  color: var(--layera-colors-orange-600, #f57c00);
  font-weight: var(--layera-typography-weight-bold, 700);
}

.layera-incident-stats .layera-stat-resolved {
  color: var(--layera-colors-green-600, #388e3c);
  font-weight: var(--layera-typography-weight-bold, 700);
}

.layera-pagination-controls {
  display: flex;
  gap: var(--layera-spacing-sm, 4px);
}

.layera-pagination-btn {
  padding: var(--layera-spacing-xs, 2px) var(--layera-spacing-md, 8px);
  font-size: var(--layera-typography-size-xs, 12px);
  border: 1px solid var(--layera-colors-gray-300, #e0e0e0);
  background: var(--layera-colors-white, #ffffff);
  color: var(--layera-colors-gray-700, #616161);
  cursor: pointer;
  border-radius: var(--layera-spacing-sm, 4px);
  transition: all 0.2s ease;
}

.layera-pagination-btn:hover {
  border-color: var(--layera-colors-red-300, #ef5350);
  background: var(--layera-colors-red-50, #ffebee);
  color: var(--layera-colors-red-600, #d32f2f);
}

.layera-pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--layera-colors-gray-100, #f5f5f5);
}

.layera-pagination-btn:disabled:hover {
  border-color: var(--layera-colors-gray-300, #e0e0e0);
  background: var(--layera-colors-gray-100, #f5f5f5);
  color: var(--layera-colors-gray-500, #9e9e9e);
}

`;
  }

  /**
   * Danger Table Responsive - Mobile and tablet adaptations
   */
  static generateDangerTableResponsiveCSS() {
    return `
/* DANGER TABLE RESPONSIVE */
@media (max-width: 768px) {
  .layera-incident-controls {
    flex-direction: column;
    gap: var(--layera-spacing-md, 8px);
  }

  .layera-incident-search,
  .layera-severity-filter,
  .layera-incident-datetime,
  .layera-add-incident-btn {
    width: 100%;
    flex-shrink: 0;
  }

  .layera-simple-table {
    font-size: var(--layera-typography-size-xs, 12px);
  }

  .layera-danger-table-header th {
    padding: var(--layera-spacing-sm, 4px);
    font-size: var(--layera-typography-size-xs, 11px);
  }

  .layera-danger-table-cell {
    padding: var(--layera-spacing-xs, 2px);
  }

  .layera-emergency-btn {
    font-size: var(--layera-typography-size-xs, 10px);
    padding: var(--layera-spacing-xs, 1px) var(--layera-spacing-xs, 2px);
  }

  .layera-table-footer {
    flex-direction: column;
    gap: var(--layera-spacing-md, 8px);
    text-align: center;
  }

  .layera-incident-stats {
    font-size: var(--layera-typography-size-xs, 12px);
  }
}

@media (max-width: 480px) {
  .layera-simple-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  .layera-danger-table-row {
    min-width: 600px;
  }

  .layera-incident-controls {
    padding: var(--layera-spacing-sm, 4px);
  }
}

/* Landscape mobile optimization */
@media (max-width: 768px) and (orientation: landscape) {
  .layera-incident-controls {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .layera-incident-search,
  .layera-severity-filter,
  .layera-incident-datetime {
    width: calc(33.33% - var(--layera-spacing-sm, 4px));
  }

  .layera-add-incident-btn {
    width: 100%;
  }
}

`;
  }

  /**
   * Danger Table Accessibility - ARIA and keyboard support
   */
  static generateDangerTableAccessibilityCSS() {
    return `
/* DANGER TABLE ACCESSIBILITY */
.layera-simple-table {
  border-collapse: separate;
  border-spacing: 0;
}

.layera-danger-table-header th {
  position: relative;
}

.layera-danger-table-header th[aria-sort] {
  cursor: pointer;
}

.layera-danger-table-header th[aria-sort]::after {
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

.layera-danger-table-header th[aria-sort="ascending"]::after {
  border-bottom: 4px solid var(--layera-colors-white, #ffffff);
  border-top: none;
  opacity: 1;
}

.layera-danger-table-header th[aria-sort="descending"]::after {
  border-top: 4px solid var(--layera-colors-white, #ffffff);
  border-bottom: none;
  opacity: 1;
}

.layera-incident-id-checkbox:focus {
  outline: 2px solid var(--layera-colors-red-500, #F44336);
  outline-offset: 2px;
}

.layera-editable-cell-input:focus {
  outline: 2px solid var(--layera-colors-red-500, #F44336);
  outline-offset: 1px;
}

.layera-severity-selector:focus {
  outline: 2px solid var(--layera-colors-red-500, #F44336);
  outline-offset: 1px;
}

.layera-emergency-btn:focus {
  outline: 2px solid var(--layera-colors-white, #ffffff);
  outline-offset: 2px;
}

/* Screen reader support */
.layera-sr-only {
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
  .layera-danger-table-header {
    border: 2px solid;
  }

  .layera-emergency-btn {
    border: 1px solid;
  }

  .layera-severity-critical,
  .layera-severity-major,
  .layera-severity-minor {
    border: 1px solid;
  }
}

`;
  }

  /**
   * Danger Table Interactions - Hover states και interactive effects
   */
  static generateDangerTableInteractionsCSS() {
    return `
/* DANGER TABLE INTERACTIONS */
.layera-danger-table-row {
  cursor: pointer;
}

.layera-danger-table-row:hover .layera-incident-id {
  color: var(--layera-colors-red-800, #b71c1c);
  font-weight: var(--layera-typography-weight-bold, 700);
}

.layera-danger-table-row:hover .layera-emergency-btn {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(244, 67, 54, 0.4);
}

.layera-editable-cell-input:hover {
  background: var(--layera-colors-gray-50, #fafafa);
}

.layera-severity-selector:hover {
  background: var(--layera-colors-red-50, #ffebee);
}

/* Row selection effects */
.layera-danger-table-row.layera-selected {
  background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
  border-left: 4px solid var(--layera-colors-red-500, #F44336);
}

.layera-danger-table-row.layera-selected:hover {
  background: linear-gradient(135deg, #ffcdd2 0%, #ef9a9a 100%);
}

/* Critical incident highlighting */
.layera-danger-table-row.layera-critical {
  animation: criticalIncident 3s ease-in-out infinite;
}

@keyframes criticalIncident {
  0%, 100% {
    background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
    transform: translateY(0);
  }
  50% {
    background: linear-gradient(135deg, #ffcdd2 0%, #ef9a9a 100%);
    transform: translateY(-1px);
  }
}

/* Emergency button group interactions */
.layera-danger-table-cell:hover .layera-emergency-btn {
  transform: scale(1.05);
}

/* Live incident updates */
.layera-incident-new {
  animation: newIncident 1s ease-out;
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
}

@keyframes newIncident {
  0% {
    opacity: 0;
    transform: scale(0.95);
    background: linear-gradient(135deg, #ffcdd2 0%, #ef9a9a 100%);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
  }
}

.layera-incident-resolved {
  animation: resolvedIncident 1s ease-out;
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
  opacity: 0.7;
}

@keyframes resolvedIncident {
  0% {
    background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
    opacity: 1;
  }
  100% {
    background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
    opacity: 0.7;
  }
}

/* Filter interaction effects */
.layera-severity-filter.layera-active {
  border-color: var(--layera-colors-red-600, #d32f2f);
  background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
  font-weight: var(--layera-typography-weight-bold, 700);
}

`;
  }
}