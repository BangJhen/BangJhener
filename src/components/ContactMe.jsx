import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { ProfileCard } from "@/components/ui/profile-card";

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
      href: "https://linkedin.com",
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
      href: "https://instagram.com/bangjhener",
      accent: "from-pink-500/20 to-violet-500/20 border-pink-300/35",
      icon: Instagram,
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-[#060b17] py-28 text-white">
      <div className="pointer-events-none absolute -left-24 top-8 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-[5%]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold md:text-5xl">Contact Me</h2>
          <p className="mt-4 text-slate-300">
            Reach me through this communication orbit.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-[1fr_minmax(220px,280px)]">
          <div className="grid gap-5 md:grid-cols-2">
            {contacts.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label === "Email" ? undefined : "_blank"}
                rel={item.label === "Email" ? undefined : "noopener noreferrer"}
                className={`group rounded-2xl border bg-gradient-to-br p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(56,189,248,0.2)] ${item.accent}`}>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-100/30 bg-[#020617]/55 text-cyan-100">
                  <item.icon size={18} aria-hidden="true" />
                </span>
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-cyan-200/80">{item.label}</p>
                <p className="mt-2 text-lg font-semibold text-white transition-colors group-hover:text-cyan-100">{item.value}</p>
              </a>
            ))}
          </div>
          <div className="w-full max-w-[280px] lg:justify-self-end">
            <ProfileCard
              name="Muhammad Ammar Ridho"
              role="AI/ML Engineer · Web Developer"
              location="Bandung, Jawa Barat"
              imageSrc=""
            />
          </div>
        </div>
      </div>

      <footer className="mt-16 border-t border-cyan-900/40 pt-7 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} Ammar Ridho · Designed for the stars.</p>
      </footer>
    </section>
  );
}
