import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ultra X Player – Best Indian TV Box | 8K IPTV Streaming Worldwide",
  description:
    "Ultra X Player – Premium Indian IPTV streaming box with 8K Ultra HD, 5000+ channels, AI-powered recommendations, free mobile app. Available in Australia, USA, Canada, UK, NZ.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className="font-inter">{children}</body>
    </html>
  );
}
