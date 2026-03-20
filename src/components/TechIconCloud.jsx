"use client";

import { IconCloud } from "@/components/ui/icon-cloud";

const techIcons = [
  "https://cdn.simpleicons.org/javascript",
  "https://cdn.simpleicons.org/typescript",
  "https://cdn.simpleicons.org/python",
  "https://cdn.simpleicons.org/tensorflow",
  "https://cdn.simpleicons.org/pytorch",
  "https://cdn.simpleicons.org/scikitlearn",
  "https://cdn.simpleicons.org/react",
  "https://cdn.simpleicons.org/nextdotjs",
  "https://cdn.simpleicons.org/nodedotjs",
  "https://cdn.simpleicons.org/github",
  "https://cdn.simpleicons.org/git",
  "https://cdn.simpleicons.org/docker",
  "https://cdn.simpleicons.org/postgresql",
  "https://cdn.simpleicons.org/tailwindcss",
  "https://cdn.simpleicons.org/html5",
  "https://cdn.simpleicons.org/css",
];

export default function TechIconCloud() {
  return (
    <div className="relative mx-auto w-full max-w-sm rounded-2xl border border-cyan-900/40 bg-[#0f172a]/70 p-4 shadow-[0_0_40px_rgba(6,182,212,0.1)]">
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.2),transparent_55%)]" />
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-400/15 blur-2xl" />
      <IconCloud images={techIcons} />
    </div>
  );
}
