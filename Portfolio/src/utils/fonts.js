// app/fonts.ts (or any file, usually in lib/ or app/)
import {
  Exo_2,
  Protest_Guerrilla,
  Orbitron,
  Space_Grotesk,
  Rajdhani,
  Sora,
  Oxanium,
} from "next/font/google";

// Define your fonts
export const exo2 = Exo_2({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-text",
});

export const protestGuerrilla = Protest_Guerrilla({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-display",
});

export const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
});
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});
export const rajdhani = Rajdhani({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

export const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
});
export const oxanium = Oxanium({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
});
