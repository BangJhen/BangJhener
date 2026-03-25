"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/earth.mr.draco.webp.glb";
const BASE_CONFIG = {
  rotationSpeed: { default: 0.16, reduced: 0.08 },
  pointerTilt: 0.2,
  sink: {
    travelY: 800,
    scaleMin: 0.9,
    blurMax: 0,
    opacityMin: 0.9,
  },
};

function getViewportConfig(isDesktop) {
  if (isDesktop) {
    return {
      position: [0, -0.6, 0],
      scale: 0.014,
      camera: { position: [0, 0.2, 9], fov: 34 },
    };
  }
  return {
    position: [0, -0.2, 0],
    scale: 0.013,
    camera: { position: [0, 0.16, 9.4], fov: 36 },
  };
}

function EarthModel({ reducedMotion, position, scale }) {
  const groupRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const { scene } = useGLTF(MODEL_URL);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    if (reducedMotion) {
      pointerRef.current = { x: 0, y: 0 };
      return;
    }

    const handlePointerMove = (event) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      pointerRef.current = { x: nx, y: ny };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reducedMotion]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    group.rotation.y += delta * (reducedMotion ? BASE_CONFIG.rotationSpeed.reduced : BASE_CONFIG.rotationSpeed.default);

    const targetX = reducedMotion ? 0 : pointerRef.current.y * BASE_CONFIG.pointerTilt;
    const targetZ = reducedMotion ? 0 : -pointerRef.current.x * BASE_CONFIG.pointerTilt;

    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetX, 6, delta);
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, targetZ, 6, delta);
  });

  return (
    <group ref={groupRef} position={position}>
      <primitive object={clonedScene} scale={scale} />
    </group>
  );
}

function EarthScene({ reducedMotion, camera, position, scale }) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={camera}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 2, 3]} intensity={1.2} color="#d9f4ff" />
      <directionalLight position={[-2, -1, -2]} intensity={0.35} color="#88b3ff" />
      <Suspense fallback={null}>
        <EarthModel reducedMotion={reducedMotion} position={position} scale={scale} />
      </Suspense>
    </Canvas>
  );
}

export default function EarthHero() {
  const sectionRef = useRef(null);
  const [shouldRenderScene, setShouldRenderScene] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sinkProgress, setSinkProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRenderScene(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = Math.max(window.innerHeight, 1);
      const start = vh * 0.08;
      const travel = vh * 1.35;
      const raw = ((-rect.top) - start) / travel;
      const clamped = Math.min(Math.max(raw, 0), 1);
      setSinkProgress(clamped);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const viewportConfig = getViewportConfig(isDesktop);

  return (
    <section id="hero" ref={sectionRef} className="relative isolate min-h-[180vh] overflow-visible bg-[#040711] text-white lg:min-h-[200vh]" aria-label="Hero">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-[#040711]/90" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[180vh] overflow-visible lg:h-[200vh]" aria-hidden="true">
        {shouldRenderScene ? (
          <EarthScene
            reducedMotion={reducedMotion}
            camera={viewportConfig.camera}
            position={viewportConfig.position}
            scale={viewportConfig.scale}
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_50%_45%,rgba(56,189,248,0.2),rgba(4,7,17,0.95)_56%)]" />
        )}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-64 z-10 mx-auto w-full max-w-6xl px-6 text-center lg:bottom-[1500px]"
        style={{
          transform: `translateY(${sinkProgress * BASE_CONFIG.sink.travelY}px) scale(${1 - sinkProgress * (1 - BASE_CONFIG.sink.scaleMin)})`,
          opacity: 1 - sinkProgress * (1 - BASE_CONFIG.sink.opacityMin),
          filter: `blur(${sinkProgress * BASE_CONFIG.sink.blurMax}px)`,
        }}>
        <h1 className="text-3xl font-bold tracking-tight text-cyan-100 drop-shadow-[0_0_16px_rgba(34,211,238,0.5)] lg:text-6xl">Ammar Ridho</h1>
        <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-200/90 lg:text-lg">
          I am an <span className="font-semibold text-cyan-200">AI/ML Engineer</span> and <span className="font-semibold text-cyan-200">Web Developer.</span>
        </p>
        <p className="mx-auto mt-1 max-w-3xl text-xs text-slate-300/90 lg:text-base">Active undergraduate Data Science student at Telkom University.</p>
      </div>
    </section>
  );
}

useGLTF.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
useGLTF.preload(MODEL_URL);
