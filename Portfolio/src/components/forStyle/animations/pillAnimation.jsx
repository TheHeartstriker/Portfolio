"use client";
import { AddMember, RemoveMember } from "@/utils/aniFrame.jsx";
import { gsap } from "gsap";
import { useEffect } from "react";
import PropTypes from "prop-types";

//Manipulates the pills on mouse move
function PillAnimation({ tags }) {
  function onMouseMove(event, bluePills) {
    const { clientX, clientY } = event;
    bluePills.forEach((pill) => {
      const bounding = pill.getBoundingClientRect();
      const { left, top, width, height } = bounding;
      // Calculate distance from the mouse to the center of the pill
      const dx = clientX - (left + width / 2);
      const dy = clientY - (top + height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Activate on distance
      if (distance < 150) {
        const hw = width / 2;
        const hh = height / 2;
        const x = Math.max(Math.min(-(clientX - left - hw), hw), -hw);
        const y = Math.max(Math.min(-(clientY - top - hh), hh), -hh);

        //Update x and y with GSAP
        gsap.to(pill, {
          x: x,
          y: y,
          duration: 2,
          ease: "power3.out",
        });
        pill.classList.add("hovered");
      } else {
        gsap.to(pill, {
          x: 0,
          y: 0,
          duration: 2,
          ease: "power3.out",
        });
        pill.classList.remove("hovered");
      }
    });
  }

  useEffect(() => {
    //Gets all the blue pills
    const bluePills = Array.from(
      document.querySelectorAll(tags.map((tag) => `${tag}`).join(", "))
    );
    let mouseX = 0;
    let mouseY = 0;
    let prevMouseX = null;
    let prevMouseY = null;

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    function update() {
      // Only update if the mouse position has changed
      if (mouseX !== prevMouseX || mouseY !== prevMouseY) {
        onMouseMove({ clientX: mouseX, clientY: mouseY }, bluePills);
        prevMouseX = mouseX;
        prevMouseY = mouseY;
      }
    }

    AddMember(update);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      RemoveMember(update);
    };
  }, []);

  return null;
}

export default PillAnimation;

PillAnimation.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};
