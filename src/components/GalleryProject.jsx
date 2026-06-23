"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import BorderGlow from "@/components/ui/BorderGlow";
import TechStackIcon from "@/components/ui/TechStackIcon";
import { allProjects } from "@/data/allProjects";

export default function GalleryProject() {
  return (
    <section id="gallery-projects" className="relative py-20 bg-[#0f172a] text-white overflow-hidden">
      {/* Cosmic background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative w-full px-[5%] z-10">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase mb-2">
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent mb-4">
            Gallery Projects
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            A collection of stellar projects across the digital cosmos. Projects with live demos are featured first.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project) => (
            <BorderGlow
              key={project.id}
              backgroundColor="#0a0e27"
              glowColor="200 100 50"
              colors={["#06b6d4", "#0ea5e9", "#06b6d4"]}
              glowIntensity={1.2}
              edgeSensitivity={25}
              borderRadius={16}
              glowRadius={35}
              coneSpread={30}
            >
              <div className="flex flex-col h-full p-5 sm:p-6">
                {/* Image Container */}
                <div className="relative h-40 sm:h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-cyan-400/40 text-xs">
                      <div className="text-center">
                        <div className="text-2xl mb-2">🌌</div>
                        <div>Image Placeholder</div>
                      </div>
                    </div>
                  )}
                  {/* Live Demo badge */}
                  {project.liveDemo && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500/90 text-[0.6rem] font-bold uppercase tracking-wider text-white shadow-lg">
                      Live
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <p className="text-xs uppercase tracking-[0.14em] text-cyan-400/70 mb-2 font-medium">
                    {project.language}
                  </p>
                  <h3 className="text-base sm:text-lg font-semibold text-cyan-100 mb-2 line-clamp-2">
                    {project.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mb-4 line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-medium"
                      >
                        <TechStackIcon tech={tech} className="w-3 h-3" />
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center gap-3 mt-auto pt-2 border-t border-cyan-500/15">
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider transition-all hover:bg-emerald-500/25 hover:border-emerald-300/60 hover:-translate-y-0.5"
                      >
                        <ExternalLink size={12} />
                        Live Demo
                      </a>
                    )}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-cyan-300 hover:text-cyan-100 transition-colors font-medium"
                    >
                      <Github size={12} />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}
