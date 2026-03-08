// app/fonts.ts (or any file, usually in lib/ or app/)
// Poppins, Source sans pro, Roboto Slab and nunito
import {
  Inter,
  Playfair_Display,
  Lora,
  Libre_Bodoni,
  Gelasio,
  Crimson_Text,
  Cormorant_Garamond,
} from "next/font/google";

export const Display = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
});

// export const Display = Gelasio({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "500", "600", "700", "800", "900"],
//   variable: "--font-display",
// });

// export const Display = Libre_Bodoni({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "500", "600", "700", "800", "900"],
//   variable: "--font-display",
// });

// export const Display = Lora({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "500", "600", "700", "800", "900"],
//   variable: "--font-display",
// });

// export const Display = Cormorant_Garamond({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-display",
// });

// export const Display = Crimson_Text({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "600", "700"],
//   variable: "--font-display",
// });

export const Body = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-body",
});
