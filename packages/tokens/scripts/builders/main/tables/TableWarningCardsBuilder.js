/**
 * TableWarningCardsBuilder
 * HTML-aligned enterprise CSS builder για table warning cards components
 * Ταιριάζει με: html\htmlComponents\main\tables\table-warning-cards.html
 */

export class TableWarningCardsBuilder {

    static generateAllTableWarningCardsCSS() {
        return this.generateIssueSearchCSS() +
               this.generateWarningHeaderCSS() +
               this.generateIssueManagementCSS() +
               this.generatePrioritySelectorSystemCSS() +
               this.generateStatusInputManagementCSS() +
               this.generateWarningActionButtonsCSS() +
               this.generateIssueStatusDisplayCSS() +
               this.generatePrioritySummaryInfoCSS() +
               this.generatePaginationControlsCSS() +
               this.generateWarningColorThemeCSS() +
               this.generateIssueDataDisplayCSS();
    }

    static generateIssueSearchCSS() {
        return `
/* === TABLE WARNING CARDS === */
/* WARNING CARDS STYLES */

/* Issue Search Controls */
.table-warning-card-search-controls {
    margin-bottom: var(--layera-spacing-md, 1rem);
    display: flex;
    gap: var(--layera-spacing-sm, 0.5rem);
    flex-wrap: nowrap;
    align-items: center;
}

.table-warning-card-search-input {
    padding: var(--layera-spacing-xs, 0.4rem);
    border: 1px solid var(--layera-color-warning, #FF9800);
    border-radius: var(--layera-border-radius-sm, 4px);
    width: 150px;
    flex-shrink: 1;
    font-size: var(--layera-font-size-sm, 0.9rem);
}

.table-warning-card-issue-select {
    padding: var(--layera-spacing-xs, 0.4rem);
    border: 1px solid var(--layera-color-warning, #FF9800);
    border-radius: var(--layera-border-radius-sm, 4px);
    flex-shrink: 1;
    font-size: var(--layera-font-size-sm, 0.9rem);
}

.table-warning-card-priority-filter {
    padding: var(--layera-spacing-xs, 0.4rem);
    border: 1px solid var(--layera-color-warning, #FF9800);
    border-radius: var(--layera-border-radius-sm, 4px);
    flex-shrink: 1;
    font-size: var(--layera-font-size-sm, 0.9rem);
}

.table-warning-card-add-button {
    background: var(--layera-color-warning, #FF9800);
    color: var(--layera-color-white, white);
    padding: var(--layera-spacing-xs, 0.4rem) var(--layera-spacing-sm, 0.6rem);
    font-size: var(--layera-font-size-sm, 0.9rem);
    height: auto;
    width: auto;
    flex-shrink: 0;
    border: none;
    border-radius: var(--layera-border-radius-sm, 4px);
    cursor: pointer;
    transition: all 0.2s ease;
}

.table-warning-card-add-button:hover {
    background: var(--layera-color-warning-dark, #f57c00);
    transform: translateY(-1px);
}

`;
    }

    static generateWarningHeaderCSS() {
        return `
/* Warning Table Header */
.table-warning-card-table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--layera-font-family-base, system-ui);
}

.table-warning-card-header {
    background: var(--layera-color-warning, #FF9800);
    color: var(--layera-color-white, white);
}

.table-warning-card-header th {
    color: var(--layera-color-white, white);
    padding: var(--layera-spacing-sm, 0.5rem);
    text-align: left;
    font-weight: var(--layera-font-weight-semibold, 600);
    font-size: var(--layera-font-size-base, 1rem);
    border: none;
}

.table-warning-card-header-checkbox {
    margin-right: var(--layera-spacing-xs, 0.5rem);
}

.table-warning-card-header-cell {
    padding: var(--layera-spacing-sm, 0.5rem);
    color: var(--layera-color-white, white);
}

`;
    }

    static generateIssueManagementCSS() {
        return `
/* Issue Management Rows */
.table-warning-card-row {
    height: 35px;
    border-bottom: 1px solid var(--layera-color-border, #e0e0e0);
    transition: background-color 0.2s ease;
}

.table-warning-card-row:hover {
    background-color: var(--layera-color-warning-light, rgba(255, 152, 0, 0.05));
}

.table-warning-card-cell {
    padding: var(--layera-spacing-xs, 0.3rem) var(--layera-spacing-sm, 0.5rem);
    font-size: var(--layera-font-size-base, 1rem);
    vertical-align: middle;
}

.table-warning-card-issue-cell {
    padding: var(--layera-spacing-xs, 0.3rem) var(--layera-spacing-sm, 0.5rem);
    display: flex;
    align-items: center;
}

.table-warning-card-row-checkbox {
    margin-right: var(--layera-spacing-sm, 0.5rem);
}

.table-warning-card-issue-title {
    font-weight: var(--layera-font-weight-medium, 500);
    color: var(--layera-color-text-primary, #333);
}

.table-warning-card-reporter-name {
    color: var(--layera-color-text-secondary, #666);
    font-size: var(--layera-font-size-sm, 0.9rem);
}

.table-warning-card-critical {
    background-color: var(--layera-color-danger-light, rgba(244, 67, 54, 0.1));
    border-left: 3px solid var(--layera-color-danger, #f44336);
}

.table-warning-card-high {
    background-color: var(--layera-color-warning-light, rgba(255, 152, 0, 0.1));
    border-left: 3px solid var(--layera-color-warning, #FF9800);
}

`;
    }

    static generatePrioritySelectorSystemCSS() {
        return `
/* Priority Selector System */
.table-warning-card-priority-select {
    border: none;
    background: transparent;
    padding: var(--layera-spacing-xs, 0.2rem);
    font-size: var(--layera-font-size-sm, 0.9rem);
    cursor: pointer;
    outline: none;
    transition: all 0.2s ease;
}

.table-warning-card-priority-select:focus {
    background: var(--layera-color-background-light, #f8f9fa);
    border-radius: var(--layera-border-radius-sm, 4px);
    border: 1px solid var(--layera-color-warning, #FF9800);
}

.table-warning-card-priority-high {
    color: var(--layera-color-danger, #f44336);
    font-weight: var(--layera-font-weight-semibold, 600);
}

.table-warning-card-priority-medium {
    color: var(--layera-color-warning, #FF9800);
    font-weight: var(--layera-font-weight-medium, 500);
}

.table-warning-card-priority-low {
    color: var(--layera-color-success, #4CAF50);
    font-weight: var(--layera-font-weight-medium, 500);
}

.table-warning-card-priority-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--layera-spacing-xs, 0.25rem);
    padding: var(--layera-spacing-xs, 0.25rem) var(--layera-spacing-sm, 0.5rem);
    border-radius: var(--layera-border-radius-full, 20px);
    font-size: var(--layera-font-size-xs, 0.8rem);
    font-weight: var(--layera-font-weight-medium, 500);
}

.table-warning-card-priority-badge-high {
    background: var(--layera-color-danger-light, rgba(244, 67, 54, 0.1));
    color: var(--layera-color-danger, #f44336);
}

.table-warning-card-priority-badge-medium {
    background: var(--layera-color-warning-light, rgba(255, 152, 0, 0.1));
    color: var(--layera-color-warning, #FF9800);
}

.table-warning-card-priority-badge-low {
    background: var(--layera-color-success-light, rgba(76, 175, 80, 0.1));
    color: var(--layera-color-success, #4CAF50);
}

`;
    }

    static generateStatusInputManagementCSS() {
        return `
/* Status Input Management */
.table-warning-card-status-field {
    border: none;
    background: transparent;
    width: 100%;
    padding: var(--layera-spacing-xs, 0.2rem);
    font-size: var(--layera-font-size-base, 1rem);
    outline: none;
    transition: all 0.2s ease;
    color: var(--layera-color-text-primary, #333);
}

.table-warning-card-status-field:focus {
    background: var(--layera-color-background-light, #f8f9fa);
    border-radius: var(--layera-border-radius-sm, 4px);
    border: 1px solid var(--layera-color-warning, #FF9800);
}

.table-warning-card-status-investigating {
    color: var(--layera-color-warning, #FF9800);
    font-weight: var(--layera-font-weight-medium, 500);
}

.table-warning-card-status-in-progress {
    color: var(--layera-color-primary, #2196F3);
    font-weight: var(--layera-font-weight-medium, 500);
}

.table-warning-card-status-assigned {
    color: var(--layera-color-success, #4CAF50);
    font-weight: var(--layera-font-weight-medium, 500);
}

.table-warning-card-status-pending {
    color: var(--layera-color-secondary, #9013FE);
    font-weight: var(--layera-font-weight-medium, 500);
}

.table-warning-card-reporter-field {
    border: none;
    background: transparent;
    width: 100%;
    padding: var(--layera-spacing-xs, 0.2rem);
    font-size: var(--layera-font-size-base, 1rem);
    outline: none;
    transition: all 0.2s ease;
}

.table-warning-card-reporter-field:focus {
    background: var(--layera-color-background-light, #f8f9fa);
    border-radius: var(--layera-border-radius-sm, 4px);
    border: 1px solid var(--layera-color-warning, #FF9800);
}

`;
    }

    static generateWarningActionButtonsCSS() {
        return `
/* Warning Action Buttons */
.table-warning-card-actions {
    display: flex;
    gap: var(--layera-spacing-xs, 0.25rem);
    align-items: center;
    justify-content: flex-start;
}

.table-warning-card-fix-button {
    padding: var(--layera-spacing-xs, 0.2rem) var(--layera-spacing-xs, 0.4rem);
    font-size: var(--layera-font-size-xs, 0.8rem);
    background: var(--layera-color-warning, #FF9800);
    border: none;
    border-radius: var(--layera-border-radius-sm, 3px);
    color: var(--layera-color-white, white);
    cursor: pointer;
    transition: all 0.2s ease;
}

.table-warning-card-fix-button:hover {
    background: var(--layera-color-warning-dark, #f57c00);
    transform: translateY(-1px);
}

.table-warning-card-review-button {
    padding: var(--layera-spacing-xs, 0.2rem) var(--layera-spacing-xs, 0.4rem);
    font-size: var(--layera-font-size-xs, 0.8rem);
    background: var(--layera-color-primary, #2196F3);
    border: none;
    border-radius: var(--layera-border-radius-sm, 3px);
    color: var(--layera-color-white, white);
    cursor: pointer;
    transition: all 0.2s ease;
}

.table-warning-card-review-button:hover {
    background: var(--layera-color-primary-dark, #1976d2);
    transform: translateY(-1px);
}

.table-warning-card-action-icon {
    margin-right: var(--layera-spacing-xs, 0.25rem);
}

.table-warning-card-bulk-actions {
    margin-bottom: var(--layera-spacing-md, 1rem);
    display: flex;
    gap: var(--layera-spacing-sm, 0.5rem);
    align-items: center;
    padding: var(--layera-spacing-sm, 0.5rem);
    background: var(--layera-color-warning-light, rgba(255, 152, 0, 0.1));
    border-radius: var(--layera-border-radius-md, 8px);
    border: 1px solid var(--layera-color-warning-light, rgba(255, 152, 0, 0.2));
}

.table-warning-card-escalate-button {
    padding: var(--layera-spacing-xs, 0.2rem) var(--layera-spacing-xs, 0.4rem);
    font-size: var(--layera-font-size-xs, 0.8rem);
    background: var(--layera-color-danger, #f44336);
    border: none;
    border-radius: var(--layera-border-radius-sm, 3px);
    color: var(--layera-color-white, white);
    cursor: pointer;
    transition: all 0.2s ease;
}

.table-warning-card-escalate-button:hover {
    background: var(--layera-color-danger-dark, #d32f2f);
    transform: translateY(-1px);
}

`;
    }

    static generateIssueStatusDisplayCSS() {
        return `
/* Issue Status Display */
.table-warning-card-status-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--layera-spacing-xs, 0.25rem);
    padding: var(--layera-spacing-xs, 0.25rem) var(--layera-spacing-sm, 0.5rem);
    border-radius: var(--layera-border-radius-full, 20px);
    font-size: var(--layera-font-size-xs, 0.8rem);
    font-weight: var(--layera-font-weight-medium, 500);
}

.table-warning-card-status-critical {
    background: var(--layera-color-danger-light, rgba(244, 67, 54, 0.1));
    color: var(--layera-color-danger, #f44336);
}

.table-warning-card-status-medium {
    background: var(--layera-color-warning-light, rgba(255, 152, 0, 0.1));
    color: var(--layera-color-warning, #FF9800);
}

.table-warning-card-status-low {
    background: var(--layera-color-success-light, rgba(76, 175, 80, 0.1));
    color: var(--layera-color-success, #4CAF50);
}

.table-warning-card-issue-info {
    display: flex;
    align-items: center;
    gap: var(--layera-spacing-sm, 0.5rem);
}

.table-warning-card-issue-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--layera-color-warning-light, rgba(255, 152, 0, 0.2));
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--layera-color-warning, #FF9800);
    font-weight: var(--layera-font-weight-bold, 700);
    font-size: var(--layera-font-size-sm, 0.9rem);
}

.table-warning-card-severity-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    margin-right: var(--layera-spacing-xs, 0.5rem);
}

.table-warning-card-severity-critical {
    background: var(--layera-color-danger, #f44336);
    animation: pulse 1.5s ease-in-out infinite;
}

.table-warning-card-severity-high {
    background: var(--layera-color-warning, #FF9800);
}

.table-warning-card-severity-medium {
    background: var(--layera-color-warning-light, #ffcc02);
}

.table-warning-card-severity-low {
    background: var(--layera-color-success, #4CAF50);
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

`;
    }

    static generatePrioritySummaryInfoCSS() {
        return `
/* Priority Summary Info */
.table-warning-card-summary {
    margin-top: var(--layera-spacing-md, 1rem);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.table-warning-card-summary-info {
    font-size: var(--layera-font-size-sm, 0.9rem);
    color: var(--layera-color-text-secondary, #666);
}

.table-warning-card-stats {
    display: flex;
    gap: var(--layera-spacing-md, 1rem);
    align-items: center;
}

.table-warning-card-stat-item {
    display: flex;
    align-items: center;
    gap: var(--layera-spacing-xs, 0.25rem);
}

.table-warning-card-total-issues {
    font-weight: var(--layera-font-weight-semibold, 600);
    color: var(--layera-color-text-primary, #333);
}

.table-warning-card-high-priority {
    font-weight: var(--layera-font-weight-semibold, 600);
    color: var(--layera-color-danger, #f44336);
}

.table-warning-card-medium-priority {
    font-weight: var(--layera-font-weight-semibold, 600);
    color: var(--layera-color-warning, #FF9800);
}

.table-warning-card-low-priority {
    font-weight: var(--layera-font-weight-semibold, 600);
    color: var(--layera-color-success, #4CAF50);
}

.table-warning-card-summary-icon {
    margin-right: var(--layera-spacing-xs, 0.25rem);
}

.table-warning-card-urgent-alert {
    background: var(--layera-color-danger-light, rgba(244, 67, 54, 0.1));
    border: 1px solid var(--layera-color-danger, #f44336);
    border-radius: var(--layera-border-radius-md, 8px);
    padding: var(--layera-spacing-sm, 0.5rem);
    margin-bottom: var(--layera-spacing-md, 1rem);
}

`;
    }

    static generatePaginationControlsCSS() {
        return `
/* Pagination Controls */
.table-warning-card-pagination {
    display: flex;
    gap: var(--layera-spacing-sm, 0.5rem);
}

.table-warning-card-prev-button,
.table-warning-card-next-button {
    padding: var(--layera-spacing-xs, 0.3rem) var(--layera-spacing-sm, 0.6rem);
    font-size: var(--layera-font-size-xs, 0.8rem);
    border: 1px solid var(--layera-color-border, #ddd);
    background: var(--layera-color-white, white);
    border-radius: var(--layera-border-radius-sm, 4px);
    cursor: pointer;
    transition: all 0.2s ease;
}

.table-warning-card-prev-button:hover,
.table-warning-card-next-button:hover {
    background: var(--layera-color-warning, #FF9800);
    color: var(--layera-color-white, white);
    border-color: var(--layera-color-warning, #FF9800);
    transform: translateY(-1px);
}

.table-warning-card-prev-button:disabled,
.table-warning-card-next-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

.table-warning-card-page-info {
    display: flex;
    align-items: center;
    gap: var(--layera-spacing-sm, 0.5rem);
    font-size: var(--layera-font-size-sm, 0.9rem);
    color: var(--layera-color-text-secondary, #666);
}

`;
    }

    static generateWarningColorThemeCSS() {
        return `
/* Warning Color Theme */
.table-warning-card-theme {
    --table-warning-color: var(--layera-color-warning, #FF9800);
    --table-warning-light: var(--layera-color-warning-light, rgba(255, 152, 0, 0.1));
    --table-warning-dark: var(--layera-color-warning-dark, #f57c00);
    --table-hover-color: var(--layera-color-warning-light, rgba(255, 152, 0, 0.05));
}

.table-warning-card-accent {
    color: var(--layera-color-warning, #FF9800);
    border-color: var(--layera-color-warning, #FF9800);
}

.table-warning-card-highlight {
    background: var(--layera-color-warning-light, rgba(255, 152, 0, 0.1));
    border: 1px solid var(--layera-color-warning-light, rgba(255, 152, 0, 0.2));
    border-radius: var(--layera-border-radius-sm, 4px);
}

.table-warning-card-focus {
    box-shadow: 0 0 0 3px var(--layera-color-warning-light, rgba(255, 152, 0, 0.3));
    outline: none;
}

.table-warning-card-orange-theme {
    background: linear-gradient(135deg,
        var(--layera-color-warning-light, rgba(255, 152, 0, 0.1)) 0%,
        var(--layera-color-warning-light, rgba(255, 152, 0, 0.05)) 100%);
    border: 1px solid var(--layera-color-warning-light, rgba(255, 152, 0, 0.2));
}

.table-warning-card-alert-gradient {
    background: linear-gradient(90deg,
        var(--layera-color-warning, #FF9800) 0%,
        var(--layera-color-warning-light, #ffb74d) 50%,
        var(--layera-color-warning-dark, #f57c00) 100%);
}

`;
    }

    static generateIssueDataDisplayCSS() {
        return `
/* Issue Data Display */
.table-warning-card-issue-details {
    display: flex;
    flex-direction: column;
}

.table-warning-card-reporter-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--layera-color-warning-light, rgba(255, 152, 0, 0.2));
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--layera-color-warning, #FF9800);
    font-weight: var(--layera-font-weight-bold, 700);
    font-size: var(--layera-font-size-xs, 0.8rem);
    margin-right: var(--layera-spacing-xs, 0.5rem);
}

.table-warning-card-reporter-info {
    display: flex;
    align-items: center;
}

.table-warning-card-status-highlight {
    background: linear-gradient(90deg,
        transparent 0%,
        var(--layera-color-warning-light, rgba(255, 152, 0, 0.1)) 50%,
        transparent 100%);
    padding: var(--layera-spacing-xs, 0.2rem) var(--layera-spacing-sm, 0.5rem);
    border-radius: var(--layera-border-radius-sm, 4px);
}

.table-warning-card-issue-metadata {
    display: flex;
    align-items: center;
    gap: var(--layera-spacing-sm, 0.5rem);
    font-size: var(--layera-font-size-xs, 0.8rem);
    color: var(--layera-color-text-secondary, #666);
}

.table-warning-card-priority-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--layera-font-size-xs, 0.7rem);
    font-weight: var(--layera-font-weight-bold, 700);
}

.table-warning-card-priority-circle-high {
    background: var(--layera-color-danger, #f44336);
    color: var(--layera-color-white, white);
}

.table-warning-card-priority-circle-medium {
    background: var(--layera-color-warning, #FF9800);
    color: var(--layera-color-white, white);
}

.table-warning-card-priority-circle-low {
    background: var(--layera-color-success, #4CAF50);
    color: var(--layera-color-white, white);
}

.table-warning-card-time-since {
    font-size: var(--layera-font-size-xs, 0.8rem);
    color: var(--layera-color-text-muted, #999);
    font-style: italic;
}

`;
    }
}