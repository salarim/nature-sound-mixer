import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nature Sound - Ambient Sound Mixer",
  description:
    "Mix ambient sounds to create your perfect environment for focus, relaxation, or sleep.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} font-sans antialiased bg-[#0f0f1a] text-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
