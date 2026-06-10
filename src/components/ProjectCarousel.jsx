"use client";

import React, { useState, useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import BorderGlow from "@/components/ui/BorderGlow";
import { allProjects } from "@/data/allProjects";

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollContainerRef = useRef(null);
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

  // Auto-play carousel - loop every 5 seconds
  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayIntervalRef.current = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % allProjects.length);
          setIsAnimating(false);
        }, 500);
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
    if (isAnimating) return;
    
    e.preventDefault();
    
    setIsAnimating(true);
    setTimeout(() => {
      if (e.deltaY > 0) {
        // Scroll down = next
        setCurrentIndex((prev) => (prev + 1) % allProjects.length);
      } else {
        // Scroll up = previous
        setCurrentIndex((prev) =>
          prev === 0 ? allProjects.length - 1 : prev - 1
        );
      }
      setIsAnimating(false);
    }, 500);

    // Reset auto-play timer
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }
    autoPlayIntervalRef.current = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % allProjects.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);
  };

  // Handle touch swipe
  const touchStartRef = useRef(0);
  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (isAnimating) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;

    if (Math.abs(diff) > 50) {
      setIsAnimating(true);
      setTimeout(() => {
        if (diff > 0) {
          // Swipe left = next
          setCurrentIndex((prev) => (prev + 1) % allProjects.length);
        } else {
          // Swipe right = previous
          setCurrentIndex((prev) =>
            prev === 0 ? allProjects.length - 1 : prev - 1
          );
        }
        setIsAnimating(false);
      }, 500);

      // Reset auto-play timer
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
      autoPlayIntervalRef.current = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % allProjects.length);
          setIsAnimating(false);
        }, 500);
      }, 5000);
    }
  };

  // Get visible projects including preview cards
  const getVisibleProjects = () => {
    const projects = [];
    
    // Previous card (preview - left)
    projects.push({
      project: allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length],
      type: "preview-left",
    });

    // Main cards
    for (let i = 0; i < itemsPerView; i++) {
      projects.push({
        project: allProjects[(currentIndex + i) % allProjects.length],
        type: "main",
      });
    }

    // Next card (preview - right)
    projects.push({
      project: allProjects[(currentIndex + itemsPerView) % allProjects.length],
      type: "preview-right",
    });

    return projects;
  };

  const visibleProjects = getVisibleProjects();

  const renderCard = (item, idx) => {
    const isPreview = item.type !== "main";
    const isPreviewLeft = item.type === "preview-left";

    return (
      <div
        key={`${item.project.id}-${idx}`}
        className={`flex-shrink-0 transition-all duration-500 ${
          isPreview
            ? "w-1/3 opacity-40 scale-90 blur-sm"
            : isAnimating
            ? "opacity-50 scale-95"
            : "opacity-100 scale-100"
        } ${isPreviewLeft ? "order-first" : ""}`}
      >
        <BorderGlow
          backgroundColor="#0a0e27"
          glowColor="200 100 50"
          colors={["#06b6d4", "#0ea5e9", "#06b6d4"]}
          glowIntensity={isPreview ? 0.5 : 1.2}
          edgeSensitivity={25}
          borderRadius={16}
          glowRadius={35}
          coneSpread={30}
        >
          <div className="flex flex-col h-full p-5 sm:p-6">
            {/* Live Demo Badge */}
            {item.project.liveDemo && !isPreview && (
              <div className="flex justify-end mb-3">
                <a
                  href={item.project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 transition-all"
                  title="Live Demo"
                >
                  <span>Live</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            )}

            {/* Project Info */}
            <h3 className="text-base sm:text-lg font-semibold text-cyan-100 mb-3 line-clamp-2 min-h-[3.5rem] flex items-start">
              {item.project.name}
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 mb-4 line-clamp-3 flex-1 min-h-[4.5rem]">
              {item.project.description || "Project repository"}
            </p>

            {/* Tech Stack */}
            {item.project.technologies && item.project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4 min-h-[3rem]">
                {item.project.technologies.slice(0, 3).map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-2.5 py-1 text-xs rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-medium whitespace-nowrap"
                  >
                    {tech}
                  </span>
                ))}
                {item.project.technologies.length > 3 && (
                  <span className="inline-block px-2.5 py-1 text-xs rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-medium">
                    +{item.project.technologies.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Language Badge */}
            {item.project.language && (
              <div className="mb-4 min-h-[2rem] flex items-center">
                <span className="inline-block px-2.5 py-1 text-xs rounded bg-slate-700/50 text-slate-300 border border-slate-600/50">
                  {item.project.language}
                </span>
              </div>
            )}

            {/* Link */}
            {!isPreview && (
              <a
                href={item.project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs uppercase tracking-[0.12em] text-cyan-300 hover:text-cyan-100 transition-colors font-medium group mt-auto"
              >
                View on GitHub
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            )}
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
      {/* Cosmic background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative w-full px-[5%] z-10">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent mb-4">
            Projects Gallery
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Scroll or swipe to explore {allProjects.length} projects across the digital cosmos.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Projects Carousel with Preview Cards */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-hidden"
          >
            {visibleProjects.map((item, idx) => renderCard(item, idx))}
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <span className="text-xs uppercase tracking-wider text-cyan-400/70 font-medium">
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

          {/* Scroll Info */}
          <div className="mt-6 text-center text-xs text-slate-500">
            <p>💫 Scroll or swipe to navigate • Auto-playing carousel</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5">
            <p className="text-2xl font-bold text-cyan-300">{allProjects.length}</p>
            <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">Total Projects</p>
          </div>
          <div className="p-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5">
            <p className="text-2xl font-bold text-cyan-300">
              {new Set(allProjects.flatMap((p) => p.technologies)).size}
            </p>
            <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">Technologies</p>
          </div>
          <div className="p-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5">
            <p className="text-2xl font-bold text-cyan-300">
              {new Set(allProjects.map((p) => p.language)).size}
            </p>
            <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">Languages</p>
          </div>
        </div>
      </div>
    </section>
  );
}
