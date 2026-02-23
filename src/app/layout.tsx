import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RegisterSW from "@/components/RegisterSW";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nature Sound - Ambient Sound Mixer",
  description:
    "Mix ambient sounds to create your perfect environment for focus, relaxation, or sleep.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Nature Sound",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0f1a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body
        className={`${geistSans.variable} font-sans antialiased bg-[#0f0f1a] text-white min-h-screen`}
      >
        {children}
        <RegisterSW />
      </body>
    </html>
  );
}
