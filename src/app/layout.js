import { Audiowide, Geist_Mono, Orbitron, Space_Grotesk } from "next/font/google";
import SplashCursor from "@/components/SplashCursor";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ammar Ridho — Portfolio",
  description: "AI/ML Engineer and Web Developer portfolio",
  icons: {
    icon: "/space-circle.svg",
    shortcut: "/space-circle.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${orbitron.variable} ${audiowide.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SplashCursor
          DYE_RESOLUTION={720}
          DENSITY_DISSIPATION={5}
          VELOCITY_DISSIPATION={4}
          PRESSURE={0.08}
          CURL={0.6}
          SPLAT_RADIUS={0.1}
          SPLAT_FORCE={1400}
          COLOR_UPDATE_SPEED={4}
        />
        {children}
      </body>
    </html>
  );
}
