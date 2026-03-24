"use client";

import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-cyan-100/80">
      Loading 3D scene...
    </div>
  ),
});

const SPACE_SCENE_URL = "https://prod.spline.design/RRpnJn7mL5NXPiMO/scene.splinecode";

export default function SplineHero() {
  return (
    <section
      id="hero"
      className="relative isolate min-h-screen overflow-hidden bg-[#040711] text-white"
      aria-label="Hero">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-[#040711]/90" aria-hidden="true" />

      <div className="absolute inset-0">
        <Spline scene={SPACE_SCENE_URL} className="h-full w-full" />
      </div>
    </section>
  );
}
