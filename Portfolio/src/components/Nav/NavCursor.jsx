import { useRef, useEffect, useState } from "react";
import "./Navigate.css";
function NavCursor() {
  const [Clickable, setClickable] = useState(false);
  const [Grabable, setGrabable] = useState(false);
  const CursorRef = useRef(null);
  let Mouse = useRef({ x: 0, y: 0 });
  let cursorX = useRef(0);
  let cursorY = useRef(0);
  //Animation frame
  let animationFrameId = useRef(null);
  //Using mouse over is more flexable than mouse over and the like
  const handleMouseMove = (e) => {
    Mouse.current.x = e.clientX;
    Mouse.current.y = e.clientY;
    CursorRef.current.style.opacity = "1";

    const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
    if (elementUnderCursor) {
      const computedStyle = window.getComputedStyle(elementUnderCursor);
      if (computedStyle.cursor === "pointer") {
        setClickable(true);
      } else {
        setClickable(false);
      }
      if (
        computedStyle.cursor === "grab" ||
        computedStyle.cursor === "grabbing"
      ) {
        setGrabable(true);
      } else {
        setGrabable(false);
      }
    }
  };

  //Animation function
  function animateCursor(Click, Grab, CursorMSpeed) {
    let speed = CursorMSpeed;
    let cursor = CursorRef.current;
    //Infinity loop animate function
    const animate = () => {
      //Distance between cursor and mouse
      let distance = Math.sqrt(
        Math.pow(cursorX.current - Mouse.current.x, 2) +
          Math.pow(cursorY.current - Mouse.current.y, 2)
      );
      //Movement
      cursorX.current += (Mouse.current.x - cursorX.current) * speed;
      cursorY.current += (Mouse.current.y - cursorY.current) * speed;
      cursor.style.left = cursorX.current + "px";
      cursor.style.top = cursorY.current + "px";
      //If the cursor is over a clickable element
      if (distance > 40) {
        cursor.classList.add("shrink");
      } else if (Click === true) {
        cursor.classList.add("Change");
      } else if (Grab === true) {
        cursor.classList.add("Grab");
      } else {
        cursor.className = "Cursor";
      }
      //Update the cursor position
      animationFrameId.current = requestAnimationFrame(animate);
    };
    //Initial call handlers
    document.addEventListener("mousemove", handleMouseMove);
    animate();
    //Clean up on unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      //Cancel the frame
      cancelAnimationFrame(animationFrameId.current);
    };
  }

  useEffect(() => {
    let clean = animateCursor(Clickable, Grabable, 0.2);
    return clean;
  }, [Clickable, Grabable]);

  return <div className="Cursor" ref={CursorRef}></div>;
}

export default NavCursor;
