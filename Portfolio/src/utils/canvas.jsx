export function defaultCanvas(canvasRef, onContextUpdate, size) {
  const defaultCanvasRef = canvasRef.current;
  if (size == "default") {
    defaultCanvasRef.width = window.innerWidth;
    defaultCanvasRef.height = window.innerHeight;
  } else if (size == "abs") {
    defaultCanvasRef.width = document.documentElement.scrollWidth;
    defaultCanvasRef.height = document.documentElement.scrollHeight;
  }
  const backgroundContext = defaultCanvasRef.getContext("2d");
  onContextUpdate(backgroundContext);

  // Function to resize the canvas
  const resizeCanvas = () => {
    if (size == "default") {
      defaultCanvasRef.width = window.innerWidth;
      defaultCanvasRef.height = window.innerHeight;
    } else if (size == "abs") {
      defaultCanvasRef.width = document.documentElement.scrollWidth;
      defaultCanvasRef.height = document.documentElement.scrollHeight;
    }
    onContextUpdate(defaultCanvasRef.getContext("2d"));
  };

  // Add the resize event listener
  window.addEventListener("resize", resizeCanvas);

  // Cleanup function to remove the event listener
  return () => {
    window.removeEventListener("resize", resizeCanvas);
  };
}
