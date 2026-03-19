"use client";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export const Lens = ({
  children,
  zoomFactor = 1.5,
  lensSize = 170,
  isStatic = false,
  position = { x: 200, y: 150 },
  hovering,
  setHovering,
  className = "",
  hideBaseUnderLens = false,
}) => {
  const containerRef = useRef(null);

  const [localIsHovering, setLocalIsHovering] = useState(false);

  const isHovering = hovering !== undefined ? hovering : localIsHovering;
  const setIsHovering = setHovering || setLocalIsHovering;

  // const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 100, y: 100 });

  const activePosition = isStatic ? position : mousePosition;
  const shouldMaskBase = hideBaseUnderLens && (isStatic || isHovering);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const getLensOverlayStyle = (pos) => ({
    clipPath: `circle(${lensSize / 2}px at ${pos.x}px ${pos.y}px)`,
    WebkitClipPath: `circle(${lensSize / 2}px at ${pos.x}px ${pos.y}px)`,
    pointerEvents: "none",
    background: "transparent",
  });

  const getBaseMaskStyle = (pos) => ({
    maskImage: `radial-gradient(circle ${lensSize / 2}px at ${pos.x}px ${pos.y}px, transparent 96%, black 100%)`,
    WebkitMaskImage: `radial-gradient(circle ${lensSize / 2}px at ${pos.x}px ${pos.y}px, transparent 96%, black 100%)`,
  });

  const getZoomLayerStyle = (pos) => ({
    transform: `translate(${-pos.x * (zoomFactor - 1)}px, ${-pos.y * (zoomFactor - 1)}px) scale(${zoomFactor})`,
    transformOrigin: "top left",
    background: "transparent",
  });

  return (
    <div
      ref={containerRef}
      className={`relative inline-block z-20 ${className}`}
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}>
      <div style={shouldMaskBase ? getBaseMaskStyle(activePosition) : undefined}>{children}</div>
      {isStatic ? (
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0"
            style={{
              ...getLensOverlayStyle(activePosition),
              transformOrigin: `${activePosition.x}px ${activePosition.y}px`,
            }}>
            <div
              className="absolute inset-0"
              style={getZoomLayerStyle(activePosition)}>
              {children}
            </div>
          </motion.div>
        </div>
      ) : (
        <AnimatePresence>
          {isHovering && (
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0"
                style={{
                  ...getLensOverlayStyle(mousePosition),
                  transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
                  zIndex: 50,
                }}>
                <div
                  className="absolute inset-0"
                  style={getZoomLayerStyle(mousePosition)}>
                  {children}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
