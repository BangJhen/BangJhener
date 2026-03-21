"use client";

import { useEffect, useState } from "react";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";

export default function AboutPixelatedCanvas({ className }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  return (
    <PixelatedCanvas
      src="/assets/images/ammar-ridho-picture.png"
      width={isMobile ? 180 : 420}
      height={isMobile ? 290 : 700}
      cellSize={3}
      dotScale={isMobile ? 0.6 : 0.65}
      shape="square"
      backgroundColor="#0b1120"
      dropoutStrength={0}
      interactive
      distortionStrength={isMobile ? 2 : 2.8}
      distortionRadius={isMobile ? 50 : 78}
      distortionMode="swirl"
      followSpeed={isMobile ? 0.15 : 0.18}
      jitterStrength={isMobile ? 2 : 2.6}
      jitterSpeed={isMobile ? 2.4 : 3.2}
      sampleAverage
      tintColor="#dbeafe"
      tintStrength={0.08}
      className={className}
    />
  );
}
