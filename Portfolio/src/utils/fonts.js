// app/fonts.ts (or any file, usually in lib/ or app/)
import { Exo_2, Protest_Guerrilla } from "next/font/google";

// Define your fonts
export const exo2 = Exo_2({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-exo2", // optional: for CSS variables
});

export const protestGuerrilla = Protest_Guerrilla({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-protest-guerrilla",
});
