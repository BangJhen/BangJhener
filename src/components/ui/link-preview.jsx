"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  positionMode = "anchor",
  followCursorX = true,
  previewOffsetX = 0,
  previewOffsetY = 0,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const cardRef = useRef(null);
  const pointerLeft = useMotionValue(0);
  const pointerTop = useMotionValue(0);
  const lastMouseXRef = useRef(null);
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

  const getClampedPosition = (left, top) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const cardRect = cardRef.current?.getBoundingClientRect();
    const cardWidth = cardRect?.width ?? 330;
    const cardHeight = cardRect?.height ?? 220;
    const edge = 14;

    const clampedLeft = Math.min(
      Math.max(left, edge),
      viewportWidth - edge - cardWidth
    );
    const clampedTop = Math.min(
      Math.max(top, edge),
      viewportHeight - edge - cardHeight
    );

    return { x: clampedLeft, y: clampedTop };
  };

  const setCardPosition = useCallback((left, top) => {
    const { x: nextLeft, y: nextTop } = getClampedPosition(left, top);
    pointerLeft.set(nextLeft);
    pointerTop.set(nextTop);
  }, [pointerLeft, pointerTop]);

  const setCardPositionFromAnchor = useCallback((mouseX) => {
    const rootRect = rootRef.current?.getBoundingClientRect();
    if (!rootRect) return;
    const cardRect = cardRef.current?.getBoundingClientRect();
    const cardWidth = cardRect?.width ?? 330;
    const cardHeight = cardRect?.height ?? 220;
    const anchorX = rootRect.left + rootRect.width / 2;
    const anchorY = rootRect.top + rootRect.height / 2;
    const referenceX = mouseX ?? (followCursorX ? lastMouseXRef.current : null) ?? anchorX;
    const left = referenceX - cardWidth / 2 + previewOffsetX;
    const top = anchorY - cardHeight - 18 + previewOffsetY;
    setCardPosition(left, top);
  }, [followCursorX, previewOffsetX, previewOffsetY, setCardPosition]);

  const handleMove = (event) => {
    if (positionMode === "cursor") {
      const cardRect = cardRef.current?.getBoundingClientRect();
      const cardWidth = cardRect?.width ?? 330;
      const cardHeight = cardRect?.height ?? 220;
      const left = event.clientX - cardWidth / 2 + previewOffsetX;
      const top = event.clientY - cardHeight - 18 + previewOffsetY;
      setCardPosition(left, top);
      return;
    }
    lastMouseXRef.current = event.clientX;
    setCardPositionFromAnchor(event.clientX);
  };

  useEffect(() => {
    if (!isOpen) return;
    const syncWithAnchor = () => {
      setCardPositionFromAnchor();
    };
    window.addEventListener("scroll", syncWithAnchor, true);
    window.addEventListener("resize", syncWithAnchor);
    return () => {
      window.removeEventListener("scroll", syncWithAnchor, true);
      window.removeEventListener("resize", syncWithAnchor);
    };
  }, [isOpen, setCardPositionFromAnchor]);

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
        if (positionMode === "cursor") {
          handleMove(event);
          return;
        }
        lastMouseXRef.current = event.clientX;
        setCardPositionFromAnchor(event.clientX);
      }}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        setIsOpen(false);
      }}
      onFocus={() => {
        setIsOpen(true);
        setCardPositionFromAnchor();
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
