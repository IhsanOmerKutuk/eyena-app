import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "EYENA | Tracking Insights — Yapay Zeka Destekli Göz Takibi",
  description:
    "EYENA, Tobii göz takibi teknolojisi ve yapay zeka ile sınıf ortamında öğrencilerin dikkat, odaklanma ve katılım düzeylerini analiz eder. MEB uyumlu, Türk eğitim sistemine özel.",
  keywords: "göz takibi, eye tracking, yapay zeka, eğitim teknolojisi, dikkat analizi, Tobii, EYENA",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-[#0A0A0A] text-white antialiased"
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
