"use client";
import React from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiFastapi,
  SiSupabase,
  SiTailwindcss,
  SiVite,
  SiPytorch,
  SiTensorflow,
  SiKeras,
  SiStreamlit,
  SiMongodb,
  SiMysql,
  SiLaravel,
  SiPhp,
  SiOpencv,
  SiJupyter,
  SiPandas,
  SiScikitlearn,
  SiPlotly,
  SiUnity,
  SiDotnet,
  SiHuggingface,
} from "react-icons/si";
import { DiDatabase } from "react-icons/di";
import { BsBraces, BsGrid } from "react-icons/bs";
import { GiBrain, GiFamilyTree, GiArtificialIntelligence } from "react-icons/gi";

interface TechStackIconProps {
  tech: string;
  className?: string;
}

type IconEntry = {
  icon: React.ElementType;
  color: string;
};

const techIconMap: Record<string, IconEntry> = {
  "React":          { icon: SiReact,        color: "#61DAFB" },
  "React Native":   { icon: SiReact,        color: "#61DAFB" },
  "Next.js":        { icon: SiNextdotjs,    color: "#ffffff" },
  "TypeScript":     { icon: SiTypescript,   color: "#3178C6" },
  "JavaScript":     { icon: SiJavascript,   color: "#F7DF1E" },
  "Python":         { icon: SiPython,       color: "#3776AB" },
  "FastAPI":        { icon: SiFastapi,      color: "#009688" },
  "Supabase":       { icon: SiSupabase,     color: "#3ECF8E" },
  "Tailwind CSS":   { icon: SiTailwindcss,  color: "#06B6D4" },
  "Vite":           { icon: SiVite,         color: "#646CFF" },
  "PyTorch":        { icon: SiPytorch,      color: "#EE4C2C" },
  "TensorFlow":     { icon: SiTensorflow,   color: "#FF6F00" },
  "Keras":          { icon: SiKeras,        color: "#D00000" },
  "Streamlit":      { icon: SiStreamlit,    color: "#FF4B4B" },
  "MongoDB":        { icon: SiMongodb,      color: "#47A248" },
  "MySQL":          { icon: SiMysql,        color: "#4479A1" },
  "Laravel":        { icon: SiLaravel,      color: "#FF2D20" },
  "Blade":          { icon: SiLaravel,      color: "#FF2D20" },
  "PHP":            { icon: SiPhp,          color: "#777BB4" },
  "OpenCV":         { icon: SiOpencv,       color: "#5C3EE8" },
  "Jupyter":        { icon: SiJupyter,      color: "#F37726" },
  "Pandas":         { icon: SiPandas,       color: "#150458" },
  "Scikit-learn":   { icon: SiScikitlearn,  color: "#F7931E" },
  "Plotly":         { icon: SiPlotly,       color: "#3F4F75" },
  "Unity":          { icon: SiUnity,        color: "#ffffff" },
  "C#":             { icon: SiDotnet,       color: "#512BD4" },
  "Transformers":   { icon: SiHuggingface,  color: "#FFD21E" },
  "NLP":            { icon: BsBraces,       color: "#A78BFA" },
  "ML":             { icon: GiBrain,        color: "#F472B6" },
  "SHAP":           { icon: GiArtificialIntelligence, color: "#F59E0B" },
  "Random Forest":  { icon: GiFamilyTree,            color: "#22C55E" },
  "Computer Vision":{ icon: BsGrid,         color: "#38BDF8" },
  "Mediapipe":      { icon: DiDatabase,     color: "#0ABAB5" },
  "Qdrant":         { icon: DiDatabase,     color: "#FF6B35" },
};

const TechStackIcon: React.FC<TechStackIconProps> = ({
  tech,
  className = "w-5 h-5",
}) => {
  const entry = techIconMap[tech];

  if (!entry) {
    return (
      <div
        className={`${className} rounded-md bg-slate-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
        title={tech}
      >
        {tech.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  const IconComponent = entry.icon;

  return (
    <IconComponent
      className={className}
      style={{ color: entry.color, flexShrink: 0 }}
      title={tech}
    />
  );
};

export default TechStackIcon;
export { TechStackIcon };
