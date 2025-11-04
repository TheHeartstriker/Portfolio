"use client";
import { useEffect, useRef, useState } from "react";
function PixelHover() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const gridRef = useRef([]);
  const [pixSize, setPixSize] = useState(0);
  const parentRectRef = useRef(null);
  const rowRef = useRef(0);
  const frameId = useRef(0);
  const colRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    setCtx(context);
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      //Update the canvas resolution to match parent size
      const parentRect = parent.getBoundingClientRect();
      parentRectRef.current = parentRect;
      canvas.width = parentRect.width;
      canvas.height = parentRect.height;
      //Update pixel size based on window size
      const newPixSize =
        window.innerWidth <= 1250
          ? window.innerWidth * 0.005
          : window.innerWidth * 0.003;
      setPixSize(newPixSize);
      //Set canvas stuff
      setCtx(canvas.getContext("2d"));
      Impose(newPixSize);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  function create2DArray(Rows, Cols, leftX, topY, pixSize) {
    let arr = new Array(Rows); //Create array of empty rows

    for (let i = 0; i < arr.length; i++) {
      //Index into row and create empty columns
      arr[i] = new Array(Cols);
      //Iterate over the empty columns in the row
      for (let j = 0; j < arr[i].length; j++) {
        arr[i][j] = {
          x: leftX + j * pixSize,
          y: topY + i * pixSize,
          opacity: 0.0,
          color: "#b51a2b",
        };
      }
    }

    return arr;
  }

  //Defines the number of rows and columns based on the window size
  function Impose(pixSize) {
    const canvas = canvasRef.current;
    if (!canvas || pixSize <= 0) return;
    const rows = Math.floor(canvas.height / pixSize);
    const cols = Math.floor(canvas.width / pixSize);
    rowRef.current = rows;
    colRef.current = cols;
    // Creates the grid based on the number of rows and columns
    let initialGrid = create2DArray(
      rows,
      cols,
      0, // leftX starts at 0
      0, // topY starts at 0
      pixSize
    );
    gridRef.current = initialGrid;
  }

  function drawSquare(x, y, color, opacity) {
    if (!ctx) return;
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    ctx.fillRect(x, y, pixSize, pixSize);
    ctx.globalAlpha = 1.0; // Reset alpha
  }

  function render() {
    const canvas = canvasRef.current;
    if (!ctx || !canvas || !gridRef.current || !gridRef.current.length) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < gridRef.current.length; i++) {
      for (let j = 0; j < gridRef.current[i].length; j++) {
        if (gridRef.current[i][j].opacity > 0)
          gridRef.current[i][j].opacity -= 0.05;
        if (gridRef.current[i][j].opacity > 0) {
          drawSquare(
            gridRef.current[i][j].x,
            gridRef.current[i][j].y,
            gridRef.current[i][j].color,
            gridRef.current[i][j].opacity
          );
        }
      }
    }
  }
  function MouseEffect() {
    const canvas = canvasRef.current;
    if (!ctx || !canvas) {
      return;
    }

    // Get collumn and row location of the mouse's x and y
    let col = Math.floor(mousePosRef.current.x / pixSize);
    let row = Math.floor(mousePosRef.current.y / pixSize);

    // Defining are var's
    let radius = 40; //How large the effect circle is in cells
    const minChange = 0.05; // How little we can increase opacity
    const maxChange = 0.1; // How much we can increase opacity

    //Iterate over effect are and apply effects
    for (let i = -radius; i <= radius; i++) {
      for (let j = -radius; j <= radius; j++) {
        const distance = Math.sqrt(i * i + j * j);
        if (distance <= radius && Math.random() < 0.5) {
          const curCol = col + i;
          const curRow = row + j;
          if (
            curCol >= 0 &&
            curCol < colRef.current &&
            curRow >= 0 &&
            curRow < rowRef.current
          ) {
            // 1 at center -> 0 at edge
            const normDis = 1 - distance / radius;
            // Map to [minChange..maxChange]
            const change = minChange + (maxChange - minChange) * normDis;

            gridRef.current[curRow][curCol].opacity = Math.min(
              1.0,
              gridRef.current[curRow][curCol].opacity + change
            );
          }
        }
      }
    }
  }
  useEffect(() => {
    if (!ctx || !pixSize || pixSize <= 0) return;
    Impose(pixSize);
    function animate() {
      frameId.current = requestAnimationFrame(animate);
      MouseEffect();
      render();
    }
    animate();
    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [ctx]);
  function mouseTracker(e) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get canvas position directly
    const canvasRect = canvas.getBoundingClientRect();

    // Get mouse position relative to canvas
    const mouseX = e.clientX - canvasRect.left;
    const mouseY = e.clientY - canvasRect.top;

    mousePosRef.current.x = mouseX;
    mousePosRef.current.y = mouseY;
  }
  useEffect(() => {
    setPixSize(window.innerWidth * 0.003);
    window.addEventListener("mousemove", mouseTracker);
    return () => {
      window.removeEventListener("mousemove", mouseTracker);
    };
  }, []);

  return <canvas className="card-canvas" ref={canvasRef}></canvas>;
}

export default PixelHover;
