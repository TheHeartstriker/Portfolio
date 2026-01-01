// app/fonts.ts (or any file, usually in lib/ or app/)
import { Rajdhani } from "next/font/google";

export const rajdhaniDisplay = Rajdhani({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

export const rajdhaniBody = Rajdhani({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});
