"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import PropTypes from "prop-types";

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
