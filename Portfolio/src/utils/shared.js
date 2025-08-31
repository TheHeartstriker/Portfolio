//
// This file contains utility for the aboutpage and contact page
//
export function setupCanvasBall(canvasRef, setCtx, radiusRef, shrinkFactor) {
  const backgroundCanvas = canvasRef.current;
  backgroundCanvas.width = document.documentElement.scrollWidth;
  backgroundCanvas.height = document.documentElement.scrollHeight;
  const backgroundContext = backgroundCanvas.getContext("2d");
  setCtx(backgroundContext);
  // Set the initial radius
  radiusRef.current = window.innerWidth / shrinkFactor;

  // Function to resize the canvas
  const resizeCanvas = () => {
    backgroundCanvas.width = document.documentElement.scrollWidth;
    backgroundCanvas.height = document.documentElement.scrollHeight;
    setCtx(backgroundCanvas.getContext("2d"));
    if (window.innerWidth < 1000) {
      let tempFactor = shrinkFactor / 2;
      radiusRef.current = window.innerWidth / tempFactor;
    } else {
      radiusRef.current = window.innerWidth / shrinkFactor;
    }
  };
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
