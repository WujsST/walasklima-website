import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisScroll from "@/components/LenisScroll";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Walas Klimatyzacja - Profesjonalny Serwis Klimatyzacji w Łodzi",
    template: "%s | Walas Klimatyzacja",
  },
  description:
    "Certyfikowany serwis F-GAZ. Montaż, serwis i odgrzybianie klimatyzacji dla domów, firm oraz pojazdów w Łodzi i województwie łódzkim.",
  keywords: [
    "klimatyzacja Łódź",
    "serwis klimatyzacji",
    "montaż klimatyzacji",
    "auto klimatyzacja",
    "odgrzybianie klimatyzacji",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${inter.variable} ${outfit.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className={inter.className}>
        <LenisScroll />
        {children}
      </body>
    </html>
  );
}
