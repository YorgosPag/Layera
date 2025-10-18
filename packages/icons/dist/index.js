// src/Icon.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var ICON_SIZES = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
};
var THEME_COLORS = {
  primary: "#2563eb",
  // Κύριο μπλε Layera
  secondary: "#64748b",
  // Γκρι
  success: "#10b981",
  // Πράσινο
  warning: "#f59e0b",
  // Πορτοκαλί
  danger: "#ef4444",
  // Κόκκινο
  info: "#06b6d4",
  // Ανοιχτό μπλε
  neutral: "#6b7280"
  // Ουδέτερο γκρι
};
var VARIANT_STYLES = {
  solid: {
    fill: "currentColor",
    stroke: "none"
  },
  outline: {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2
  },
  light: {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5
  },
  duotone: {
    fill: "currentColor",
    stroke: "currentColor",
    strokeWidth: 1,
    opacity: 0.8
  }
};
var Icon = ({
  name,
  size = "md",
  variant = "outline",
  theme = "neutral",
  className = "",
  style = {},
  onClick,
  children,
  "aria-label": ariaLabel,
  title,
  ...props
}) => {
  const iconSize = typeof size === "number" ? size : ICON_SIZES[size];
  const color = THEME_COLORS[theme];
  const variantStyle = VARIANT_STYLES[variant];
  const finalStyle = {
    width: iconSize,
    height: iconSize,
    color,
    display: "inline-block",
    verticalAlign: "middle",
    flexShrink: 0,
    ...style
  };
  const classes = [
    "layera-icon",
    `layera-icon--${name}`,
    `layera-icon--${variant}`,
    `layera-icon--${theme}`,
    `layera-icon--size-${typeof size === "string" ? size : "custom"}`,
    onClick ? "layera-icon--clickable" : "",
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className: classes,
      style: finalStyle,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-label": ariaLabel || `${name} icon`,
      onClick,
      role: onClick ? "button" : "img",
      tabIndex: onClick ? 0 : void 0,
      onKeyDown: onClick ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      } : void 0,
      ...variantStyle,
      children: [
        title && /* @__PURE__ */ jsx("title", { children: title }),
        children
      ]
    }
  );
};

// src/icons/NavigationIcons.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var HomeIcon = (props) => /* @__PURE__ */ jsxs2(Icon, { name: "home", ...props, children: [
  /* @__PURE__ */ jsx2("path", { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }),
  /* @__PURE__ */ jsx2("polyline", { points: "9,22 9,12 15,12 15,22" })
] });
var MenuIcon = (props) => /* @__PURE__ */ jsxs2(Icon, { name: "menu", ...props, children: [
  /* @__PURE__ */ jsx2("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ jsx2("line", { x1: "3", y1: "12", x2: "21", y2: "12" }),
  /* @__PURE__ */ jsx2("line", { x1: "3", y1: "18", x2: "21", y2: "18" })
] });
var ArrowLeftIcon = (props) => /* @__PURE__ */ jsxs2(Icon, { name: "arrow-left", ...props, children: [
  /* @__PURE__ */ jsx2("line", { x1: "19", y1: "12", x2: "5", y2: "12" }),
  /* @__PURE__ */ jsx2("polyline", { points: "12,19 5,12 12,5" })
] });
var ArrowRightIcon = (props) => /* @__PURE__ */ jsxs2(Icon, { name: "arrow-right", ...props, children: [
  /* @__PURE__ */ jsx2("line", { x1: "5", y1: "12", x2: "19", y2: "12" }),
  /* @__PURE__ */ jsx2("polyline", { points: "12,5 19,12 12,19" })
] });
var CloseIcon = (props) => /* @__PURE__ */ jsxs2(Icon, { name: "close", ...props, children: [
  /* @__PURE__ */ jsx2("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
  /* @__PURE__ */ jsx2("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
] });
var SearchIcon = (props) => /* @__PURE__ */ jsxs2(Icon, { name: "search", ...props, children: [
  /* @__PURE__ */ jsx2("circle", { cx: "11", cy: "11", r: "8" }),
  /* @__PURE__ */ jsx2("path", { d: "M21 21l-4.35-4.35" })
] });
var SettingsIcon = (props) => /* @__PURE__ */ jsxs2(Icon, { name: "settings", ...props, children: [
  /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "12", r: "3" }),
  /* @__PURE__ */ jsx2("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" })
] });
var MoreIcon = (props) => /* @__PURE__ */ jsxs2(Icon, { name: "more", ...props, children: [
  /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "12", r: "1" }),
  /* @__PURE__ */ jsx2("circle", { cx: "19", cy: "12", r: "1" }),
  /* @__PURE__ */ jsx2("circle", { cx: "5", cy: "12", r: "1" })
] });
var RefreshIcon = (props) => /* @__PURE__ */ jsxs2(Icon, { name: "refresh", ...props, children: [
  /* @__PURE__ */ jsx2("polyline", { points: "23,4 23,10 17,10" }),
  /* @__PURE__ */ jsx2("polyline", { points: "1,20 1,14 7,14" }),
  /* @__PURE__ */ jsx2("path", { d: "M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" })
] });

// src/icons/MapIcons.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var MapIcon = (props) => /* @__PURE__ */ jsxs3(Icon, { name: "map", ...props, children: [
  /* @__PURE__ */ jsx3("polygon", { points: "1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2" }),
  /* @__PURE__ */ jsx3("line", { x1: "8", y1: "2", x2: "8", y2: "18" }),
  /* @__PURE__ */ jsx3("line", { x1: "16", y1: "6", x2: "16", y2: "22" })
] });
var LocationIcon = (props) => /* @__PURE__ */ jsxs3(Icon, { name: "location", ...props, children: [
  /* @__PURE__ */ jsx3("path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" }),
  /* @__PURE__ */ jsx3("circle", { cx: "12", cy: "10", r: "3" })
] });
var CompassIcon = (props) => /* @__PURE__ */ jsxs3(Icon, { name: "compass", ...props, children: [
  /* @__PURE__ */ jsx3("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ jsx3("polygon", { points: "16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" })
] });
var LayersIcon = (props) => /* @__PURE__ */ jsxs3(Icon, { name: "layers", ...props, children: [
  /* @__PURE__ */ jsx3("polygon", { points: "12,2 2,7 12,12 22,7" }),
  /* @__PURE__ */ jsx3("polyline", { points: "2,17 12,22 22,17" }),
  /* @__PURE__ */ jsx3("polyline", { points: "2,12 12,17 22,12" })
] });
var RouteIcon = (props) => /* @__PURE__ */ jsxs3(Icon, { name: "route", ...props, children: [
  /* @__PURE__ */ jsx3("circle", { cx: "6", cy: "19", r: "3" }),
  /* @__PURE__ */ jsx3("path", { d: "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" }),
  /* @__PURE__ */ jsx3("circle", { cx: "18", cy: "5", r: "3" })
] });
var ZoomInIcon = (props) => /* @__PURE__ */ jsxs3(Icon, { name: "zoom-in", ...props, children: [
  /* @__PURE__ */ jsx3("circle", { cx: "11", cy: "11", r: "8" }),
  /* @__PURE__ */ jsx3("line", { x1: "8", y1: "11", x2: "14", y2: "11" }),
  /* @__PURE__ */ jsx3("line", { x1: "11", y1: "8", x2: "11", y2: "14" }),
  /* @__PURE__ */ jsx3("path", { d: "M21 21l-4.35-4.35" })
] });
var ZoomOutIcon = (props) => /* @__PURE__ */ jsxs3(Icon, { name: "zoom-out", ...props, children: [
  /* @__PURE__ */ jsx3("circle", { cx: "11", cy: "11", r: "8" }),
  /* @__PURE__ */ jsx3("line", { x1: "8", y1: "11", x2: "14", y2: "11" }),
  /* @__PURE__ */ jsx3("path", { d: "M21 21l-4.35-4.35" })
] });
var CrosshairsIcon = (props) => /* @__PURE__ */ jsxs3(Icon, { name: "crosshairs", ...props, children: [
  /* @__PURE__ */ jsx3("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ jsx3("line", { x1: "22", y1: "12", x2: "18", y2: "12" }),
  /* @__PURE__ */ jsx3("line", { x1: "6", y1: "12", x2: "2", y2: "12" }),
  /* @__PURE__ */ jsx3("line", { x1: "12", y1: "6", x2: "12", y2: "2" }),
  /* @__PURE__ */ jsx3("line", { x1: "12", y1: "22", x2: "12", y2: "18" })
] });
var GlobeIcon = (props) => /* @__PURE__ */ jsxs3(Icon, { name: "globe", ...props, children: [
  /* @__PURE__ */ jsx3("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ jsx3("line", { x1: "2", y1: "12", x2: "22", y2: "12" }),
  /* @__PURE__ */ jsx3("path", { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" })
] });
var AlertTriangleIcon = (props) => /* @__PURE__ */ jsxs3(Icon, { name: "alert-triangle", ...props, children: [
  /* @__PURE__ */ jsx3("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }),
  /* @__PURE__ */ jsx3("line", { x1: "12", y1: "9", x2: "12", y2: "13" }),
  /* @__PURE__ */ jsx3("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })
] });
var SatelliteIcon = (props) => /* @__PURE__ */ jsxs3(Icon, { name: "satellite", ...props, children: [
  /* @__PURE__ */ jsx3("path", { d: "M13 7L9 3 5 7l4 4" }),
  /* @__PURE__ */ jsx3("path", { d: "M17 11L13 7l-4 4 4 4" }),
  /* @__PURE__ */ jsx3("path", { d: "M19 13l-4-4 4-4" }),
  /* @__PURE__ */ jsx3("circle", { cx: "12", cy: "12", r: "2" })
] });

// src/icons/DeviceIcons.tsx
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var PhoneIcon = (props) => /* @__PURE__ */ jsx4(Icon, { name: "phone", ...props, children: /* @__PURE__ */ jsx4("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) });
var TabletIcon = (props) => /* @__PURE__ */ jsxs4(Icon, { name: "tablet", ...props, children: [
  /* @__PURE__ */ jsx4("rect", { x: "4", y: "2", width: "16", height: "20", rx: "2", ry: "2" }),
  /* @__PURE__ */ jsx4("line", { x1: "12", y1: "18", x2: "12.01", y2: "18" })
] });
var MonitorIcon = (props) => /* @__PURE__ */ jsxs4(Icon, { name: "monitor", ...props, children: [
  /* @__PURE__ */ jsx4("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", ry: "2" }),
  /* @__PURE__ */ jsx4("line", { x1: "8", y1: "21", x2: "16", y2: "21" }),
  /* @__PURE__ */ jsx4("line", { x1: "12", y1: "17", x2: "12", y2: "21" })
] });
var LaptopIcon = (props) => /* @__PURE__ */ jsxs4(Icon, { name: "laptop", ...props, children: [
  /* @__PURE__ */ jsx4("line", { x1: "22", y1: "19", x2: "2", y2: "19" }),
  /* @__PURE__ */ jsx4("rect", { x: "5", y: "6", width: "14", height: "10", rx: "1", ry: "1" })
] });
var SmartphoneIcon = (props) => /* @__PURE__ */ jsxs4(Icon, { name: "smartphone", ...props, children: [
  /* @__PURE__ */ jsx4("rect", { x: "5", y: "2", width: "14", height: "20", rx: "2", ry: "2" }),
  /* @__PURE__ */ jsx4("line", { x1: "12", y1: "18", x2: "12.01", y2: "18" })
] });
var WatchIcon = (props) => /* @__PURE__ */ jsxs4(Icon, { name: "watch", ...props, children: [
  /* @__PURE__ */ jsx4("circle", { cx: "12", cy: "12", r: "7" }),
  /* @__PURE__ */ jsx4("polyline", { points: "12,9 12,12 13.5,13.5" }),
  /* @__PURE__ */ jsx4("path", { d: "M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.37 3.83" })
] });
var TvIcon = (props) => /* @__PURE__ */ jsxs4(Icon, { name: "tv", ...props, children: [
  /* @__PURE__ */ jsx4("rect", { x: "2", y: "7", width: "20", height: "15", rx: "2", ry: "2" }),
  /* @__PURE__ */ jsx4("polyline", { points: "17,2 12,7 7,2" })
] });
var RotateIcon = (props) => /* @__PURE__ */ jsxs4(Icon, { name: "rotate", ...props, children: [
  /* @__PURE__ */ jsx4("polyline", { points: "23,4 23,10 17,10" }),
  /* @__PURE__ */ jsx4("path", { d: "M20.49 9A9 9 0 0 0 5.64 5.64L1 10" }),
  /* @__PURE__ */ jsx4("polyline", { points: "1,20 1,14 7,14" }),
  /* @__PURE__ */ jsx4("path", { d: "M3.51 15a9 9 0 0 0 14.85 3.36L23 14" })
] });

// src/icons/ActionIcons.tsx
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
var SaveIcon = (props) => /* @__PURE__ */ jsxs5(Icon, { name: "save", ...props, children: [
  /* @__PURE__ */ jsx5("path", { d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" }),
  /* @__PURE__ */ jsx5("polyline", { points: "17,21 17,13 7,13 7,21" }),
  /* @__PURE__ */ jsx5("polyline", { points: "7,3 7,8 15,8" })
] });
var EditIcon = (props) => /* @__PURE__ */ jsxs5(Icon, { name: "edit", ...props, children: [
  /* @__PURE__ */ jsx5("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
  /* @__PURE__ */ jsx5("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })
] });
var DeleteIcon = (props) => /* @__PURE__ */ jsxs5(Icon, { name: "delete", ...props, children: [
  /* @__PURE__ */ jsx5("polyline", { points: "3,6 5,6 21,6" }),
  /* @__PURE__ */ jsx5("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }),
  /* @__PURE__ */ jsx5("line", { x1: "10", y1: "11", x2: "10", y2: "17" }),
  /* @__PURE__ */ jsx5("line", { x1: "14", y1: "11", x2: "14", y2: "17" })
] });
var PlusIcon = (props) => /* @__PURE__ */ jsxs5(Icon, { name: "plus", ...props, children: [
  /* @__PURE__ */ jsx5("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
  /* @__PURE__ */ jsx5("line", { x1: "5", y1: "12", x2: "19", y2: "12" })
] });
var DownloadIcon = (props) => /* @__PURE__ */ jsxs5(Icon, { name: "download", ...props, children: [
  /* @__PURE__ */ jsx5("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
  /* @__PURE__ */ jsx5("polyline", { points: "7,10 12,15 17,10" }),
  /* @__PURE__ */ jsx5("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
] });
var UploadIcon = (props) => /* @__PURE__ */ jsxs5(Icon, { name: "upload", ...props, children: [
  /* @__PURE__ */ jsx5("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
  /* @__PURE__ */ jsx5("polyline", { points: "17,8 12,3 7,8" }),
  /* @__PURE__ */ jsx5("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
] });
var CopyIcon = (props) => /* @__PURE__ */ jsxs5(Icon, { name: "copy", ...props, children: [
  /* @__PURE__ */ jsx5("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }),
  /* @__PURE__ */ jsx5("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })
] });
var ShareIcon = (props) => /* @__PURE__ */ jsxs5(Icon, { name: "share", ...props, children: [
  /* @__PURE__ */ jsx5("circle", { cx: "18", cy: "5", r: "3" }),
  /* @__PURE__ */ jsx5("circle", { cx: "6", cy: "12", r: "3" }),
  /* @__PURE__ */ jsx5("circle", { cx: "18", cy: "19", r: "3" }),
  /* @__PURE__ */ jsx5("line", { x1: "8.59", y1: "13.51", x2: "15.42", y2: "17.49" }),
  /* @__PURE__ */ jsx5("line", { x1: "15.41", y1: "6.51", x2: "8.59", y2: "10.49" })
] });
var PrintIcon = (props) => /* @__PURE__ */ jsxs5(Icon, { name: "print", ...props, children: [
  /* @__PURE__ */ jsx5("polyline", { points: "6,9 6,2 18,2 18,9" }),
  /* @__PURE__ */ jsx5("path", { d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" }),
  /* @__PURE__ */ jsx5("rect", { x: "6", y: "14", width: "12", height: "8" })
] });
var UndoIcon = (props) => /* @__PURE__ */ jsxs5(Icon, { name: "undo", ...props, children: [
  /* @__PURE__ */ jsx5("polyline", { points: "1,4 1,10 7,10" }),
  /* @__PURE__ */ jsx5("path", { d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10" })
] });
var RedoIcon = (props) => /* @__PURE__ */ jsxs5(Icon, { name: "redo", ...props, children: [
  /* @__PURE__ */ jsx5("polyline", { points: "23,4 23,10 17,10" }),
  /* @__PURE__ */ jsx5("path", { d: "M20.49 15a9 9 0 1 1-2.13-9.36L23 10" })
] });
export {
  AlertTriangleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseIcon,
  CompassIcon,
  CopyIcon,
  CrosshairsIcon,
  DeleteIcon,
  DownloadIcon,
  EditIcon,
  GlobeIcon,
  HomeIcon,
  Icon,
  LaptopIcon,
  LayersIcon,
  LocationIcon,
  MapIcon,
  MenuIcon,
  MonitorIcon,
  MoreIcon,
  PhoneIcon,
  PlusIcon,
  PrintIcon,
  RedoIcon,
  RefreshIcon,
  RotateIcon,
  RouteIcon,
  SatelliteIcon,
  SaveIcon,
  SearchIcon,
  SettingsIcon,
  ShareIcon,
  SmartphoneIcon,
  TabletIcon,
  TvIcon,
  UndoIcon,
  UploadIcon,
  WatchIcon,
  ZoomInIcon,
  ZoomOutIcon
};
