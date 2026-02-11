import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zine Machine",
  description: "Turn 8 images into a pdf in the classic zine format",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen items-center justify-center bg-stone-200">
        <main className="grid grid-cols-1 md:grid-cols-5 min-h-screen w-full max-w-4xl content-start py-10 px-4 bg-stone-100 gap-x-2 gap-y-4">
          {children}
        </main>
      </div>
      </body>
    </html>
  );
}
