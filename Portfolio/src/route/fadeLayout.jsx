"use client";
import PropTypes from "prop-types";
import FadeSettings from "./fadeSettings";
import { AnimatePresence } from "framer-motion";
import { Suspense } from "react";
import { usePathname } from "next/navigation";

export default function FadeLayout({ children }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={null}>
        <FadeSettings key={pathname}>{children}</FadeSettings>
      </Suspense>
    </AnimatePresence>
  );
}
FadeLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
