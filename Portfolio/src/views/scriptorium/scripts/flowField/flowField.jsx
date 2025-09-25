"use client";
import { useEffect, useState, useRef } from "react";
import { perlin2D, drawCurve } from "./flowExport.js";

function FlowField() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const animationIdRef = useRef(null);
  const colorValues = { h: 200, s: 0, l: 77 };
  const colorValues2 = {
    color1: { h: 0, s: 80, l: 55 },
    color2: { h: 20, s: 85, l: 55 },
    color3: { h: 35, s: 90, l: 55 },
    color4: { h: 45, s: 90, l: 60 },
    color5: { h: 50, s: 90, l: 65 },
  };
  const gridRef = useRef([]);
  const rowRef = useRef(0);
  const colRef = useRef(0);
  const Pix_size = 15;

  const leftRight = useRef({ leftX: 0, rightX: 0 });
  const topBottom = useRef({ topY: 0, bottomY: 0 });
  useEffect(() => {
    // Now it's safe to use window
    leftRight.current = {
      leftX: window.innerWidth * -0.25,
      rightX: window.innerWidth * 1.25,
    };
    topBottom.current = {
      topY: window.innerHeight * -0.25,
      bottomY: window.innerHeight * 1.25,
    };

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext("2d");
    setCtx(context);

    const resizeCanvas = () => {
      leftRight.current = {
        leftX: window.innerWidth * -0.25,
        rightX: window.innerWidth * 1.25,
      };
      topBottom.current = {
        topY: window.innerHeight * -0.25,
        bottomY: window.innerHeight * 1.25,
      };
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setCtx(canvas.getContext("2d"));
      Impose();
    };
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  function render() {
    if (!ctx || !gridRef.current.length) return;
    drawCurve(ctx, gridRef, leftRight, topBottom, colorValues, Pix_size, true);
  }

  const seed = Math.random() * 1000;
  const scale = 0.01;

  function create2DArray(Rows, Cols, leftX, topY) {
    let arr = new Array(Rows);
    console.log(arr);

    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(Cols);
      for (let j = 0; j < arr[i].length; j++) {
        const angle = perlin2D(i * scale, j * scale) * Math.PI * 2;
        arr[i][j] = {
          angle: angle,
          x: leftX + i * Pix_size,
          y: topY + j * Pix_size,
        };
      }
    }
    return arr;
  }

  function Impose() {
    const rows = Math.floor(
      (leftRight.current.rightX - leftRight.current.leftX) / Pix_size
    );
    const cols = Math.floor(
      (topBottom.current.bottomY - topBottom.current.topY) / Pix_size
    );
    rowRef.current = rows;
    colRef.current = cols;
    let initialGrid = create2DArray(
      rows,
      cols,
      leftRight.current.leftX,
      topBottom.current.topY
    );
    gridRef.current = initialGrid;
  }

  useEffect(() => {
    Impose();
    render();
  }, [ctx]);

  useEffect(() => {
    const animate = () => {
      render();
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [ctx]);

  return <canvas className="myCanvas" ref={canvasRef}></canvas>;
}

export default FlowField;
