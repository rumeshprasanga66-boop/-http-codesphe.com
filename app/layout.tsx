import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codesphe - Build Your SaaS Faster",
  description:
    "Everything you need to launch your next SaaS product. Modern stack, pre-built components, and production-ready infrastructure.",
  keywords: [
    "SaaS",
    "Next.js",
    "TypeScript",
    "Full-stack",
    "Web development",
    "Startup",
  ],
  authors: [{ name: "Codesphe" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codesphe.com",
    siteName: "Codesphe",
    title: "Codesphe - Build Your SaaS Faster",
    description:
      "Everything you need to launch your next SaaS product.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codesphe - Build Your SaaS Faster",
    description:
      "Everything you need to launch your next SaaS product.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
