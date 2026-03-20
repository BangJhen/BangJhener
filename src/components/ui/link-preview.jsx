"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import styles from "./link-preview.module.css";

export function LinkPreview({
  url,
  children,
  title = "Preview",
  description = "Open external link",
  imageSrc = "",
  imageAlt = "Link preview",
  showDetails,
  className = "",
  cardClassName = "",
  previewOffsetX = 165,
  previewOffsetY = 210,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const cardRef = useRef(null);
  const pointerLeft = useMotionValue(0);
  const pointerTop = useMotionValue(0);
  const springPointerLeft = useSpring(pointerLeft, { stiffness: 300, damping: 30, mass: 0.45 });
  const springPointerTop = useSpring(pointerTop, { stiffness: 300, damping: 30, mass: 0.45 });

  const domain = useMemo(() => {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return url;
    }
  }, [url]);

  const shouldShowDetails = showDetails ?? !imageSrc;
  const isMounted = typeof window !== "undefined";

  const getClampedPosition = (x, y) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const cardRect = cardRef.current?.getBoundingClientRect();
    const cardWidth = cardRect?.width ?? 330;
    const cardHeight = cardRect?.height ?? 220;
    const edge = 14;

    const clampedX = Math.min(
      Math.max(x, edge + cardWidth / 2),
      viewportWidth - edge - cardWidth / 2
    );

    const preferredTopAnchor = y - 18;
    const minTopAnchor = edge + cardHeight;
    const maxTopAnchor = viewportHeight - edge;
    const clampedY = Math.min(
      Math.max(preferredTopAnchor, minTopAnchor),
      maxTopAnchor
    );

    return { x: clampedX, y: clampedY };
  };

  const setCardPosition = (x, y) => {
    const adjustedX = x - previewOffsetX;
    const adjustedY = y - previewOffsetY;
    const { x: nextLeft, y: nextTop } = getClampedPosition(adjustedX, adjustedY);
    pointerLeft.set(nextLeft);
    pointerTop.set(nextTop);
  };

  const handleMove = (event) => {
    setCardPosition(event.clientX, event.clientY);
  };

  const previewCard = (
    <AnimatePresence>
      {isOpen ? (
        <motion.span
          ref={cardRef}
          className={cn(styles.card, cardClassName)}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          style={{
            left: springPointerLeft,
            top: springPointerTop,
          }}
          transition={{ duration: 0.26, ease: [0.22, 0.9, 0.22, 1] }}>
          {imageSrc ? (
            <span className={styles.previewFrame}>
              <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 768px) 84vw, 330px" className={styles.previewImage} />
              <span className={styles.previewGlow} aria-hidden="true" />
            </span>
          ) : null}
          {shouldShowDetails ? (
            <>
              <span className={styles.badge}>Astral Link</span>
              <span className={styles.title}>{title}</span>
              <span className={styles.description}>{description}</span>
              <span className={styles.footer}>
                <span className={styles.domain}>{domain}</span>
                <span className={styles.arrow}>↗</span>
              </span>
            </>
          ) : null}
        </motion.span>
      ) : null}
    </AnimatePresence>
  );

  return (
    <span
      ref={rootRef}
      className={styles.root}
      onMouseEnter={(event) => {
        setIsOpen(true);
        handleMove(event);
      }}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        setIsOpen(false);
      }}
      onFocus={() => {
        setIsOpen(true);
      }}
      onBlur={() => {
        setIsOpen(false);
      }}>
      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        className={cn(styles.link, className)}>
        {children}
      </a>

      {isMounted ? createPortal(previewCard, document.body) : null}
    </span>
  );
}
