"use client";

import { useEffect, useMemo, useState } from "react";

export default function Navigation() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [sectionPoints, setSectionPoints] = useState([]);
  const [hoverProgress, setHoverProgress] = useState(null);

  const sections = useMemo(
    () => [
      { id: "hero", label: "HERO" },
      { id: "about", label: "ABOUT" },
      { id: "projects", label: "PROJECT" },
      { id: "contact", label: "CONTACT" },
    ],
    []
  );
  const rulerTicks = useMemo(() => Array.from({ length: 44 }, (_, index) => index / 43), []);
  const userDistance = hoverProgress === null ? Number.POSITIVE_INFINITY : Math.abs(hoverProgress - scrollProgress);
  const userInfluence = Number.isFinite(userDistance) ? Math.exp(-((userDistance / 0.2) ** 2)) : 0;
  const userPullX = userInfluence * 16;
  const userScale = 1 + userInfluence * 0.95;

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
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", computeSections);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", computeSections);
    };
  }, [sections]);

  return (
    <nav className="fixed left-3 top-1/2 z-50 hidden -translate-y-1/2 md:block" aria-label="Section ruler navigation">
      <div
        className="relative h-[78vh] w-24"
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const topPadding = 16;
          const trackHeight = Math.max(rect.height - topPadding * 2, 1);
          const ratio = (event.clientY - rect.top - topPadding) / trackHeight;
          setHoverProgress(Math.min(Math.max(ratio, 0), 1));
        }}
        onMouseLeave={() => setHoverProgress(null)}>
        <div className="absolute left-[22px] top-4 bottom-4 z-0" aria-hidden="true">
          {rulerTicks.map((tickRatio) => {
            const tickDistance = hoverProgress === null ? Number.POSITIVE_INFINITY : Math.abs(hoverProgress - tickRatio);
            const tickInfluence = Number.isFinite(tickDistance) ? Math.exp(-((tickDistance / 0.17) ** 2)) : 0;
            const lineScale = 1 + tickInfluence * 2.6;
            const tickScale = 1 + tickInfluence * 2.1;
            const tickPullX = tickInfluence * 10;
            return (
              <div key={tickRatio} className="absolute left-1/2" style={{ top: `${tickRatio * 100}%` }}>
                <span
                  className="absolute left-1/2 top-1/2 block h-[6px] w-px bg-slate-400/45 transition-transform duration-150 ease-out"
                  style={{ transform: `translate(-50%, -50%) translateX(${tickPullX}px) scale(${1 + tickInfluence * 0.7}, ${lineScale})` }}
                />
                <span
                  className="absolute left-1/2 top-1/2 block h-[2px] w-[2px] rounded-full bg-slate-300/75 transition-transform duration-150 ease-out"
                  style={{ transform: `translate(-50%, -50%) translateX(${tickPullX}px) scale(${tickScale})` }}
                />
              </div>
            );
          })}
        </div>
        <div className="absolute left-[22px] top-4 bottom-4 z-30" aria-hidden="true">
          <div
            className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100 bg-cyan-400/85 shadow-[0_0_14px_rgba(34,211,238,0.9)]"
            style={{ top: `${scrollProgress * 100}%`, transform: `translate(-50%, -50%) translateX(${userPullX}px) scale(${userScale})` }}
          />
        </div>

        <ul className="absolute left-[22px] top-4 bottom-4 right-0">
          {sectionPoints.map((section) => {
            const isActive = section.id === activeSection;
            const distance = hoverProgress === null ? Number.POSITIVE_INFINITY : Math.abs(hoverProgress - section.ratio);
            const influence = Number.isFinite(distance) ? Math.exp(-((distance / 0.24) ** 2)) : 0;
            const markerScale = 1 + influence * 1.25;
            const labelScale = 1 + influence * 0.48;
            const pullX = influence * 16;
            return (
              <li key={section.id} className="absolute left-0 right-0" style={{ top: `${section.ratio * 100}%` }}>
                <a href={`#${section.id}`} className="group relative block">
                  <span
                    className={`absolute left-0 top-0 z-10 block h-2 w-2 rounded-full border transition-[transform,box-shadow,background-color,border-color] duration-180 ease-out ${
                      isActive ? "border-cyan-100 bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "border-slate-400 bg-slate-700"
                    }`}
                    style={{ transform: `translate(-50%, -50%) translateX(${pullX}px) scale(${markerScale})` }}
                  />
                  <span
                    className={`absolute left-5 top-0 origin-left -translate-y-1/2 text-[9px] font-semibold tracking-[0.14em] transition-[color,transform] duration-180 ease-out ${
                      isActive ? "text-cyan-200" : "text-slate-400 group-hover:text-cyan-300"
                    }`}
                    style={{ transform: `translateX(${pullX}px) scale(${labelScale})` }}>
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
