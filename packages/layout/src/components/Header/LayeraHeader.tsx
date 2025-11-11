import React from 'react';
import { Box } from '../Box';
import { LayeraHeaderProps } from '../../types';
import { Text, Heading } from '@layera/typography';

/**
 * LayeraHeader - ARXES Compliant Header με προκαθορισμένες κλάσεις
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
  // ARXES Compliant: μόνο προκαθορισμένες κλάσεις - Enterprise CSS
  const headerClasses = [
    'layera-header',
    className
  ].filter(Boolean).join(' ');

  return (
    <Box className={headerClasses}>
      <Box className="layera-layout" style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
        {/* Left section - Logo + Title */}
        <Box className="layera-layout" style={{flexDirection: 'row', alignItems: 'center', gap: '0.5rem'}}>
          {logo && (
            <Box className="layera-layout" style={{alignItems: 'center', justifyContent: 'center'}}>
              {logo}
            </Box>
          )}

          <Box className="layera-layout">
            <Heading as="h1" className="layera-typography" data-size="2xl" data-weight="bold" data-color="primary" data-leading="tight" style={{margin: 0}}>
              {title}
            </Heading>
            {subtitle && variant !== 'minimal' && (
              <Text className="layera-typography" data-size="base" data-color="secondary" data-leading="normal" style={{margin: 0}}>
                {subtitle}
              </Text>
            )}
          </Box>
        </Box>

        {/* Center section - Navigation (για rich variant) */}
        {navigation && variant === 'rich' && (
          <Box as="nav" className="layera-layout" style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '1rem'}} role="navigation">
            {navigation}
          </Box>
        )}

        {/* Right section - Navigation + Actions */}
        <Box className="layera-layout" style={{flexDirection: 'row', alignItems: 'center', gap: '0.5rem'}}>
          {/* Navigation για standard variant */}
          {navigation && variant === 'standard' && (
            <Box as="nav" className="layera-layout" style={{flexDirection: 'row', alignItems: 'center', gap: '0.75rem'}} role="navigation">
              {navigation}
            </Box>
          )}

          {/* Actions */}
          {actions && (
            <Box className="layera-layout" style={{flexDirection: 'row', alignItems: 'center', gap: '0.5rem'}}>
              {actions}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};