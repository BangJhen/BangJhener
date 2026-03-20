import React from "react";
import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const imagePlaceholderClass =
  "h-full w-full rounded-lg border border-dashed border-cyan-700/40 bg-[#0b1120]/70 grid place-items-center text-xs uppercase tracking-[0.14em] text-cyan-300/70";

function JourneyEvent({ month, title, detail, imageSrc, imageAlt, imageHeightClass = "h-[30rem] sm:h-[36rem]" }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/80">{month}</p>
      <p className="mt-2 font-semibold text-cyan-200">{title}</p>
      <p className="mt-2 text-slate-400">{detail}</p>
      <ContainerScroll
        compact
        className="mt-14 max-w-[28rem] sm:max-w-[40rem] lg:max-w-[50rem]"
        cardClassName="w-full overflow-hidden rounded-[3rem] border-2 border-zinc-600/80 bg-[#1c1c1f] p-5 sm:p-7 shadow-[0_36px_72px_rgba(0,0,0,0.55)]"
        innerClassName="h-full w-full">
        <div className="h-full w-full rounded-[2.5rem] bg-zinc-100 p-5 sm:p-7">
          <div className={`relative w-full overflow-hidden rounded-[2rem] bg-[#0b1120] ${imageHeightClass}`}>
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
          month="Jun 2021"
          title="Started SMK Negeri 2 Depok (Computer & Network Engineering)"
          detail="Began vocational learning path in Teknik Komputer dan Jaringan, building core networking and system fundamentals."
          imageSrc="/assets/images/smkn2-depok2021.jpeg"
          imageAlt="SMK Negeri 2 Depok"
          imageHeightClass="h-[32rem] sm:h-[39rem]"
        />
      ),
    },
    {
      title: "Oct 2023",
      content: (
        <JourneyEvent
          month="Oct 2023"
          title="Finalist Olimpiade Jaringan Mikrotik (National)"
          detail="Reached national finalist stage in MikroTik Networking Olympiad, strengthening practical network engineering and competitive discipline."
          imageSrc="/assets/images/olimpiade-jaringan-mikrotik-2023.jpg"
          imageAlt="Finalist Olimpiade Jaringan Mikrotik 2023"
          imageHeightClass="h-[30rem] sm:h-[36rem]"
        />
      ),
    },
    {
      title: "Aug 2024",
      content: (
        <JourneyEvent
          month="Aug 2024"
          title="Started S1 Data Science - Telkom University"
          detail="Started undergraduate journey in Data Science, combining statistics, machine learning, and software engineering practice."
          imageSrc="/assets/images/masuk-telkom-university.jpeg"
          imageAlt="Masuk Telkom University"
          imageHeightClass="h-[32rem] sm:h-[39rem]"
        />
      ),
    },
    {
      title: "Nov 2024",
      content: (
        <JourneyEvent
          month="Nov 2024"
          title="3rd Place ADIKARA Data Mining Competition"
          detail="Built a hybrid CNN-LSTM deep learning approach for multivariate food price forecasting."
          imageSrc="/assets/images/adikara2024-award.jpeg"
          imageAlt="ADIKARA 2024 award"
          imageHeightClass="h-[31rem] sm:h-[38rem]"
        />
      ),
    },
    {
      title: "Mar 2025",
      content: (
        <JourneyEvent
          month="Mar 2025"
          title="10th Place Kaggle Datavidia"
          detail="Developed deep learning forecasting models for 13 commodities across 34 provinces in Indonesia."
          imageSrc="/assets/images/datavidia9-2025.png"
          imageAlt="Kaggle Datavidia 2025"
          imageHeightClass="h-[32rem] sm:h-[39rem]"
        />
      ),
    },
    {
      title: "Apr 2025",
      content: (
        <JourneyEvent
          month="Apr 2025"
          title="Web Scraping R&D - Central Computer Improvement"
          detail="Developed scalable crawling pipelines with TypeScript, Puppeteer, Axios, and session-based retrieval strategies."
        />
      ),
    },
    {
      title: "May 2025",
      content: (
        <JourneyEvent
          month="May 2025"
          title="PIC Data Mining Competition - PRODIGI"
          detail="Led Data Mining division, mentoring members and building a learning ecosystem for competitions and AI innovation."
        />
      ),
    },
    {
      title: "Sep 2025",
      content: (
        <JourneyEvent
          month="Sep 2025"
          title="Finalist GEMASTIK XVIII Data Mining"
          detail="Designed fraud detection for P2P lending using GCN and ensemble optimization with strong AUC performance."
          imageSrc="/assets/images/finalist-gemastik2025.jpeg"
          imageAlt="Finalist GEMASTIK 2025"
          imageHeightClass="h-[31rem] sm:h-[38rem]"
        />
      ),
    },
    {
      title: "Nov 2025",
      content: (
        <JourneyEvent
          month="Nov 2025"
          title="Mentor & Curriculum Machine Learning - GDGoC"
          detail="Designed and delivered a beginner-friendly ML curriculum from data prep and model training to Streamlit deployment."
        />
      ),
    },
    {
      title: "Jan 2026",
      content: (
        <JourneyEvent
          month="Jan 2026"
          title="Mentor of Data Research - CCI"
          detail="Mentoring research-focused projects and guiding practical AI implementation for student and community initiatives."
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
