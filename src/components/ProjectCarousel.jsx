"use client";

import React, { useState, useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import BorderGlow from "@/components/ui/BorderGlow";
import { allProjects } from "@/data/allProjects";

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const wheelTimeoutRef = useRef(null);
  const autoPlayIntervalRef = useRef(null);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayIntervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % allProjects.length);
      }, 5000);
    };

    startAutoPlay();
    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, []);

  // Handle scroll wheel
  const handleWheel = (e) => {
    e.preventDefault();

    if (wheelTimeoutRef.current) {
      clearTimeout(wheelTimeoutRef.current);
    }

    wheelTimeoutRef.current = setTimeout(() => {
      if (e.deltaY > 0) {
        setCurrentIndex((prev) => (prev + 1) % allProjects.length);
      } else {
        setCurrentIndex((prev) =>
          prev === 0 ? allProjects.length - 1 : prev - 1
        );
      }

      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
      autoPlayIntervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % allProjects.length);
      }, 5000);
    }, 50);
  };

  // Handle touch swipe
  const touchStartRef = useRef(0);
  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentIndex((prev) => (prev + 1) % allProjects.length);
      } else {
        setCurrentIndex((prev) =>
          prev === 0 ? allProjects.length - 1 : prev - 1
        );
      }

      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
      autoPlayIntervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % allProjects.length);
      }, 5000);
    }
  };

  // Get visible projects
  const getVisibleProjects = () => {
    const projects = [];

    for (let i = 0; i < itemsPerView; i++) {
      projects.push({
        project: allProjects[(currentIndex + i) % allProjects.length],
        type: "main",
      });
    }

    return projects;
  };

  const visibleProjects = getVisibleProjects();

  const renderCard = (item) => {
    return (
      <div
        key={`${item.project.id}`}
        className="flex-shrink-0 w-full transition-all duration-300"
      >
        <BorderGlow
          backgroundColor="#0a0e27"
          glowColor="200 100 50"
          colors={["#06b6d4", "#0ea5e9", "#06b6d4"]}
          glowIntensity={1.0}
          edgeSensitivity={20}
          borderRadius={16}
          glowRadius={30}
          coneSpread={25}
        >
          <div className="flex flex-col h-full p-6">
            {/* Live Demo Badge */}
            {item.project.liveDemo && (
              <div className="flex justify-end mb-4">
                <a
                  href={item.project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 transition-all"
                  title="Live Demo"
                >
                  <span>Live</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            )}

            {/* Project Name */}
            <h3 className="text-lg font-bold text-cyan-100 mb-3 line-clamp-2">
              {item.project.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-slate-300 mb-4 line-clamp-3 flex-1">
              {item.project.description}
            </p>

            {/* Tech Stack */}
            {item.project.technologies && item.project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {item.project.technologies.slice(0, 3).map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-2.5 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-medium"
                  >
                    {tech}
                  </span>
                ))}
                {item.project.technologies.length > 3 && (
                  <span className="inline-block px-2.5 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-medium">
                    +{item.project.technologies.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Language Badge */}
            {item.project.language && (
              <div className="mb-4">
                <span className="inline-block px-2.5 py-1 text-xs rounded bg-slate-700/60 text-slate-200 border border-slate-600/50">
                  {item.project.language}
                </span>
              </div>
            )}

            {/* GitHub Link */}
            <a
              href={item.project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm uppercase tracking-wider text-cyan-300 hover:text-cyan-100 transition-colors font-semibold group mt-auto"
            >
              View on GitHub
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </BorderGlow>
      </div>
    );
  };

  return (
    <section
      id="gallery-projects"
      className="relative py-20 bg-[#0f172a] text-white overflow-hidden"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Cosmic background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 z-10">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent mb-3">
            Projects
          </h2>
          <p className="text-slate-400 text-sm">
            Scroll or swipe to explore
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className={`grid gap-6 ${
            itemsPerView === 1 ? 'grid-cols-1' :
            itemsPerView === 2 ? 'grid-cols-2' :
            'grid-cols-3'
          }`}>
            {visibleProjects.map((item) => renderCard(item))}
          </div>

          {/* Progress */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="text-sm text-cyan-400/70 font-medium">
              {currentIndex + 1} / {allProjects.length}
            </span>
            <div className="w-40 h-1 bg-slate-700/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / allProjects.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
