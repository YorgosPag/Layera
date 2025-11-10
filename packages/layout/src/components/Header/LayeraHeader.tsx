import React from 'react';
import { Box } from '../Box';
import { LayeraHeaderProps } from '../../types';

/**
 * LayeraHeader - KADOS Compliant Header με προκαθορισμένες κλάσεις
 * Χρησιμοποιεί μόνο layout classes με design tokens
 */
export const LayeraHeader: React.FC<LayeraHeaderProps> = ({
  title,
  subtitle,
  logo,
  navigation,
  actions,
  variant = 'standard',
  className = ''
}) => {
  // KADOS Compliant: μόνο προκαθορισμένες κλάσεις
  const headerBaseClasses = [
    'layera-flex',
    'layera-flex--align-center',
    'layera-padding--sm',
    'layera-full-width'
  ];

  // Variant-specific background
  const variantClasses = {
    minimal: 'la-bg-surface-light',
    standard: 'la-bg-primary',
    rich: 'la-bg-gradient-primary'
  };

  const headerClasses = [
    'layera-header',
    ...headerBaseClasses,
    variantClasses[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <Box className={headerClasses}>
      <Box className="layera-flex layera-full-width layera-flex--space-between layera-flex--align-center">
        {/* Left section - Logo + Title */}
        <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm">
          {logo && (
            <Box className="layera-flex layera-flex--center">
              {logo}
            </Box>
          )}

          <Box className="layera-stack">
            <h1 className="la-text-2xl la-font-bold la-text-primary la-leading-tight">{title}</h1>
            {subtitle && variant !== 'minimal' && (
              <p className="la-text-base la-text-secondary la-leading-normal">{subtitle}</p>
            )}
          </Box>
        </Box>

        {/* Center section - Navigation (για rich variant) */}
        {navigation && variant === 'rich' && (
          <Box as="nav" className="layera-flex layera-flex--center layera-flex--gap-lg" role="navigation">
            {navigation}
          </Box>
        )}

        {/* Right section - Navigation + Actions */}
        <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm">
          {/* Navigation για standard variant */}
          {navigation && variant === 'standard' && (
            <Box as="nav" className="layera-flex layera-flex--align-center layera-flex--gap-md" role="navigation">
              {navigation}
            </Box>
          )}

          {/* Actions */}
          {actions && (
            <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm">
              {actions}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};