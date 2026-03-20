import { missionMetrics, skillConstellation } from "@/data/portfolio";

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
              I am an explorer in the digital realm, navigating through data streams and code galaxies.
              Currently pursuing my B.Sc. in Data Science at Telkom University, I bridge the gap
              between analytical precision and creative web engineering.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              My mission is to build intelligent systems that not only function flawlessly but also
              provide stellar user experiences.
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

          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-semibold mb-6 text-gray-200">Tech Constellation</h3>
            <div className="flex flex-wrap gap-3">
              {skillConstellation.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-[#1e293b] rounded-full text-cyan-300 text-sm border border-cyan-900/30 hover:border-cyan-500/50 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
