import { featuredProjects } from "@/data/portfolio";

export default function Project() {
  return (
    <section id="projects" className="py-20 bg-[#0f172a] text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-cyan-400 uppercase tracking-widest text-sm mb-2">My Work</p>
          <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <article
              key={project.title}
              className="bg-[#1e293b] rounded-xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 border border-gray-800 group h-full flex flex-col"
            >
              <div className="p-8 flex-grow">
                <div className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2">
                  {project.type}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {project.summary}
                </p>
                <div className="text-xs text-gray-500 font-mono mb-6 pb-6 border-b border-gray-700">
                  {project.stack}
                </div>
              </div>
              <div className="px-8 pb-8 mt-auto">
                 <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-white hover:text-cyan-400 transition-colors"
                >
                  {project.linkLabel} <span className="ml-2">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
