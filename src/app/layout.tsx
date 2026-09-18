import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import "./site.css";

const inter = Inter({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
    variable: "--font-display",
    subsets: ["latin"],
    weight: ["700", "800", "900"],
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
      <body className={`${inter.variable} ${montserrat.variable} ch-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
