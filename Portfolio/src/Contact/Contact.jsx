import { useState, useEffect, useRef } from "react";
import { DrawCircle } from "./CanvasH";

function Contact() {
  //Github
  //LinkedIn
  //Email
  const [ctx, setCtx] = useState(null);
  const Radius = useRef(100);
  const Contact = useRef(null);

  const ObjectData = useRef([]);
  const [OnMouseDown, setOnMouseDown] = useState(false);
  //Used to render on load
  const [isCalled, setIsCalled] = useState(false);
  const MouseDownStartTime = useRef(null);
  const Mouse = useRef({ x: 0, y: 0 });

  const InitalMouse = useRef({ x: 0, y: 0 });
  const EndMouse = useRef({ x: 0, y: 0 });
  const Offset = useRef({ x: 0, y: 0 });
  const Which = useRef(null);
  const TimeStep = 0.16;

  // Creates a canvas
  useEffect(() => {
    // Creates references to current canvases
    const backgroundCanvas = Contact.current;
    // Sets the default canvas sizes to the window size
    backgroundCanvas.width = window.innerWidth;
    backgroundCanvas.height = window.innerHeight;
    // Gets the context of the canvas
    const backgroundContext = backgroundCanvas.getContext("2d");
    // Sets the context to the state
    setCtx(backgroundContext);

    const resizeCanvas = () => {
      // The resize
      backgroundCanvas.width = window.innerWidth;
      backgroundCanvas.height = window.innerHeight;
      // After resizing the canvas, we need to get the context again
      setCtx(backgroundCanvas.getContext("2d"));
    };
    // Event listener where the resizeCanvas function is called
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  function InitData() {
    for (let i = 0; i < 20; i++) {
      ObjectData.current.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        velocity: {
          x: Math.random() * 100,
          y: Math.random() * 100,
        },
        Active: false,
      });
    }
  }
  //Given the current mouse position, it will return the index of the object that is being hovered over
  function WhichOne() {
    if (ObjectData.current == null) return;
    for (let i = 0; i < ObjectData.current.length; i++) {
      let distance = Math.sqrt(
        Math.pow(Mouse.current.x - ObjectData.current[i].x, 2) +
          Math.pow(Mouse.current.y - ObjectData.current[i].y, 2)
      );
      if (distance < Radius.current) {
        return i;
      }
    }
  }

  //Handles collision between objects and the window
  function Collision(data) {
    //Window collision's
    if (data.x < Radius.current) {
      data.x = Radius.current;
      data.velocity.x *= 0.7;
      data.velocity.x *= -1;
    }
    if (data.x > window.innerWidth - Radius.current) {
      data.x = window.innerWidth - Radius.current;
      data.velocity.x *= 0.7;
      data.velocity.x *= -1;
    }
    if (data.y < Radius.current) {
      data.y = Radius.current;
      data.velocity.y *= 0.7;
      data.velocity.y *= -1;
    }
    if (data.y > window.innerHeight - Radius.current) {
      data.y = window.innerHeight - Radius.current;
      data.velocity.y *= 0.7;
      data.velocity.y *= -1;
    }
    //Object collision's
    for (let i = 0; i < ObjectData.current.length; i++) {
      if (data === ObjectData.current[i]) continue;
      let Distance = Math.sqrt(
        Math.pow(data.x - ObjectData.current[i].x, 2) +
          Math.pow(data.y - ObjectData.current[i].y, 2)
      );
      if (Distance < Radius.current * 2) {
        let angle = Math.atan2(
          data.y - ObjectData.current[i].y,
          data.x - ObjectData.current[i].x
        );
        let overlap = Radius.current * 2 - Distance;
        let moveX = (Math.cos(angle) * overlap) / 2;
        let moveY = (Math.sin(angle) * overlap) / 2;
        // Move both objects away from each other
        data.x += moveX;
        data.y += moveY;
        ObjectData.current[i].x -= moveX;
        ObjectData.current[i].y -= moveY;
      }
    }
  }
  //Main loop
  function Main() {
    if (ctx && ObjectData.current && Contact.current) {
      //CursorChange();
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const newData = ObjectData.current.map((data) => {
        data.x += data.velocity.x * TimeStep;
        data.y += data.velocity.y * TimeStep;
        data.velocity.x *= 0.97;
        data.velocity.y *= 0.97;
        //Friction
        Collision(data);
        //Gravity
        data.velocity.y += (9.8 * TimeStep) / 2;
        DrawCircle("#000000", data.x, data.y, Radius.current, ctx);
        return data;
      });
      ObjectData.current = newData;
    }
    requestAnimationFrame(Main);
  }

  //Changes the cursor to a grab when hovering over an object
  function CursorChange() {
    if (Contact.current != null && WhichOne() != null) {
      Contact.current.style.cursor = "pointer";
    } else {
      Contact.current.style.cursor = "default";
    }
  }

  useEffect(() => {
    if (ctx == null) return;
    InitData();
  }, [ctx]);
  useEffect(() => {
    if (ObjectData.current && !isCalled && Contact.current && ctx) {
      Main();
      setIsCalled(true);
    }
  }, [ctx]);

  return (
    <>
      <canvas id="ContactCanvas" ref={Contact}></canvas>
      <div className="ContactContainer">
        <div className="Contact">
          <h1>Contact me :)</h1>
          <button>SerKadenWildauer@gmail.com</button>
        </div>
      </div>
    </>
  );
}

export default Contact;
