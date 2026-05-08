import "./globals.css";
import { Bebas_Neue, Rajdhani, Orbitron } from "next/font/google";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-orbitron",
});

export const metadata = {
  title: "Motorrad Club Card Generator",
  description: "Sammelkarten im FIFA-Style für Motorradclubs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${bebas.variable} ${rajdhani.variable} ${orbitron.variable}`}>{children}</body>
    </html>
  );
}
