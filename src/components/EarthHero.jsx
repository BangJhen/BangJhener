"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/earth.mr.draco.webp.glb";
const SPACE_MODEL_URL = "/models/need_some_space.glb";
const MOON_MODEL_URL = "/models/moon.glb";
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
      position: [0, -0.8, 0],
      scale: 0.018,
      camera: { position: [0, 0.2, 9], fov: 34 },
    };
  }
  return {
    position: [0, -0.2, 0],
    scale: 0.013,
    camera: { position: [0, 0.16, 9.4], fov: 36 },
  };
}

function getMoonConfig(isDesktop) {
  if (isDesktop) {
    return { position: [2, 2.5, -0.8], scale: 0.003 };
  }
  return { position: [2.2, 1.6, -0.6], scale: 0.45 };
}

function EarthModel({ reducedMotion, position, scale, pointer }) {
  const groupRef = useRef(null);
  const { scene } = useGLTF(MODEL_URL);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    group.rotation.y += delta * (reducedMotion ? BASE_CONFIG.rotationSpeed.reduced : BASE_CONFIG.rotationSpeed.default);

    const px = reducedMotion ? 0 : pointer?.current?.x || 0;
    const py = reducedMotion ? 0 : pointer?.current?.y || 0;
    const targetX = py * BASE_CONFIG.pointerTilt;
    const targetZ = -px * BASE_CONFIG.pointerTilt;

    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetX, 6, delta);
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, targetZ, 6, delta);
  });

  return (
    <group ref={groupRef} position={position}>
      <primitive object={clonedScene} scale={scale} />
    </group>
  );
}

function MoonModel({ reducedMotion, position, scale }) {
  const groupRef = useRef(null);
  const { scene } = useGLTF(MOON_MODEL_URL);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.y += delta * (reducedMotion ? 0.04 : 0.16);
  });

  return (
    <group ref={groupRef} position={position}>
      <primitive object={clonedScene} scale={scale} />
    </group>
  );
}

function SpaceBackground({ reducedMotion, pointer }) {
  const groupRef = useRef(null);
  const { scene } = useGLTF(SPACE_MODEL_URL);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return;
    const t = performance.now() * 0.0004;
    // const targetX =  // gentle tilt forward/back
    // groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetX, 4, delta);
    
    const px = pointer?.current?.x || 0;
    const py = pointer?.current?.y || 0;
    const targetX = py * 0.08 * Math.sin(t) * 0.5;;
    const targetZ = -px * 0.08;
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetX, 3, delta);
    groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, targetZ, 3, delta);
  });

  return (
    <group ref={groupRef} position={[-4, -4, 8]}>
      <primitive object={clonedScene} scale={3} />
    </group>
  );
}

function EarthScene({ reducedMotion, camera, position, scale, pointer, moon }) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={camera}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 2, 3]} intensity={1.2} color="#d9f4ff" />
      <directionalLight position={[-2, -1, -2]} intensity={0.35} color="#88b3ff" />
      <Suspense fallback={null}>
        <EarthModel reducedMotion={reducedMotion} position={position} scale={scale} pointer={pointer} />
        <MoonModel reducedMotion={reducedMotion} position={moon.position} scale={moon.scale} />
      </Suspense>
    </Canvas>
  );
}

export default function EarthHero() {
  const sectionRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
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

  useEffect(() => {
    if (reducedMotion) return;

    const handlePointer = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      pointerRef.current = { x, y };
    };

    window.addEventListener("pointermove", handlePointer, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointer);
  }, [reducedMotion]);

  const viewportConfig = getViewportConfig(isDesktop);
  const moonConfig = getMoonConfig(isDesktop);

  return (
    <section id="hero" ref={sectionRef} className="relative isolate min-h-[180vh] overflow-visible bg-[#040711] text-white lg:min-h-[200vh]" aria-label="Hero">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1224] via-transparent to-[#040711]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.18),transparent_55%)] opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(129,140,248,0.16),transparent_60%)] mix-blend-screen opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_85%,rgba(14,165,233,0.12),transparent_55%)] opacity-60" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(56,189,248,0.14), rgba(14,165,233,0.06), transparent 65%)",
            filter: "blur(28px)",
            transform: "translate3d(calc(var(--px, 0) * 2px), calc(var(--py, 0) * 2px), 0) rotate(4deg)",
            opacity: 0.8,
            mixBlendMode: "screen",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(155deg, rgba(129,140,248,0.14), rgba(94,234,212,0.08), transparent 70%)",
            filter: "blur(32px)",
            transform: "translate3d(calc(var(--px, 0) * -2px), calc(var(--py, 0) * 1px), 0) rotate(-6deg)",
            opacity: 0.65,
            mixBlendMode: "screen",
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-5 h-full overflow-visible" aria-hidden="true">
        {shouldRenderScene ? (
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 35 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[2, 1, 3]} intensity={0.5} color="#9ccfff" />
            <Suspense fallback={null}>
              <SpaceBackground reducedMotion={reducedMotion} pointer={pointerRef} />
            </Suspense>
          </Canvas>
        ) : (
          <div className="h-full w-full bg-[#040711]" />
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[180vh] overflow-visible lg:h-[200vh]" aria-hidden="true">
        {shouldRenderScene ? (
          <EarthScene
            reducedMotion={reducedMotion}
            camera={viewportConfig.camera}
            position={viewportConfig.position}
            scale={viewportConfig.scale}
            pointer={pointerRef}
            moon={moonConfig}
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_50%_45%,rgba(56,189,248,0.2),rgba(4,7,17,0.95)_56%)]" />
        )}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-[12vh] z-10 mx-auto w-full max-w-5xl px-6 text-center lg:bottom-[150vh]"
        style={{
          transform: `translateY(${sinkProgress * BASE_CONFIG.sink.travelY}px) scale(${1 - sinkProgress * (1 - BASE_CONFIG.sink.scaleMin)})`,
          opacity: 1 - sinkProgress * (1 - BASE_CONFIG.sink.opacityMin),
          filter: `blur(${sinkProgress * BASE_CONFIG.sink.blurMax}px)`,
        }}>
        <p className="text-[0.9rem] uppercase tracking-[0.32em] text-sky-100/70 lg:text-base">AI/ML Engineer</p>
        <h1 className="mt-3 bg-gradient-to-r from-cyan-100 via-sky-200 to-indigo-200 bg-clip-text text-[clamp(2.85rem,5.4vw,4.8rem)] font-extrabold leading-tight text-transparent drop-shadow-[0_0_24px_rgba(56,189,248,0.35)] lg:text-[clamp(4.2rem,5.8vw,5.8rem)]">
          Ammar Ridho
        </h1>
        <p className="mx-auto mt-3 max-w-3xl text-[clamp(1rem,2.4vw,1.35rem)] text-slate-200/90 lg:text-[clamp(1.1rem,2vw,1.5rem)]">
          Orchestrating AI constellations and immersive web frontiers so ideas can travel at light speed.
        </p>
      </div>
    </section>
  );
}

useGLTF.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
useGLTF.preload(MODEL_URL);
useGLTF.preload(SPACE_MODEL_URL);
useGLTF.preload(MOON_MODEL_URL);
