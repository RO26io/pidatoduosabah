import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pidato Duo Sabah 2026",
  description: "Dashboard rasmi penghantaran dan tayangan video Pertandingan Pidato Duo Sabah 2026.",
  icons: {
    icon: "/logo-pidato-duo.jpg",
    shortcut: "/logo-pidato-duo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms">
      <body className={`${geistSans.variable} antialiased`}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
