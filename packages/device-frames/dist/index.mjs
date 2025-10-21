// src/index.tsx
import React from "react";
import { jsx } from "react/jsx-runtime";
var DeviceFrame = ({
  device,
  color = "black",
  landscape = false,
  children,
  className
}) => {
  const [DeviceFrameset, setDeviceFrameset] = React.useState(null);
  React.useEffect(() => {
    import("react-device-frameset").then((module) => {
      setDeviceFrameset(() => module.default || module);
    });
  }, []);
  if (!DeviceFrameset) {
    return /* @__PURE__ */ jsx("div", { className, children });
  }
  return React.createElement(DeviceFrameset, {
    device,
    color,
    landscape,
    className
  }, children);
};
var src_default = DeviceFrame;
export {
  DeviceFrame,
  src_default as default
};
