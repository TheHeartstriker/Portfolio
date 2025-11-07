"use client";
import { useState, useRef, useEffect } from "react";
import { AddMember, RemoveMember } from "../../utils/aniFrame";
import { isMobile } from "@/utils/isMobile";
import "./background.css";

function Background() {
  const backgroundRef = useRef(null);

  const colorRef = useRef({ lineColor: "", cursorColor: "" });
  const [ctx, setCtx] = useState(null);
  const offsetRef = useRef(0);
  const SquareGridSize = 50;
  const SquareLine = 1;
  const Mouse = useRef({ x: 0, y: 0 });

  // Creates a canvas
  useEffect(() => {
    const backgroundCanvas = backgroundRef.current;
    const isMobileDevice = isMobile();
    if (!backgroundCanvas) return;
    const resizeCanvas = () => {
      //Static resolution for mobile devices
      if (isMobileDevice) {
        backgroundCanvas.width = window.screen.width;
        backgroundCanvas.height = window.screen.height;
      } else {
        backgroundCanvas.width = window.innerWidth;
        backgroundCanvas.height = window.innerHeight;
      }
      setCtx(backgroundCanvas.getContext("2d"));
    };
    resizeCanvas();
    //Do resizes for desktop
    if (!isMobileDevice) {
      window.addEventListener("resize", resizeCanvas);
    }
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  function handleMouseMove(e) {
    Mouse.current.x = e.clientX;
    Mouse.current.y = e.clientY;
  }

  function Draw() {
    if (!ctx) return;
    offsetRef.current += 0.5;
    let width = backgroundRef.current.width;
    let height = backgroundRef.current.height;
    ctx.clearRect(0, 0, width, height);
    let GridWidth = Math.ceil(width / SquareGridSize);
    let GridHeight = Math.ceil(height / SquareGridSize);
    let HeightMove = (offsetRef.current % SquareGridSize) - SquareGridSize;

    for (let i = 0; i <= GridHeight; i++) {
      drawLine(
        0,
        HeightMove + i * SquareGridSize,
        backgroundRef.current.width,
        HeightMove + i * SquareGridSize,
        SquareLine
      );
    }

    for (let i = 0; i <= GridWidth; i++) {
      drawLine(
        i * SquareGridSize,
        0,
        i * SquareGridSize,
        backgroundRef.current.height,
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
    ctx.strokeStyle = colorRef.current.lineColor;
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.stroke();
  }

  function drawRadial(x, y) {
    if (!ctx) return;
    const radius = 600;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, colorRef.current.cursorColor);
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
  }, [ctx]);

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    colorRef.current.lineColor = root.getPropertyValue("--graph-line").trim();
    colorRef.current.cursorColor = root
      .getPropertyValue("--cursor-color")
      .trim();
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
