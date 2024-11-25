import { useState, useRef, useEffect } from "react";

function Background() {
  const backgroundRef = useRef(null);
  const [ctx, setCtx] = useState(null);

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
  const [validPoints, setValidPoints] = useState([]);
  function AddValid() {
    setValidPoints([
      // From the left side
      {
        x1: 0,
        y1: Math.random() * window.innerHeight,
        x2: Math.random() * window.innerWidth,
        y2: Math.random() * window.innerHeight,
        TurnDistance: 20 + Math.random() * 80,
        lineWidth: Math.random() * 5,
      },
      // From the right side
      {
        x1: window.innerWidth,
        y1: Math.random() * window.innerHeight,
        x2: Math.random() * window.innerWidth,
        y2: Math.random() * window.innerHeight,
        TurnDistance: 20 + Math.random() * 80,
        lineWidth: Math.random() * 5,
      },
      // From the top side
      {
        x1: Math.random() * window.innerWidth,
        y1: 0,
        x2: Math.random() * window.innerWidth,
        y2: Math.random() * window.innerHeight,
        TurnDistance: 20 + Math.random() * 80,
        lineWidth: Math.random() * 5,
      },
      // From the bottom side
      {
        x1: Math.random() * window.innerWidth,
        y1: window.innerHeight,
        x2: Math.random() * window.innerWidth,
        y2: Math.random() * window.innerHeight,
        TurnDistance: 20 + Math.random() * 80,
        lineWidth: Math.random() * 5,
      },
    ]);
  }

  function DrawPattern() {
    if (!ctx) return;

    const newPoints = validPoints.map((point) => {
      let direction = Math.random() * 4;
      //Pick a random direction
      if (direction < 1) {
        point.x2 = point.x1 - point.TurnDistance;
        point.y2 = point.y1;
      } else if (direction < 2) {
        point.x2 = point.x1 + point.TurnDistance;
        point.y2 = point.y1;
      } else if (direction < 3) {
        point.x2 = point.x1;
        point.y2 = point.y1 - point.TurnDistance;
      } else {
        point.x2 = point.x1;
        point.y2 = point.y1 + point.TurnDistance;
      }

      if (
        point.x1 >= 0 &&
        point.x1 <= window.innerWidth &&
        point.y1 >= 0 &&
        point.y1 <= window.innerHeight &&
        point.x2 >= 0 &&
        point.x2 <= window.innerWidth &&
        point.y2 >= 0 &&
        point.y2 <= window.innerHeight
      ) {
        DrawLine(point.x1, point.y1, point.x2, point.y2, point.lineWidth);
        // Update x1 and y1 to the new position
        point.x1 = point.x2;
        point.y1 = point.y2;
      }

      return point;
    });

    setValidPoints(newPoints);
  }
  //Helper function to draw lines
  function DrawLine(x1, y1, x2, y2, lineWidth) {
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    //Colors
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "black";
    //Glow
    ctx.shadowColor = "blue";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.stroke();
  }

  useEffect(() => {
    AddValid();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      DrawPattern();
    }, 100); // Adjust the interval as needed
    return () => clearInterval(interval);
  }, [validPoints, ctx]);

  return (
    <div>
      <canvas
        ref={backgroundRef}
        id="backgroundId"
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </div>
  );
}

export default Background;
