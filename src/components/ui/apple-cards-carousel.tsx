"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { motion } from "framer-motion";
import BorderGlow from "./BorderGlow";
import TechStackIcon from "./TechStackIcon";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  url: string;
  liveDemo?: string | null;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 180 : 300;
      const gap = isMobile() ? 4 : 6;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-8 [scrollbar-width:none] md:py-12"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l from-[#0f172a]"></div>

          <div className="flex flex-row justify-start gap-4 pl-16 pr-16 md:gap-6 md:pl-24 md:pr-24 lg:pl-32 lg:pr-32">
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.1 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className="rounded-2xl flex-shrink-0"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mr-6 md:mr-10 flex justify-end gap-2 mt-6">
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 border border-cyan-500/40 disabled:opacity-50 hover:bg-cyan-500/30 transition-colors"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <svg className="h-5 w-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 border border-cyan-500/40 disabled:opacity-50 hover:bg-cyan-500/30 transition-colors"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <svg className="h-5 w-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

const DummyImage = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 300 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="dummyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0ea5e9" />
      </linearGradient>
    </defs>
    <rect width="300" height="200" fill="url(#dummyGradient)" />
    <circle cx="150" cy="100" r="40" fill="#0f172a" opacity="0.3" />
    <path
      d="M 110 140 L 150 80 L 190 140 Z"
      fill="#0f172a"
      opacity="0.3"
    />
  </svg>
);

export const Card = ({
  card,
  index,
}: {
  card: Card;
  index: number;
}) => {
  return (
    <BorderGlow
      backgroundColor="#0a0e27"
      glowColor="200 100 50"
      colors={["#06b6d4", "#0ea5e9", "#06b6d4"]}
      glowIntensity={1.0}
      edgeSensitivity={25}
      borderRadius={16}
      glowRadius={30}
      coneSpread={25}
      className="relative z-10 flex flex-col flex-shrink-0 h-96 w-68 sm:h-[28rem] sm:w-80 md:h-[28rem] md:w-80 overflow-hidden group"
    >
      <motion.div
        className="flex flex-col h-full w-full"
      >
      {/* Image */}
      <div className="relative w-full h-40 sm:h-48 md:h-48 flex items-center justify-center bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-t-2xl flex-shrink-0 z-0 p-3">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          {card.src ? (
            <img
              src={card.src}
              alt={card.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 relative z-0"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                  svg.setAttribute("class", "w-full h-full absolute inset-0 z-0");
                  svg.setAttribute("viewBox", "0 0 300 200");
                  svg.innerHTML = '<defs><linearGradient id="dummyGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#06b6d4" /><stop offset="100%" stopColor="#0ea5e9" /></linearGradient></defs><rect width="300" height="200" fill="url(#dummyGradient)" /><circle cx="150" cy="100" r="40" fill="#0f172a" opacity="0.3" /><path d="M 110 140 L 150 80 L 190 140 Z" fill="#0f172a" opacity="0.3" />';
                  parent.appendChild(svg);
                }
              }}
            />
          ) : (
            <div className="w-full h-full relative z-0">
              <DummyImage />
            </div>
          )}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
        </div>
      </div>

        {/* Live Demo badge on image */}
        {card.liveDemo && (
          <div className="absolute top-5 right-5 z-20 px-2 py-0.5 rounded-full bg-emerald-500/90 text-[0.55rem] font-bold uppercase tracking-wider text-white shadow-lg">
            Live
          </div>
        )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 sm:p-3 md:p-4 space-y-2">
        {/* Category */}
        <p className="text-xs text-cyan-300 font-medium">
          {card.category}
        </p>

        {/* Title */}
        <h3 className="text-sm sm:text-sm md:text-base font-bold text-cyan-100 line-clamp-2">
          {card.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-400 line-clamp-4 flex-1">
          {card.description}
        </p>

        {/* Tech Stack */}
        {card.technologies && card.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {card.technologies.map((tech, idx) => (
              <TechStackIcon key={idx} tech={tech} className="w-4 h-4" />
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-3 mt-auto pt-1">
          {card.liveDemo && (
            <a
              href={card.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-[0.65rem] font-semibold uppercase tracking-wider transition-all hover:bg-emerald-500/25 hover:border-emerald-300/60"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live
            </a>
          )}
          <a
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center text-xs text-cyan-300 hover:text-cyan-100 transition-colors font-semibold"
          >
            GitHub →
          </a>
        </div>
      </div>
      </motion.div>
    </BorderGlow>
  );
};
