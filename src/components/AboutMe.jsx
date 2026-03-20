import { missionMetrics } from "@/data/portfolio";
import TechIconCloud from "@/components/TechIconCloud";

export default function AboutMe() {
  return (
    <section id="about" className="py-20 bg-[#0b1120] text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
              <span className="w-12 h-[1px] bg-cyan-500"></span>
              About Me
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6 text-lg">
              I am Muhammad Ammar Ridho, a Data Science undergraduate at Telkom University
              (GPA 3.81) who builds practical AI and web solutions. I currently contribute as
              Mentor of Data Research at Central Computer Improvement and Mentor & Curriculum
              Machine Learning at GDGOC Telkom University.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              My work spans web scraping pipelines with TypeScript (Puppeteer, Axios) and machine
              learning projects from forecasting to computer vision. Recent highlights include 1st
              place on the Kaggle Data Slayer 2025 leaderboard and finalist at GEMASTIK XVIII
              Data Mining.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {missionMetrics.map((metric) => (
                <div key={metric.label} className="p-4 bg-[#1e293b] rounded-lg border border-gray-800">
                  <div className="text-3xl font-bold text-cyan-400 mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-6 text-gray-200 text-center">Tech Stack</h3>
            <div className="mb-8 w-full flex justify-center">
              <TechIconCloud />
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
