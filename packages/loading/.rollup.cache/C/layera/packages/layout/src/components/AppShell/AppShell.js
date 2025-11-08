import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Box } from '../Box';
/**
 * AppShell - Core layout component που παρέχει unified structure
 * για όλες τις Layera εφαρμογές
 */
export const AppShell = ({ children, header, sidebar, footer, layout = 'dashboard', className = '', sidebarCollapsed = false, onSidebarToggle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    // Responsive detection
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    // Handle sidebar toggle
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSidebarToggle = () => {
        if (isMobile) {
            setIsSidebarOpen(!isSidebarOpen);
        }
        else {
            onSidebarToggle?.(!sidebarCollapsed);
        }
    };
    // Close mobile sidebar when clicking outside
    const handleBackdropClick = () => {
        if (isMobile && isSidebarOpen) {
            setIsSidebarOpen(false);
        }
    };
    // Keyboard navigation support
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && isMobile && isSidebarOpen) {
                setIsSidebarOpen(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isMobile, isSidebarOpen]);
    const shellClasses = [
        'layera-app-shell',
        `layera-app-shell--${layout}`,
        sidebarCollapsed && !isMobile ? 'sidebar-collapsed' : '',
        !sidebar ? 'no-sidebar' : '',
        className
    ].filter(Boolean).join(' ');
    const sidebarClasses = [
        'layera-layout-sidebar',
        'layera-sidebar-transition',
        isMobile && isSidebarOpen ? 'sidebar-open' : ''
    ].filter(Boolean).join(' ');
    return (_jsxs(Box, { className: shellClasses, children: [header && (_jsx("header", { className: "layera-layout-header", children: header })), sidebar && (_jsxs(_Fragment, { children: [_jsx("aside", { className: sidebarClasses, children: sidebar }), isMobile && (_jsx(Box, { className: `layera-layout-sidebar-backdrop ${isSidebarOpen ? 'active' : ''}`, onClick: handleBackdropClick, "aria-hidden": "true" }))] })), _jsx("main", { id: "main-content", className: "layera-layout-content", children: children }), footer && (_jsx("footer", { className: "layera-layout-footer", children: footer }))] }));
};
//# sourceMappingURL=AppShell.js.map