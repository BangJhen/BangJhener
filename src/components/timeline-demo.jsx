import React from "react";
import { Timeline } from "@/components/ui/timeline";

const itemClass =
  "rounded-xl border border-cyan-900/40 bg-[#111a2b]/70 p-5 text-sm leading-relaxed text-slate-300";
const imagePlaceholderClass =
  "mt-4 h-36 w-full rounded-lg border border-dashed border-cyan-700/40 bg-[#0b1120]/70 grid place-items-center text-xs uppercase tracking-[0.14em] text-cyan-300/70";

function JourneyEvent({ month, title, detail }) {
  return (
    <div className={itemClass}>
      <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/80">{month}</p>
      <p className="mt-2 font-semibold text-cyan-200">{title}</p>
      <p className="mt-2 text-slate-400">{detail}</p>
      <div className={imagePlaceholderClass}>Image Placeholder</div>
    </div>
  );
}

export default function TimelineDemo() {
  const data = [
    {
      title: "Oct",
      content: (
        <JourneyEvent
          month="Oct 2023"
          title="Finalist Olimpiade Jaringan Mikrotik (National)"
          detail="Reached national finalist stage in MikroTik Networking Olympiad, strengthening practical network engineering and competitive discipline."
        />
      ),
    },
    {
      title: "Oct",
      content: (
        <JourneyEvent
          month="Oct 2024"
          title="CNN Implementation & Hyperparameter Tuning"
          detail="Implemented CNN models on MNIST and Fashion MNIST, then optimized architecture using Keras Tuner."
        />
      ),
    },
    {
      title: "Nov",
      content: (
        <JourneyEvent
          month="Nov 2024 - Jan 2025"
          title="3rd Place ADIKARA Data Mining Competition"
          detail="Built a hybrid CNN-LSTM deep learning approach for multivariate food price forecasting."
        />
      ),
    },
    {
      title: "Mar",
      content: (
        <JourneyEvent
          month="Mar - Apr 2025"
          title="10th Place Kaggle Datavidia"
          detail="Developed deep learning forecasting models for 13 commodities across 34 provinces in Indonesia."
        />
      ),
    },
    {
      title: "Apr",
      content: (
        <JourneyEvent
          month="Apr 2025 - Present"
          title="Web Scraping R&D - Central Computer Improvement"
          detail="Developed scalable crawling pipelines with TypeScript, Puppeteer, Axios, and session-based retrieval strategies."
        />
      ),
    },
    {
      title: "May",
      content: (
        <JourneyEvent
          month="May 2025 - Present"
          title="PIC Data Mining Competition - PRODIGI"
          detail="Led Data Mining division, mentoring members and building a learning ecosystem for competitions and AI innovation."
        />
      ),
    },
    {
      title: "Sep",
      content: (
        <JourneyEvent
          month="Sep 2025"
          title="Finalist GEMASTIK XVIII Data Mining"
          detail="Designed fraud detection for P2P lending using GCN and ensemble optimization with strong AUC performance."
        />
      ),
    },
    {
      title: "Nov",
      content: (
        <JourneyEvent
          month="Nov 2025 - Present"
          title="Mentor & Curriculum Machine Learning - GDGoC"
          detail="Designed and delivered a beginner-friendly ML curriculum from data prep and model training to Streamlit deployment."
        />
      ),
    },
    {
      title: "Dec",
      content: (
        <JourneyEvent
          month="Nov - Dec 2025"
          title="1st Place Kaggle Data Slayer 2025"
          detail="Built a landmark-based video analytics pipeline and ensemble model to secure 1st place leaderboard ranking."
        />
      ),
    },
    {
      title: "Jan",
      content: (
        <JourneyEvent
          month="Jan 2026 - Present"
          title="Mentor of Data Research - CCI"
          detail="Mentoring research-focused projects and guiding practical AI implementation for student and community initiatives."
        />
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip rounded-2xl border border-cyan-900/30 bg-[#0b1120]">
      <Timeline
        data={data}
        title="My Journey"
        description="From networking foundations to AI/ML achievements, mentorship, and real-world engineering impact."
      />
    </div>
  );
}
