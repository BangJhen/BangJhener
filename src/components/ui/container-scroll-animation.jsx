"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";

export const ContainerScroll = ({
  titleComponent,
  children,
  compact = false,
  className = "",
  cardClassName = "",
  innerClassName = "",
  mobileBreakpoint = 768,
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= mobileBreakpoint);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [mobileBreakpoint]);

  const scaleDimensions = () => {
    if (compact) {
      return isMobile ? [0.88, 1.04] : [0.94, 1.08];
    }
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], compact ? [12, 0] : [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], compact ? [0, -44] : [0, -100]);

  return (
    <div
      className={compact ? `relative w-full h-full ${className}` : `h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20 ${className}`}
      ref={containerRef}>
      <div
        className={compact ? "w-full h-full relative" : "py-10 md:py-40 w-full relative"}
        style={{
          perspective: "1000px",
        }}>
        {titleComponent ? <Header translate={translate} titleComponent={titleComponent} /> : null}
        <Card rotate={rotate} translate={translate} scale={scale} compact={compact} className={cardClassName} innerClassName={innerClassName}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center">
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
  compact = false,
  className = "",
  innerClassName = "",
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className={compact ? `mx-auto w-full min-h-[14rem] ${className}` : `max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl ${className}`}>
      <div
        className={compact ? `h-full w-full overflow-hidden ${innerClassName}` : ` h-full w-full  overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4 ${innerClassName}`}>
        {children}
      </div>
    </motion.div>
  );
};
