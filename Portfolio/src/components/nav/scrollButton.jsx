"use client";
import { useLenis } from "@studio-freight/react-lenis";
import PropTypes from "prop-types";

export function ScrollButton({ percent, className, children, ...props }) {
  const lenis = useLenis();

  function scrollToPercent() {
    if (!lenis) return;

    const vh = window.innerHeight;
    const targetScroll = (percent / 100) * vh;
    lenis.scrollTo(targetScroll, { duration: 1.2 });
  }
  return (
    <button className={className} onClick={scrollToPercent} {...props}>
      {children}
    </button>
  );
}

ScrollButton.propTypes = {
  percent: PropTypes.number.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};
