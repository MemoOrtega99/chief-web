import type { Metadata } from "next";
import localFont from "next/font/local";
import "lenis/dist/lenis.css";
import "./globals.css";
import "./site.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Preloader from "@/components/motion/Preloader";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const chiefFavicon = "/favicon.ico?v=chief-favicon-20261018";
const chiefLogo = "/chief-logo-iso.png?v=chief-logo-20261018";

const inter = localFont({
    src: [
        { path: "../../public/fonts/inter-400.ttf", weight: "400", style: "normal" },
        { path: "../../public/fonts/inter-500.ttf", weight: "500", style: "normal" },
        { path: "../../public/fonts/inter-600.ttf", weight: "600", style: "normal" },
    ],
    variable: "--font-geist-sans",
    display: "swap",
});

const montserrat = localFont({
    src: [
        { path: "../../public/fonts/montserrat-500.ttf", weight: "500", style: "normal" },
        { path: "../../public/fonts/montserrat-600.ttf", weight: "600", style: "normal" },
        { path: "../../public/fonts/montserrat-700.ttf", weight: "700", style: "normal" },
        { path: "../../public/fonts/montserrat-800.ttf", weight: "800", style: "normal" },
    ],
    variable: "--font-display",
    display: "swap",
});

const mono = localFont({
    src: [
        { path: "../../public/fonts/jetbrains-mono-400.ttf", weight: "400", style: "normal" },
        { path: "../../public/fonts/jetbrains-mono-500.ttf", weight: "500", style: "normal" },
    ],
    variable: "--font-mono",
    display: "swap",
});

export const metadata: Metadata = {
  title: "Chief Trailers del Norte | Ingeniería mexicana",
  description: "Fabricación de remolques y plataformas de alta resistencia, con diseño e ingeniería 100% mexicana.",
  keywords: "remolques, plataformas, portacontenedor, dolly, fabricación, Chief Trailers, Cadereyta",
  icons: {
    icon: [{ url: chiefFavicon, type: "image/x-icon", sizes: "64x64" }],
    shortcut: [{ url: chiefFavicon, type: "image/x-icon" }],
    apple: [{ url: chiefLogo, type: "image/png", sizes: "795x795" }],
  },
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
        <WhatsAppButton />
      </body>
    </html>
  );
}
