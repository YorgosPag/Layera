import React from 'react';
import { Box } from '../Box';
import { LayeraHeaderProps } from '../../types';
import { Text, Heading } from '@layera/typography';
import { PlusIcon, LocationIcon, MenuIcon, UserIcon, SettingsIcon, SearchIcon } from '@layera/icons';
import { SquareButton } from '@layera/buttons';

/**
 * LayeraHeader - UNIFIED ARXES Compliant Header Component
 * Supports both Enterprise and Geo-Canvas modes
 * - Zero inline styles (ARXES compliant)
 * - Design tokens & CSS classes only
 * - Backward compatible with all existing usage
 */
export const LayeraHeader: React.FC<LayeraHeaderProps> = ({
  // Enterprise Mode Props
  title,
  subtitle,
  logo,
  navigation,
  actions,
  variant = 'standard',
  className = '',

  // Geo-Canvas Mode Props
  onAddContentClick,
  onTestPanelClick
}) => {

  // Geo-Canvas Mode Rendering
  if (variant === 'geo-canvas') {
    return (
      <Box data-layout="header-fixed">
        {/* Αριστερά: Πλήκτρο με + και κείμενο Geo-Canvas */}
        <Box className="layera-flex layera-flex--align-center layera-flex--gap-md">
          <SquareButton
            icon={<PlusIcon size="sm" />}
            onClick={onAddContentClick}
            aria-label="Προσθήκη περιεχομένου"
            tooltip="Προσθήκη νέου περιεχομένου"
            size="md"
          />
          <span className="layera-typography" data-size="base" data-weight="semibold" data-color="primary">Geo-Canvas</span>
          <SquareButton
            icon={<SettingsIcon size="sm" />}
            onClick={onTestPanelClick}
            aria-label="Πάνελ δοκιμών"
            tooltip="Άνοιγμα πάνελ δοκιμών"
            size="md"
          />
        </Box>

        {/* Κέντρο: 3 εικονίδια */}
        <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm">
          <SquareButton
            icon={<SearchIcon size="md" />}
            aria-label="Αναζήτηση"
            tooltip="Αναζήτηση"
            size="md"
          />
          <SquareButton
            icon={<LocationIcon size="md" />}
            aria-label="Τοποθεσία"
            tooltip="Ενεργοποίηση τοποθεσίας"
            size="md"
          />
          <SquareButton
            icon={<MenuIcon size="md" />}
            aria-label="Μενού"
            tooltip="Άνοιγμα μενού"
            size="md"
          />
        </Box>

        {/* Δεξιά: 3 εικονίδια */}
        <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm">
          <SquareButton
            icon={<SettingsIcon size="md" />}
            aria-label="Ρυθμίσεις"
            tooltip="Ρυθμίσεις εφαρμογής"
            size="md"
          />
          <SquareButton
            icon={<LocationIcon size="md" />}
            aria-label="Τοποθεσία"
            tooltip="Διαχείριση τοποθεσίας"
            size="md"
          />
          <SquareButton
            icon={<UserIcon size="md" />}
            aria-label="Χρήστης"
            tooltip="Προφίλ χρήστη"
            size="md"
          />
        </Box>
      </Box>
    );
  }

  // Enterprise Mode Rendering (original LayeraHeader functionality)
  const headerClasses = [
    'layera-header',
    className
  ].filter(Boolean).join(' ');

  return (
    <Box className={headerClasses}>
      <Box className="layera-flex layera-flex--justify-between layera-flex--align-center layera-width--full">
        {/* Left section - Logo + Title */}
        <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm">
          {logo && <Box className="layera-flex layera-flex--align-center">{logo}</Box>}
          <Box>
            <Heading as="h1" className="layera-typography" data-size="2xl" data-weight="bold" data-color="primary" data-leading="tight">
              {title}
            </Heading>
            {subtitle && variant !== 'minimal' && (
              <Text className="layera-typography" data-size="base" data-color="secondary" data-leading="normal">
                {subtitle}
              </Text>
            )}
          </Box>
        </Box>

        {/* Center section - Navigation (για rich variant) */}
        {navigation && variant === 'rich' && (
          <Box as="nav" className="layera-flex layera-flex--align-center layera-flex--justify-center layera-flex--gap-md" role="navigation">
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