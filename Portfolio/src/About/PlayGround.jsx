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
  const [ObjectData, setObjectData] = useState();
  const [OnMouseDown, setOnMouseDown] = useState(false);
  const Mouse = useRef({ x: 0, y: 0 });
  const Offset = useRef({ x: 0, y: 0 });
  const Which = useRef(null);
  const Gravity = 9.8;
  const Radius = 330;

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
      ctx.arc(x, y, Radius, 0, Math.PI * 2);
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
  function InitData() {
    setObjectData([
      {
        Header: Header1,
        MainText: MainText1,
        x: 500,
        y: 1350,
      },
      {
        Header: Header2,
        MainText: MainText2,
        x: 1420,
        y: 1850,
      },
      {
        Header: Header3,
        MainText: MainText3,
        x: 500,
        y: 2350,
      },
    ]);
  }
  function WhichOne() {
    if (ObjectData == null) return;
    for (let i = 0; i < ObjectData.length; i++) {
      let distance = Math.sqrt(
        Math.pow(Mouse.current.x - ObjectData[i].x, 2) +
          Math.pow(Mouse.current.y - ObjectData[i].y, 2)
      );
      if (distance < Radius) {
        return i;
      }
    }
  }

  function OnDrag(Bool) {
    setOnMouseDown(Bool);
  }

  function MouseTracker(e) {
    Mouse.current.x = e.pageX;
    Mouse.current.y = e.pageY;
  }

  function OffsetSetter() {
    if (OnMouseDown) {
      if (Which.current != null) {
        console.log(Which.current);
        Offset.current.x = Mouse.current.x - ObjectData[Which.current].x;
        Offset.current.y = Mouse.current.y - ObjectData[Which.current].y;
      }
    }
  }

  function Drag() {
    if (Which.current != null) {
      console.log(Which.current);
      console.log(Mouse.current);
      ObjectData[Which.current].x = Mouse.current.x - Offset.current.x;
      ObjectData[Which.current].y = Mouse.current.y - Offset.current.y;
    }
  }

  function Collision(data) {
    //Window collision's
    if (data.x < Radius) {
      data.x = Radius;
    }
    if (data.x > document.documentElement.scrollWidth - Radius) {
      data.x = document.documentElement.scrollWidth - Radius;
    }
    if (data.y < Radius) {
      data.y = Radius;
    }
    if (data.y > document.documentElement.scrollHeight - Radius) {
      data.y = document.documentElement.scrollHeight - Radius;
    }
    //Object collision's
    for (let i = 0; i < ObjectData.length; i++) {
      if (data === ObjectData[i]) continue;
      let distance = Math.sqrt(
        Math.pow(data.x - ObjectData[i].x, 2) +
          Math.pow(data.y - ObjectData[i].y, 2)
      );
      if (distance < Radius * 2) {
        let angle = Math.atan2(
          data.y - ObjectData[i].y,
          data.x - ObjectData[i].x
        );
        data.x = ObjectData[i].x + Math.cos(angle) * Radius * 2;
        data.y = ObjectData[i].y + Math.sin(angle) * Radius * 2;
      }
    }
  }

  function Main() {
    if (ctx && ObjectData) {
      Drag();
      ctx.clearRect(
        0,
        0,
        document.documentElement.scrollHeight,
        document.documentElement.scrollHeight
      );
      const newData = ObjectData.map((data) => {
        data.y += Gravity;
        Collision(data);
        DrawTextBlurb(data.Header, data.MainText, data.x, data.y);
        return data;
      });
      setObjectData(newData);
    }
    requestAnimationFrame(Main);
  }

  function Down() {
    if (OnMouseDown) {
      let index = WhichOne();
      Which.current = index;
      OffsetSetter();
    } else {
      Which.current = null;
    }
  }

  useEffect(() => {
    document.addEventListener("mousemove", MouseTracker);
    document.addEventListener("mousedown", () => OnDrag(true));
    document.addEventListener("mouseup", () => OnDrag(false));
    return () => {
      document.removeEventListener("mousemove", MouseTracker);
      document.removeEventListener("mousedown", () => OnDrag(true));
      document.removeEventListener("mouseup", () => OnDrag(false));
    };
  }, []);

  useEffect(() => {
    Down();
  }, [OnMouseDown]);

  useEffect(() => {
    if (ctx == null) return;
    InitData();
    if (ObjectData) {
      Main();
    }
  }, [ctx]);

  return (
    <canvas
      ref={Playground}
      className="PlayGround"
      width={window.innerWidth}
      height={window.innerHeight}
    ></canvas>
  );
}

export default PlayGround;
