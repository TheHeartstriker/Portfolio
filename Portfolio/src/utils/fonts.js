// app/fonts.ts (or any file, usually in lib/ or app/)
// Poppins, Source sans pro, Roboto Slab and nunito
import { Montserrat, Inter } from "next/font/google";
//
//Old Techy theme
//
// export const rajdhaniDisplay = Rajdhani({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-display",
// });

// export const rajdhaniBody = Rajdhani({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-body",
// });

export const Display = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
});

export const Body = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-body",
});
