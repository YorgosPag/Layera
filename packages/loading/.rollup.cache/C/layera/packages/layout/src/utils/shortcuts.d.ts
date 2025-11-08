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
import { FlexProps } from '../components/Flex';
/**
 * FlexCenter - Shortcut για center alignment
 * Αντικαθιστά 51 instances του: alignItems: 'center', justifyContent: 'center'
 */
export declare const FlexCenter: React.FC<Omit<FlexProps, 'align' | 'justify'> & {
    align?: FlexProps['align'];
    justify?: FlexProps['justify'];
}>;
/**
 * FlexBetween - Shortcut για space-between layout
 * Αντικαθιστά 9 instances του: justifyContent: 'space-between'
 */
export declare const FlexBetween: React.FC<Omit<FlexProps, 'justify'> & {
    justify?: FlexProps['justify'];
}>;
/**
 * FlexColumn - Shortcut για column layout
 * Αντικαθιστά 143 instances του: flexDirection: 'column'
 */
export declare const FlexColumn: React.FC<Omit<FlexProps, 'direction'> & {
    direction?: FlexProps['direction'];
}>;
/**
 * FlexRow - Shortcut για explicit row layout
 */
export declare const FlexRow: React.FC<Omit<FlexProps, 'direction'> & {
    direction?: FlexProps['direction'];
}>;
/**
 * FlexWrap - Shortcut για wrap layout
 */
export declare const FlexWrap: React.FC<Omit<FlexProps, 'wrap'> & {
    wrap?: FlexProps['wrap'];
}>;
/**
 * Migration helpers - για automated replacement
 */
export declare const LAYOUT_SHORTCUTS_MAP: {
    readonly "display: 'flex', alignItems: 'center', justifyContent: 'center'": "FlexCenter";
    readonly "display: 'flex', alignItems: 'center'": "FlexCenter align='center' justify='start'";
    readonly "display: 'flex', justifyContent: 'center'": "FlexCenter align='start' justify='center'";
    readonly "display: 'flex', justifyContent: 'space-between'": "FlexBetween";
    readonly "display: 'flex', justifyContent: 'space-between', alignItems: 'center'": "FlexBetween";
    readonly "display: 'flex', flexDirection: 'column'": "FlexColumn";
    readonly "display: 'flex', flexDirection: 'column', alignItems: 'center'": "FlexColumn align='center'";
    readonly "display: 'flex'": "Flex";
};
/**
 * Statistics από Φάση 1.1 Analysis
 */
export declare const SHORTCUT_USAGE_STATS: {
    readonly FlexCenter: {
        readonly pattern: "alignItems: center + justifyContent: center";
        readonly instances: 51;
        readonly replacement: "<FlexCenter>";
    };
    readonly FlexBetween: {
        readonly pattern: "justifyContent: space-between";
        readonly instances: 9;
        readonly replacement: "<FlexBetween>";
    };
    readonly FlexColumn: {
        readonly pattern: "flexDirection: column";
        readonly instances: 143;
        readonly replacement: "<FlexColumn>";
    };
};
