//
// This file contains utility for the aboutpage and contact page
//
export function setupCanvasBall(
  canvasRef,
  setCtx,
  radiusRef,
  shrinkFactor,
  contact
) {
  const backgroundCanvas = canvasRef.current;

  // Set the initial radius
  radiusRef.current = window.innerWidth / shrinkFactor;

  // Function to resize the canvas
  const resizeCanvas = () => {
    if (!contact) {
      const parent = backgroundCanvas.parentElement;
      backgroundCanvas.width = parent.clientWidth;
      backgroundCanvas.height = parent.clientHeight;
    } else {
      backgroundCanvas.width = document.documentElement.scrollWidth;
      backgroundCanvas.height = document.documentElement.scrollHeight;
    }
    setCtx(backgroundCanvas.getContext("2d"));

    // Update radius based on screen size
    if (window.innerWidth < 1000) {
      radiusRef.current = (window.innerWidth / shrinkFactor) * 2;
    } else {
      radiusRef.current = window.innerWidth / shrinkFactor;
    }
  };
  resizeCanvas();
  // Add the resize event listener
  window.addEventListener("resize", resizeCanvas);
  // Cleanup function to remove the event listener
  return () => {
    window.removeEventListener("resize", resizeCanvas);
  };
}

export function WhichOne(ObjectData, Mouse, Radius) {
  if (!ObjectData || !ObjectData.current) return null;
  for (let i = 0; i < ObjectData.current.length; i++) {
    let distance = Math.sqrt(
      Math.pow(Mouse.current.x - ObjectData.current[i].x, 2) +
        Math.pow(Mouse.current.y - ObjectData.current[i].y, 2)
    );
    if (distance < Radius.current) {
      return i;
    }
  }
  return null;
}
//Changes the cursor to a grab when hovering over an object
export function CursorChange(Cursor, fucRef, ObjectData, Mouse, Radius) {
  if (fucRef.current != null && WhichOne(ObjectData, Mouse, Radius) != null) {
    fucRef.current.style.cursor = `${Cursor}`;
  } else {
    fucRef.current.style.cursor = "default";
  }
}
