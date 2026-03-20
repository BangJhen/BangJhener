"use client";
import { useScroll, useTransform, useMotionValueEvent, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({
  data,
  title = "My Journey",
  description = "A timeline of my growth, milestones, and impact.",
}) => {
  const headerRef = useRef(null);
  const ref = useRef(null);
  const markerRefs = useRef([]);
  const [height, setHeight] = useState(0);
  const [markerPositions, setMarkerPositions] = useState([]);
  const [lineProgressPx, setLineProgressPx] = useState(0);

  useEffect(() => {
    const updateMeasurements = () => {
      if (!ref.current) return;
      const containerRect = ref.current.getBoundingClientRect();
      setHeight(containerRect.height);
      setMarkerPositions(
        data.map((_, index) => {
          const marker = markerRefs.current[index];
          if (!marker) return Number.POSITIVE_INFINITY;
          const markerRect = marker.getBoundingClientRect();
          return markerRect.top - containerRect.top + markerRect.height / 2;
        }),
      );
    };

    updateMeasurements();
    window.addEventListener("resize", updateMeasurements);
    return () => window.removeEventListener("resize", updateMeasurements);
  }, [data]);

  const { scrollYProgress: headerScrollProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });

  const titleYTransform = useTransform(headerScrollProgress, [0, 1], [0, 220]);
  const titleScaleTransform = useTransform(headerScrollProgress, [0, 1], [1, 0.78]);
  const titleOpacityTransform = useTransform(headerScrollProgress, [0, 1], [1, 0.6]);
  const scrollHintOpacityTransform = useTransform(headerScrollProgress, [0, 0.7], [1, 0]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 10%", "end 50%"],
  });
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setLineProgressPx(latest * height);
  });

  return (
    <div className="w-full font-sans md:px-10">
      <motion.div
        ref={headerRef}
        style={{
          y: titleYTransform,
          scale: titleScaleTransform,
          opacity: titleOpacityTransform,
          transformOrigin: "center top",
        }}
        className="max-w-7xl mx-auto min-h-[70vh] py-20 px-4 md:px-8 lg:px-10 text-center flex flex-col items-center justify-center">
        <h2 className="text-5xl md:text-7xl mb-5 text-white font-bold tracking-tight">
          {title}
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-3xl mx-auto">
          {description}
        </p>
        <motion.p
          style={{ opacity: scrollHintOpacityTransform }}
          className="mt-12 text-xs md:text-sm uppercase tracking-[0.2em] text-cyan-300/80">
          Scroll down to explore the journey
        </motion.p>
      </motion.div>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-20 md:gap-10">
            <div
              className="flex flex-col md:flex-row z-40 items-center self-start max-w-xs lg:max-w-sm md:w-full">
              <div
                className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-transparent flex items-center justify-center">
                <div
                  ref={(element) => {
                    markerRefs.current[index] = element;
                  }}
                  className={`h-4 w-4 rounded-full border p-2 transition-all duration-500 ${
                    lineProgressPx >= (markerPositions[index] ?? Number.POSITIVE_INFINITY)
                      ? "bg-cyan-300 border-cyan-100 shadow-[0_0_14px_rgba(103,232,249,0.85)]"
                      : "bg-slate-500/70 border-cyan-200/35"
                  }`}
                />
              </div>
              <h3
                className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-cyan-200/80">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3
                className="md:hidden block text-2xl mb-4 text-left font-bold text-cyan-200/80">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-slate-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]">
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-cyan-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full" />
        </div>
      </div>
    </div>
  );
};
