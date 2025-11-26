/**
 * TablesTabsBuilder
 * HTML-aligned enterprise CSS builder για tables tabs components
 * Ταιριάζει με: html\htmlComponents\main\tables\tables-tabs.html
 */

export class TablesTabsBuilder {

    static generateAllTablesTabsCSS() {
        return this.generateTablesSectionCSS() +
               this.generateTabNavigationSystemCSS() +
               this.generateTabButtonStylingCSS() +
               this.generateThemeSpecificTabColorsCSS() +
               this.generateTabContentAreasCSS() +
               this.generateTabPaneManagementCSS() +
               this.generateResponsiveTabNavigationCSS() +
               this.generateButtonSystemIntegrationCSS() +
               this.generateTableActionsContainerCSS() +
               this.generateSixColorThemeSystemCSS() +
               this.generateDynamicContentLoadingCSS();
    }

    static generateTablesSectionCSS() {
        return `
/* === TABLES TABS === */
/* TABLE TABS STYLES */

/* Tables Section Container */
.tables-section {
    background: var(--layera-color-white, white);
    border-radius: var(--layera-border-radius-md, 8px);
    padding: var(--layera-spacing-md, 1rem);
    margin-bottom: var(--layera-spacing-xl, 2rem);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--layera-color-border, #e0e0e0);
    width: 100%;
    margin: 0;
    box-sizing: border-box;
    overflow-x: auto;
}

.tables-section-title {
    color: var(--layera-color-text-primary, #2c3e50);
    font-size: var(--layera-font-size-lg, 1.2rem);
    margin-bottom: var(--layera-spacing-md, 1rem);
    padding-bottom: var(--layera-spacing-sm, 0.5rem);
    border-bottom: 1px solid var(--layera-color-border, #e0e0e0);
    font-weight: var(--layera-font-weight-semibold, 600);
}

.tables-section-wrapper {
    background: var(--layera-color-background, #f8f9fa);
    padding: var(--layera-spacing-lg, 1.5rem);
    border-radius: var(--layera-border-radius-lg, 12px);
}

.tables-section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--layera-spacing-md, 1rem);
}

.tables-section-icon {
    margin-right: var(--layera-spacing-sm, 0.5rem);
    color: var(--layera-color-primary, #4A90E2);
}

`;
    }

    static generateTabNavigationSystemCSS() {
        return `
/* Tab Navigation System */
.tables-tabs-container {
    background: var(--layera-color-white, white);
    border-radius: var(--layera-border-radius-sm, 6px);
    overflow: hidden;
    border: 1px solid var(--layera-color-border, #e0e0e0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.tables-tabs-nav {
    display: flex;
    background: var(--layera-color-background-light, #f8f9fa);
    border-bottom: 1px solid var(--layera-color-border, #e0e0e0);
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--layera-color-border-light, #ccc) var(--layera-color-background-light, #f8f9fa);
}

.tables-tabs-nav::-webkit-scrollbar {
    height: 4px;
}

.tables-tabs-nav::-webkit-scrollbar-track {
    background: var(--layera-color-background-light, #f8f9fa);
}

.tables-tabs-nav::-webkit-scrollbar-thumb {
    background: var(--layera-color-border, #ccc);
    border-radius: var(--layera-border-radius-full, 20px);
}

.tables-tabs-nav::-webkit-scrollbar-thumb:hover {
    background: var(--layera-color-border-dark, #999);
}

.tables-tab-indicator {
    position: relative;
    background: linear-gradient(90deg,
        var(--layera-color-primary, #4A90E2) 0%,
        var(--layera-color-primary-light, rgba(74, 144, 226, 0.8)) 100%);
    height: 2px;
    transition: all 0.3s ease;
}

`;
    }

    static generateTabButtonStylingCSS() {
        return `
/* Tab Button Styling */
.tables-tab-button {
    padding: var(--layera-spacing-sm, 0.75rem) var(--layera-spacing-md, 1rem);
    background: transparent;
    border: none;
    color: var(--layera-color-text-secondary, #666);
    cursor: pointer;
    white-space: nowrap;
    flex: 1;
    min-width: 120px;
    font-size: var(--layera-font-size-sm, 0.8rem);
    transition: all 0.2s ease;
    border-bottom: 2px solid transparent;
    position: relative;
    font-family: var(--layera-font-family-base, system-ui);
    font-weight: var(--layera-font-weight-medium, 500);
}

.tables-tab-button:hover {
    background: rgba(74, 144, 226, 0.1);
    color: var(--layera-color-primary, #4A90E2);
    transform: translateY(-1px);
}

.tables-tab-button.active-tab {
    background: rgba(74, 144, 226, 0.1);
    color: var(--layera-color-primary, #4A90E2);
    border-bottom-color: var(--layera-color-primary, #4A90E2);
    font-weight: var(--layera-font-weight-semibold, 600);
}

.tables-tab-button:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px var(--layera-color-primary-light, rgba(74, 144, 226, 0.3));
}

.tables-tab-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.tables-tab-icon {
    margin-right: var(--layera-spacing-xs, 0.5rem);
    transition: transform 0.2s ease;
}

.tables-tab-button:hover .tables-tab-icon {
    transform: scale(1.1);
}

`;
    }

    static generateThemeSpecificTabColorsCSS() {
        return `
/* Theme-Specific Tab Colors */
.tables-tab-button.tab-primary.active-tab {
    border-bottom-color: var(--layera-color-primary, #4A90E2);
    background: var(--layera-color-primary-light, rgba(74, 144, 226, 0.1));
    color: var(--layera-color-primary, #4A90E2);
}

.tables-tab-button.tab-secondary.active-tab {
    border-bottom-color: var(--layera-color-secondary, #9013FE);
    background: var(--layera-color-secondary-light, rgba(144, 19, 254, 0.1));
    color: var(--layera-color-secondary, #9013FE);
}

.tables-tab-button.tab-success.active-tab {
    border-bottom-color: var(--layera-color-success, #4CAF50);
    background: var(--layera-color-success-light, rgba(76, 175, 80, 0.1));
    color: var(--layera-color-success, #4CAF50);
}

.tables-tab-button.tab-warning.active-tab {
    border-bottom-color: var(--layera-color-warning, #FF9800);
    background: var(--layera-color-warning-light, rgba(255, 152, 0, 0.1));
    color: var(--layera-color-warning, #FF9800);
}

.tables-tab-button.tab-danger.active-tab {
    border-bottom-color: var(--layera-color-danger, #F44336);
    background: var(--layera-color-danger-light, rgba(244, 67, 54, 0.1));
    color: var(--layera-color-danger, #F44336);
}

.tables-tab-button.tab-info.active-tab {
    border-bottom-color: var(--layera-color-info, #2196F3);
    background: var(--layera-color-info-light, rgba(33, 150, 243, 0.1));
    color: var(--layera-color-info, #2196F3);
}

/* Hover states for each theme */
.tables-tab-button.tab-primary:hover {
    background: var(--layera-color-primary-light, rgba(74, 144, 226, 0.1));
    color: var(--layera-color-primary, #4A90E2);
}

.tables-tab-button.tab-secondary:hover {
    background: var(--layera-color-secondary-light, rgba(144, 19, 254, 0.1));
    color: var(--layera-color-secondary, #9013FE);
}

.tables-tab-button.tab-success:hover {
    background: var(--layera-color-success-light, rgba(76, 175, 80, 0.1));
    color: var(--layera-color-success, #4CAF50);
}

.tables-tab-button.tab-warning:hover {
    background: var(--layera-color-warning-light, rgba(255, 152, 0, 0.1));
    color: var(--layera-color-warning, #FF9800);
}

.tables-tab-button.tab-danger:hover {
    background: var(--layera-color-danger-light, rgba(244, 67, 54, 0.1));
    color: var(--layera-color-danger, #F44336);
}

.tables-tab-button.tab-info:hover {
    background: var(--layera-color-info-light, rgba(33, 150, 243, 0.1));
    color: var(--layera-color-info, #2196F3);
}

`;
    }

    static generateTabContentAreasCSS() {
        return `
/* Tab Content Areas */
.tables-tab-content {
    padding: var(--layera-spacing-md, 1rem);
    background: var(--layera-color-white, white);
    min-height: 400px;
    position: relative;
}

.tables-tab-content-wrapper {
    position: relative;
    overflow: hidden;
}

.tables-tab-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    gap: var(--layera-spacing-sm, 0.5rem);
    color: var(--layera-color-text-secondary, #666);
    font-size: var(--layera-font-size-sm, 0.9rem);
}

.tables-tab-loading-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid var(--layera-color-border-light, #f3f3f3);
    border-top: 2px solid var(--layera-color-primary, #4A90E2);
    border-radius: 50%;
    animation: tables-spin 1s linear infinite;
}

@keyframes tables-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.tables-tab-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--layera-spacing-xl, 2rem);
    color: var(--layera-color-text-muted, #999);
    text-align: center;
}

.tables-tab-empty-icon {
    font-size: var(--layera-font-size-xxl, 2rem);
    margin-bottom: var(--layera-spacing-sm, 0.5rem);
}

`;
    }

    static generateTabPaneManagementCSS() {
        return `
/* Tab Pane Management */
.tables-tab-pane {
    display: none;
    animation: tables-fadeIn 0.3s ease-in-out;
}

.tables-tab-pane.active-pane {
    display: block;
}

@keyframes tables-fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.tables-tab-pane-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--layera-spacing-md, 1rem);
    padding-bottom: var(--layera-spacing-sm, 0.5rem);
    border-bottom: 1px solid var(--layera-color-border-light, #f0f0f0);
}

.tables-tab-pane-title {
    font-size: var(--layera-font-size-lg, 1.1rem);
    font-weight: var(--layera-font-weight-semibold, 600);
    color: var(--layera-color-text-primary, #333);
}

.tables-tab-pane-meta {
    font-size: var(--layera-font-size-sm, 0.9rem);
    color: var(--layera-color-text-secondary, #666);
}

.tables-content-container {
    position: relative;
    background: var(--layera-color-white, white);
    border-radius: var(--layera-border-radius-sm, 4px);
    overflow: hidden;
}

`;
    }

    static generateResponsiveTabNavigationCSS() {
        return `
/* Responsive Tab Navigation */
@media (max-width: 768px) {
    .tables-tabs-nav {
        justify-content: flex-start;
        gap: 0;
    }

    .tables-tab-button {
        min-width: 100px;
        padding: var(--layera-spacing-sm, 0.6rem) var(--layera-spacing-sm, 0.8rem);
        font-size: var(--layera-font-size-xs, 0.75rem);
        flex: none;
    }

    .tables-tab-icon {
        margin-right: var(--layera-spacing-xs, 0.25rem);
    }

    .tables-section {
        padding: var(--layera-spacing-sm, 0.75rem);
        margin-bottom: var(--layera-spacing-md, 1rem);
    }

    .tables-section-title {
        font-size: var(--layera-font-size-base, 1rem);
        margin-bottom: var(--layera-spacing-sm, 0.75rem);
    }
}

@media (max-width: 480px) {
    .tables-tab-button {
        min-width: 80px;
        padding: var(--layera-spacing-sm, 0.5rem) var(--layera-spacing-xs, 0.6rem);
        font-size: var(--layera-font-size-xs, 0.7rem);
    }

    .tables-tab-content {
        padding: var(--layera-spacing-sm, 0.75rem);
    }

    .tables-section-title {
        font-size: var(--layera-font-size-sm, 0.9rem);
    }

    .tables-tab-pane-title {
        font-size: var(--layera-font-size-base, 1rem);
    }
}

/* Horizontal scroll indicators */
.tables-tabs-nav::before,
.tables-tabs-nav::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 20px;
    pointer-events: none;
    z-index: 1;
}

.tables-tabs-nav::before {
    left: 0;
    background: linear-gradient(90deg,
        var(--layera-color-background-light, #f8f9fa) 0%,
        transparent 100%);
}

.tables-tabs-nav::after {
    right: 0;
    background: linear-gradient(-90deg,
        var(--layera-color-background-light, #f8f9fa) 0%,
        transparent 100%);
}

`;
    }

    static generateButtonSystemIntegrationCSS() {
        return `
/* Button System Integration */
.tables-tab-btn {
    padding: var(--layera-spacing-sm, 0.6rem) var(--layera-spacing-md, 1rem);
    border: none;
    border-radius: var(--layera-border-radius-sm, 4px);
    cursor: pointer;
    font-size: var(--layera-font-size-sm, 0.8rem);
    transition: all 0.2s ease;
    margin: var(--layera-spacing-xs, 0.2rem);
    font-weight: var(--layera-font-weight-medium, 500);
}

.tables-tab-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.tables-tab-btn:active {
    transform: translateY(0);
}

/* Theme-specific button styles */
.tables-primary-btn {
    background: var(--layera-color-primary, #4A90E2);
    color: var(--layera-color-white, white);
}

.tables-primary-btn:hover {
    background: var(--layera-color-primary-dark, #357ABD);
}

.tables-secondary-btn {
    background: var(--layera-color-secondary, #9013FE);
    color: var(--layera-color-white, white);
}

.tables-secondary-btn:hover {
    background: var(--layera-color-secondary-dark, #7B1FA2);
}

.tables-success-btn {
    background: var(--layera-color-success, #4CAF50);
    color: var(--layera-color-white, white);
}

.tables-success-btn:hover {
    background: var(--layera-color-success-dark, #45A049);
}

.tables-warning-btn {
    background: var(--layera-color-warning, #FF9800);
    color: var(--layera-color-white, white);
}

.tables-warning-btn:hover {
    background: var(--layera-color-warning-dark, #F57C00);
}

.tables-danger-btn {
    background: var(--layera-color-danger, #F44336);
    color: var(--layera-color-white, white);
}

.tables-danger-btn:hover {
    background: var(--layera-color-danger-dark, #D32F2F);
}

.tables-info-btn {
    background: var(--layera-color-info, #2196F3);
    color: var(--layera-color-white, white);
}

.tables-info-btn:hover {
    background: var(--layera-color-info-dark, #1976D2);
}

`;
    }

    static generateTableActionsContainerCSS() {
        return `
/* Table Actions Container */
.tables-actions-container {
    margin-bottom: var(--layera-spacing-md, 1rem);
    display: flex;
    gap: var(--layera-spacing-md, 1rem);
    flex-wrap: wrap;
    align-items: center;
    padding: var(--layera-spacing-sm, 0.75rem);
    background: var(--layera-color-background-light, #f8f9fa);
    border-radius: var(--layera-border-radius-sm, 4px);
    border: 1px solid var(--layera-color-border-light, #f0f0f0);
}

.tables-actions-container input,
.tables-actions-container select {
    padding: var(--layera-spacing-sm, 0.5rem);
    border-radius: var(--layera-border-radius-sm, 4px);
    border: 1px solid var(--layera-color-border, #ddd);
    min-width: 150px;
    font-size: var(--layera-font-size-sm, 0.9rem);
    transition: all 0.2s ease;
}

.tables-actions-container input:focus,
.tables-actions-container select:focus {
    outline: none;
    border-color: var(--layera-color-primary, #4A90E2);
    box-shadow: 0 0 0 3px var(--layera-color-primary-light, rgba(74, 144, 226, 0.1));
}

.tables-actions-search {
    flex: 1;
    min-width: 200px;
}

.tables-actions-filter {
    flex: 0 0 auto;
}

.tables-actions-export {
    display: flex;
    gap: var(--layera-spacing-xs, 0.5rem);
    align-items: center;
}

.tables-actions-separator {
    width: 1px;
    height: 30px;
    background: var(--layera-color-border, #ddd);
    margin: 0 var(--layera-spacing-sm, 0.5rem);
}

`;
    }

    static generateSixColorThemeSystemCSS() {
        return `
/* 6-Color Theme System */
.tables-theme-primary {
    --tables-theme-color: var(--layera-color-primary, #4A90E2);
    --tables-theme-light: var(--layera-color-primary-light, rgba(74, 144, 226, 0.1));
    --tables-theme-dark: var(--layera-color-primary-dark, #357ABD);
}

.tables-theme-secondary {
    --tables-theme-color: var(--layera-color-secondary, #9013FE);
    --tables-theme-light: var(--layera-color-secondary-light, rgba(144, 19, 254, 0.1));
    --tables-theme-dark: var(--layera-color-secondary-dark, #7B1FA2);
}

.tables-theme-success {
    --tables-theme-color: var(--layera-color-success, #4CAF50);
    --tables-theme-light: var(--layera-color-success-light, rgba(76, 175, 80, 0.1));
    --tables-theme-dark: var(--layera-color-success-dark, #45A049);
}

.tables-theme-warning {
    --tables-theme-color: var(--layera-color-warning, #FF9800);
    --tables-theme-light: var(--layera-color-warning-light, rgba(255, 152, 0, 0.1));
    --tables-theme-dark: var(--layera-color-warning-dark, #F57C00);
}

.tables-theme-danger {
    --tables-theme-color: var(--layera-color-danger, #F44336);
    --tables-theme-light: var(--layera-color-danger-light, rgba(244, 67, 54, 0.1));
    --tables-theme-dark: var(--layera-color-danger-dark, #D32F2F);
}

.tables-theme-info {
    --tables-theme-color: var(--layera-color-info, #2196F3);
    --tables-theme-light: var(--layera-color-info-light, rgba(33, 150, 243, 0.1));
    --tables-theme-dark: var(--layera-color-info-dark, #1976D2);
}

.tables-theme-container {
    color: var(--tables-theme-color);
    border-color: var(--tables-theme-color);
}

.tables-theme-background {
    background: var(--tables-theme-light);
}

.tables-theme-accent {
    background: var(--tables-theme-color);
    color: var(--layera-color-white, white);
}

`;
    }

    static generateDynamicContentLoadingCSS() {
        return `
/* Dynamic Content Loading */
.tables-dynamic-content {
    position: relative;
    min-height: 300px;
}

.tables-content-loader {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--layera-color-white, white);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

.tables-content-fade-in {
    animation: tables-contentFadeIn 0.5s ease-out;
}

@keyframes tables-contentFadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.tables-simple-table {
    width: 100%;
    border-collapse: collapse;
    background: var(--layera-color-white, white);
    border-radius: var(--layera-border-radius-md, 8px);
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tables-simple-table th,
.tables-simple-table td {
    padding: var(--layera-spacing-sm, 0.75rem);
    text-align: left;
    border-bottom: 1px solid var(--layera-color-border, #e0e0e0);
}

.tables-simple-table th {
    color: var(--layera-color-white, white);
    font-weight: var(--layera-font-weight-medium, 500);
    font-size: var(--layera-font-size-sm, 0.85rem);
}

.tables-simple-table tr:last-child td {
    border-bottom: none;
}

.tables-simple-table tbody tr:hover {
    background: rgba(0, 0, 0, 0.05);
}

.tables-lazy-load {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
}

.tables-lazy-load.loaded {
    opacity: 1;
    transform: translateY(0);
}

.tables-content-placeholder {
    background: var(--layera-color-background-light, #f8f9fa);
    border-radius: var(--layera-border-radius-sm, 4px);
    padding: var(--layera-spacing-xl, 2rem);
    text-align: center;
    color: var(--layera-color-text-secondary, #666);
}

.tables-content-error {
    background: var(--layera-color-danger-light, rgba(244, 67, 54, 0.1));
    border: 1px solid var(--layera-color-danger, #F44336);
    border-radius: var(--layera-border-radius-sm, 4px);
    padding: var(--layera-spacing-md, 1rem);
    color: var(--layera-color-danger, #F44336);
    text-align: center;
}

`;
    }
}