import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans-template",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono-template",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading-template",
  subsets: ["latin"],
  weight: ["500", "600", "700"], // weights for headings
});

export const metadata: Metadata = {
  title: "Website Template",
  description: "A Next.js + Supabase starter template.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
