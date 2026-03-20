export default function ContactMe() {
  return (
    <section id="contact" className="py-20 bg-[#0b1120] text-white relative overflow-hidden">
        {/* Decorative Planet */}
      <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-600/20 to-purple-600/20 blur-2xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Collaborate?</h2>
          <p className="text-gray-400 mb-10 text-lg">
            Whether you have a question, a project idea, or just want to say hello,
            my communication channels are open.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="mailto:ammar@example.com"
              className="px-8 py-4 bg-white text-slate-900 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <span>✉️</span> Send Email
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#0077b5] text-white rounded-lg font-medium hover:bg-[#006396] transition-colors flex items-center justify-center gap-2"
            >
              <span>in</span> LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#333] text-white rounded-lg font-medium hover:bg-[#24292e] transition-colors flex items-center justify-center gap-2"
            >
              <span>🐙</span> GitHub
            </a>
          </div>
        </div>
      </div>

      <footer className="mt-20 border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Ammar Ridho. Designed for the stars.</p>
      </footer>
    </section>
  );
}
