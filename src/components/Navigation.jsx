"use client";

import { useEffect, useMemo, useState } from "react";

export default function Navigation() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [sectionPoints, setSectionPoints] = useState([]);

  const sections = useMemo(
    () => [
      { id: "hero", label: "HERO" },
      { id: "about", label: "ABOUT" },
      { id: "projects", label: "PROJECT" },
      { id: "contact", label: "CONTACT" },
    ],
    []
  );

  useEffect(() => {
    const computeSections = () => {
      const doc = document.documentElement;
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);

      const points = sections
        .map((section) => {
          const el = document.getElementById(section.id);
          if (!el) return null;
          const y = el.offsetTop;
          return {
            ...section,
            y,
            ratio: Math.min(Math.max(y / maxScroll, 0), 1),
          };
        })
        .filter(Boolean);

      setSectionPoints(points);
    };

    const handleScroll = () => {
      const doc = document.documentElement;
      const currentY = window.scrollY;
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(currentY / maxScroll, 0), 1);

      setScrollY(Math.round(currentY));
      setScrollProgress(progress);

      let currentSection = "hero";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        if (currentY + window.innerHeight * 0.35 >= el.offsetTop) {
          currentSection = section.id;
        }
      }
      setActiveSection(currentSection);
    };

    computeSections();
    handleScroll();
    let rafId = 0;
    const loop = () => {
      handleScroll();
      rafId = window.requestAnimationFrame(loop);
    };
    rafId = window.requestAnimationFrame(loop);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", computeSections);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", computeSections);
    };
  }, [sections]);

  return (
    <nav className="fixed left-3 top-1/2 z-50 hidden -translate-y-1/2 md:block" aria-label="Section ruler navigation">
      <div className="relative h-[78vh] w-24">
        <div
          className="absolute left-[22px] top-4 bottom-4 w-px"
          style={{
            background:
              "repeating-linear-gradient(to bottom, rgba(148,163,184,0.85) 0px, rgba(148,163,184,0.85) 1px, transparent 1px, transparent 12px)",
          }}
          aria-hidden="true"
        />
        <div className="absolute left-[18px] top-4 bottom-4" aria-hidden="true">
          <div
            className="absolute h-3 w-3 -translate-y-1/2 rounded-full border border-cyan-200 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
            style={{ top: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="absolute right-2 top-3 text-[10px] font-semibold tracking-wider text-cyan-300">{scrollY}px</div>
        <div className="absolute right-2 top-7 text-[9px] tracking-wider text-slate-400">{Math.round(scrollProgress * 100)}%</div>

        <ul className="absolute inset-0">
          {sectionPoints.map((section) => {
            const isActive = section.id === activeSection;
            return (
              <li
                key={section.id}
                className="absolute left-0 right-0 -translate-y-1/2"
                style={{ top: `calc(16px + (100% - 32px) * ${section.ratio})` }}>
                <a href={`#${section.id}`} className="group relative flex items-center pl-4">
                  <span
                    className={`block h-2 w-2 rounded-full border transition-all ${
                      isActive ? "border-cyan-100 bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "border-slate-400 bg-slate-700"
                    }`}
                  />
                  <span
                    className={`ml-2 text-[9px] font-semibold tracking-[0.14em] transition-colors ${
                      isActive ? "text-cyan-200" : "text-slate-400 group-hover:text-cyan-300"
                    }`}>
                    {section.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
