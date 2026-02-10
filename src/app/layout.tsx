import type { Metadata } from "next";
import { Geist, Geist_Mono, Josefin_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

const sunlightDreams = localFont({
  variable: "--font-sunlight-dreams",
  src: [
    { path: "../../public/fonts/Sunlight Dreams.woff" },
    { path: "../../public/fonts/Sunlight Dreams.otf" },
  ],
});

export const metadata: Metadata = {
  title: "Lela's Tech Cup 3",
  description: "i love osu!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${josefinSans.variable} ${sunlightDreams.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
