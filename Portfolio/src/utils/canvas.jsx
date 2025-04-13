export function defaultCanvas(canvasRef, onContextUpdate) {
  const backgroundCanvas = canvasRef.current;
  backgroundCanvas.width = document.documentElement.scrollWidth;
  backgroundCanvas.height = document.documentElement.scrollHeight;
  const backgroundContext = backgroundCanvas.getContext("2d");
  onContextUpdate(backgroundContext);

  // Function to resize the canvas
  const resizeCanvas = () => {
    backgroundCanvas.width = document.documentElement.scrollWidth;
    backgroundCanvas.height = document.documentElement.scrollHeight;
    onContextUpdate(backgroundCanvas.getContext("2d"));
  };

  // Add the resize event listener
  window.addEventListener("resize", resizeCanvas);

  // Cleanup function to remove the event listener
  return () => {
    window.removeEventListener("resize", resizeCanvas);
  };
}
