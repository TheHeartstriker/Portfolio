import "../site.css";
import "../animation.css";
import Background from "../components/backgrounds/background";
import Nav from "../components/nav/nav";
import FadeSettings from "../fadeSettings";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Background />
        <Nav />
        <AnimatePresence mode="wait">
          <Suspense fallback={null}>
            <FadeSettings>{children}</FadeSettings>
          </Suspense>
        </AnimatePresence>
      </body>
    </html>
  );
}
