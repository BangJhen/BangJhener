"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Card } from "@/components/ui/apple-cards-carousel";
import { allProjects } from "@/data/allProjects";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectCarousel() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      // Desktop (≥768px): vertical scroll drives horizontal carousel
      mm.add("(min-width: 768px)", () => {
        // Hitung jarak translasi: lebar track dikurangi lebar viewport
        const getDistance = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            pinSpacing: true,
            scrub: true,          // langsung (tidak ada lag tambahan — Lenis sudah smooth)
            invalidateOnRefresh: true,
          },
        });
      });

      // Mobile: tidak di-pin, fallback ke swipe horizontal
      mm.add("(max-width: 767px)", () => {
        // no-op — mobile pakai native scroll
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const cards = allProjects.map((project, index) => (
    <Card
      key={project.id}
      card={{
        src: project.image,
        title: project.name,
        category: project.language || "Project",
        description: project.description,
        technologies: project.technologies || [],
        url: project.url,
      }}
      index={index}
    />
  ));

  return (
    <section
      ref={sectionRef}
      id="gallery-projects"
      className="relative z-10 overflow-hidden"
    >
      {/* ── Desktop: pinned section, track bergerak horizontal ── */}
      <div className="hidden md:flex flex-col h-screen justify-center gap-8">
        {/* Header */}
        <div className="px-12 lg:px-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase mb-2">
            Portfolio
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
            Projects
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Scroll down to explore →
          </p>
        </div>

        {/* Track — ditranslasi GSAP, melebihi lebar viewport
            Clipping ditangani oleh overflow-hidden di <section> */}
        <div
          ref={trackRef}
          className="flex flex-row items-center gap-6 pl-12 lg:pl-20 will-change-transform"
          style={{ width: "max-content" }}
        >
          {cards}
          {/* Trailing spacer agar kartu terakhir tidak mepet kanan */}
          <div className="flex-shrink-0 w-20 lg:w-32" aria-hidden="true" />
        </div>
      </div>

      {/* ── Mobile: native swipe horizontal ── */}
      <div className="md:hidden py-16 text-white">
        <div className="px-6 mb-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase mb-2">
            Portfolio
          </p>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
            Projects
          </h2>
          <p className="text-slate-400 text-sm mt-1">Swipe to explore →</p>
        </div>

        <div className="flex overflow-x-auto gap-4 pl-6 pr-6 pb-4 [scrollbar-width:none] [-webkit-overflow-scrolling:touch]">
          {cards}
        </div>
      </div>
    </section>
  );
}
