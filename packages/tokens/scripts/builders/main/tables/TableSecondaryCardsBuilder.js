/**
 * TableSecondaryCardsBuilder
 * HTML-aligned enterprise CSS builder για table secondary cards components
 * Ταιριάζει με: html\htmlComponents\main\tables\table-secondary-cards.html
 */

export class TableSecondaryCardsBuilder {

    static generateAllTableSecondaryCardsCSS() {
        return this.generateDepartmentSearchCSS() +
               this.generateSecondaryHeaderCSS() +
               this.generateDepartmentManagementCSS() +
               this.generateBudgetInputSystemCSS() +
               this.generateInlineEditingFieldsCSS() +
               this.generateSecondaryActionButtonsCSS() +
               this.generateEmployeeCountDisplayCSS() +
               this.generateBudgetSummaryInfoCSS() +
               this.generateResponsiveDesignCSS() +
               this.generateSecondaryColorThemeCSS() +
               this.generateDepartmentDataDisplayCSS();
    }

    static generateDepartmentSearchCSS() {
        return `
/* === TABLE SECONDARY CARDS === */
/* SECONDARY CARDS STYLES */

/* Department Search Controls */
.table-secondary-card-search-controls {
    margin-bottom: var(--layera-spacing-md, 1rem);
    display: flex;
    gap: var(--layera-spacing-sm, 0.5rem);
    flex-wrap: nowrap;
    align-items: center;
}

.table-secondary-card-search-input {
    padding: var(--layera-spacing-xs, 0.4rem);
    border: 1px solid var(--layera-color-secondary, #9013FE);
    border-radius: var(--layera-border-radius-sm, 4px);
    width: 150px;
    flex-shrink: 1;
    font-size: var(--layera-font-size-sm, 0.9rem);
}

.table-secondary-card-department-select {
    padding: var(--layera-spacing-xs, 0.4rem);
    border: 1px solid var(--layera-color-secondary, #9013FE);
    border-radius: var(--layera-border-radius-sm, 4px);
    flex-shrink: 1;
    font-size: var(--layera-font-size-sm, 0.9rem);
}

.table-secondary-card-budget-input {
    padding: var(--layera-spacing-xs, 0.4rem);
    border: 1px solid var(--layera-color-secondary, #9013FE);
    border-radius: var(--layera-border-radius-sm, 4px);
    flex-shrink: 1;
    font-size: var(--layera-font-size-sm, 0.9rem);
}

.table-secondary-card-add-button {
    background: var(--layera-color-secondary, #9013FE);
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

.table-secondary-card-add-button:hover {
    background: var(--layera-color-secondary-dark, #7b1fa2);
    transform: translateY(-1px);
}

`;
    }

    static generateSecondaryHeaderCSS() {
        return `
/* Secondary Table Header */
.table-secondary-card-table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--layera-font-family-base, system-ui);
}

.table-secondary-card-header {
    background: var(--layera-color-secondary, #9013FE);
    color: var(--layera-color-white, white);
}

.table-secondary-card-header th {
    color: var(--layera-color-white, white);
    padding: var(--layera-spacing-sm, 0.5rem);
    text-align: left;
    font-weight: var(--layera-font-weight-semibold, 600);
    font-size: var(--layera-font-size-base, 1rem);
    border: none;
}

.table-secondary-card-header-checkbox {
    margin-right: var(--layera-spacing-xs, 0.5rem);
}

.table-secondary-card-header-cell {
    padding: var(--layera-spacing-sm, 0.5rem);
    color: var(--layera-color-white, white);
}

`;
    }

    static generateDepartmentManagementCSS() {
        return `
/* Department Management Rows */
.table-secondary-card-row {
    height: 35px;
    border-bottom: 1px solid var(--layera-color-border, #e0e0e0);
    transition: background-color 0.2s ease;
}

.table-secondary-card-row:hover {
    background-color: var(--layera-color-secondary-light, rgba(144, 19, 254, 0.05));
}

.table-secondary-card-cell {
    padding: var(--layera-spacing-xs, 0.3rem) var(--layera-spacing-sm, 0.5rem);
    font-size: var(--layera-font-size-base, 1rem);
    vertical-align: middle;
}

.table-secondary-card-department-cell {
    padding: var(--layera-spacing-xs, 0.3rem) var(--layera-spacing-sm, 0.5rem);
    display: flex;
    align-items: center;
}

.table-secondary-card-row-checkbox {
    margin-right: var(--layera-spacing-sm, 0.5rem);
}

.table-secondary-card-department-name {
    font-weight: var(--layera-font-weight-medium, 500);
    color: var(--layera-color-text-primary, #333);
}

.table-secondary-card-manager-name {
    color: var(--layera-color-text-secondary, #666);
    font-size: var(--layera-font-size-sm, 0.9rem);
}

`;
    }

    static generateBudgetInputSystemCSS() {
        return `
/* Budget Input System */
.table-secondary-card-budget-field {
    border: none;
    background: transparent;
    width: 100%;
    padding: var(--layera-spacing-xs, 0.2rem);
    font-size: var(--layera-font-size-base, 1rem);
    outline: none;
    transition: all 0.2s ease;
}

.table-secondary-card-budget-field:focus {
    background: var(--layera-color-background-light, #f8f9fa);
    border-radius: var(--layera-border-radius-sm, 4px);
    border: 1px solid var(--layera-color-secondary, #9013FE);
}

.table-secondary-card-budget-display {
    font-family: var(--layera-font-family-mono, monospace);
    font-weight: var(--layera-font-weight-semibold, 600);
    color: var(--layera-color-success, #28a745);
}

.table-secondary-card-budget-currency {
    color: var(--layera-color-text-secondary, #666);
    font-size: var(--layera-font-size-sm, 0.9rem);
}

.table-secondary-card-employee-count {
    border: none;
    background: transparent;
    width: 100%;
    padding: var(--layera-spacing-xs, 0.2rem);
    font-size: var(--layera-font-size-base, 1rem);
    outline: none;
    text-align: center;
}

.table-secondary-card-employee-count:focus {
    background: var(--layera-color-background-light, #f8f9fa);
    border-radius: var(--layera-border-radius-sm, 4px);
    border: 1px solid var(--layera-color-secondary, #9013FE);
}

`;
    }

    static generateInlineEditingFieldsCSS() {
        return `
/* Inline Editing Fields */
.table-secondary-card-manager-field {
    border: none;
    background: transparent;
    width: 100%;
    padding: var(--layera-spacing-xs, 0.2rem);
    font-size: var(--layera-font-size-base, 1rem);
    outline: none;
    transition: all 0.2s ease;
}

.table-secondary-card-manager-field:focus {
    background: var(--layera-color-background-light, #f8f9fa);
    border-radius: var(--layera-border-radius-sm, 4px);
    border: 1px solid var(--layera-color-secondary, #9013FE);
}

.table-secondary-card-editable-input {
    border: none;
    background: transparent;
    width: 100%;
    padding: var(--layera-spacing-xs, 0.2rem);
    outline: none;
    font-family: inherit;
}

.table-secondary-card-editable-input:hover {
    background-color: var(--layera-color-secondary-light, rgba(144, 19, 254, 0.1));
    border-radius: var(--layera-border-radius-sm, 4px);
}

.table-secondary-card-editable-input:focus {
    background: var(--layera-color-white, white);
    border: 2px solid var(--layera-color-secondary, #9013FE);
    border-radius: var(--layera-border-radius-sm, 4px);
    box-shadow: 0 0 0 3px var(--layera-color-secondary-light, rgba(144, 19, 254, 0.3));
}

.table-secondary-card-edit-indicator {
    position: absolute;
    top: 2px;
    right: 2px;
    width: 6px;
    height: 6px;
    background: var(--layera-color-secondary, #9013FE);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s ease;
}

.table-secondary-card-editable-input:focus + .table-secondary-card-edit-indicator {
    opacity: 1;
}

`;
    }

    static generateSecondaryActionButtonsCSS() {
        return `
/* Secondary Action Buttons */
.table-secondary-card-actions {
    display: flex;
    gap: var(--layera-spacing-xs, 0.25rem);
    align-items: center;
    justify-content: flex-start;
}

.table-secondary-card-edit-button {
    background: var(--layera-color-secondary, #9013FE);
    color: var(--layera-color-white, white);
    padding: var(--layera-spacing-xs, 0.2rem) var(--layera-spacing-xs, 0.4rem);
    font-size: var(--layera-font-size-xs, 0.8rem);
    border: none;
    border-radius: var(--layera-border-radius-sm, 3px);
    cursor: pointer;
    transition: all 0.2s ease;
}

.table-secondary-card-edit-button:hover {
    background: var(--layera-color-secondary-dark, #7b1fa2);
    transform: translateY(-1px);
}

.table-secondary-card-delete-button {
    background: var(--layera-color-danger, #dc3545);
    color: var(--layera-color-white, white);
    padding: var(--layera-spacing-xs, 0.2rem) var(--layera-spacing-xs, 0.4rem);
    font-size: var(--layera-font-size-xs, 0.8rem);
    border: none;
    border-radius: var(--layera-border-radius-sm, 3px);
    cursor: pointer;
    transition: all 0.2s ease;
}

.table-secondary-card-delete-button:hover {
    background: var(--layera-color-danger-dark, #c82333);
    transform: translateY(-1px);
}

.table-secondary-card-action-icon {
    margin-right: var(--layera-spacing-xs, 0.25rem);
}

.table-secondary-card-bulk-actions {
    margin-bottom: var(--layera-spacing-md, 1rem);
    display: flex;
    gap: var(--layera-spacing-sm, 0.5rem);
    align-items: center;
    padding: var(--layera-spacing-sm, 0.5rem);
    background: var(--layera-color-secondary-light, rgba(144, 19, 254, 0.1));
    border-radius: var(--layera-border-radius-md, 8px);
    border: 1px solid var(--layera-color-secondary-light, rgba(144, 19, 254, 0.2));
}

`;
    }

    static generateEmployeeCountDisplayCSS() {
        return `
/* Employee Count Display */
.table-secondary-card-employee-info {
    display: flex;
    align-items: center;
    gap: var(--layera-spacing-xs, 0.25rem);
}

.table-secondary-card-employee-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--layera-spacing-xs, 0.25rem);
    padding: var(--layera-spacing-xs, 0.25rem) var(--layera-spacing-sm, 0.5rem);
    background: var(--layera-color-secondary-light, rgba(144, 19, 254, 0.1));
    border-radius: var(--layera-border-radius-full, 20px);
    font-size: var(--layera-font-size-xs, 0.8rem);
    font-weight: var(--layera-font-weight-medium, 500);
    color: var(--layera-color-secondary, #9013FE);
}

.table-secondary-card-employee-number {
    font-weight: var(--layera-font-weight-bold, 700);
    color: var(--layera-color-secondary, #9013FE);
}

.table-secondary-card-employee-icon {
    width: 16px;
    height: 16px;
    background: var(--layera-color-secondary, #9013FE);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--layera-color-white, white);
    font-size: var(--layera-font-size-xs, 0.7rem);
}

`;
    }

    static generateBudgetSummaryInfoCSS() {
        return `
/* Budget Summary Info */
.table-secondary-card-summary {
    margin-top: var(--layera-spacing-md, 1rem);
    text-align: center;
    color: var(--layera-color-text-secondary, #666);
    font-size: var(--layera-font-size-sm, 0.9rem);
    padding: var(--layera-spacing-sm, 0.5rem);
}

.table-secondary-card-summary-info {
    display: inline-block;
    background: var(--layera-color-background-light, #f8f9fa);
    padding: var(--layera-spacing-sm, 0.5rem) var(--layera-spacing-md, 1rem);
    border-radius: var(--layera-border-radius-md, 8px);
    border: 1px solid var(--layera-color-border, #e0e0e0);
}

.table-secondary-card-total-budget {
    font-weight: var(--layera-font-weight-semibold, 600);
    color: var(--layera-color-secondary, #9013FE);
    font-family: var(--layera-font-family-mono, monospace);
}

.table-secondary-card-department-count {
    font-weight: var(--layera-font-weight-semibold, 600);
    color: var(--layera-color-secondary, #9013FE);
}

.table-secondary-card-summary-icon {
    margin-right: var(--layera-spacing-xs, 0.25rem);
}

.table-secondary-card-budget-breakdown {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--layera-spacing-sm, 0.5rem);
    padding: var(--layera-spacing-xs, 0.25rem);
    background: var(--layera-color-secondary-light, rgba(144, 19, 254, 0.1));
    border-radius: var(--layera-border-radius-sm, 4px);
}

`;
    }

    static generateResponsiveDesignCSS() {
        return `
/* Responsive Design */
@media (max-width: 768px) {
    .table-secondary-card-search-controls {
        flex-wrap: wrap;
        gap: var(--layera-spacing-xs, 0.25rem);
    }

    .table-secondary-card-search-input,
    .table-secondary-card-department-select,
    .table-secondary-card-budget-input {
        width: 100%;
        flex-shrink: 0;
    }

    .table-secondary-card-table {
        font-size: var(--layera-font-size-sm, 0.9rem);
    }

    .table-secondary-card-actions {
        flex-direction: column;
        gap: var(--layera-spacing-xs, 0.2rem);
    }

    .table-secondary-card-edit-button,
    .table-secondary-card-delete-button {
        width: 100%;
        text-align: center;
    }

    .table-secondary-card-budget-breakdown {
        flex-direction: column;
        gap: var(--layera-spacing-xs, 0.25rem);
    }
}

@media (max-width: 480px) {
    .table-secondary-card-cell {
        padding: var(--layera-spacing-xs, 0.2rem);
        font-size: var(--layera-font-size-sm, 0.8rem);
    }

    .table-secondary-card-header th {
        padding: var(--layera-spacing-xs, 0.3rem);
        font-size: var(--layera-font-size-sm, 0.9rem);
    }

    .table-secondary-card-summary {
        font-size: var(--layera-font-size-xs, 0.8rem);
    }

    .table-secondary-card-editable-input {
        font-size: var(--layera-font-size-sm, 0.8rem);
    }
}

`;
    }

    static generateSecondaryColorThemeCSS() {
        return `
/* Secondary Color Theme */
.table-secondary-card-theme {
    --table-secondary-color: var(--layera-color-secondary, #9013FE);
    --table-secondary-light: var(--layera-color-secondary-light, rgba(144, 19, 254, 0.1));
    --table-secondary-dark: var(--layera-color-secondary-dark, #7b1fa2);
    --table-hover-color: var(--layera-color-secondary-light, rgba(144, 19, 254, 0.05));
}

.table-secondary-card-accent {
    color: var(--layera-color-secondary, #9013FE);
    border-color: var(--layera-color-secondary, #9013FE);
}

.table-secondary-card-highlight {
    background: var(--layera-color-secondary-light, rgba(144, 19, 254, 0.1));
    border: 1px solid var(--layera-color-secondary-light, rgba(144, 19, 254, 0.2));
    border-radius: var(--layera-border-radius-sm, 4px);
}

.table-secondary-card-focus {
    box-shadow: 0 0 0 3px var(--layera-color-secondary-light, rgba(144, 19, 254, 0.3));
    outline: none;
}

.table-secondary-card-purple-theme {
    background: linear-gradient(135deg,
        var(--layera-color-secondary-light, rgba(144, 19, 254, 0.1)) 0%,
        var(--layera-color-secondary-light, rgba(144, 19, 254, 0.05)) 100%);
    border: 1px solid var(--layera-color-secondary-light, rgba(144, 19, 254, 0.2));
}

`;
    }

    static generateDepartmentDataDisplayCSS() {
        return `
/* Department Data Display */
.table-secondary-card-department-info {
    display: flex;
    align-items: center;
    gap: var(--layera-spacing-sm, 0.5rem);
}

.table-secondary-card-department-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--layera-color-secondary-light, rgba(144, 19, 254, 0.2));
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--layera-color-secondary, #9013FE);
    font-weight: var(--layera-font-weight-bold, 700);
    font-size: var(--layera-font-size-sm, 0.9rem);
}

.table-secondary-card-department-details {
    display: flex;
    flex-direction: column;
}

.table-secondary-card-manager-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--layera-color-secondary-light, rgba(144, 19, 254, 0.2));
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--layera-color-secondary, #9013FE);
    font-weight: var(--layera-font-weight-bold, 700);
    font-size: var(--layera-font-size-xs, 0.8rem);
    margin-right: var(--layera-spacing-xs, 0.5rem);
}

.table-secondary-card-manager-info {
    display: flex;
    align-items: center;
}

.table-secondary-card-budget-highlight {
    background: linear-gradient(90deg,
        transparent 0%,
        var(--layera-color-secondary-light, rgba(144, 19, 254, 0.1)) 50%,
        transparent 100%);
    padding: var(--layera-spacing-xs, 0.2rem) var(--layera-spacing-sm, 0.5rem);
    border-radius: var(--layera-border-radius-sm, 4px);
}

`;
    }
}