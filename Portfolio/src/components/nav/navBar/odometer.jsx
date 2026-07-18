"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

function currentTime() {
  return [
    ...new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Chicago",
    }),
  ];
}

export default function Odometer() {
  const digits = useRef([]);
  const prevTime = useRef(currentTime());

  //
  // Clock update animation
  //
  function updateClock() {
    //
    //Current time
    const newTime = currentTime();
    //
    // Iterate over every new digit and check if it has changed
    newTime.forEach((char, i) => {
      const digit = digits.current[i];
      //Check if the character has changed and exists
      if (char === prevTime.current[i]) return;
      if (!digit) return;
      //Get the current and next elements
      const current = digit.querySelector(".nav-bar-right-clock-current");
      const next = digit.querySelector(".nav-bar-right-clock-next");
      // Update the text and position of the next element at the top of the digit
      next.textContent = char;
      gsap.set(next, {
        yPercent: 100,
        opacity: 0,
      });

      const timeline = gsap.timeline({
        defaults: {
          duration: 0.45,
          ease: "power3.inOut",
        },
        // Push current into into the netural position after updating it's text content and set next to the top of the digitr resting the animation
        onComplete: () => {
          current.textContent = char;

          gsap.set(current, {
            yPercent: 0,
            opacity: 1,
          });

          gsap.set(next, {
            yPercent: 100,
            opacity: 0,
          });
        },
      });

      //Move the current element down
      timeline.to(
        current,
        {
          yPercent: -100,
          opacity: 0,
        },
        0,
      );

      //Move the next element down from it pos at the top of the didgit
      timeline.to(
        next,
        {
          yPercent: 0,
          opacity: 1,
        },
        0,
      );
    });

    prevTime.current = newTime;
  }

  //
  // Actual animation call
  //
  useEffect(() => {
    updateClock();

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h4 className="nav-bar-right-clock">
      {/*  */}
      {/* Iterate over the prev time */}
      {/* If ":" or " " Ignore otherwise wrap in class digit as a span */}
      {[...prevTime.current].map((char, i) =>
        char === ":" ? (
          <span key={i}>:</span>
        ) : char === " " ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <span
            key={i}
            className="nav-bar-right-clock-digit"
            ref={(el) => (digits.current[i] = el)}
          >
            <span className="nav-bar-right-clock-measure">{char}</span>
            <span className="nav-bar-right-clock-current">{char}</span>
            <span className="nav-bar-right-clock-next">{char}</span>
          </span>
        ),
      )}
    </h4>
  );
}
