import { useState, useRef, useEffect } from "react";
import {
  Header1,
  MainText1,
  Header2,
  MainText2,
  Header3,
  MainText3,
} from "./Text.js";

function PlayGround(Text1, Text2, Text3) {
  const Playground = useRef(null);
  const [ctx, setCtx] = useState(null);

  // Creates a canvas
  useEffect(() => {
    // Creates references to current canvases
    const backgroundCanvas = Playground.current;
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

  function DrawTextBlurb(Header, MainT, x, y) {
    if (ctx) {
      //Shape
      ctx.beginPath();
      ctx.arc(x, y, 300, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 0, 0, 0.95)";
      ctx.fill();
      //Glow
      ctx.shadowColor = "rgba(5, 120, 250, 0.8)";
      ctx.shadowBlur = 50;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      //Border
      ctx.lineWidth = 5;
      ctx.strokeStyle = "rgb(5, 120, 250)";
      ctx.stroke();
      //Reset Shadow
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      //Header
      ctx.font = "2.5rem Protest Guerrilla";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      TextBreaker(Header, x, y - 100, 30);
      //Main Text
      ctx.font = "1.3rem Protest Guerrilla";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      TextBreaker(MainT, x, y - 25, 20);
    }
  }

  function TextBreaker(text, x, y, lengthWisSpace) {
    const words = text.split(" ");
    let line = "";
    const lines = [];
    const maxWidth = 550;
    //Builds the individual lines
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const LengthMet = ctx.measureText(testLine);
      const testWidth = LengthMet.width;
      if (testWidth > maxWidth && i > 0) {
        lines.push(line);
        line = words[i] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    for (let j = 0; j < lines.length; j++) {
      ctx.fillText(lines[j], x, y + 20 + j * lengthWisSpace);
    }
  }

  useEffect(() => {
    DrawTextBlurb(Header1, MainText1, 300, 300);
    DrawTextBlurb(Header2, MainText2, 300, 700);
    DrawTextBlurb(Header3, MainText3, 300, 2000);
  }, [ctx]);

  return (
    <canvas
      ref={Playground}
      className="PlayGround"
      width={document.documentElement.scrollWidth}
      height={document.documentElement.scrollHeight}
    ></canvas>
  );
}

export default PlayGround;
