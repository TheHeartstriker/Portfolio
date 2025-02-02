import { useState, useRef, useEffect } from "react";
import { DrawTextBlurb } from "./HelperPg.jsx";
import {
  Header1,
  MainText1,
  Header2,
  MainText2,
  Header3,
  MainText3,
} from "./Text.js";
import { use } from "react";

function PlayGround(Text1, Text2, Text3) {
  const Playground = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [ObjectData, setObjectData] = useState();
  const [OnMouseDown, setOnMouseDown] = useState(false);
  const MouseDownStartTime = useRef(null);
  const Radius = useRef(window.innerWidth / 5);
  const Mouse = useRef({ x: 0, y: 0 });

  const InitalMouse = useRef({ x: 0, y: 0 });
  const EndMouse = useRef({ x: 0, y: 0 });
  const Offset = useRef({ x: 0, y: 0 });
  const Which = useRef(null);
  const TimeStep = 0.016;

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
      Radius.current = window.innerWidth / 5;
    };
    // Event listener where the resizeCanvas function is called
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  function InitData() {
    setObjectData([
      {
        Header: Header1,
        MainText: MainText1,
        x: 500,
        y: 1350,
        velocity: { x: 100, y: 100 },
        Active: false,
      },
      {
        Header: Header2,
        MainText: MainText2,
        x: 1420,
        y: 1850,
        velocity: { x: 0, y: 0 },
        Active: false,
      },
      {
        Header: Header3,
        MainText: MainText3,
        x: 500,
        y: 2350,
        velocity: { x: 0, y: 0 },
        Active: false,
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
      if (distance < Radius.current) {
        return i;
      }
    }
  }

  function MouseDown() {
    setOnMouseDown(true);
    MouseDownStartTime.current = Date.now() / 1000;
    InitalMouse.current.x = Mouse.current.x;
    InitalMouse.current.y = Mouse.current.y;
  }

  function MouseUp() {
    setOnMouseDown(false);
    MouseDownStartTime.current = null;
    EndMouse.current.x = Mouse.current.x;
    EndMouse.current.y = Mouse.current.y;
  }

  function MouseTracker(e) {
    Mouse.current.x = e.pageX;
    Mouse.current.y = e.pageY;
  }

  function OffsetSetter() {
    if (OnMouseDown) {
      if (Which.current != null) {
        Offset.current.x = Mouse.current.x - ObjectData[Which.current].x;
        Offset.current.y = Mouse.current.y - ObjectData[Which.current].y;
      }
    }
  }
  function Drag() {
    if (Which.current != null) {
      let Object = ObjectData[Which.current];
      let { velocityX, velocityY } = CalVelocity(
        InitalMouse.current,
        Mouse.current,
        Date.now() / 1000 - MouseDownStartTime.current
      );
      // Actual Dragging
      Object.x = Mouse.current.x - Offset.current.x;
      Object.y = Mouse.current.y - Offset.current.y;
      // Velocity
      Object.velocity.x = velocityX;
      Object.velocity.y = velocityY;
    }
  }

  function CalVelocity(Start, End, Time) {
    const velocityX = (End.x - Start.x) / Time + Time * 5;
    const velocityY = (End.y - Start.y) / Time + Time * 5;

    return { velocityX, velocityY };
  }
  function Collision(data) {
    //Window collision's
    if (data.x < Radius.current) {
      data.x = Radius.current;
      data.velocity.x *= 0.7;
      data.velocity.x *= -1;
    }
    if (data.x > document.documentElement.scrollWidth - Radius.current) {
      data.x = document.documentElement.scrollWidth - Radius.current;
      data.velocity.x *= 0.7;
      data.velocity.x *= -1;
    }
    if (data.y < Radius.current) {
      data.y = Radius.current;
      data.velocity.y *= 0.7;
      data.velocity.y *= -1;
    }
    if (data.y > document.documentElement.scrollHeight - Radius.current) {
      data.y = document.documentElement.scrollHeight - Radius.current;
      data.velocity.y *= 0.7;
      data.velocity.y *= -1;
    }
    //Object collision's
    for (let i = 0; i < ObjectData.length; i++) {
      if (data === ObjectData[i]) continue;
      let distance = Math.sqrt(
        Math.pow(data.x - ObjectData[i].x, 2) +
          Math.pow(data.y - ObjectData[i].y, 2)
      );
      if (distance < Radius.current * 2) {
        let angle = Math.atan2(
          data.y - ObjectData[i].y,
          data.x - ObjectData[i].x
        );
        let overlap = Radius.current * 2 - distance;
        let moveX = (Math.cos(angle) * overlap) / 2;
        let moveY = (Math.sin(angle) * overlap) / 2;

        // Move both objects away from each other
        data.x += moveX;
        data.y += moveY;
        ObjectData[i].x -= moveX;
        ObjectData[i].y -= moveY;
        ObjectData[i].velocity.x = data.velocity.x;
        ObjectData[i].velocity.y = data.velocity.y;
      }
    }
  }

  async function Main() {
    if (ctx && ObjectData) {
      CursorChange();
      Drag();
      ctx.clearRect(
        0,
        0,
        document.documentElement.scrollHeight,
        document.documentElement.scrollHeight
      );
      const newData = ObjectData.map((data) => {
        if (data.Active == false) {
          data.x += data.velocity.x * TimeStep;
          data.y += data.velocity.y * TimeStep;
          data.velocity.x *= 0.95;
          data.velocity.y *= 0.95;
        }
        //Friction
        Collision(data);
        DrawTextBlurb(
          data.Header,
          data.MainText,
          data.x,
          data.y,
          Radius.current,
          ctx
        );
        return data;
      });
      setObjectData(newData);
    }
    requestAnimationFrame(Main);
  }

  function Down() {
    if (OnMouseDown && ObjectData) {
      let index = WhichOne();
      Which.current = index;
      if (index == null) return;
      ObjectData[index].Active = true;
      OffsetSetter();
    } else {
      if (Which.current != null && ObjectData) {
        ObjectData[Which.current].Active = false;
      }
      Which.current = null;
    }
  }

  useEffect(() => {
    document.addEventListener("mousemove", MouseTracker);
    document.addEventListener("mousedown", () => MouseDown());
    document.addEventListener("mouseup", () => MouseUp());
    return () => {
      document.removeEventListener("mousemove", MouseTracker);
      document.removeEventListener("mousedown", () => MouseDown());
      document.removeEventListener("mouseup", () => MouseUp());
    };
  }, []);

  function CursorChange() {
    if (Playground.current != null && WhichOne() != null) {
      console.log("here");
      Playground.current.style.cursor = "grab";
    } else {
      Playground.current.style.cursor = "default";
    }
  }

  useEffect(() => {
    Down();
  }, [OnMouseDown]);

  useEffect(() => {
    if (ctx == null) return;
    InitData();
  }, [ctx]);
  const [isCalled, setIsCalled] = useState(false);
  useEffect(() => {
    if (ObjectData && !isCalled) {
      Main();
      setIsCalled(true);
    }
  }, [ObjectData, isCalled]);

  return (
    <canvas
      ref={Playground}
      className="PlayGround"
      width={document.documentElement.scrollWidthX}
      height={document.documentElement.scrollHeightY}
    ></canvas>
  );
}

export default PlayGround;
