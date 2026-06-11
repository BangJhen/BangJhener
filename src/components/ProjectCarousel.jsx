"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { allProjects } from "@/data/allProjects";

export default function ProjectCarousel() {
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
      id="gallery-projects"
      className="relative py-20 text-white overflow-x-hidden z-10"
    >

      <div className="relative w-full z-10">
        {/* Header */}
        <div className="mb-12 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent mb-3">
            Projects
          </h2>
          <p className="text-slate-400 text-sm">
            Scroll or swipe to explore
          </p>
        </div>

        {/* Carousel */}
        <Carousel items={cards} />
      </div>
    </section>
  );
}
