"use client";
import { AddMember, RemoveMember } from "../../utils/aniFrame.jsx";
import { useEffect } from "react";
import { createAnimatable, utils } from "animejs";

function PillAnimation() {
  function onMouseMove(event, animatablePills, bluePills) {
    const { clientX, clientY } = event;
    bluePills.forEach((pill, index) => {
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
        const x = utils.clamp(-(clientX - left - hw), -hw, hw);
        const y = utils.clamp(-(clientY - top - hh), -hh, hh);
        //Update x and y
        animatablePills[index].x(x);
        animatablePills[index].y(y);
        pill.classList.add("hovered");
      } else {
        animatablePills[index].x(0);
        animatablePills[index].y(0);
        pill.classList.remove("hovered");
      }
    });
  }

  function initalize() {
    // Selects them all
    const bluePills = Array.from(
      document.querySelectorAll(".script-article-tags span")
    );
    // Create individual animations for each BluePill
    const animatablePills = bluePills.map((pill) =>
      createAnimatable(pill, {
        x: 400,
        y: 400,
        ease: "ease(3)",
      })
    );
    return { animatablePills, bluePills };
  }

  useEffect(() => {
    const InitVals = initalize();
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
        onMouseMove(
          { clientX: mouseX, clientY: mouseY },
          InitVals.animatablePills,
          InitVals.bluePills
        );
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
}

export default PillAnimation;
