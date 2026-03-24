"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

import Navigation from "@/components/Navigation";
import EarthHero from "@/components/EarthHero";
import AboutMe from "@/components/AboutMe";
import Project from "@/components/Project";
import ContactMe from "@/components/ContactMe";
import styles from "./page.module.css";

export default function Home() {
  const lenisRef = useRef(null);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (hasInitializedRef.current) {
      return;
    }
    hasInitializedRef.current = true;

    document.documentElement.classList.add("parallax-no-bounce");
    document.body.classList.add("parallax-no-bounce");

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    const handleScrollToHero = () => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo("#hero", {
          duration: 1.35,
          easing: (t) => 1 - Math.pow(1 - t, 3),
        });
        return;
      }

      const heroElement = document.getElementById("hero");
      if (!heroElement) return;
      heroElement.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    window.addEventListener("portfolio:scroll-to-hero", handleScrollToHero);

    const update = (timestampMs) => {
      lenis.raf(timestampMs * 1000);
    };

    let rafId = 0;
    const rafLoop = (time) => {
      update(time);
      rafId = window.requestAnimationFrame(rafLoop);
    };
    rafId = window.requestAnimationFrame(rafLoop);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("portfolio:scroll-to-hero", handleScrollToHero);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("parallax-no-bounce");
      document.body.classList.remove("parallax-no-bounce");
    };
  }, []);

  return (
    <main className={`${styles.page} bg-[#0f172a] min-h-screen text-white selection:bg-cyan-500/30 font-sans`}>
      <Navigation />
      <EarthHero />
      <AboutMe />
      <Project />
      <ContactMe />
    </main>
  );
}
