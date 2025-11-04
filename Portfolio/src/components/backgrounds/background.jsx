"use client";
import { useState, useRef, useEffect } from "react";
import { AddMember, RemoveMember } from "../../utils/aniFrame";
import "./background.css";

function Background() {
  const backgroundRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0,
  });

  const [ctx, setCtx] = useState(null);
  const offsetRef = useRef(0);
  const SquareGridSize = 50;
  const SquareLine = 1;
  const Mouse = useRef({ x: 0, y: 0 });

  // Set canvas size after mount
  useEffect(() => {
    function updateSize() {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Creates a canvas
  useEffect(() => {
    const backgroundCanvas = backgroundRef.current;
    if (!backgroundCanvas) return;
    backgroundCanvas.width = canvasSize.width;
    backgroundCanvas.height = canvasSize.height;
    const backgroundContext = backgroundCanvas.getContext("2d");
    setCtx(backgroundContext);
    const resizeCanvas = () => {
      backgroundCanvas.width = window.innerWidth;
      backgroundCanvas.height = window.innerHeight;
      setCtx(backgroundCanvas.getContext("2d"));
    };
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [canvasSize.width, canvasSize.height]);

  function handleMouseMove(e) {
    Mouse.current.x = e.clientX;
    Mouse.current.y = e.clientY;
  }

  function Draw() {
    if (!ctx) return;
    offsetRef.current += 0.5;
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    let GridWidth = Math.ceil(canvasSize.width / SquareGridSize);
    let GridHeight = Math.ceil(canvasSize.height / SquareGridSize);
    let HeightMove = (offsetRef.current % SquareGridSize) - SquareGridSize;

    for (let i = 0; i <= GridHeight; i++) {
      drawLine(
        0,
        HeightMove + i * SquareGridSize,
        canvasSize.width,
        HeightMove + i * SquareGridSize,
        SquareLine
      );
    }

    for (let i = 0; i <= GridWidth; i++) {
      drawLine(
        i * SquareGridSize,
        0,
        i * SquareGridSize,
        canvasSize.height,
        SquareLine
      );
    }
    drawRadial(Mouse.current.x, Mouse.current.y);
  }

  function drawLine(x1, y1, x2, y2, lineWidth) {
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "#1E293B";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.stroke();
  }

  function drawRadial(x, y) {
    if (!ctx) return;
    const radius = 600;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, "rgba(29, 78, 216, 0.19)");
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  useEffect(() => {
    if (!ctx) return;
    function update() {
      Draw();
    }
    AddMember(update);
    return () => {
      RemoveMember(update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx, canvasSize]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      <canvas ref={backgroundRef} id="backgroundId" />
    </div>
  );
}

export default Background;
