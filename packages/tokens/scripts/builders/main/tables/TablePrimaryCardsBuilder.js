/**
 * TablePrimaryCardsBuilder
 * HTML-aligned enterprise CSS builder για table primary cards components
 * Ταιριάζει με: html\htmlComponents\main\tables\table-primary-cards.html
 */

export class TablePrimaryCardsBuilder {

    static generateAllTablePrimaryCardsCSS() {
        return this.generateSearchControlsCSS() +
               this.generatePrimaryHeaderCSS() +
               this.generateUserManagementCSS() +
               this.generateStatusDropdownCSS() +
               this.generateBulkSelectionCSS() +
               this.generatePrimaryActionButtonsCSS() +
               this.generateInlineEditCSS() +
               this.generatePaginationInfoCSS() +
               this.generateResponsiveDesignCSS() +
               this.generatePrimaryColorThemeCSS() +
               this.generateUserDataDisplayCSS();
    }

    static generateSearchControlsCSS() {
        return `
/* === TABLE PRIMARY CARDS === */
/* PRIMARY CARDS STYLES */

/* Search and Filter Controls */
.table-primary-card-search-controls {
    margin-bottom: var(--layera-spacing-md, 1rem);
    display: flex;
    gap: var(--layera-spacing-sm, 0.5rem);
    flex-wrap: nowrap;
    align-items: center;
}

.table-primary-card-search-input {
    padding: var(--layera-spacing-xs, 0.4rem);
    border: 1px solid var(--layera-color-primary, #4A90E2);
    border-radius: var(--layera-border-radius-sm, 4px);
    width: 150px;
    flex-shrink: 1;
    font-size: var(--layera-font-size-sm, 0.9rem);
}

.table-primary-card-filter-select {
    padding: var(--layera-spacing-xs, 0.4rem);
    border: 1px solid var(--layera-color-primary, #4A90E2);
    border-radius: var(--layera-border-radius-sm, 4px);
    flex-shrink: 1;
    font-size: var(--layera-font-size-sm, 0.9rem);
}

.table-primary-card-date-input {
    padding: var(--layera-spacing-xs, 0.4rem);
    border: 1px solid var(--layera-color-primary, #4A90E2);
    border-radius: var(--layera-border-radius-sm, 4px);
    flex-shrink: 1;
    font-size: var(--layera-font-size-sm, 0.9rem);
}

.table-primary-card-add-button {
    padding: var(--layera-spacing-xs, 0.4rem) var(--layera-spacing-sm, 0.6rem);
    font-size: var(--layera-font-size-sm, 0.9rem);
    height: auto;
    width: auto;
    flex-shrink: 0;
    background: var(--layera-color-primary, #4A90E2);
    color: var(--layera-color-white, white);
    border: none;
    border-radius: var(--layera-border-radius-sm, 4px);
    cursor: pointer;
}

`;
    }

    static generatePrimaryHeaderCSS() {
        return `
/* Primary Table Header */
.table-primary-card-table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--layera-font-family-base, system-ui);
}

.table-primary-card-header {
    background: var(--layera-color-primary, #4A90E2);
    color: var(--layera-color-white, white);
}

.table-primary-card-header th {
    padding: var(--layera-spacing-sm, 0.5rem);
    text-align: left;
    font-weight: var(--layera-font-weight-semibold, 600);
    font-size: var(--layera-font-size-base, 1rem);
    border: none;
}

.table-primary-card-header-checkbox {
    margin-right: var(--layera-spacing-xs, 0.5rem);
}

.table-primary-card-header-cell {
    padding: var(--layera-spacing-sm, 0.5rem);
    color: var(--layera-color-white, white);
}

`;
    }

    static generateUserManagementCSS() {
        return `
/* User Management Rows */
.table-primary-card-row {
    height: 35px;
    border-bottom: 1px solid var(--layera-color-border, #e0e0e0);
    transition: background-color 0.2s ease;
}

.table-primary-card-row:hover {
    background-color: var(--layera-color-primary-light, rgba(74, 144, 226, 0.05));
}

.table-primary-card-cell {
    padding: var(--layera-spacing-xs, 0.3rem) var(--layera-spacing-sm, 0.5rem);
    font-size: var(--layera-font-size-base, 1rem);
    vertical-align: middle;
}

.table-primary-card-name-cell {
    padding: var(--layera-spacing-xs, 0.3rem) var(--layera-spacing-sm, 0.5rem);
    display: flex;
    align-items: center;
}

.table-primary-card-row-checkbox {
    margin-right: var(--layera-spacing-sm, 0.5rem);
}

.table-primary-card-user-name {
    font-weight: var(--layera-font-weight-medium, 500);
    color: var(--layera-color-text-primary, #333);
}

.table-primary-card-email {
    color: var(--layera-color-text-secondary, #666);
    font-size: var(--layera-font-size-sm, 0.9rem);
}

`;
    }

    static generateStatusDropdownCSS() {
        return `
/* Status Dropdown System */
.table-primary-card-status-select {
    border: none;
    background: transparent;
    padding: var(--layera-spacing-xs, 0.2rem);
    font-size: var(--layera-font-size-sm, 0.9rem);
    cursor: pointer;
    outline: none;
}

.table-primary-card-status-select:focus {
    background: var(--layera-color-background-light, #f8f9fa);
    border-radius: var(--layera-border-radius-sm, 4px);
}

.table-primary-card-status-option {
    padding: var(--layera-spacing-xs, 0.2rem);
}

.table-primary-card-status-active {
    color: var(--layera-color-success, #28a745);
}

.table-primary-card-status-pending {
    color: var(--layera-color-warning, #ffc107);
}

.table-primary-card-status-inactive {
    color: var(--layera-color-danger, #dc3545);
}

`;
    }

    static generateBulkSelectionCSS() {
        return `
/* Bulk Selection Controls */
.table-primary-card-bulk-controls {
    margin-bottom: var(--layera-spacing-md, 1rem);
    display: flex;
    gap: var(--layera-spacing-sm, 0.5rem);
    align-items: center;
    padding: var(--layera-spacing-sm, 0.5rem);
    background: var(--layera-color-primary-light, rgba(74, 144, 226, 0.1));
    border-radius: var(--layera-border-radius-md, 8px);
    border: 1px solid var(--layera-color-primary-light, rgba(74, 144, 226, 0.2));
}

.table-primary-card-select-all {
    margin-right: var(--layera-spacing-sm, 0.5rem);
}

.table-primary-card-bulk-actions {
    display: flex;
    gap: var(--layera-spacing-xs, 0.25rem);
}

.table-primary-card-bulk-button {
    padding: var(--layera-spacing-xs, 0.25rem) var(--layera-spacing-sm, 0.5rem);
    font-size: var(--layera-font-size-sm, 0.9rem);
    border: 1px solid var(--layera-color-primary, #4A90E2);
    background: var(--layera-color-white, white);
    color: var(--layera-color-primary, #4A90E2);
    border-radius: var(--layera-border-radius-sm, 4px);
    cursor: pointer;
}

.table-primary-card-bulk-button:hover {
    background: var(--layera-color-primary, #4A90E2);
    color: var(--layera-color-white, white);
}

`;
    }

    static generatePrimaryActionButtonsCSS() {
        return `
/* Primary Action Buttons */
.table-primary-card-actions {
    display: flex;
    gap: var(--layera-spacing-xs, 0.25rem);
    align-items: center;
    justify-content: flex-start;
}

.table-primary-card-edit-button {
    padding: var(--layera-spacing-xs, 0.2rem) var(--layera-spacing-xs, 0.4rem);
    font-size: var(--layera-font-size-xs, 0.8rem);
    background: var(--layera-color-primary, #4A90E2);
    color: var(--layera-color-white, white);
    border: none;
    border-radius: var(--layera-border-radius-sm, 4px);
    cursor: pointer;
    transition: all 0.2s ease;
}

.table-primary-card-edit-button:hover {
    background: var(--layera-color-primary-dark, #2980b9);
    transform: translateY(-1px);
}

.table-primary-card-delete-button {
    padding: var(--layera-spacing-xs, 0.2rem) var(--layera-spacing-xs, 0.4rem);
    font-size: var(--layera-font-size-xs, 0.8rem);
    background: var(--layera-color-danger, #dc3545);
    color: var(--layera-color-white, white);
    border: none;
    border-radius: var(--layera-border-radius-sm, 4px);
    cursor: pointer;
    transition: all 0.2s ease;
}

.table-primary-card-delete-button:hover {
    background: var(--layera-color-danger-dark, #c82333);
    transform: translateY(-1px);
}

.table-primary-card-action-icon {
    margin-right: var(--layera-spacing-xs, 0.25rem);
}

`;
    }

    static generateInlineEditCSS() {
        return `
/* Inline Edit Features */
.table-primary-card-editable {
    position: relative;
    cursor: pointer;
}

.table-primary-card-editable:hover {
    background-color: var(--layera-color-primary-light, rgba(74, 144, 226, 0.1));
    border-radius: var(--layera-border-radius-sm, 4px);
}

.table-primary-card-edit-mode {
    background: var(--layera-color-white, white);
    border: 2px solid var(--layera-color-primary, #4A90E2);
    border-radius: var(--layera-border-radius-sm, 4px);
    padding: var(--layera-spacing-xs, 0.2rem);
    outline: none;
    width: 100%;
}

.table-primary-card-edit-controls {
    display: flex;
    gap: var(--layera-spacing-xs, 0.25rem);
    margin-top: var(--layera-spacing-xs, 0.25rem);
}

.table-primary-card-save-button {
    padding: var(--layera-spacing-xs, 0.2rem) var(--layera-spacing-xs, 0.4rem);
    background: var(--layera-color-success, #28a745);
    color: var(--layera-color-white, white);
    border: none;
    border-radius: var(--layera-border-radius-sm, 4px);
    font-size: var(--layera-font-size-xs, 0.8rem);
    cursor: pointer;
}

.table-primary-card-cancel-button {
    padding: var(--layera-spacing-xs, 0.2rem) var(--layera-spacing-xs, 0.4rem);
    background: var(--layera-color-secondary, #6c757d);
    color: var(--layera-color-white, white);
    border: none;
    border-radius: var(--layera-border-radius-sm, 4px);
    font-size: var(--layera-font-size-xs, 0.8rem);
    cursor: pointer;
}

`;
    }

    static generatePaginationInfoCSS() {
        return `
/* Pagination Info */
.table-primary-card-pagination {
    margin-top: var(--layera-spacing-md, 1rem);
    text-align: center;
    color: var(--layera-color-text-secondary, #666);
    font-size: var(--layera-font-size-sm, 0.9rem);
    padding: var(--layera-spacing-sm, 0.5rem);
}

.table-primary-card-pagination-info {
    display: inline-block;
    background: var(--layera-color-background-light, #f8f9fa);
    padding: var(--layera-spacing-sm, 0.5rem) var(--layera-spacing-md, 1rem);
    border-radius: var(--layera-border-radius-md, 8px);
    border: 1px solid var(--layera-color-border, #e0e0e0);
}

.table-primary-card-pagination-numbers {
    font-weight: var(--layera-font-weight-semibold, 600);
    color: var(--layera-color-primary, #4A90E2);
}

.table-primary-card-pagination-icon {
    margin-right: var(--layera-spacing-xs, 0.25rem);
}

`;
    }

    static generateResponsiveDesignCSS() {
        return `
/* Responsive Design */
@media (max-width: 768px) {
    .table-primary-card-search-controls {
        flex-wrap: wrap;
        gap: var(--layera-spacing-xs, 0.25rem);
    }

    .table-primary-card-search-input,
    .table-primary-card-filter-select,
    .table-primary-card-date-input {
        width: 100%;
        flex-shrink: 0;
    }

    .table-primary-card-table {
        font-size: var(--layera-font-size-sm, 0.9rem);
    }

    .table-primary-card-actions {
        flex-direction: column;
        gap: var(--layera-spacing-xs, 0.2rem);
    }

    .table-primary-card-edit-button,
    .table-primary-card-delete-button {
        width: 100%;
        text-align: center;
    }
}

@media (max-width: 480px) {
    .table-primary-card-cell {
        padding: var(--layera-spacing-xs, 0.2rem);
        font-size: var(--layera-font-size-sm, 0.8rem);
    }

    .table-primary-card-header th {
        padding: var(--layera-spacing-xs, 0.3rem);
        font-size: var(--layera-font-size-sm, 0.9rem);
    }

    .table-primary-card-pagination {
        font-size: var(--layera-font-size-xs, 0.8rem);
    }
}

`;
    }

    static generatePrimaryColorThemeCSS() {
        return `
/* Primary Color Theme */
.table-primary-card-theme {
    --table-primary-color: var(--layera-color-primary, #4A90E2);
    --table-primary-light: var(--layera-color-primary-light, rgba(74, 144, 226, 0.1));
    --table-primary-dark: var(--layera-color-primary-dark, #2980b9);
    --table-hover-color: var(--layera-color-primary-light, rgba(74, 144, 226, 0.05));
}

.table-primary-card-accent {
    color: var(--layera-color-primary, #4A90E2);
    border-color: var(--layera-color-primary, #4A90E2);
}

.table-primary-card-highlight {
    background: var(--layera-color-primary-light, rgba(74, 144, 226, 0.1));
    border: 1px solid var(--layera-color-primary-light, rgba(74, 144, 226, 0.2));
    border-radius: var(--layera-border-radius-sm, 4px);
}

.table-primary-card-focus {
    box-shadow: 0 0 0 3px var(--layera-color-primary-light, rgba(74, 144, 226, 0.3));
    outline: none;
}

`;
    }

    static generateUserDataDisplayCSS() {
        return `
/* User Data Display */
.table-primary-card-user-info {
    display: flex;
    align-items: center;
    gap: var(--layera-spacing-sm, 0.5rem);
}

.table-primary-card-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--layera-color-primary-light, rgba(74, 144, 226, 0.2));
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--layera-color-primary, #4A90E2);
    font-weight: var(--layera-font-weight-bold, 700);
    font-size: var(--layera-font-size-sm, 0.9rem);
}

.table-primary-card-user-details {
    display: flex;
    flex-direction: column;
}

.table-primary-card-status-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--layera-spacing-xs, 0.25rem);
    padding: var(--layera-spacing-xs, 0.25rem) var(--layera-spacing-sm, 0.5rem);
    border-radius: var(--layera-border-radius-full, 20px);
    font-size: var(--layera-font-size-xs, 0.8rem);
    font-weight: var(--layera-font-weight-medium, 500);
}

.table-primary-card-date-display {
    color: var(--layera-color-text-secondary, #666);
    font-size: var(--layera-font-size-sm, 0.9rem);
    white-space: nowrap;
}

.table-primary-card-email-link {
    color: var(--layera-color-primary, #4A90E2);
    text-decoration: none;
}

.table-primary-card-email-link:hover {
    text-decoration: underline;
}

`;
    }
}