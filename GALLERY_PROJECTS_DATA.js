// Gallery Projects Data - Ready to use in GalleryProject.jsx
// Based on comprehensive portfolio review

export const galleryProjectsData = [
  {
    id: 1,
    title: "BinaHub",
    category: "Full Stack Web Application",
    description: "Production-ready monorepo platform for UMKM workforce management. Features role-based dashboards, AI-powered worker analysis, and real-time monitoring with Supabase integration.",
    techStack: ["Next.js", "FastAPI", "Supabase", "TypeScript", "Python"],
    image: null, // TODO: Add screenshot
    link: "https://github.com/BangJhen/BinaHub",
    highlights: [
      "Monorepo architecture (web + AI service)",
      "21 passing E2E tests",
      "Role-based dashboards",
      "AI-powered analysis",
      "Comprehensive documentation"
    ],
    featured: true,
    priority: 1
  },
  {
    id: 2,
    title: "SMP PGRI 8 Website",
    category: "Web Application",
    description: "Modern school information portal with CMS capabilities. Features news management, facility showcase, student gallery, and PPDB registration system integrated with Supabase.",
    techStack: ["React", "TypeScript", "Supabase", "Tailwind CSS", "Vite"],
    image: null, // TODO: Add screenshot
    link: "https://github.com/BangJhen/smp-pgri8-web",
    highlights: [
      "Real client project",
      "Complete CRUD operations",
      "News/Blog CMS system",
      "Student registration form",
      "Responsive design"
    ],
    featured: true,
    priority: 2
  },
  {
    id: 3,
    title: "Sentiment Analysis Platform",
    category: "Machine Learning / NLP",
    description: "Web-based sentiment analysis tool for Indonesian text using IndoBERT and OLLAMA/Qwen. Features real-time analysis, multiple input methods, and AI evaluation.",
    techStack: ["Python", "Streamlit", "PyTorch", "Transformers", "Plotly"],
    image: null, // TODO: Add screenshot
    link: "https://github.com/BangJhen/Sentiment-Analisis-With-LLM-Qwen2.5-1.5B",
    liveDemo: "https://sentiment-analysis-with-qwen.streamlit.app",
    highlights: [
      "Live deployment on Streamlit Cloud",
      "Multiple IndoBERT models",
      "Interactive visualizations",
      "OLLAMA/Qwen integration",
      "CSV export functionality"
    ],
    featured: true,
    priority: 3
  },
  {
    id: 4,
    title: "TaniCerdas Nusantara",
    category: "Machine Learning / Decision Support",
    description: "Comprehensive agricultural decision support system with ML-based crop prediction, AI environmental optimization, and SHAP explainability. Includes MongoDB persistence and Qdrant knowledge base.",
    techStack: ["Python", "Streamlit", "Random Forest", "SHAP", "MongoDB", "Qdrant"],
    image: null, // TODO: Add screenshot
    link: "https://github.com/BangJhen/agriculture-ai-powered",
    highlights: [
      "ML pipeline with SHAP explainability",
      "LLM integration (OpenRouter + OLLAMA)",
      "MongoDB Atlas persistent storage",
      "Qdrant knowledge base",
      "Fully localized Indonesian interface"
    ],
    featured: true,
    priority: 4
  },
  {
    id: 5,
    title: "BugOut",
    category: "Game Development",
    description: "Hybrid boardgame combining physical and digital gameplay. Built with React Native for cross-platform mobile experience.",
    techStack: ["React Native", "TypeScript"],
    image: null, // TODO: Add screenshot
    link: "https://github.com/BangJhen/BugOut",
    highlights: [
      "Cross-platform mobile",
      "Hybrid game mechanics",
      "React Native implementation"
    ],
    featured: false,
    priority: 5,
    optional: true
  }
];

// Alternative format - if you want to use this directly in GalleryProject.jsx
export const projectsForGallery = [
  {
    id: 1,
    title: "BinaHub",
    category: "Full Stack",
    description: "Production-ready monorepo platform for UMKM workforce management with role-based dashboards and AI-powered analysis.",
    techStack: ["Next.js", "FastAPI", "Supabase", "TypeScript", "Python"],
    image: null,
    link: "https://github.com/BangJhen/BinaHub",
  },
  {
    id: 2,
    title: "SMP PGRI 8 Website",
    category: "Web App",
    description: "Modern school portal with CMS, news management, facility showcase, and student registration system.",
    techStack: ["React", "TypeScript", "Supabase", "Tailwind", "Vite"],
    image: null,
    link: "https://github.com/BangJhen/smp-pgri8-web",
  },
  {
    id: 3,
    title: "Sentiment Analysis",
    category: "ML/NLP",
    description: "Indonesian text sentiment analysis using IndoBERT with real-time analysis and AI evaluation.",
    techStack: ["Python", "Streamlit", "PyTorch", "Transformers", "Plotly"],
    image: null,
    link: "https://github.com/BangJhen/Sentiment-Analisis-With-LLM-Qwen2.5-1.5B",
  },
  {
    id: 4,
    title: "TaniCerdas Nusantara",
    category: "ML/Decision Support",
    description: "Agricultural decision support with ML crop prediction, SHAP explainability, and LLM optimization.",
    techStack: ["Python", "Streamlit", "Random Forest", "SHAP", "MongoDB", "Qdrant"],
    image: null,
    link: "https://github.com/BangJhen/agriculture-ai-powered",
  },
];

// Data untuk case studies (optional)
export const projectCaseStudies = {
  binahub: {
    title: "BinaHub: Building a Production-Ready Monorepo",
    challenge: "Create a scalable job-matching platform for UMKM with separate frontend and AI services",
    solution: "Implemented monorepo architecture with Next.js frontend, FastAPI AI service, and Supabase backend",
    results: [
      "21 passing E2E tests",
      "Role-based access control for 3 user types",
      "Real-time data synchronization",
      "AI-powered worker analysis"
    ],
    learnings: [
      "Monorepo management with npm workspaces",
      "Supabase RLS policies for security",
      "E2E testing with Playwright",
      "FastAPI integration with LLM/RAG"
    ]
  },
  smpPgri8: {
    title: "SMP PGRI 8: From Concept to Client Delivery",
    challenge: "Build a modern school website with CMS capabilities and student registration",
    solution: "React + Supabase architecture with proper database schema and responsive design",
    results: [
      "Complete CRUD for news, facilities, gallery",
      "Student registration form with validation",
      "Mobile-responsive design",
      "7+ database tables with proper relationships"
    ],
    learnings: [
      "Client requirements gathering",
      "Database schema design",
      "Responsive design principles",
      "Supabase Storage integration"
    ]
  },
  sentimentAnalysis: {
    title: "Sentiment Analysis: Deploying ML Models to Production",
    challenge: "Create a production-ready sentiment analysis tool for Indonesian text",
    solution: "Streamlit app with multiple IndoBERT models, fallback mechanisms, and OLLAMA integration",
    results: [
      "Live deployment on Streamlit Cloud",
      "Support for 3 IndoBERT variants",
      "Interactive Plotly visualizations",
      "CSV batch processing"
    ],
    learnings: [
      "Model selection and fallback strategies",
      "Streamlit deployment best practices",
      "Indonesian NLP specialization",
      "User experience for ML apps"
    ]
  },
  agriculture: {
    title: "TaniCerdas: ML Pipeline with Explainability",
    challenge: "Build agricultural decision support with explainable ML predictions",
    solution: "Random Forest with SHAP explainability, LLM integration, and MongoDB persistence",
    results: [
      "SHAP-based feature importance",
      "LLM-powered recommendations",
      "Persistent interaction history",
      "Qdrant knowledge base"
    ],
    learnings: [
      "SHAP explainability for ML models",
      "LLM prompt engineering",
      "Vector database integration",
      "Domain-specific ML applications"
    ]
  }
};

// Tips untuk menambahkan ke Gallery Projects
export const implementationTips = `
1. UPDATE GalleryProject.jsx:
   - Import projectsForGallery dari file ini
   - Replace hardcoded projects array dengan imported data
   
2. ADD SCREENSHOTS:
   - Buat screenshot untuk setiap project
   - Simpan di /public/assets/images/
   - Update image path di data
   
3. ADD LIVE DEMO LINKS:
   - Sentiment Analysis: https://sentiment-analysis-with-qwen.streamlit.app
   - Tambahkan link ke card jika ada
   
4. OPTIONAL - ADD CASE STUDIES:
   - Buat modal atau detail page untuk case studies
   - Link dari gallery cards ke case study pages
   
5. OPTIMIZE IMAGES:
   - Gunakan webp format untuk performa
   - Compress images untuk loading cepat
   - Provide fallback PNG
`;
