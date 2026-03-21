import React from "react";
import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const imagePlaceholderClass =
  "h-full w-full rounded-[1.2rem] border-2 border-dashed border-cyan-300/50 bg-[#020617] grid place-items-center text-xs uppercase tracking-[0.14em] text-cyan-100/90";

function JourneyEvent({ month, title, detail, imageSrc, imageAlt, imageHeightClass = "h-[21rem] sm:h-[33rem]" }) {
  return (
    <div>
      <p className="text-[0.65rem] uppercase tracking-[0.13em] text-cyan-300/80 sm:text-xs">{month}</p>
      <p className="mt-1.5 text-sm font-semibold text-cyan-200 sm:mt-2 sm:text-base">{title}</p>
      <p className="mt-1.5 text-xs leading-5 text-slate-400 sm:mt-2 sm:text-sm sm:leading-6">{detail}</p>
      <ContainerScroll
        compact
        className="mt-8 max-w-[18rem] sm:mt-12 sm:max-w-[34rem] lg:max-w-[44rem]"
        cardClassName="w-full overflow-hidden rounded-[1.6rem] border-2 border-cyan-300/70 bg-[#020617] p-3 sm:rounded-[2.2rem] sm:p-5 shadow-[0_0_0_2px_rgba(34,211,238,0.25),0_24px_56px_rgba(8,47,73,0.45)]"
        innerClassName="h-full w-full">
        <div className="relative h-full w-full rounded-[1.2rem] border border-cyan-300/40 bg-[linear-gradient(180deg,#061225_0%,#091a34_100%)] p-3 sm:rounded-[1.8rem] sm:p-5">
           <div className="pointer-events-none absolute left-4 top-3.5 h-1.5 w-1.5 rounded-full bg-cyan-200/90 shadow-[14px_0_0_rgba(103,232,249,0.7),28px_0_0_rgba(103,232,249,0.5)] sm:left-5 sm:top-4 sm:h-2 sm:w-2 sm:shadow-[18px_0_0_rgba(103,232,249,0.7),36px_0_0_rgba(103,232,249,0.5)]" />
          <div className={`relative mt-5 w-full overflow-hidden rounded-[1rem] border border-cyan-300/45 bg-[#0b1120] sm:mt-6 sm:rounded-[1.2rem] ${imageHeightClass}`}>
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt ?? title}
                fill
                sizes="(max-width: 768px) 92vw, 480px"
                className="object-cover scale-[1.08]"
              />
            ) : (
              <div className={imagePlaceholderClass}>Image Placeholder</div>
            )}
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}

export default function TimelineDemo() {
  const data = [
    {
      title: "Jun 2021",
      content: (
        <JourneyEvent
          title="Started SMK Negeri 2 Depok (Computer & Network Engineering)"
          detail="Began vocational learning path in Teknik Komputer dan Jaringan, building core networking and system fundamentals."
          imageSrc="/assets/images/smkn2-depok2021.jpeg"
          imageAlt="SMK Negeri 2 Depok"
          imageHeightClass="h-[22rem] sm:h-[35rem]"
        />
      ),
    },
    {
      title: "Oct 2023",
      content: (
        <JourneyEvent
          title="Finalist Olimpiade Jaringan Mikrotik (National)"
          detail="Reached national finalist stage in MikroTik Networking Olympiad, strengthening practical network engineering and competitive discipline."
          imageSrc="/assets/images/olimpiade-jaringan-mikrotik-2023.jpg"
          imageAlt="Finalist Olimpiade Jaringan Mikrotik 2023"
          imageHeightClass="h-[21rem] sm:h-[33rem]"
        />
      ),
    },
    {
      title: "Aug 2024",
      content: (
        <JourneyEvent
          title="Started S1 Data Science - Telkom University"
          detail="Started undergraduate journey in Data Science, combining statistics, machine learning, and software engineering practice."
          imageSrc="/assets/images/masuk-telkom-university.jpeg"
          imageAlt="Masuk Telkom University"
          imageHeightClass="h-[22rem] sm:h-[35rem]"
        />
      ),
    },
    {
      title: "Nov 2024",
      content: (
        <JourneyEvent
          title="3rd Place ADIKARA Data Mining Competition"
          detail="Built a hybrid CNN-LSTM deep learning approach for multivariate food price forecasting."
          imageSrc="/assets/images/adikara2024.jpeg"
          imageAlt="ADIKARA 2024 award"
          imageHeightClass="h-[22rem] sm:h-[34rem]"
        />
      ),
    },
    {
      title: "Apr 2025",
      content: (
        <JourneyEvent
          title="Web Scraping R&D - Central Computer Improvement"
          detail="Developed scalable crawling pipelines with TypeScript, Puppeteer, Axios, and session-based retrieval strategies."
          imageSrc="/assets/images/cci-R&D-webscraping.png"
          imageAlt="CCI R&D Web Scraping"
        />
      ),
    },
    {
      title: "May 2025",
      content: (
        <JourneyEvent
          title="PIC Data Mining Competition - PRODIGI"
          detail="Led Data Mining division, mentoring members and building a learning ecosystem for competitions and AI innovation."
          imageSrc="/assets/images/prodigi-datamining2025.jpeg"
          imageAlt="PRODIGI Data Mining 2025"
        />
      ),
    },
    {
      title: "Sep 2025",
      content: (
        <JourneyEvent
          title="Finalist GEMASTIK XVIII Data Mining"
          detail="Designed fraud detection for P2P lending using GCN and ensemble optimization with strong AUC performance."
          imageSrc="/assets/images/finalist-gemastik2025.jpeg"
          imageAlt="Finalist GEMASTIK 2025"
          imageHeightClass="h-[22rem] sm:h-[34rem]"
        />
      ),
    },
    {
      title: "Nov 2025",
      content: (
        <JourneyEvent
          title="Mentor & Curriculum Machine Learning - GDGoC"
          detail="Designed and delivered a beginner-friendly ML curriculum from data prep and model training to Streamlit deployment."
          imageSrc="/assets/images/gdgoc2025-mnc.jpeg"
          imageAlt="GDGoC 2025 mentoring"
        />
      ),
    },
    {
      title: "Jan 2026",
      content: (
        <JourneyEvent
          title="Mentor of Data Research - CCI"
          detail="Mentoring research-focused projects and guiding practical AI implementation for student and community initiatives."
          imageSrc="/assets/images/cci2026.jpeg"
          imageAlt="CCI 2026 mentorship"
        />
      ),
    },
  ];

  return (
    <div className="relative w-full">
      <Timeline
        data={data}
        title="My Journey"
        description="From networking foundations to AI/ML achievements, mentorship, and real-world engineering impact."
      />
    </div>
  );
}
