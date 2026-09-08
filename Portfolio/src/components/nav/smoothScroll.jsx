"use client";

import { ReactLenis } from "lenis/react";
import PropTypes from "prop-types";
import "lenis/dist/lenis.css";

export default function LenisProvider({ children }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1,
        smoothTouch: false,
        smoothWheel: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </ReactLenis>
  );
}

LenisProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
