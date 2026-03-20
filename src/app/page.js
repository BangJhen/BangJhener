"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/hero-section";
import AboutMe from "@/components/AboutMe";
import Project from "@/components/Project";
import ContactMe from "@/components/ContactMe";
import styles from "./page.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Home() {
  const containerRef = useRef(null);
  const lenisRef = useRef(null);
  const [showBigBang, setShowBigBang] = useState(true);
  const [explode, setExplode] = useState(true);

  useEffect(() => {
    let hideTimer;
    hideTimer = window.setTimeout(() => setShowBigBang(false), 100);

    document.documentElement.classList.add("parallax-no-bounce");
    document.body.classList.add("parallax-no-bounce");

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (hideTimer) window.clearTimeout(hideTimer);
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("parallax-no-bounce");
      document.body.classList.remove("parallax-no-bounce");
    };
  }, []);

  useEffect(() => {
    if (showBigBang) {
      document.documentElement.classList.add("overflow-hidden");
      document.body.classList.add("overflow-hidden");
      lenisRef.current?.stop();
      return;
    }

    document.documentElement.classList.remove("overflow-hidden");
    document.body.classList.remove("overflow-hidden");
    lenisRef.current?.start();

    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, [showBigBang]);

  useGSAP(
    () => {
      const heroElement = containerRef.current?.querySelector("[data-parallax='hero']");
      const hoverTargets = gsap.utils.toArray("[data-hover-depth]:not([data-decor-delay='true'])");

      if (hoverTargets.length > 0) {
        gsap.from(hoverTargets, {
          opacity: 0,
          y: 30,
          filter: "blur(12px)",
          duration: 1.15,
          stagger: 0.06,
          ease: "power2.out",
        });
      }

      gsap.to("[data-layer='bg']", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-parallax='hero']",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.fromTo(
        "[data-layer='ripple']",
        { yPercent: 10, opacity: 0.65, scale: 0.95 },
        {
          yPercent: -30,
          opacity: 1,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-parallax='hero']",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      gsap.to("[data-layer='stars']", {
        yPercent: -35,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-parallax='hero']",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to("[data-layer='particles']", {
        yPercent: -42,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-parallax='hero']",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to("[data-layer='decor']", {
        yPercent: -55,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-parallax='hero']",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to("[data-layer='content']", {
        yPercent: 34,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-parallax='hero']",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      ScrollTrigger.create({
        trigger: "[data-parallax='hero']",
        start: "100% top",
        onEnter: () => {
          gsap
            .timeline({ defaults: { overwrite: "auto" } })
            .to("[data-sink-title='hero']", {
              y: () => window.innerHeight * 0.24,
              scale: 0.98,
              autoAlpha: 1,
              duration: 0.24,
              ease: "power1.in",
            })
            .to("[data-sink-title='hero']", {
              y: () => window.innerHeight * 1.75,
              scale: 0.66,
              autoAlpha: 0,
              duration: 0.5,
              ease: "power4.in",
            });
        },
        onLeaveBack: () => {
          gsap.to("[data-sink-title='hero']", {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
      });

      if (!heroElement || hoverTargets.length === 0 || !window.matchMedia("(pointer: fine)").matches) {
        return;
      }

      const setters = hoverTargets.map((target) => {
        const setX = gsap.quickTo(target, "x", { duration: 0.55, ease: "power3.out" });
        const setY = gsap.quickTo(target, "y", { duration: 0.55, ease: "power3.out" });
        const setRotate = gsap.quickTo(target, "rotation", { duration: 0.6, ease: "power2.out" });
        return { target, setX, setY, setRotate };
      });

      const onPointerMove = (event) => {
        const rect = heroElement.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - 0.5;
        const ny = (event.clientY - rect.top) / rect.height - 0.5;

        setters.forEach(({ target, setX, setY, setRotate }) => {
          const depth = Number(target.getAttribute("data-hover-depth")) || 16;
          setX(nx * depth * 2.4);
          setY(ny * depth * 2.4);
          setRotate(nx * depth * 0.16);
        });
      };

      const onPointerLeave = () => {
        setters.forEach(({ setX, setY, setRotate }) => {
          setX(0);
          setY(0);
          setRotate(0);
        });
      };

      heroElement.addEventListener("pointermove", onPointerMove);
      heroElement.addEventListener("pointerleave", onPointerLeave);

      return () => {
        heroElement.removeEventListener("pointermove", onPointerMove);
        heroElement.removeEventListener("pointerleave", onPointerLeave);
      };
    },
    { scope: containerRef }
  );

  return (
    <main ref={containerRef} className={`${styles.page} bg-[#0f172a] min-h-screen text-white selection:bg-cyan-500/30 font-sans`}>
      {showBigBang ? (
        <div className="pointer-events-auto fixed inset-0 z-[2147483647] grid place-items-center bg-black">
          <div className="relative grid place-items-center">
            <div
              className={`absolute h-24 w-24 rounded-full bg-cyan-300/40 blur-xl transition-all duration-[1400ms] ease-out ${
                explode ? "scale-[3.8] opacity-0" : "scale-75 opacity-0"
              }`}
            />
            <div
              className={`h-3 w-3 rounded-full bg-cyan-100 shadow-[0_0_24px_rgba(186,230,253,1)] transition-all duration-[1200ms] ease-out ${
                explode ? "scale-[8] opacity-0" : "scale-100 opacity-0"
              }`}
            />
          </div>
        </div>
      ) : null}
      <Navigation />
      <HeroSection styles={styles} />
      <AboutMe />
      <Project />
      <ContactMe />
    </main>
  );
}
