export default function sitemap() {
  return [
    {
      url: 'https://ammarridho.dev/', // URL utama portofoliomu
      lastModified: new Date(),
      changeFrequency: 'monthly', // Beri tahu Google seberapa sering kamu update
      priority: 1, // Prioritas tertinggi karena ini halaman utama
    },
    // Jika nanti kamu punya halaman khusus proyek, kamu bisa buka komentar di bawah ini:
    // {
    //   url: 'https://bangjhener.vercel.app/projects',
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },
  ];
}