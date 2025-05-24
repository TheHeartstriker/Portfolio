import { useRef, useEffect, useState } from "react";
import { AddMember, RemoveMember } from "../../utils/aniFrame";
import "./navigate.css";
function NavCursor() {
  const [Clickable, setClickable] = useState(false);
  const [Grabable, setGrabable] = useState(false);
  const CursorRef = useRef(null);
  let Mouse = useRef({ x: 0, y: 0 });
  let cursorX = useRef(0);
  let cursorY = useRef(0);

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

  function animate() {
    let speed = 0.2;
    let cursor = CursorRef.current;
    if (!cursor) return;
    // Distance between cursor and mouse
    let distance = Math.sqrt(
      Math.pow(cursorX.current - Mouse.current.x, 2) +
        Math.pow(cursorY.current - Mouse.current.y, 2)
    );
    // Movement
    cursorX.current += (Mouse.current.x - cursorX.current) * speed;
    cursorY.current += (Mouse.current.y - cursorY.current) * speed;
    // Move cursor with translate3d for gpu acceleration
    cursor.style.transform = `translate3d(${cursorX.current}px, ${cursorY.current}px, 0) translate(-50%, -50%)`;
    // Remove all state classes first
    cursor.classList.remove("shrink", "Change", "Grab");

    // Add only the relevant class
    if (distance > 40) {
      cursor.classList.add("shrink");
    } else if (Clickable) {
      cursor.classList.add("Change");
    } else if (Grabable) {
      cursor.classList.add("Grab");
    }
  }
  //Why re do?
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    AddMember(animate);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      RemoveMember(animate);
    };
    // Only re-run if Clickable or Grabable changes
  }, []);

  return (
    <div className="Cursor" ref={CursorRef}>
      <div
        className={`CursorInner${Clickable ? " Change" : ""}${
          Grabable ? " Grab" : ""
        }`}
      ></div>
    </div>
  );
}

export default NavCursor;
