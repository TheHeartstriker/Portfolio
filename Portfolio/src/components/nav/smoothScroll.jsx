"use client";

import { ReactLenis } from "lenis/react";
import PropTypes from "prop-types";
import "lenis/dist/lenis.css";

export default function LenisProvider({ children }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        smoothTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}

LenisProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
