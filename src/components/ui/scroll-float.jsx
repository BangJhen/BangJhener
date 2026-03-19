"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./scroll-float.module.css";

gsap.registerPlugin(ScrollTrigger);

export function ScrollFloat({
  children,
  as: Tag = "p",
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.03,
  reverse = false,
}) {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split("").map((char, index) => (
      <span className={styles.char} data-scroll-char="true" key={`${char}-${index}`}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    const scroller = scrollContainerRef?.current || window;
    const charElements = element.querySelectorAll("[data-scroll-char='true']");

    const fromVars = reverse
      ? {
          willChange: "opacity, transform",
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          transformOrigin: "50% 100%",
        }
      : {
          willChange: "opacity, transform",
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: "50% 0%",
        };

    const toVars = reverse
      ? {
          opacity: 0,
          yPercent: -120,
          scaleY: 1.6,
          scaleX: 0.82,
        }
      : {
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
        };

    const context = gsap.context(() => {
      gsap.fromTo(charElements, fromVars, {
        ...toVars,
        duration: animationDuration,
        ease,
        stagger,
        scrollTrigger: {
          trigger: element,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
        },
      });
    }, element);

    return () => {
      context.revert();
    };
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger, reverse]);

  return (
    <Tag ref={containerRef} className={`${styles.scrollFloat} ${containerClassName}`}>
      <span className={`${styles.scrollFloatText} ${textClassName}`}>{splitText}</span>
    </Tag>
  );
}
