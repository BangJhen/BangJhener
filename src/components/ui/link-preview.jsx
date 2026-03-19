"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
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
}) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const shiftX = useMotionValue(0);
  const shiftY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 220, damping: 24, mass: 0.5 });
  const springRotateY = useSpring(rotateY, { stiffness: 220, damping: 24, mass: 0.5 });
  const springShiftX = useSpring(shiftX, { stiffness: 230, damping: 22, mass: 0.45 });
  const springShiftY = useSpring(shiftY, { stiffness: 230, damping: 22, mass: 0.45 });

  const domain = useMemo(() => {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return url;
    }
  }, [url]);

  const shouldShowDetails = showDetails ?? !imageSrc;

  const resetMotion = () => {
    rotateX.set(0);
    rotateY.set(0);
    shiftX.set(0);
    shiftY.set(0);
  };

  const handleMove = (event) => {
    const rect = rootRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

    rotateY.set(relativeX * 12);
    rotateX.set(relativeY * -10);
    shiftX.set(relativeX * 12);
    shiftY.set(relativeY * 8);
  };

  return (
    <span
      ref={rootRef}
      className={styles.root}
      onMouseEnter={() => setIsOpen(true)}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        setIsOpen(false);
        resetMotion();
      }}
      onFocus={() => setIsOpen(true)}
      onBlur={() => {
        setIsOpen(false);
        resetMotion();
      }}>
      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        className={cn(styles.link, className)}>
        {children}
      </a>

      <AnimatePresence>
        {isOpen ? (
          <motion.span
            className={cn(styles.card, cardClassName)}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            style={{
              rotateX: springRotateX,
              rotateY: springRotateY,
              x: springShiftX,
              y: springShiftY,
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
    </span>
  );
}
