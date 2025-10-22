'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/DraggableFAB.tsx
var DraggableFAB = ({
  children,
  onClick,
  size = "md",
  position = "fixed",
  initialPosition = { x: 15, y: 15 },
  constrainToViewport = true,
  viewportSelector = "[data-viewport-frame], #geo-viewport",
  className = "",
  style = {},
  "data-testid": testId,
  "aria-label": ariaLabel = "Floating Action Button",
  title
}) => {
  const frameRef = react.useRef(null);
  const [fabPos, setFabPos] = react.useState(() => {
    if (initialPosition.right !== void 0 || initialPosition.bottom !== void 0) {
      const x = initialPosition.right !== void 0 ? typeof window !== "undefined" ? window.innerWidth - initialPosition.right - getSizePixels(size) : 15 : initialPosition.x ?? 15;
      const y = initialPosition.bottom !== void 0 ? typeof window !== "undefined" ? window.innerHeight - initialPosition.bottom - getSizePixels(size) : 15 : initialPosition.y ?? 15;
      return { x, y };
    }
    return { x: initialPosition.x ?? 15, y: initialPosition.y ?? 15 };
  });
  const startRef = react.useRef(null);
  const getSizePixels = (sizeStr) => {
    switch (sizeStr) {
      case "sm":
        return 48;
      case "md":
        return 56;
      case "lg":
        return 64;
      default:
        return 56;
    }
  };
  const BTN_SIZE = getSizePixels(size);
  const MARGIN = 15;
  react.useEffect(() => {
    if (!constrainToViewport || position === "fixed") return;
    const clamp = () => {
      const frame = document.querySelector(viewportSelector);
      if (!frame) return;
      const rect = frame.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const maxX = Math.max(0, rect.width - BTN_SIZE - MARGIN);
      const maxY = Math.max(0, rect.height - BTN_SIZE - MARGIN);
      const x = Math.max(MARGIN, Math.min(maxX, fabPos.x));
      const y = Math.max(MARGIN, Math.min(maxY, fabPos.y));
      if (x !== fabPos.x || y !== fabPos.y) {
        setFabPos({ x, y });
      }
    };
    clamp();
    window.addEventListener("resize", clamp);
    const visualViewport = window.visualViewport;
    visualViewport?.addEventListener("resize", clamp);
    visualViewport?.addEventListener("scroll", clamp);
    return () => {
      window.removeEventListener("resize", clamp);
      visualViewport?.removeEventListener("resize", clamp);
      visualViewport?.removeEventListener("scroll", clamp);
    };
  }, [fabPos.x, fabPos.y, constrainToViewport, position, viewportSelector, BTN_SIZE]);
  const handleFabPointerDown = (e) => {
    if (position === "fixed") return;
    const frame = document.querySelector(viewportSelector);
    if (!frame) return;
    frameRef.current = frame;
    const rect = frame.getBoundingClientRect();
    e.currentTarget.setPointerCapture(e.pointerId);
    startRef.current = { x: e.clientX, y: e.clientY, px: fabPos.x, py: fabPos.y };
    const onMove = (ev) => {
      if (!startRef.current || !rect) return;
      const dx = ev.clientX - startRef.current.x;
      const dy = ev.clientY - startRef.current.y;
      const maxX = Math.max(0, rect.width - BTN_SIZE - MARGIN);
      const maxY = Math.max(0, rect.height - BTN_SIZE - MARGIN);
      const nx = Math.max(MARGIN, Math.min(maxX, startRef.current.px + dx));
      const ny = Math.max(MARGIN, Math.min(maxY, startRef.current.py + dy));
      setFabPos({ x: nx, y: ny });
    };
    const onUp = () => {
      startRef.current = null;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };
  const computedStyle = {
    position: position === "fixed" ? "absolute" : "absolute",
    ...position === "fixed" ? {
      right: typeof initialPosition.right === "number" ? `${initialPosition.right}px` : void 0,
      bottom: typeof initialPosition.bottom === "number" ? `${initialPosition.bottom}px` : void 0
    } : {
      left: `${fabPos.x}px`,
      top: `${fabPos.y}px`
    },
    width: BTN_SIZE,
    height: BTN_SIZE,
    borderRadius: "50%",
    background: "var(--layera-bg-success, #22C55E)",
    border: "2px solid white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: position === "fixed" ? "pointer" : "grab",
    zIndex: 9999,
    userSelect: "none",
    touchAction: "none",
    transition: position === "fixed" ? "all 0.2s ease" : "none",
    ...style
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      onPointerDown: handleFabPointerDown,
      onClick,
      "aria-label": ariaLabel,
      title,
      "data-testid": testId,
      className,
      style: computedStyle,
      children
    }
  );
};

exports.DraggableFAB = DraggableFAB;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map