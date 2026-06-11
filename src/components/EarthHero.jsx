"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { motion } from "motion/react";
import * as THREE from "three";

const MODEL_URL = "/models/earth.mr.draco.webp.glb";
const SPACE_MODEL_URL = "/models/need_some_space.glb";
const MOON_MODEL_URL = "/models/moon.mr.glb";
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
    return { position: [2, 1, -0.8], scale: 0.003 };
  }
  return { position: [2.2, 0.9, -0.6], scale: 0.45 };
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

function MoonModel({ reducedMotion, position, scale, earthPosition }) {
  const groupRef = useRef(null);
  const angleRef = useRef(0);
  const { scene } = useLoader(GLTFLoader, MOON_MODEL_URL);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh && child.material) {
        const map = child.material.map || child.material.baseColorTexture || child.material.specularColorTexture;
        if (map && "colorSpace" in map) {
          map.colorSpace = THREE.SRGBColorSpace;
        }
        child.material = new THREE.MeshStandardMaterial({
          map: map || null,
          color: new THREE.Color("#ffffff"),
          roughness: 0.78,
          metalness: 0.08,
          emissive: new THREE.Color("#0b1220"),
          emissiveIntensity: 0.12,
        });
        child.material.needsUpdate = true;
      }
    });
  }, [clonedScene]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const ox = position[0] - earthPosition[0];
    const oz = position[2] - earthPosition[2];
    const radius = Math.hypot(ox, oz) || 2;
    const baseAngle = Math.atan2(oz, ox);
    angleRef.current += delta * (reducedMotion ? 0.12 : 0.22);
    const theta = baseAngle + angleRef.current;
    group.position.x = earthPosition[0] + Math.cos(theta) * radius;
    group.position.z = earthPosition[2] + Math.sin(theta) * radius;
    group.position.y = position[1] + Math.sin(theta * 0.8) * 0.08;
    group.rotation.y += delta * (reducedMotion ? 0.04 : 0.16);
  });

  return (
    <group ref={groupRef} position={position}>
      <primitive object={clonedScene} scale={scale} />
      <pointLight position={[0, 0, 1.5]} intensity={0.9} color="#e5e9ff" distance={14} decay={2.2} />
    </group>
  );
}

function SpaceBackground({ reducedMotion, pointer }) {
  const groupRef = useRef(null);
  const { scene } = useGLTF(SPACE_MODEL_URL);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const t = performance.now() * 0.0003;
    const s = reducedMotion ? 0.4 : 1;

    // Fully oscillating — never drifts out of frame
    const targetX = Math.sin(t * 0.6)  * 0.07 * s;
    const targetY = Math.sin(t * 0.4)  * 0.05 * s;
    const targetZ = Math.cos(t * 0.5)  * 0.06 * s;

    // Subtle pointer nudge on top
    const px = pointer?.current?.x || 0;
    const py = pointer?.current?.y || 0;

    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetX + py * 0.03, 1.5, delta);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetY + px * 0.03, 1.5, delta);
    groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, targetZ,             1.5, delta);
  });

  return (
    <group ref={groupRef} position={[-4, -4, 8]}>
      <primitive object={clonedScene} scale={3} />
    </group>
  );
}

function EarthScene({ reducedMotion, camera, position, scale, pointer }) {
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
      </Suspense>
    </Canvas>
  );
}

function MoonScene({ reducedMotion, camera, moon, earthPosition }) {
  return (
    <Canvas dpr={[1, 1.6]} camera={camera} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[2.4, 1.8, 2]} intensity={0.8} color="#d9e4ff" />
      <Suspense fallback={null}>
        <MoonModel reducedMotion={reducedMotion} position={moon.position} scale={moon.scale} earthPosition={earthPosition} />
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
    <section id="hero" ref={sectionRef} className="relative isolate min-h-[120vh] overflow-visible bg-[#040711] text-white lg:min-h-[120vh] z-0" aria-label="Hero">
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

      {/* Space debris — fade only */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-5 h-full overflow-visible"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={shouldRenderScene ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
      >
        {shouldRenderScene ? (
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 35 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[2, 1, 3]} intensity={0.5} color="#9ccfff" />
            <Suspense fallback={null}>
              <SpaceBackground reducedMotion={reducedMotion} pointer={pointerRef} />
            </Suspense>
          </Canvas>
        ) : null}
      </motion.div>

      {/* Earth — bottom to top */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[180vh] overflow-visible lg:h-[200vh]"
        aria-hidden="true"
        initial={{ opacity: 0, y: 620 }}
        animate={shouldRenderScene ? { opacity: 1, y: 0 } : { opacity: 0, y: 620 }}
        transition={{ duration: 3.8, ease: [0.08, 0.82, 0.17, 1], delay: 0.1 }}
      >
        {shouldRenderScene ? (
          <EarthScene
            reducedMotion={reducedMotion}
            camera={viewportConfig.camera}
            position={viewportConfig.position}
            scale={viewportConfig.scale}
            pointer={pointerRef}
          />
        ) : null}
      </motion.div>

      {/* Moon — bottom to top, slightly after Earth */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-9 h-[180vh] overflow-visible lg:h-[200vh]"
        aria-hidden="true"
        initial={{ opacity: 0, y: 500 }}
        animate={shouldRenderScene ? { opacity: 1, y: 0 } : { opacity: 0, y: 500 }}
        transition={{ duration: 4.2, ease: [0.08, 0.82, 0.17, 1], delay: 0.45 }}
      >
        {shouldRenderScene ? (
          <MoonScene
            reducedMotion={reducedMotion}
            camera={viewportConfig.camera}
            moon={moonConfig}
            earthPosition={viewportConfig.position}
          />
        ) : null}
      </motion.div>

      {/* Text content — waits for Earth+Moon to finish (~4.65s) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 z-19 mx-auto w-full max-w-5xl px-6 text-center -translate-y-1/2"
        style={{
          transform: `translateY(calc(-50% + ${sinkProgress * BASE_CONFIG.sink.travelY}px)) scale(${1 - sinkProgress * (1 - BASE_CONFIG.sink.scaleMin)})`,
          opacity: 1 - sinkProgress * (1 - BASE_CONFIG.sink.opacityMin),
          filter: `blur(${sinkProgress * BASE_CONFIG.sink.blurMax}px)`,
        }}>
        {/* "AI/ML Engineer" label */}
        <motion.p
          className="text-[0.9rem] uppercase tracking-[0.32em] text-cyan-300 lg:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 2.5 }}
        >
          AI/ML Engineer
        </motion.p>
        {/* Title — with stroke animation entrance delay */}
        <div className="pointer-events-auto relative mx-auto mt-2 h-[120px] w-full max-w-[760px] lg:h-[170px]">
          <TextHoverEffect
            text="AMMAR RIDHO"
            duration={0.15}
            textClassName="text-[78px] lg:text-[118px] tracking-[0.03em]"
            gradientStops={[
              { offset: "0%",   color: "#dbeafe" },
              { offset: "25%",  color: "#67e8f9" },
              { offset: "55%",  color: "#38bdf8" },
              { offset: "80%",  color: "#818cf8" },
              { offset: "100%", color: "#c4b5fd" },
            ]}
            entranceDelay={2.5}
          />
        </div>
        {/* Description */}
        <motion.p
          className="mx-auto mt-3 max-w-3xl text-[clamp(1rem,2.4vw,1.35rem)] text-sky-100/80 lg:text-[clamp(1.1rem,2vw,1.5rem)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 2.65 }}
        >
          Orchestrating AI constellations and immersive web frontiers so ideas can travel at light speed.
        </motion.p>
      </div>
    </section>
  );
}

useGLTF.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
useGLTF.preload(MODEL_URL);
useGLTF.preload(SPACE_MODEL_URL);
