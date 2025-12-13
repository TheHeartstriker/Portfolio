"use client";
import { useState, useRef, useEffect, useContext } from "react";
import { AddMember, RemoveMember } from "../../utils/aniFrame";
import { isMobile } from "@/utils/isMobile";
import { drawLine, drawLineAnimated, drawRadial } from "./drawFunctions";
import "./background.css";
import { AnimationContext } from "../animationContext";

function Background() {
  const backgroundRef = useRef(null);
  const cursorBackgroundRef = useRef(null);
  const colorRef = useRef({ lineColor: "", cursorColor: "" });
  const [backgroundCtx, setBackgroundCtx] = useState(null);
  const [cursorCtx, setCursorCtx] = useState(null);
  const offsetRef = useRef(0);
  const SquareGridSize = 50;
  const SquareLine = 1;
  const Mouse = useRef({ x: 0, y: 0 });
  //For opening animation
  const { isAnimating } = useContext(AnimationContext);
  const accelerationDuration = 2500;
  const targetSpeed = 0.5;
  const animationStartTimeRef = useRef(null);

  // Creates a canvas
  useEffect(() => {
    const backgroundCanvas = backgroundRef.current;
    const cursorCanvas = cursorBackgroundRef.current;
    const isMobileDevice = isMobile();
    if (!backgroundCanvas || !cursorCanvas) return;
    const resizeCanvas = () => {
      //Static resolution for mobile devices
      if (isMobileDevice) {
        backgroundCanvas.width = window.screen.width;
        backgroundCanvas.height = window.screen.height * 1.2;
        cursorCanvas.width = window.screen.width;
        cursorCanvas.height = window.screen.height * 1.2;
      } else {
        backgroundCanvas.width = window.innerWidth;
        backgroundCanvas.height = window.innerHeight * 1.2;
        cursorCanvas.width = window.innerWidth;
        cursorCanvas.height = window.innerHeight * 1.2;
      }
      setBackgroundCtx(backgroundCanvas.getContext("2d"));
      setCursorCtx(cursorCanvas.getContext("2d"));
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
  //Moving animation
  function Draw(animating) {
    if (!backgroundCtx) return;

    // Calculate current speed based on elapsed time
    let currentSpeed = targetSpeed;
    if (animating) {
      if (animationStartTimeRef.current !== null) {
        const elapsed = Date.now() - animationStartTimeRef.current;
        if (elapsed < accelerationDuration) {
          // Ease-in quadratic function
          const progress = elapsed / accelerationDuration;
          currentSpeed = targetSpeed * progress * progress;
        }
      }
    }

    offsetRef.current += currentSpeed;
    let width = backgroundRef.current.width;
    let height = backgroundRef.current.height;
    backgroundCtx.clearRect(0, 0, width, height);
    let GridWidth = Math.ceil(width / SquareGridSize);
    let GridHeight = Math.ceil(height / SquareGridSize);
    let HeightMove = (offsetRef.current % SquareGridSize) - SquareGridSize;

    for (let i = 0; i <= GridHeight; i++) {
      drawLine(
        backgroundCtx,
        colorRef,
        0,
        HeightMove + i * SquareGridSize,
        backgroundRef.current.width,
        HeightMove + i * SquareGridSize,
        SquareLine
      );
    }

    for (let i = 0; i <= GridWidth; i++) {
      drawLine(
        backgroundCtx,
        colorRef,
        i * SquareGridSize,
        0,
        i * SquareGridSize,
        backgroundRef.current.height,
        SquareLine
      );
    }
  }
  //Opening animation
  //Takes 2s to resolve
  function openingAnimation() {
    if (!backgroundCtx) return Promise.resolve(false);

    let width = backgroundRef.current.width;
    let height = backgroundRef.current.height;
    let GridWidth = Math.ceil(width / SquareGridSize);
    let GridHeight = Math.ceil(height / SquareGridSize);

    const maxTimeoutHorizontal = GridHeight * 50;
    const maxTimeoutVertical = GridWidth * 50;
    const maxTimeout = Math.max(maxTimeoutHorizontal, maxTimeoutVertical) + 500;

    for (let i = 0; i <= GridHeight; i++) {
      setTimeout(() => {
        drawLineAnimated(
          backgroundCtx,
          colorRef,
          0,
          i * SquareGridSize,
          backgroundRef.current.width,
          i * SquareGridSize,
          SquareLine,
          750
        );
      }, i * 50);
    }

    for (let i = GridWidth; i >= 0; i--) {
      setTimeout(() => {
        drawLineAnimated(
          backgroundCtx,
          colorRef,
          i * SquareGridSize,
          0,
          i * SquareGridSize,
          backgroundRef.current.height,
          SquareLine,
          750
        );
      }, (GridWidth - i) * 50);
    }
    console.log(maxTimeout);

    return new Promise((resolve) => {
      setTimeout(() => resolve(true), maxTimeout);
    });
  }

  useEffect(() => {
    if (!backgroundCtx) return;
    //Scrolling grid
    async function startAnimation() {
      if (isAnimating) {
        await openingAnimation();
      }
      animationStartTimeRef.current = Date.now();
      function update() {
        Draw(isAnimating);
      }
      AddMember(update);
      return () => {
        RemoveMember(update);
      };
    }

    function drawCursor() {
      if (!cursorCtx) return;
      function updateCursor() {
        cursorCtx.clearRect(
          0,
          0,
          backgroundRef.current.width,
          backgroundRef.current.height
        );
        drawRadial(cursorCtx, colorRef, Mouse.current.x, Mouse.current.y);
      }
      AddMember(updateCursor);
      return () => {
        RemoveMember(updateCursor);
      };
    }

    drawCursor();
    startAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backgroundCtx]);

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
      <canvas ref={cursorBackgroundRef} id="cursorBackgroundId" />
    </div>
  );
}

export default Background;
