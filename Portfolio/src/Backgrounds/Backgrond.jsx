import { useState, useRef, useEffect } from "react";

function Background() {
  const backgroundRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const offsetRef = useRef(0);
  const SquareGridSize = 50;
  const SquareLine = 1;

  // Creates a canvas
  useEffect(() => {
    // Creates references to current canvases
    const backgroundCanvas = backgroundRef.current;
    // Sets the default canvas sizes to the window size
    backgroundCanvas.width = window.innerWidth;
    backgroundCanvas.height = window.innerHeight;
    // Gets the context of the canvas
    const backgroundContext = backgroundCanvas.getContext("2d");
    // Sets the context to the state
    setCtx(backgroundContext);
    // Function to resize the canvas
    const resizeCanvas = () => {
      // The resize
      backgroundCanvas.width = window.innerWidth;
      backgroundCanvas.height = window.innerHeight;
      // After resizing the canvas, we need to get the context again
      setCtx(backgroundCanvas.getContext("2d"));
      // Where the redrawing of the canvas happens
    };
    // Event listener where the resizeCanvas function is called
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);
  function Draw() {
    if (!ctx) return;
    offsetRef.current += 0.5;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    let GridWidth = Math.ceil(window.innerWidth / SquareGridSize);
    let GridHeight = Math.ceil(window.innerHeight / SquareGridSize);
    let HeightMove = (offsetRef.current % SquareGridSize) - SquareGridSize;

    for (let i = 0; i <= GridHeight; i++) {
      DrawLine(
        0,
        HeightMove + i * SquareGridSize,
        window.innerWidth,
        HeightMove + i * SquareGridSize,
        SquareLine
      );
    }

    for (let i = 0; i <= GridWidth; i++) {
      DrawLine(
        i * SquareGridSize,
        0,
        i * SquareGridSize,
        window.innerHeight,
        SquareLine
      );
    }
    requestAnimationFrame(Draw);
  }

  //Main function to draw the pattern
  //Helper function to draw lines
  function DrawLine(x1, y1, x2, y2, lineWidth) {
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    //Colors
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "#1B1B1B";
    //Glow
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.stroke();
  }

  useEffect(() => {
    Draw();
  }, [ctx]);

  return (
    <div>
      <canvas
        ref={backgroundRef}
        id="backgroundId"
        width={window.innerWidth + 100}
        height={window.innerHeight + 100}
      />
    </div>
  );
}

export default Background;
