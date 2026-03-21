"use client";

import { useEffect, useState } from "react";
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
  const [cloudSize, setCloudSize] = useState(320);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 640px)");
    const tabletQuery = window.matchMedia("(max-width: 1024px)");

    const updateSize = () => {
      if (mobileQuery.matches) {
        setCloudSize(240);
        return;
      }

      if (tabletQuery.matches) {
        setCloudSize(300);
        return;
      }

      setCloudSize(360);
    };

    updateSize();
    mobileQuery.addEventListener("change", updateSize);
    tabletQuery.addEventListener("change", updateSize);

    return () => {
      mobileQuery.removeEventListener("change", updateSize);
      tabletQuery.removeEventListener("change", updateSize);
    };
  }, []);

  return (
    <div className="relative flex w-full max-w-none justify-center">
      <div
        className="relative rounded-full border border-cyan-700/30"
        style={{ width: cloudSize, height: cloudSize }}>
        <IconCloud images={techIcons} size={cloudSize} />
      </div>
    </div>
  );
}
