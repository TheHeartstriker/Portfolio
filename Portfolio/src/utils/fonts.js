// app/fonts.ts (or any file, usually in lib/ or app/)
// Poppins, Source sans pro, Roboto Slab and nunito
import {
  Inter,
  Playfair_Display,
  Baskervville,
  Cinzel_Decorative,
  Crimson_Text,
  Spectral,
  Sora,
} from "next/font/google";

export const Display = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
});

// export const Display = Sora({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "500", "600", "700", "800"],
//   variable: "--font-display",
// });

// export const Display = Crimson_Text({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "600", "700"],
//   variable: "--font-display",
// });

// export const Display = Baskervville({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-display",
// });

// export const Display = Cinzel_Decorative({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "700", "900"],
//   variable: "--font-display",
// });

export const Body = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-body",
});
