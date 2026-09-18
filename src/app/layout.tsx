import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Montserrat } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import "./site.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Preloader from "@/components/motion/Preloader";

const inter = Inter({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});

const montserrat = Montserrat({
    variable: "--font-display",
    subsets: ["latin"],
    weight: ["500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Chief Trailers del Norte | Ingeniería mexicana",
  description: "Fabricación de remolques y plataformas de alta resistencia, con diseño e ingeniería 100% mexicana.",
  keywords: "remolques, plataformas, portacontenedor, dolly, fabricación, Chief Trailers, Cadereyta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${montserrat.variable} ${mono.variable} ch-body antialiased`}>
        <Preloader />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
