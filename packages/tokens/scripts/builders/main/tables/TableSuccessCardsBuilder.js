/**
 * TableSuccessCardsBuilder
 * HTML-aligned enterprise CSS builder για table success cards components
 * Ταιριάζει με: html\htmlComponents\main\tables\table-success-cards.html
 */

export class TableSuccessCardsBuilder {

    static generateAllTableSuccessCardsCSS() {
        return this.generateProjectSearchCSS() +
               this.generateSuccessHeaderCSS() +
               this.generateProjectManagementCSS() +
               this.generateProgressSliderSystemCSS() +
               this.generateDateInputManagementCSS() +
               this.generateSuccessActionButtonsCSS() +
               this.generateProjectStatusDisplayCSS() +
               this.generateProgressSummaryInfoCSS() +
               this.generatePaginationControlsCSS() +
               this.generateSuccessColorThemeCSS() +
               this.generateProjectDataDisplayCSS();
    }

    static generateProjectSearchCSS() {
        return `
/* === TABLE SUCCESS CARDS === */
/* SUCCESS CARDS STYLES */

/* Project Search Controls */
.table-success-card-search-controls {
    margin-bottom: var(--layera-spacing-md, 1rem);
    display: flex;
    gap: var(--layera-spacing-sm, 0.5rem);
    flex-wrap: nowrap;
    align-items: center;
}

.table-success-card-search-input {
    padding: var(--layera-spacing-xs, 0.4rem);
    border: 1px solid var(--layera-color-success, #4CAF50);
    border-radius: var(--layera-border-radius-sm, 4px);
    width: 150px;
    flex-shrink: 1;
    font-size: var(--layera-font-size-sm, 0.9rem);
}

.table-success-card-project-select {
    padding: var(--layera-spacing-xs, 0.4rem);
    border: 1px solid var(--layera-color-success, #4CAF50);
    border-radius: var(--layera-border-radius-sm, 4px);
    flex-shrink: 1;
    font-size: var(--layera-font-size-sm, 0.9rem);
}

.table-success-card-date-filter {
    padding: var(--layera-spacing-xs, 0.4rem);
    border: 1px solid var(--layera-color-success, #4CAF50);
    border-radius: var(--layera-border-radius-sm, 4px);
    flex-shrink: 1;
    font-size: var(--layera-font-size-sm, 0.9rem);
}

.table-success-card-add-button {
    background: var(--layera-color-success, #4CAF50);
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

.table-success-card-add-button:hover {
    background: var(--layera-color-success-dark, #45a049);
    transform: translateY(-1px);
}

`;
    }

    static generateSuccessHeaderCSS() {
        return `
/* Success Table Header */
.table-success-card-table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--layera-font-family-base, system-ui);
}

.table-success-card-header {
    background: var(--layera-color-success, #4CAF50);
    color: var(--layera-color-white, white);
}

.table-success-card-header th {
    color: var(--layera-color-white, white);
    padding: var(--layera-spacing-sm, 0.5rem);
    text-align: left;
    font-weight: var(--layera-font-weight-semibold, 600);
    font-size: var(--layera-font-size-base, 1rem);
    border: none;
}

.table-success-card-header-checkbox {
    margin-right: var(--layera-spacing-xs, 0.5rem);
}

.table-success-card-header-cell {
    padding: var(--layera-spacing-sm, 0.5rem);
    color: var(--layera-color-white, white);
}

`;
    }

    static generateProjectManagementCSS() {
        return `
/* Project Management Rows */
.table-success-card-row {
    height: 35px;
    border-bottom: 1px solid var(--layera-color-border, #e0e0e0);
    transition: background-color 0.2s ease;
}

.table-success-card-row:hover {
    background-color: var(--layera-color-success-light, rgba(76, 175, 80, 0.05));
}

.table-success-card-cell {
    padding: var(--layera-spacing-xs, 0.3rem) var(--layera-spacing-sm, 0.5rem);
    font-size: var(--layera-font-size-base, 1rem);
    vertical-align: middle;
}

.table-success-card-project-cell {
    padding: var(--layera-spacing-xs, 0.3rem) var(--layera-spacing-sm, 0.5rem);
    display: flex;
    align-items: center;
}

.table-success-card-row-checkbox {
    margin-right: var(--layera-spacing-sm, 0.5rem);
}

.table-success-card-project-name {
    font-weight: var(--layera-font-weight-medium, 500);
    color: var(--layera-color-text-primary, #333);
}

.table-success-card-manager-name {
    color: var(--layera-color-text-secondary, #666);
    font-size: var(--layera-font-size-sm, 0.9rem);
}

.table-success-card-completed {
    background-color: var(--layera-color-success-light, rgba(76, 175, 80, 0.1));
    border-left: 3px solid var(--layera-color-success, #4CAF50);
}

`;
    }

    static generateProgressSliderSystemCSS() {
        return `
/* Progress Slider System */
.table-success-card-progress-slider {
    width: 100%;
    height: 6px;
    border-radius: var(--layera-border-radius-full, 20px);
    background: var(--layera-color-border-light, #f0f0f0);
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease;
}

.table-success-card-progress-slider::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--layera-color-success, #4CAF50);
    cursor: pointer;
    border: 2px solid var(--layera-color-white, white);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.table-success-card-progress-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--layera-color-success, #4CAF50);
    cursor: pointer;
    border: 2px solid var(--layera-color-white, white);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.table-success-card-progress-track {
    background: linear-gradient(90deg,
        var(--layera-color-success, #4CAF50) 0%,
        var(--layera-color-success, #4CAF50) var(--progress, 50%),
        var(--layera-color-border-light, #f0f0f0) var(--progress, 50%),
        var(--layera-color-border-light, #f0f0f0) 100%);
    height: 6px;
    border-radius: var(--layera-border-radius-full, 20px);
}

.table-success-card-progress-display {
    display: flex;
    align-items: center;
    gap: var(--layera-spacing-xs, 0.5rem);
}

.table-success-card-progress-text {
    font-size: var(--layera-font-size-xs, 0.8rem);
    font-weight: var(--layera-font-weight-medium, 500);
    color: var(--layera-color-success, #4CAF50);
}

.table-success-card-progress-100 {
    color: var(--layera-color-success-dark, #388e3c);
}

.table-success-card-progress-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--layera-spacing-xs, 0.25rem);
    padding: var(--layera-spacing-xs, 0.25rem) var(--layera-spacing-sm, 0.5rem);
    background: var(--layera-color-success-light, rgba(76, 175, 80, 0.1));
    border-radius: var(--layera-border-radius-full, 20px);
    font-size: var(--layera-font-size-xs, 0.8rem);
    font-weight: var(--layera-font-weight-medium, 500);
    color: var(--layera-color-success, #4CAF50);
}

`;
    }

    static generateDateInputManagementCSS() {
        return `
/* Date Input Management */
.table-success-card-date-field {
    border: none;
    background: transparent;
    width: 100%;
    padding: var(--layera-spacing-xs, 0.2rem);
    font-size: var(--layera-font-size-base, 1rem);
    outline: none;
    transition: all 0.2s ease;
    color: var(--layera-color-text-primary, #333);
}

.table-success-card-date-field:focus {
    background: var(--layera-color-background-light, #f8f9fa);
    border-radius: var(--layera-border-radius-sm, 4px);
    border: 1px solid var(--layera-color-success, #4CAF50);
}

.table-success-card-deadline-display {
    font-family: var(--layera-font-family-mono, monospace);
    font-weight: var(--layera-font-weight-medium, 500);
    color: var(--layera-color-text-secondary, #666);
}

.table-success-card-deadline-urgent {
    color: var(--layera-color-warning, #ff9800);
    font-weight: var(--layera-font-weight-semibold, 600);
}

.table-success-card-deadline-overdue {
    color: var(--layera-color-danger, #f44336);
    font-weight: var(--layera-font-weight-semibold, 600);
}

.table-success-card-deadline-completed {
    color: var(--layera-color-success, #4CAF50);
    font-weight: var(--layera-font-weight-semibold, 600);
    text-decoration: line-through;
    opacity: 0.7;
}

.table-success-card-manager-field {
    border: none;
    background: transparent;
    width: 100%;
    padding: var(--layera-spacing-xs, 0.2rem);
    font-size: var(--layera-font-size-base, 1rem);
    outline: none;
    transition: all 0.2s ease;
}

.table-success-card-manager-field:focus {
    background: var(--layera-color-background-light, #f8f9fa);
    border-radius: var(--layera-border-radius-sm, 4px);
    border: 1px solid var(--layera-color-success, #4CAF50);
}

`;
    }

    static generateSuccessActionButtonsCSS() {
        return `
/* Success Action Buttons */
.table-success-card-actions {
    display: flex;
    gap: var(--layera-spacing-xs, 0.25rem);
    align-items: center;
    justify-content: flex-start;
}

.table-success-card-edit-button {
    padding: var(--layera-spacing-xs, 0.2rem) var(--layera-spacing-xs, 0.4rem);
    font-size: var(--layera-font-size-xs, 0.8rem);
    background: var(--layera-color-success, #4CAF50);
    border: none;
    border-radius: var(--layera-border-radius-sm, 3px);
    color: var(--layera-color-white, white);
    cursor: pointer;
    transition: all 0.2s ease;
}

.table-success-card-edit-button:hover {
    background: var(--layera-color-success-dark, #45a049);
    transform: translateY(-1px);
}

.table-success-card-done-button {
    padding: var(--layera-spacing-xs, 0.2rem) var(--layera-spacing-xs, 0.4rem);
    font-size: var(--layera-font-size-xs, 0.8rem);
    background: var(--layera-color-success-dark, #388e3c);
    border: none;
    border-radius: var(--layera-border-radius-sm, 3px);
    color: var(--layera-color-white, white);
    cursor: pointer;
    transition: all 0.2s ease;
}

.table-success-card-done-button:hover {
    background: var(--layera-color-success-darker, #2e7d32);
    transform: translateY(-1px);
}

.table-success-card-action-icon {
    margin-right: var(--layera-spacing-xs, 0.25rem);
}

.table-success-card-bulk-actions {
    margin-bottom: var(--layera-spacing-md, 1rem);
    display: flex;
    gap: var(--layera-spacing-sm, 0.5rem);
    align-items: center;
    padding: var(--layera-spacing-sm, 0.5rem);
    background: var(--layera-color-success-light, rgba(76, 175, 80, 0.1));
    border-radius: var(--layera-border-radius-md, 8px);
    border: 1px solid var(--layera-color-success-light, rgba(76, 175, 80, 0.2));
}

`;
    }

    static generateProjectStatusDisplayCSS() {
        return `
/* Project Status Display */
.table-success-card-status-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--layera-spacing-xs, 0.25rem);
    padding: var(--layera-spacing-xs, 0.25rem) var(--layera-spacing-sm, 0.5rem);
    border-radius: var(--layera-border-radius-full, 20px);
    font-size: var(--layera-font-size-xs, 0.8rem);
    font-weight: var(--layera-font-weight-medium, 500);
}

.table-success-card-status-active {
    background: var(--layera-color-primary-light, rgba(33, 150, 243, 0.1));
    color: var(--layera-color-primary, #2196F3);
}

.table-success-card-status-completed {
    background: var(--layera-color-success-light, rgba(76, 175, 80, 0.1));
    color: var(--layera-color-success, #4CAF50);
}

.table-success-card-status-planning {
    background: var(--layera-color-warning-light, rgba(255, 152, 0, 0.1));
    color: var(--layera-color-warning, #ff9800);
}

.table-success-card-project-info {
    display: flex;
    align-items: center;
    gap: var(--layera-spacing-sm, 0.5rem);
}

.table-success-card-project-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--layera-color-success-light, rgba(76, 175, 80, 0.2));
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--layera-color-success, #4CAF50);
    font-weight: var(--layera-font-weight-bold, 700);
    font-size: var(--layera-font-size-sm, 0.9rem);
}

`;
    }

    static generateProgressSummaryInfoCSS() {
        return `
/* Progress Summary Info */
.table-success-card-summary {
    margin-top: var(--layera-spacing-md, 1rem);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.table-success-card-summary-info {
    font-size: var(--layera-font-size-sm, 0.9rem);
    color: var(--layera-color-text-secondary, #666);
}

.table-success-card-stats {
    display: flex;
    gap: var(--layera-spacing-md, 1rem);
    align-items: center;
}

.table-success-card-stat-item {
    display: flex;
    align-items: center;
    gap: var(--layera-spacing-xs, 0.25rem);
}

.table-success-card-total-projects {
    font-weight: var(--layera-font-weight-semibold, 600);
    color: var(--layera-color-text-primary, #333);
}

.table-success-card-completed-count {
    font-weight: var(--layera-font-weight-semibold, 600);
    color: var(--layera-color-success, #4CAF50);
}

.table-success-card-progress-count {
    font-weight: var(--layera-font-weight-semibold, 600);
    color: var(--layera-color-primary, #2196F3);
}

.table-success-card-summary-icon {
    margin-right: var(--layera-spacing-xs, 0.25rem);
}

`;
    }

    static generatePaginationControlsCSS() {
        return `
/* Pagination Controls */
.table-success-card-pagination {
    display: flex;
    gap: var(--layera-spacing-sm, 0.5rem);
}

.table-success-card-prev-button,
.table-success-card-next-button {
    padding: var(--layera-spacing-xs, 0.3rem) var(--layera-spacing-sm, 0.6rem);
    font-size: var(--layera-font-size-xs, 0.8rem);
    border: 1px solid var(--layera-color-border, #ddd);
    background: var(--layera-color-white, white);
    border-radius: var(--layera-border-radius-sm, 4px);
    cursor: pointer;
    transition: all 0.2s ease;
}

.table-success-card-prev-button:hover,
.table-success-card-next-button:hover {
    background: var(--layera-color-success, #4CAF50);
    color: var(--layera-color-white, white);
    border-color: var(--layera-color-success, #4CAF50);
    transform: translateY(-1px);
}

.table-success-card-prev-button:disabled,
.table-success-card-next-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

.table-success-card-page-info {
    display: flex;
    align-items: center;
    gap: var(--layera-spacing-sm, 0.5rem);
    font-size: var(--layera-font-size-sm, 0.9rem);
    color: var(--layera-color-text-secondary, #666);
}

`;
    }

    static generateSuccessColorThemeCSS() {
        return `
/* Success Color Theme */
.table-success-card-theme {
    --table-success-color: var(--layera-color-success, #4CAF50);
    --table-success-light: var(--layera-color-success-light, rgba(76, 175, 80, 0.1));
    --table-success-dark: var(--layera-color-success-dark, #45a049);
    --table-hover-color: var(--layera-color-success-light, rgba(76, 175, 80, 0.05));
}

.table-success-card-accent {
    color: var(--layera-color-success, #4CAF50);
    border-color: var(--layera-color-success, #4CAF50);
}

.table-success-card-highlight {
    background: var(--layera-color-success-light, rgba(76, 175, 80, 0.1));
    border: 1px solid var(--layera-color-success-light, rgba(76, 175, 80, 0.2));
    border-radius: var(--layera-border-radius-sm, 4px);
}

.table-success-card-focus {
    box-shadow: 0 0 0 3px var(--layera-color-success-light, rgba(76, 175, 80, 0.3));
    outline: none;
}

.table-success-card-green-theme {
    background: linear-gradient(135deg,
        var(--layera-color-success-light, rgba(76, 175, 80, 0.1)) 0%,
        var(--layera-color-success-light, rgba(76, 175, 80, 0.05)) 100%);
    border: 1px solid var(--layera-color-success-light, rgba(76, 175, 80, 0.2));
}

.table-success-card-progress-gradient {
    background: linear-gradient(90deg,
        var(--layera-color-success, #4CAF50) 0%,
        var(--layera-color-success-light, #81c784) 50%,
        var(--layera-color-success-dark, #388e3c) 100%);
}

`;
    }

    static generateProjectDataDisplayCSS() {
        return `
/* Project Data Display */
.table-success-card-project-details {
    display: flex;
    flex-direction: column;
}

.table-success-card-manager-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--layera-color-success-light, rgba(76, 175, 80, 0.2));
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--layera-color-success, #4CAF50);
    font-weight: var(--layera-font-weight-bold, 700);
    font-size: var(--layera-font-size-xs, 0.8rem);
    margin-right: var(--layera-spacing-xs, 0.5rem);
}

.table-success-card-manager-info {
    display: flex;
    align-items: center;
}

.table-success-card-deadline-highlight {
    background: linear-gradient(90deg,
        transparent 0%,
        var(--layera-color-success-light, rgba(76, 175, 80, 0.1)) 50%,
        transparent 100%);
    padding: var(--layera-spacing-xs, 0.2rem) var(--layera-spacing-sm, 0.5rem);
    border-radius: var(--layera-border-radius-sm, 4px);
}

.table-success-card-project-metadata {
    display: flex;
    align-items: center;
    gap: var(--layera-spacing-sm, 0.5rem);
    font-size: var(--layera-font-size-xs, 0.8rem);
    color: var(--layera-color-text-secondary, #666);
}

.table-success-card-progress-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid var(--layera-color-success-light, rgba(76, 175, 80, 0.3));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--layera-font-size-xs, 0.7rem);
    font-weight: var(--layera-font-weight-bold, 700);
}

.table-success-card-progress-circle-100 {
    background: var(--layera-color-success, #4CAF50);
    color: var(--layera-color-white, white);
    border-color: var(--layera-color-success, #4CAF50);
}

`;
    }
}