"use client";

import { ChevronUp, Github, Instagram, Linkedin, Mail } from "lucide-react";
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
    <section id="contact" className="relative overflow-hidden bg-[#060b17] py-12 text-white lg:py-28">
      <div className="pointer-events-none absolute -left-16 top-4 h-36 w-36 rounded-full bg-cyan-500/15 blur-3xl lg:-left-24 lg:top-8 lg:h-64 lg:w-64" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl lg:-right-24 lg:h-72 lg:w-72" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 lg:px-[5%]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-[1.35rem] font-bold leading-tight lg:text-5xl">Contact Me</h2>
          <p className="mt-1.5 text-xs text-slate-300 lg:mt-4 lg:text-base">
            Reach me through this communication orbit.
          </p>
        </div>

        <div className="mx-auto mt-6 grid max-w-6xl items-stretch gap-3 lg:mt-12 lg:gap-6 lg:grid-cols-2">
          <div className="space-y-3 lg:space-y-5">
            <a
              href="mailto:jhenerar21@gmail.com"
              className="group block rounded-lg border border-cyan-300/35 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(56,189,248,0.2)] lg:rounded-2xl lg:p-6">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-100/30 bg-[#020617]/55 text-cyan-100 lg:h-10 lg:w-10">
                <Mail size={14} aria-hidden="true" />
              </span>
              <p className="text-[0.62rem] uppercase tracking-[0.16em] text-cyan-200/80 lg:text-[0.7rem] lg:tracking-[0.18em]">Email</p>
              <p className="mt-1 text-[0.88rem] font-semibold text-white transition-colors group-hover:text-cyan-100 lg:mt-2 lg:text-lg">jhenerar21@gmail.com</p>
            </a>

            <div className="rounded-lg border border-cyan-300/25 bg-[#071225]/75 p-3 lg:rounded-2xl lg:p-7">
              <p className="text-[0.62rem] uppercase tracking-[0.16em] text-cyan-200/80 lg:text-[0.7rem] lg:tracking-[0.18em]">Social Media</p>
              <div className="mt-2.5 flex items-center gap-2.5 lg:mt-4 lg:gap-4">
                {contacts
                  .filter((item) => item.label !== "Email")
                  .map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan-100/30 bg-[#020617]/60 text-cyan-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200/70 hover:text-white hover:shadow-[0_0_16px_rgba(34,211,238,0.45)] lg:h-14 lg:w-14">
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
              className="block h-full rounded-lg border border-emerald-300/35 bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(16,185,129,0.3)] lg:rounded-2xl lg:p-5">
              <p className="text-[0.62rem] uppercase tracking-[0.16em] text-emerald-100/90 lg:text-[0.7rem] lg:tracking-[0.18em]">Linktree</p>
              <p className="mt-1 text-[0.84rem] font-semibold text-white lg:text-base">linktr.ee/BangJhener</p>
              <div className="relative mx-auto mt-2.5 aspect-square w-full max-w-[220px] overflow-hidden rounded-md border border-emerald-100/30 bg-white p-1.5 lg:mt-4 lg:max-w-none lg:rounded-xl lg:p-2">
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

      <footer className="mt-6 lg:mt-16">
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-[5%]">
          <div className="rounded-md border border-cyan-900/45 bg-[#061022]/75 px-2.5 py-2 backdrop-blur-sm lg:rounded-2xl lg:px-5 lg:py-4">
            <div className="flex items-center justify-between gap-2 text-left">
              <div className="min-w-0 flex-1">
                <p className="truncate whitespace-nowrap text-[0.58rem] font-semibold text-cyan-100 lg:text-xs">Ammar Ridho</p>
                <p className="truncate whitespace-nowrap text-[0.54rem] text-slate-300 lg:text-[0.7rem]">AI/ML Engineer · Web Developer</p>
              </div>
              <div className="flex items-center gap-1.5 whitespace-nowrap text-slate-400">
                <span className="text-[0.6rem] leading-none lg:text-xs">© {new Date().getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <button
        type="button"
        aria-label="Back to hero"
        onClick={() => {
          const heroElement = document.getElementById("hero");
          if (!heroElement) return;
          heroElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        className="fixed bottom-4 right-4 z-[80] inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-200/35 bg-cyan-400/10 text-cyan-100 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-100/70 hover:bg-cyan-300/20 hover:shadow-[0_0_16px_rgba(34,211,238,0.45)] lg:bottom-6 lg:right-6">
        <ChevronUp size={18} aria-hidden="true" />
      </button>
    </section>
  );
}
