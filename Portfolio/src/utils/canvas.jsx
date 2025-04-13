export function defaultCanvas(canvasRef, onContextUpdate) {
  const defaultCanvasRef = canvasRef.current;
  defaultCanvasRef.width = document.documentElement.scrollWidth;
  defaultCanvasRef.height = document.documentElement.scrollHeight;
  const backgroundContext = defaultCanvasRef.getContext("2d");
  onContextUpdate(backgroundContext);

  // Function to resize the canvas
  const resizeCanvas = () => {
    defaultCanvasRef.width = document.documentElement.scrollWidth;
    defaultCanvasRef.height = document.documentElement.scrollHeight;
    onContextUpdate(defaultCanvasRef.getContext("2d"));
  };

  // Add the resize event listener
  window.addEventListener("resize", resizeCanvas);

  // Cleanup function to remove the event listener
  return () => {
    window.removeEventListener("resize", resizeCanvas);
  };
}
