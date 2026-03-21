"use client";

import { useEffect, useState, useRef } from "react";
import { Particles } from "@/components/ui/particles";
import { LinkPreview } from "@/components/ui/link-preview";
import { ScrollFloat } from "@/components/ui/scroll-float";
import { DECOR_APPEAR_DELAY_MS, telkomUniversityPreview } from "@/data/portfolio";

export default function HeroSection({ styles }) {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const [enableHeroFx, setEnableHeroFx] = useState(false);

  useEffect(() => {
    const mediaReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mediaDesktop = window.matchMedia("(min-width: 769px)");
    const updateFxMode = () => {
      setEnableHeroFx(mediaDesktop.matches && !mediaReduce.matches);
    };
    updateFxMode();
    mediaReduce.addEventListener("change", updateFxMode);
    mediaDesktop.addEventListener("change", updateFxMode);
    return () => {
      mediaReduce.removeEventListener("change", updateFxMode);
      mediaDesktop.removeEventListener("change", updateFxMode);
    };
  }, []);

  useEffect(() => {
    if (!enableHeroFx) {
      return;
    }
    const heroElement = heroRef.current;
    const canvas = canvasRef.current;

    if (!heroElement || !canvas) {
      return;
    }

    const ctx = canvas.getContext("2d", { alpha: true });

    if (!ctx) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const trailPresets = {
      calm: {
        spawnInterval: 0.82,
        speedMin: 170,
        speedMax: 320,
        driftYMin: -55,
        driftYMax: 110,
        radiusMin: 2.4,
        radiusMax: 4.2,
        trailMaxPoints: 44,
        trailFadeDelay: 0.34,
        trailFadeDuration: 1.4,
      },
      epic: {
        spawnInterval: 0.38,
        speedMin: 280,
        speedMax: 500,
        driftYMin: -90,
        driftYMax: 180,
        radiusMin: 2.8,
        radiusMax: 6.4,
        trailMaxPoints: 28,
        trailFadeDelay: 0.18,
        trailFadeDuration: 0.9,
      },
    };
    const activePresetName = "calm";
    const activePreset = trailPresets[activePresetName];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let rafId = 0;
    let startTimeoutId = 0;
    let lastTime = performance.now();
    let spawnTimer = 0;

    const asteroids = [];

    const resize = () => {
      const rect = heroElement.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnAsteroid = () => {
      const fromTopBand = Math.random() < 0.55;
      const startX = -40;
      const startY = fromTopBand ? Math.random() * height * 0.55 : height * (0.55 + Math.random() * 0.35);

      asteroids.push({
        x: startX,
        y: startY,
        vx: activePreset.speedMin + Math.random() * (activePreset.speedMax - activePreset.speedMin),
        vy: activePreset.driftYMin + Math.random() * (activePreset.driftYMax - activePreset.driftYMin),
        radius: activePreset.radiusMin + Math.random() * (activePreset.radiusMax - activePreset.radiusMin),
        hue: 192 + Math.random() * 25,
        trail: [],
        isDead: false,
      });
    };

    const drawTrail = (asteroid) => {
      if (asteroid.trail.length < 2) {
        return;
      }

      for (let i = 1; i < asteroid.trail.length; i += 1) {
        const prev = asteroid.trail[i - 1];
        const next = asteroid.trail[i];
        const gradient = ctx.createLinearGradient(prev.x, prev.y, next.x, next.y);
        gradient.addColorStop(0, `hsla(${asteroid.hue}, 88%, 70%, ${prev.alpha * 0.55})`);
        gradient.addColorStop(1, `hsla(${asteroid.hue}, 100%, 86%, ${next.alpha * 0.98})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = asteroid.radius * (0.7 + next.alpha);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(next.x, next.y);
        ctx.stroke();
      }
    };

    const drawAsteroid = (asteroid) => {
      ctx.fillStyle = `rgba(241, 245, 249, ${asteroid.isDead ? 0 : 0.95})`;
      ctx.shadowColor = `hsla(${asteroid.hue}, 95%, 72%, 0.85)`;
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const frame = (time) => {
      const delta = Math.min((time - lastTime) / 1000, 0.045);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      spawnTimer += delta;
      const interval = reduceMotion ? activePreset.spawnInterval * 1.8 : activePreset.spawnInterval;

      while (spawnTimer >= interval) {
        spawnTimer -= interval;
        spawnAsteroid();
      }

      for (let i = asteroids.length - 1; i >= 0; i -= 1) {
        const asteroid = asteroids[i];
        if (!asteroid.isDead) {
          const speedScale = reduceMotion ? 0.65 : 1;
          asteroid.x += asteroid.vx * delta * speedScale;
          asteroid.y += asteroid.vy * delta * speedScale;
          asteroid.trail.push({ x: asteroid.x, y: asteroid.y, age: 0, alpha: 1 });
          if (asteroid.trail.length > activePreset.trailMaxPoints) {
            asteroid.trail.shift();
          }
        }

        for (let j = asteroid.trail.length - 1; j >= 0; j -= 1) {
          const p = asteroid.trail[j];
          p.age += delta;
          const fadeAge = p.age - activePreset.trailFadeDelay;
          if (fadeAge <= 0) {
            p.alpha = 1;
          } else {
            p.alpha = Math.max(0, 1 - fadeAge / activePreset.trailFadeDuration);
          }

          if (p.alpha <= 0 && j <= asteroid.trail.length - 2) {
            asteroid.trail.splice(j, 1);
          }
        }

        drawTrail(asteroid);
        if (!asteroid.isDead) {
          drawAsteroid(asteroid);
        }

        if (!asteroid.isDead && (asteroid.x > width + 180 || asteroid.y < -120 || asteroid.y > height + 120)) {
          asteroid.isDead = true;
        }

        if (asteroid.isDead && asteroid.trail.length <= 1) {
          asteroids.splice(i, 1);
        }
      }

      rafId = window.requestAnimationFrame(frame);
    };

    const startAsteroidMotion = () => {
      lastTime = performance.now();
      rafId = window.requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    startTimeoutId = window.setTimeout(startAsteroidMotion, DECOR_APPEAR_DELAY_MS);

    return () => {
      window.clearTimeout(startTimeoutId);
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      ctx.clearRect(0, 0, width, height);
    };
  }, [enableHeroFx]);

  return (
    <section id="hero" ref={heroRef} className={`${styles.hero} ${styles.heroCinematic}`} data-parallax="hero">
      <div className={styles.introBombReveal} aria-hidden="true" />
      <div className={styles.bg} data-layer="bg" data-hover-depth="6" />
      <div className={styles.stars} data-layer="stars" data-hover-depth="14" />
      {enableHeroFx ? (
        <Particles
          className={styles.particlesLayer}
          data-layer="particles"
          data-hover-depth="12"
          quantity={76}
          staticity={72}
          ease={62}
          size={0.75}
          color="#c8e7ff"
          vx={0.012}
          vy={-0.008}
        />
      ) : null}
      <div className={styles.decor} data-layer="decor" data-hover-depth="20">
        <span className={`${styles.star} ${styles.starOne}`} data-hover-depth="30" />
        <span className={`${styles.star} ${styles.starTwo}`} data-hover-depth="26" />
        <span className={`${styles.star} ${styles.starThree}`} data-hover-depth="22" />
        <span className={`${styles.star} ${styles.starFour}`} data-hover-depth="24" />
        <span className={`${styles.orb} ${styles.orbOne}`} data-hover-depth="18" />
        <span className={`${styles.orb} ${styles.orbTwo}`} data-hover-depth="16" />

        <span className={`${styles.spaceIcon} ${styles.moonIcon}`} data-hover-depth="28" aria-hidden="true">
          <svg viewBox="0 0 120 120" role="presentation">
            <defs>
              <radialGradient id="moonGlow" cx="40%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#f8fbff" />
                <stop offset="70%" stopColor="#d9e7ff" />
                <stop offset="100%" stopColor="#9fb9eb" />
              </radialGradient>
            </defs>
            <circle cx="60" cy="60" r="34" fill="url(#moonGlow)" />
            <circle cx="73" cy="55" r="34" fill="#0f172a" opacity="0.6" />
            <circle cx="40" cy="48" r="4" fill="#c9daf7" opacity="0.5" />
            <circle cx="52" cy="73" r="5" fill="#c9daf7" opacity="0.35" />
          </svg>
        </span>

        {enableHeroFx ? (
          <span className={`${styles.spaceIcon} ${styles.saturnIcon}`} data-hover-depth="24" aria-hidden="true">
            <svg viewBox="0 0 180 120" role="presentation">
              <ellipse cx="90" cy="64" rx="60" ry="15" fill="none" stroke="#91a9ff" strokeWidth="6" opacity="0.55" />
              <ellipse cx="90" cy="64" rx="52" ry="12" fill="none" stroke="#d8e5ff" strokeWidth="2" opacity="0.7" />
              <defs>
                <radialGradient id="saturnFill" cx="30%" cy="30%" r="75%">
                  <stop offset="0%" stopColor="#ffe8b4" />
                  <stop offset="65%" stopColor="#f2c272" />
                  <stop offset="100%" stopColor="#bd7f44" />
                </radialGradient>
              </defs>
              <circle cx="90" cy="60" r="24" fill="url(#saturnFill)" />
              <path d="M68 55c6-3 30-3 43 0" stroke="#ffeec4" strokeWidth="3" opacity="0.55" />
              <ellipse cx="90" cy="66" rx="60" ry="15" fill="none" stroke="#5f76cf" strokeWidth="6" opacity="0.4" />
            </svg>
          </span>
        ) : null}

        {enableHeroFx ? (
          <span className={`${styles.spaceIcon} ${styles.cometIcon} ${styles.cometUltra}`} data-hover-depth="32" data-decor-delay="true" aria-hidden="true">
          <svg viewBox="0 0 260 120" role="presentation">
            <defs>
              <linearGradient id="cometTail" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0b1020" stopOpacity="0" />
                <stop offset="38%" stopColor="#0ea5e9" stopOpacity="0.28" />
                <stop offset="72%" stopColor="#22d3ee" stopOpacity="0.62" />
                <stop offset="100%" stopColor="#f0f9ff" stopOpacity="0.98" />
              </linearGradient>
              <linearGradient id="cometTailHot" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
                <stop offset="65%" stopColor="#38bdf8" stopOpacity="0.58" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="cometFlame" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0369a1" stopOpacity="0" />
                <stop offset="44%" stopColor="#0ea5e9" stopOpacity="0.72" />
                <stop offset="100%" stopColor="#ecfeff" stopOpacity="0.98" />
              </linearGradient>
              <radialGradient id="cometHead" cx="45%" cy="45%" r="60%">
                <stop offset="0%" stopColor="#f0f9ff" />
                <stop offset="50%" stopColor="#7dd3fc" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </radialGradient>
            </defs>
            <path className={styles.cometFireOuter} d="M10 96C78 92 152 76 230 30" stroke="url(#cometTail)" strokeWidth="24" strokeLinecap="round" fill="none" />
            <path className={styles.cometFireMid} d="M18 90C84 88 156 72 237 24" stroke="url(#cometFlame)" strokeWidth="14" strokeLinecap="round" fill="none" />
            <path className={styles.cometFireCore} d="M30 86C104 84 174 66 244 22" stroke="url(#cometTailHot)" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path className={styles.cometSparkOne} d="M62 80C126 80 188 63 246 20" stroke="#a5f3fc" strokeOpacity="0.85" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path className={styles.cometSparkTwo} d="M78 94C144 90 202 70 250 28" stroke="#67e8f9" strokeOpacity="0.62" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <circle cx="246" cy="20" r="13" fill="url(#cometHead)" />
          </svg>
          </span>
        ) : null}

        {enableHeroFx ? (
          <span className={`${styles.spaceIcon} ${styles.galaxyIcon}`} data-hover-depth="20" aria-hidden="true">
            <svg viewBox="0 0 160 160" role="presentation">
              <defs>
                <radialGradient id="galaxyCore" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="35%" stopColor="#d9ccff" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="80" cy="80" r="16" fill="url(#galaxyCore)" />
              <path d="M28 83c20-36 84-42 109-5" stroke="#c4b5fd" strokeOpacity="0.55" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M26 98c36 19 87 8 111-28" stroke="#93c5fd" strokeOpacity="0.45" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M40 52c34 3 59 28 71 61" stroke="#f5d0fe" strokeOpacity="0.35" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        ) : null}

        <span className={`${styles.cosmicDust} ${styles.dustOne}`} data-hover-depth="14" aria-hidden="true" />
      </div>
      {enableHeroFx ? <canvas ref={canvasRef} className={styles.epicCanvas} data-epic-canvas="asteroids" aria-hidden="true" /> : null}

      <div className={styles.content} data-layer="content">
        <div className={styles.sinkTitle} data-sink-title="hero">
          <div className={styles.sinkLensContent}>
            <ScrollFloat
              as="h1"
              reverse
              scrollStart="top top+=50%"
              scrollEnd="bottom top+=0%"
              stagger={0.022}
              containerClassName={`${styles.title} ${styles.titleNebula}`}
              textClassName={`${styles.floatInlineText} ${styles.titleStarfield}`}>
              Ammar Ridho
            </ScrollFloat>
            <div className={styles.heroSubtitleWrap}>
              <p className={styles.heroSubtitleRow}>
                <ScrollFloat
                  as="span"
                  reverse
                  scrollStart="top top+=52%"
                  scrollEnd="bottom top+=20%"
                  stagger={0.016}
                  reverseToYPercent={-50}
                  reverseToScaleY={1.14}
                  reverseToScaleX={0.96}
                  reverseToOpacity={0}
                  containerClassName={styles.heroSubtitleSeg}
                  textClassName={styles.heroSubtitleLine}>
                  I am an
                </ScrollFloat>
                <ScrollFloat
                  as="span"
                  reverse
                  scrollStart="top top+=52%"
                  scrollEnd="bottom top+=20%"
                  stagger={0.016}
                  reverseToYPercent={-50}
                  reverseToScaleY={1.14}
                  reverseToScaleX={0.96}
                  reverseToOpacity={0}
                  containerClassName={`${styles.heroSubtitleSeg} ${styles.heroHighlight}`}
                  textClassName={styles.heroSubtitleLine}>
                  AI/ML Engineer
                </ScrollFloat>
                <ScrollFloat
                  as="span"
                  reverse
                  scrollStart="top top+=52%"
                  scrollEnd="bottom top+=20%"
                  stagger={0.016}
                  reverseToYPercent={-50}
                  reverseToScaleY={1.14}
                  reverseToScaleX={0.96}
                  reverseToOpacity={0}
                  containerClassName={styles.heroSubtitleSeg}
                  textClassName={styles.heroSubtitleLine}>
                  and
                </ScrollFloat>
                <ScrollFloat
                  as="span"
                  reverse
                  scrollStart="top top+=52%"
                  scrollEnd="bottom top+=20%"
                  stagger={0.016}
                  reverseToYPercent={-50}
                  reverseToScaleY={1.14}
                  reverseToScaleX={0.96}
                  reverseToOpacity={0}
                  containerClassName={`${styles.heroSubtitleSeg} ${styles.heroHighlight}`}
                  textClassName={styles.heroSubtitleLine}>
                  Web Developer.
                </ScrollFloat>
              </p>

              <p className={`${styles.heroSubtitleRow} ${styles.heroSubtitleMeta}`}>
                <ScrollFloat
                  as="span"
                  reverse
                  scrollStart="top top+=52%"
                  scrollEnd="bottom top+=20%"
                  stagger={0.016}
                  reverseToYPercent={-50}
                  reverseToScaleY={1.14}
                  reverseToScaleX={0.96}
                  reverseToOpacity={0}
                  containerClassName={styles.heroSubtitleSeg}
                  textClassName={styles.heroSubtitleLine}>
                  Active undergraduate Data Science student at
                </ScrollFloat>

                <LinkPreview
                  url="https://smb.telkomuniversity.ac.id/program/s1-data-sains/"
                  title="S1 Data Science"
                  description="Discover the official undergraduate Data Science program at Telkom University."
                  imageSrc={telkomUniversityPreview}
                  imageAlt="Telkom University Data Science program preview"
                  showDetails={false}
                  positionMode="anchor"
                  previewOffsetY={0}
                  className={`${styles.heroLink} ${styles.heroHighlightSoft}`}
                  cardClassName={styles.heroLinkCard}>
                  <ScrollFloat
                    as="span"
                    reverse
                    scrollStart="top top+=52%"
                    scrollEnd="bottom top+=20%"
                    stagger={0.016}
                    reverseToYPercent={-50}
                    reverseToScaleY={1.14}
                    reverseToScaleX={0.96}
                    reverseToOpacity={0}
                    containerClassName={`${styles.heroSubtitleSeg} ${styles.heroLinkFloat}`}
                    textClassName={styles.heroSubtitleLine}>
                    Telkom University.
                  </ScrollFloat>
                </LinkPreview>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rippleLayer} data-layer="ripple" data-hover-depth="10">
        <span className={`${styles.ripple} ${styles.rippleOne}`} data-hover-depth="12" />
        <span className={`${styles.ripple} ${styles.rippleTwo}`} data-hover-depth="9" />
        <span className={`${styles.ripple} ${styles.rippleThree}`} data-hover-depth="7" />
      </div>
      <div className={styles.sinkOverlay} />
    </section>
  );
}
