"use client";

import { useEffect, useState } from "react";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";

export default function AboutPixelatedCanvas({ className }) {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsCompact(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  return (
    <PixelatedCanvas
      src="/assets/images/ammar-ridho-picture.png"
      width={isCompact ? 180 : 420}
      height={isCompact ? 290 : 700}
      cellSize={3}
      dotScale={isCompact ? 0.6 : 0.65}
      shape="square"
      backgroundColor="#0b1120"
      dropoutStrength={0}
      interactive
      distortionStrength={isCompact ? 2 : 2.8}
      distortionRadius={isCompact ? 50 : 78}
      distortionMode="swirl"
      followSpeed={isCompact ? 0.15 : 0.18}
      jitterStrength={isCompact ? 2 : 2.6}
      jitterSpeed={isCompact ? 2.4 : 3.2}
      sampleAverage
      tintColor="#dbeafe"
      tintStrength={0.08}
      className={className}
    />
  );
}
