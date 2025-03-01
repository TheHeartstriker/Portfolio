import React, { useEffect, useRef, useState } from "react";

function Shadow() {
  const ShadowData = useRef({});
  const ShadowCircles = 1;
  const DitherAmount = 200;
  const [ctx, setCtx] = useState(null);
  const ShadowRef = useRef(null);
  // Creates a canvas
  useEffect(() => {
    // Creates references to current canvases
    const backgroundCanvas = ShadowRef.current;
    // Sets the default canvas sizes to the window size
    backgroundCanvas.width = document.documentElement.scrollWidth;
    backgroundCanvas.height = document.documentElement.scrollHeight;
    // Gets the context of the canvas
    const backgroundContext = backgroundCanvas.getContext("2d");
    // Sets the context to the state
    setCtx(backgroundContext);
    // Function to resize the canvas
    const resizeCanvas = () => {
      // The resize
      backgroundCanvas.width = document.documentElement.scrollWidth;
      backgroundCanvas.height = document.documentElement.scrollHeight;
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
  //Pixel information
  // Pixel information
  function InputShadowData(x, y, radius) {
    for (let i = 0; i < ShadowCircles; i++) {
      let NewShadowInfo = [];
      for (let j = 0; j < DitherAmount; j++) {
        let RanAngle = Math.random() * Math.PI * 2;
        let RanRadius = Math.sqrt(Math.random()) * radius;
        let RanX = Math.cos(RanAngle) * RanRadius;
        let RanY = Math.sin(RanAngle) * RanRadius;
        ctx.fillRect(x + RanX, y + RanY, 1, 1);
        NewShadowInfo.push([x + RanX, y + RanY]);
      }
      ShadowData.current[`Circle${i}`] = NewShadowInfo;
    }
  }

  function EmptyFill() {
    for (let i = 0; i < ShadowCircles; i++) {
      let Curr = new Array(DitherAmount).fill(0);
      ShadowData.current[`Circle${i}`] = Curr;
    }
  }
  function Main() {
    const fps = 30;
    const interval = 1000 / fps;
    let lastTime = 0;

    function animate(time) {
      if (time - lastTime >= interval) {
        lastTime = time;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        InputShadowData(300, 300, 50);
      }
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  useEffect(() => {
    if (ctx) {
      EmptyFill();
      if (ShadowData.current.Circle0) {
        Main();
      }
    }
  }, []);

  return (
    <canvas
      ref={ShadowRef}
      className="Shadow"
      width={document.documentElement.scrollWidthX}
      height={document.documentElement.scrollHeightY}
    ></canvas>
  );
}

export default Shadow;
