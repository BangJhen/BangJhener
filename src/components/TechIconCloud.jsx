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
    <div className="relative flex w-full max-w-none justify-center">
      <div className="relative h-[400px] w-[400px] rounded-full border border-cyan-700/30">
        <IconCloud images={techIcons} size={400} />
      </div>
    </div>
  );
}
