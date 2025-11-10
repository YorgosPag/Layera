/**
 * Layout Shortcuts - Utility functions για common patterns
 *
 * Αντικαθιστά 203 hardcoded layout instances χρησιμοποιώντας
 * το υπάρχον @layera/layout Flex component
 *
 * ΣΗΜΑΝΤΙΚΟ: Αυτά είναι shortcuts, όχι νέα components!
 * Χρησιμοποιούν το υπάρχον Flex component ως base.
 */

import React from 'react';
import { Flex, FlexProps } from '../components/Flex';

/**
 * FlexCenter - Shortcut για center alignment
 * Αντικαθιστά 51 instances του: alignItems: 'center', justifyContent: 'center'
 */
export const FlexCenter: React.FC<Omit<FlexProps, 'align' | 'justify'> & {
  align?: FlexProps['align'];
  justify?: FlexProps['justify'];
}> = ({ align = 'center', justify = 'center', ...props }) => {
  return <Flex align={align} justify={justify} {...props} />;
};

/**
 * FlexBetween - Shortcut για space-between layout
 * Αντικαθιστά 9 instances του: justifyContent: 'space-between'
 */
export const FlexBetween: React.FC<Omit<FlexProps, 'justify'> & {
  justify?: FlexProps['justify'];
}> = ({ justify = 'space-between', align = 'center', ...props }) => {
  return <Flex justify={justify} align={align} {...props} />;
};

/**
 * FlexColumn - Shortcut για column layout
 * Αντικαθιστά 143 instances του: flexDirection: 'column'
 */
export const FlexColumn: React.FC<Omit<FlexProps, 'direction'> & {
  direction?: FlexProps['direction'];
}> = ({ direction = 'column', ...props }) => {
  return <Flex direction={direction} {...props} />;
};

/**
 * FlexRow - Shortcut για explicit row layout
 */
export const FlexRow: React.FC<Omit<FlexProps, 'direction'> & {
  direction?: FlexProps['direction'];
}> = ({ direction = 'row', ...props }) => {
  return <Flex direction={direction} {...props} />;
};

/**
 * FlexWrap - Shortcut για wrap layout
 */
export const FlexWrap: React.FC<Omit<FlexProps, 'wrap'> & {
  wrap?: FlexProps['wrap'];
}> = ({ wrap = 'wrap', ...props }) => {
  return <Flex wrap={wrap} {...props} />;
};

