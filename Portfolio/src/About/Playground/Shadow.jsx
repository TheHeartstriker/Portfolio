import React, { useEffect, useRef, useState } from "react";
import { AddMember, RemoveMember } from "./AniFrame";

function Shadow({ x, y, radius, update }) {
  const ShadowRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const AniFrame = useRef(null);
  const Mouse = useRef({ x: 0, y: 0 });
  const LatestVal = useRef({ x, y, radius });
  const MouseDis = useRef(0);
  // Creates a canvas
  useEffect(() => {
    // Creates references to current canvases
    const backgroundCanvas = ShadowRef.current;
    // Sets the default canvas sizes to the window size
    backgroundCanvas.width = document.documentElement.scrollWidth;
    backgroundCanvas.height = document.documentElement.scrollHeight;
    // Gets the context of the canvas
    const backgroundContext = backgroundCanvas.getContext("2d");
    // Sets the context to the state
    setCtx(backgroundContext);
    // Function to resize the canvas
    const resizeCanvas = () => {
      // The resize
      backgroundCanvas.width = document.documentElement.scrollWidth;
      backgroundCanvas.height = document.documentElement.scrollHeight;
      // After resizing the canvas, we need to get the context again
      setCtx(backgroundCanvas.getContext("2d"));
      // Where the redrawing of the canvas happens
    };
    // Event listener where the resizeCanvas function is called
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", HandleMouse);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", HandleMouse);
    };
  }, []);

  function HandleMouse(e) {
    Mouse.current.x = e.pageX;
    Mouse.current.y = e.pageY;
    MouseDis.current = Math.sqrt(
      (Mouse.current.x - x) ** 2 + (Mouse.current.y - y) ** 2
    );
  }

  function RadialGradient(x, y, radius) {
    if (!ctx) return;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, "rgba(0, 0, 0, 0.30)");
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  function RowGradient(Range) {
    if (!ctx) return;

    ctx.clearRect(
      0,
      0,
      document.documentElement.scrollWidth,
      document.documentElement.scrollHeight
    );

    const { x, y, radius } = LatestVal.current;
    // Calculate the direction vector from the circle's center to the mouse position
    const directionX = Mouse.current.x - x;
    const directionY = Mouse.current.y - y;

    // Normalize the direction vector
    const length = Math.sqrt(directionX * directionX + directionY * directionY);
    const normalizedDirectionX = directionX / length;
    const normalizedDirectionY = directionY / length;

    // Invert the direction vector to get the opposite direction
    const oppositeDirectionX = -normalizedDirectionX;
    const oppositeDirectionY = -normalizedDirectionY;

    // Scale the offset based on the distance
    const scaleFactor = length / 15; // Adjust the divisor to control the scaling

    for (let i = 0; i < Range; i++) {
      // Adjust the position of the gradients using the opposite direction vector and scale factor
      const offsetX = oppositeDirectionX * i * scaleFactor;
      const offsetY = oppositeDirectionY * i * scaleFactor;
      RadialGradient(x + offsetX, y + offsetY, radius + i * 40);
    }
  }

  useEffect(() => {
    function UpdateMembers() {
      RowGradient(5);
      console.log(x, y, radius);
    }
    LatestVal.current = { x, y, radius };

    AddMember(UpdateMembers);
    return () => RemoveMember(UpdateMembers);
  }, [x, y, radius]);

  return (
    <canvas
      ref={ShadowRef}
      className="Shadow"
      width={document.documentElement.scrollWidthX}
      height={document.documentElement.scrollHeightY}
    ></canvas>
  );
}

export default Shadow;
