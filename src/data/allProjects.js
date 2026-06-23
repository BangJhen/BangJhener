// All Projects Data - Complete list of projects
// Organized with metadata for carousel display

export const allProjects = [
  {
    id: 1,
    name: "BinaHub",
    description: "Production-ready monorepo platform for UMKM workforce management with role-based dashboards and AI-powered analysis.",
    language: "TypeScript",
    url: "https://github.com/BangJhen/BinaHub",
    image: "/binahub.png",
    technologies: ["Next.js", "FastAPI", "Supabase", "TypeScript", "Python"],
    liveDemo: "https://letsbinahub.vercel.app/",
  },
  {
    id: 2,
    name: "SMPN 8 Website",
    description: "Modern school information portal with CMS capabilities, news management, facility showcase, and student registration system.",
    language: "TypeScript",
    url: "https://github.com/BangJhen/smp-pgri8-web",
    image: "/smp-pgri-8.png",
    technologies: ["React", "TypeScript", "Supabase", "Tailwind CSS", "Vite"],
    liveDemo: "https://smp-pgri-8-bogor.vercel.app/",
  },
  {
    id: 3,
    name: "Sentiment Analysis AI",
    description: "Web-based sentiment analysis tool for Indonesian text using IndoBERT and OLLAMA/Qwen with real-time analysis and AI evaluation.",
    language: "Python",
    url: "https://github.com/BangJhen/Sentiment-Analisis-With-LLM-Qwen2.5-1.5B",
    image: "https://images.unsplash.com/photo-1677442d019cecf8d5c2d0f512d5a4b9?q=80&w=800&auto=format&fit=crop",
    technologies: ["Python", "Streamlit", "PyTorch", "Transformers", "Plotly"],
    liveDemo: "https://sentiment-analysis-with-qwen.streamlit.app",
  },
  {
    id: 4,
    name: "TaniCerdas",
    description: "Comprehensive agricultural decision support system with ML-based crop prediction, AI environmental optimization, and SHAP explainability.",
    language: "Jupyter Notebook",
    url: "https://github.com/BangJhen/agriculture-ai-powered",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=800&auto=format&fit=crop",
    technologies: ["Python", "Streamlit", "Random Forest", "SHAP", "MongoDB", "Qdrant"],
  },
  {
    id: 5,
    name: "BugOut",
    description: "Hybrid boardgame combining physical and digital gameplay. Built with React Native for cross-platform mobile experience.",
    language: "TypeScript",
    url: "https://github.com/BangJhen/BugOut",
    image: "/BugOut.png",
    technologies: ["React Native", "TypeScript"],
  },
  {
    id: 6,
    name: "Retinopathy Detection",
    description: "Disease detection system using computer vision techniques for medical image analysis. Part of The Hack competition.",
    language: "Python",
    url: "https://github.com/yashanathaniel26-byte/retinopaty-disease-detection",
    image: "/retinopaty-detection.png",
    technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "Computer Vision"],
    liveDemo: "https://retinopatydetect.vercel.app/",
  },
  {
    id: 7,
    name: "Gesture Music Control",
    description: "Speaker and music control system using hand gestures and landmarks detection with Mediapipe and TensorFlow Keras.",
    language: "Jupyter Notebook",
    url: "https://github.com/BangJhen/Music-Control-With-Hand-Gestures",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto=format&fit=crop",
    technologies: ["Python", "Mediapipe", "TensorFlow", "Keras", "OpenCV"],
  },
  {
    id: 8,
    name: "Manajemen Perpustakaan",
    description: "School library management system for SMA 1 Dayeuhkolot. Manages textbook and learning material inventory.",
    language: "Blade",
    url: "https://github.com/BangJhen/manajemen-perpustakaan-buku-paket",
    image: "https://images.unsplash.com/photo-1507842217343-583f20270319?q=80&w=800&auto=format&fit=crop",
    technologies: ["Laravel", "Blade", "PHP", "MySQL"],
  },
  {
    id: 9,
    name: "Review Sentiment NLP",
    description: "E-commerce product review sentiment analysis competition project. Analyzes customer sentiments from product reviews.",
    language: "Jupyter Notebook",
    url: "https://github.com/BangJhen/Kelompok1-TheHack",
    image: "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?q=80&w=800&auto=format&fit=crop",
    technologies: ["Python", "Jupyter", "NLP", "Pandas", "Scikit-learn"],
  },
  {
    id: 10,
    name: "Finsight",
    description: "AI-powered financial analysis and insights platform for financial data analysis and visualization.",
    language: "JavaScript",
    url: "https://github.com/BangJhen/Finsight",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    technologies: ["Next.js", "JavaScript", "React"],
  }
];

// Get unique languages
export const getLanguages = () => {
  const languages = new Set(
    allProjects.flatMap((p) => p.technologies).filter(Boolean)
  );
  return Array.from(languages).sort();
};
