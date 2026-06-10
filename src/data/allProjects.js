// All Projects Data - Complete list of projects
// Organized with metadata for carousel display

export const allProjects = [
  {
    id: 1,
    name: "BinaHub",
    description: "Production-ready monorepo platform for UMKM workforce management with role-based dashboards and AI-powered analysis.",
    language: "TypeScript",
    url: "https://github.com/BangJhen/BinaHub",
    technologies: ["Next.js", "FastAPI", "Supabase", "TypeScript", "Python"],
  },
  {
    id: 2,
    name: "smp-pgri8-web",
    description: "Modern school information portal with CMS capabilities, news management, facility showcase, and student registration system.",
    language: "TypeScript",
    url: "https://github.com/BangJhen/smp-pgri8-web",
    technologies: ["React", "TypeScript", "Supabase", "Tailwind CSS", "Vite"],
  },
  {
    id: 3,
    name: "Sentiment-Analisis-With-LLM-Qwen2.5-1.5B",
    description: "Web-based sentiment analysis tool for Indonesian text using IndoBERT and OLLAMA/Qwen with real-time analysis and AI evaluation.",
    language: "Python",
    url: "https://github.com/BangJhen/Sentiment-Analisis-With-LLM-Qwen2.5-1.5B",
    technologies: ["Python", "Streamlit", "PyTorch", "Transformers", "Plotly"],
    liveDemo: "https://sentiment-analysis-with-qwen.streamlit.app",
  },
  {
    id: 4,
    name: "agriculture-ai-powered",
    description: "Comprehensive agricultural decision support system with ML-based crop prediction, AI environmental optimization, and SHAP explainability.",
    language: "Jupyter Notebook",
    url: "https://github.com/BangJhen/agriculture-ai-powered",
    technologies: ["Python", "Streamlit", "Random Forest", "SHAP", "MongoDB", "Qdrant"],
  },
  {
    id: 5,
    name: "BugOut",
    description: "Hybrid boardgame combining physical and digital gameplay. Built with React Native for cross-platform mobile experience.",
    language: "TypeScript",
    url: "https://github.com/BangJhen/BugOut",
    technologies: ["React Native", "TypeScript"],
  },
  {
    id: 6,
    name: "Retinopathy-Disease-Detection",
    description: "Disease detection system using computer vision techniques for medical image analysis. Part of The Hack competition.",
    language: "JavaScript",
    url: "https://github.com/BangJhen/Retinopathy-Disease-Detection",
    technologies: ["JavaScript", "Computer Vision", "ML"],
  },
  {
    id: 7,
    name: "Music-Control-With-Hand-Gestures",
    description: "Speaker and music control system using hand gestures and landmarks detection with Mediapipe and TensorFlow Keras.",
    language: "Jupyter Notebook",
    url: "https://github.com/BangJhen/Music-Control-With-Hand-Gestures",
    technologies: ["Python", "Mediapipe", "TensorFlow", "Keras", "OpenCV"],
  },
  {
    id: 8,
    name: "manajemen-perpustakaan-buku-paket",
    description: "School library management system for SMA 1 Dayeuhkolot. Manages textbook and learning material inventory.",
    language: "Blade",
    url: "https://github.com/BangJhen/manajemen-perpustakaan-buku-paket",
    technologies: ["Laravel", "Blade", "PHP", "MySQL"],
  },
  {
    id: 9,
    name: "Kelompok1-TheHack",
    description: "E-commerce product review sentiment analysis competition project. Analyzes customer sentiments from product reviews.",
    language: "Jupyter Notebook",
    url: "https://github.com/BangJhen/Kelompok1-TheHack",
    technologies: ["Python", "Jupyter", "NLP", "Pandas", "Scikit-learn"],
  },
  {
    id: 10,
    name: "Finsight",
    description: "AI-powered financial analysis and insights platform for financial data analysis and visualization.",
    language: "JavaScript",
    url: "https://github.com/BangJhen/Finsight",
    technologies: ["Next.js", "JavaScript", "React"],
  },
  {
    id: 11,
    name: "React-Tailwind-Portofolio",
    description: "Interactive portfolio website built with React and Tailwind CSS.",
    language: "JavaScript",
    url: "https://github.com/BangJhen/React-Tailwind-Portofolio",
    technologies: ["React", "Tailwind CSS", "JavaScript"],
  },
  {
    id: 12,
    name: "Bug-Out",
    description: "Bug-Out hybrid boardgame implementation in C#.",
    language: "C#",
    url: "https://github.com/BangJhen/Bug-Out",
    technologies: ["C#", "Game Development", "Unity"],
  },
];

// Get unique languages
export const getLanguages = () => {
  const languages = new Set(
    allProjects.flatMap((p) => p.technologies).filter(Boolean)
  );
  return Array.from(languages).sort();
};
