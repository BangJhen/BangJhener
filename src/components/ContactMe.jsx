import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

export default function ContactMe() {
  const contacts = [
    {
      label: "Email",
      value: "jhenerar21@gmail.com",
      href: "mailto:jhenerar21@gmail.com",
      accent: "from-cyan-400/20 to-blue-500/20 border-cyan-300/35",
      icon: Mail,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com",
      href: "https://www.linkedin.com/in/ammar-ridho",
      accent: "from-blue-500/20 to-indigo-500/20 border-blue-300/35",
      icon: Linkedin,
    },
    {
      label: "GitHub",
      value: "github.com/BangJhen",
      href: "https://github.com/BangJhen",
      accent: "from-slate-400/20 to-slate-600/20 border-slate-300/35",
      icon: Github,
    },
    {
      label: "Instagram",
      value: "@bangjhener",
      href: "https://www.instagram.com/ammarridhojr/",
      accent: "from-pink-500/20 to-violet-500/20 border-pink-300/35",
      icon: Instagram,
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-[#060b17] py-12 text-white md:py-28">
      <div className="pointer-events-none absolute -left-16 top-4 h-36 w-36 rounded-full bg-cyan-500/15 blur-3xl md:-left-24 md:top-8 md:h-64 md:w-64" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl md:-right-24 md:h-72 md:w-72" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-[5%]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-[1.35rem] font-bold leading-tight md:text-5xl">Contact Me</h2>
          <p className="mt-1.5 text-xs text-slate-300 md:mt-4 md:text-base">
            Reach me through this communication orbit.
          </p>
        </div>

        <div className="mx-auto mt-6 grid max-w-6xl items-stretch gap-3 md:mt-12 md:gap-6 lg:grid-cols-2">
          <div className="space-y-3 md:space-y-5">
            <a
              href="mailto:jhenerar21@gmail.com"
              className="group block rounded-lg border border-cyan-300/35 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(56,189,248,0.2)] md:rounded-2xl md:p-6">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-100/30 bg-[#020617]/55 text-cyan-100 md:h-10 md:w-10">
                <Mail size={14} aria-hidden="true" />
              </span>
              <p className="text-[0.62rem] uppercase tracking-[0.16em] text-cyan-200/80 md:text-[0.7rem] md:tracking-[0.18em]">Email</p>
              <p className="mt-1 text-[0.88rem] font-semibold text-white transition-colors group-hover:text-cyan-100 md:mt-2 md:text-lg">jhenerar21@gmail.com</p>
            </a>

            <div className="rounded-lg border border-cyan-300/25 bg-[#071225]/75 p-3 md:rounded-2xl md:p-7">
              <p className="text-[0.62rem] uppercase tracking-[0.16em] text-cyan-200/80 md:text-[0.7rem] md:tracking-[0.18em]">Social Media</p>
              <div className="mt-2.5 flex items-center gap-2.5 md:mt-4 md:gap-4">
                {contacts
                  .filter((item) => item.label !== "Email")
                  .map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan-100/30 bg-[#020617]/60 text-cyan-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200/70 hover:text-white hover:shadow-[0_0_16px_rgba(34,211,238,0.45)] md:h-14 md:w-14">
                      <item.icon size={16} aria-hidden="true" />
                    </a>
                  ))}
              </div>
            </div>
          </div>
          <div className="w-full">
            <a
              href="https://linktr.ee/BangJhener"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full rounded-lg border border-emerald-300/35 bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(16,185,129,0.3)] md:rounded-2xl md:p-5">
              <p className="text-[0.62rem] uppercase tracking-[0.16em] text-emerald-100/90 md:text-[0.7rem] md:tracking-[0.18em]">Linktree</p>
              <p className="mt-1 text-[0.84rem] font-semibold text-white md:text-base">linktr.ee/BangJhener</p>
              <div className="relative mt-2.5 aspect-square w-full overflow-hidden rounded-md border border-emerald-100/30 bg-white p-1.5 md:mt-4 md:rounded-xl md:p-2">
                <Image
                  src="/assets/images/linktree-bangjhener.svg"
                  alt="QR code Linktree BangJhener"
                  fill
                  sizes="(max-width: 1024px) 90vw, 560px"
                  className="object-contain"
                />
              </div>
            </a>
          </div>
        </div>
      </div>

      <footer className="mt-6 md:mt-16">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-[5%]">
          <div className="rounded-md border border-cyan-900/45 bg-[#061022]/75 px-2.5 py-2 backdrop-blur-sm md:rounded-2xl md:px-5 md:py-4">
            <div className="flex items-center justify-between gap-2 text-left">
              <div className="min-w-0 flex-1">
                <p className="truncate whitespace-nowrap text-[0.58rem] font-semibold text-cyan-100 md:text-xs">Ammar Ridho</p>
                <p className="truncate whitespace-nowrap text-[0.54rem] text-slate-300 md:text-[0.7rem]">AI/ML Engineer · Web Developer</p>
              </div>
              <div className="flex items-center gap-1.5 whitespace-nowrap text-slate-400">
                <span className="text-[0.6rem] leading-none md:text-xs">© {new Date().getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
