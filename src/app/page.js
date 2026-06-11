"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register sekali di module level
gsap.registerPlugin(ScrollTrigger);

import Navigation from "@/components/Navigation";
import EarthHero from "@/components/EarthHero";
import AboutMe from "@/components/AboutMe";
import Project from "@/components/Project";
import ProjectCarousel from "@/components/ProjectCarousel";
import ContactMe from "@/components/ContactMe";
import styles from "./page.module.css";

function ParallaxVideoBackground() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  // useGSAP: otomatis cleanup ScrollTrigger saat unmount
  useGSAP(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!video || !container || !overlay) return;

    // Pause dulu — ScrollTrigger yang kendalikan playback
    video.pause();

    const init = () => {
      // 1. Scrub video currentTime berdasarkan scroll progress
      //    scrub: 1 → butuh 1 detik untuk catch-up ke target → sangat smooth
      gsap.to(video, {
        currentTime: video.duration,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",       // top container menyentuh top viewport → mulai
          end: "bottom bottom",   // bottom container menyentuh bottom viewport → selesai
          scrub: 1,               // smoothing 1 detik (naikkan jika mau lebih smooth)
          onEnter: () => gsap.to(overlay, { opacity: 1, visibility: "visible", duration: 0.5 }),
          onLeave: () => gsap.to(overlay, { opacity: 0, duration: 0.4, onComplete: () => { overlay.style.visibility = "hidden"; } }),
          onEnterBack: () => gsap.to(overlay, { opacity: 1, visibility: "visible", duration: 0.3 }),
          onLeaveBack: () => gsap.to(overlay, { opacity: 0, duration: 0.4, onComplete: () => { overlay.style.visibility = "hidden"; } }),
        },
      });
    };

    // Tunggu metadata video agar video.duration tersedia
    if (video.readyState >= 1) {
      init();
    } else {
      video.addEventListener("loadedmetadata", init, { once: true });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative isolate">
      {/* Video fixed — dikontrol GSAP ScrollTrigger */}
      <div
        ref={overlayRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 5, visibility: "hidden", opacity: 0 }}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/spaceman-background-scrub.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0a0f1e]/55" />
      </div>

      {/* Content scrolls di atas video */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <Project />
        <ProjectCarousel />
      </div>
    </div>
  );
}

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

    // Integrasikan Lenis dengan GSAP ScrollTrigger
    // Setiap kali Lenis scroll, ScrollTrigger ikut update posisinya
    lenis.on("scroll", ScrollTrigger.update);

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
    <main className={`${styles.page} min-h-screen text-white selection:bg-cyan-500/30 font-sans`}>
      <Navigation />
      <EarthHero />
      <AboutMe />
      <ParallaxVideoBackground />
      <ContactMe />
    </main>
  );
}
