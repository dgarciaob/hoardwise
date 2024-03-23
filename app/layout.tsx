import type { Metadata } from "next";
import { Familjen_Grotesk } from "next/font/google";
import "./globals.css";

const familjenGrotesk = Familjen_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hoardwise - Track your money",
  description: "Seamless finance tracker for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={familjenGrotesk.className}>{children}</body>
    </html>
  );
}
