import React$1 from 'react';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
type IconVariant = 'solid' | 'outline' | 'light' | 'duotone';
type IconTheme = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
interface BaseIconProps {
    size?: IconSize;
    variant?: IconVariant;
    theme?: IconTheme;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
    'aria-label'?: string;
    title?: string;
}
interface IconDefinition {
    name: string;
    category: string;
    tags: string[];
    variants: {
        solid?: string;
        outline?: string;
        light?: string;
        duotone?: string;
    };
}
type IconCategory = 'navigation' | 'actions' | 'interface' | 'maps' | 'devices' | 'communication' | 'files' | 'media' | 'weather' | 'social' | 'business' | 'system';

interface IconProps extends BaseIconProps {
    name: string;
    children?: React$1.ReactNode;
}
/**
 * Layera Icon Component
 *
 * Ενιαίο component για όλα τα εικονίδια στο Layera ecosystem
 * Υποστηρίζει διαφορετικά μεγέθη, variants και θέματα
 *
 * @example
 * <Icon name="home" size="md" variant="outline" theme="primary" />
 * <Icon name="map" size={24} variant="solid" theme="success" />
 */
declare const Icon: React$1.FC<IconProps>;

declare const HomeIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const MenuIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const ArrowLeftIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const ArrowRightIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const CloseIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const SearchIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const SettingsIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const MoreIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const RefreshIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;

declare const MapIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const LocationIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const CompassIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const LayersIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const RouteIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const ZoomInIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const ZoomOutIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const CrosshairsIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const GlobeIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const AlertTriangleIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const SatelliteIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;

declare const PhoneIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const TabletIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const MonitorIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const LaptopIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const SmartphoneIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const WatchIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const TvIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const RotateIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;

declare const SaveIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const EditIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const DeleteIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const PlusIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const DownloadIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const UploadIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const CopyIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const ShareIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const PrintIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const UndoIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const RedoIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const CheckIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;
declare const WorkIcon: React$1.FC<Omit<IconProps, 'name' | 'children'>>;

export { AlertTriangleIcon, ArrowLeftIcon, ArrowRightIcon, type BaseIconProps, CheckIcon, CloseIcon, CompassIcon, CopyIcon, CrosshairsIcon, DeleteIcon, DownloadIcon, EditIcon, GlobeIcon, HomeIcon, Icon, type IconCategory, type IconDefinition, type IconSize, type IconTheme, type IconVariant, LaptopIcon, LayersIcon, LocationIcon, MapIcon, MenuIcon, MonitorIcon, MoreIcon, PhoneIcon, PlusIcon, PrintIcon, RedoIcon, RefreshIcon, RotateIcon, RouteIcon, SatelliteIcon, SaveIcon, SearchIcon, SettingsIcon, ShareIcon, SmartphoneIcon, TabletIcon, TvIcon, UndoIcon, UploadIcon, WatchIcon, WorkIcon, ZoomInIcon, ZoomOutIcon };
