import { useState, useRef, useEffect } from "react";
import { DrawTextBlurb } from "./helperPg.jsx";
import { AddMember, RemoveMember } from "../../../utils/aniFrame.jsx";
import { defaultCanvas } from "../../../utils/canvas.jsx";
import { RowGradient } from "./helperPg.jsx";
import { useColors } from "./drawColor.jsx";
import {
  setupCanvasBall,
  WhichOne,
  CursorChange,
} from "../../../utils/shared.js";
import {
  Header1,
  MainText1,
  Header2,
  MainText2,
  Header3,
  MainText3,
} from "../text.js";

function PlayGround() {
  //
  // Regular Variables for the about balls
  //
  const [ctx, setCtx] = useState(null);
  const ObjectData = useRef(null);
  const [OnMouseDown, setOnMouseDown] = useState(false);
  //Used to render on load
  const [isCalled, setIsCalled] = useState(false);
  const Playground = useRef(null);
  const MouseDownStartTime = useRef(null);
  const Radius = useRef(0); //Radius is set in setupCanvasBall
  const Mouse = useRef({ x: 0, y: 0 });
  const InitalMouse = useRef({ x: 0, y: 0 });
  const EndMouse = useRef({ x: 0, y: 0 });
  const Offset = useRef({ x: 0, y: 0 });
  const [docSize, setDocSize] = useState({ width: 0, height: 0 });
  const Which = useRef(null);
  const TimeStep = 0.016;
  //
  // Shadow vars
  //
  const shadowRef = useRef(null);
  const [shadowCtx, setShadowCtx] = useState(null);
  const mouseDis = useRef({ Dis1: 0, Dis2: 0, Dis3: 0 });
  const colorRef = useRef({ bgColor: "", brColor: "", textColor: "" });
  let colors = useColors();
  //
  // Regular functions for the about balls
  //
  function InitData() {
    ObjectData.current = [
      {
        Header: Header1,
        MainText: MainText1,
        x: window.innerWidth / 3,
        y: window.innerHeight * 1.5,
        velocity: { x: Math.random() * 1500, y: Math.random() * 1500 },
        Active: false,
      },
      {
        Header: Header2,
        MainText: MainText2,
        x: window.innerWidth * 0.65,
        y: window.innerHeight * 2,
        velocity: { x: Math.random() * 1500, y: Math.random() * 1500 },
        Active: false,
      },
      {
        Header: Header3,
        MainText: MainText3,
        x: window.innerWidth / 3,
        y: window.innerHeight * 2.5,
        velocity: { x: Math.random() * 1500, y: Math.random() * 1500 },
        Active: false,
      },
    ];
  }
  //Set mouseDown to true and set the initial mouse position for velocity calculation
  function MouseDown() {
    setOnMouseDown(true);
    MouseDownStartTime.current = Date.now() / 1000;
    InitalMouse.current.x = Mouse.current.x;
    InitalMouse.current.y = Mouse.current.y;
  }
  //Set mouseDown to false and set the end mouse position for velocity calculation
  function MouseUp() {
    setOnMouseDown(false);
    MouseDownStartTime.current = null;
    EndMouse.current.x = Mouse.current.x;
    EndMouse.current.y = Mouse.current.y;
  }

  function MouseTracker(e) {
    const rect = Playground.current?.getBoundingClientRect();
    if (rect) {
      Mouse.current.x = e.clientX - rect.left + window.scrollX;
      Mouse.current.y = e.clientY - rect.top + window.scrollY;
    }
  }
  //Sets the offset used for dragging from anywhere in the circle
  function OffsetSetter() {
    if (OnMouseDown) {
      if (Which.current != null) {
        Offset.current.x =
          Mouse.current.x - ObjectData.current[Which.current].x;
        Offset.current.y =
          Mouse.current.y - ObjectData.current[Which.current].y;
      }
    }
  }
  //Updates velocity and position of the object being dragged
  function Drag() {
    if (Which.current != null) {
      let Object = ObjectData.current[Which.current];
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
  //Calculates the velocity of the object being dragged
  function CalVelocity(Start, End, Time) {
    const velocityX = (End.x - Start.x) / Time + Time * 5;
    const velocityY = (End.y - Start.y) / Time + Time * 5;

    return { velocityX, velocityY };
  }
  //Handles collision between objects and the window
  function Collision(data) {
    const parent = Playground.current.parentElement;
    // Window collision's
    if (data.x < Radius.current) {
      data.x = Radius.current;
      data.velocity.x *= 0.7;
      data.velocity.x *= -1;
    }
    if (data.x > parent.clientWidth - Radius.current) {
      data.x = parent.clientWidth - Radius.current;
      data.velocity.x *= 0.7;
      data.velocity.x *= -1;
    }
    if (data.y < Radius.current) {
      data.y = Radius.current;
      data.velocity.y *= 0.7;
      data.velocity.y *= -1;
    }
    if (data.y > parent.clientHeight - Radius.current) {
      data.y = parent.clientHeight - Radius.current;
      data.velocity.y *= 0.7;
      data.velocity.y *= -1;
    }

    // Object collision's
    for (let i = 0; i < ObjectData.current.length; i++) {
      if (data === ObjectData.current[i]) continue;

      let Distance = Math.sqrt(
        Math.pow(data.x - ObjectData.current[i].x, 2) +
          Math.pow(data.y - ObjectData.current[i].y, 2)
      );

      if (Distance < Radius.current * 2 && Distance > 0) {
        // Avoid division by zero
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

        // Velocity update for elastic collision (assuming equal masses)
        let nx = Math.cos(angle); // Normal vector x-component
        let ny = Math.sin(angle); // Normal vector y-component

        // Relative velocity components along the collision axis
        let v1n = data.velocity.x * nx + data.velocity.y * ny; // Normal component of data's velocity
        let v2n =
          ObjectData.current[i].velocity.x * nx +
          ObjectData.current[i].velocity.y * ny; // Normal component of other object's velocity
        // Tangential components (unchanged in elastic collision)
        let v1t = data.velocity.x * -ny + data.velocity.y * nx;
        let v2t =
          ObjectData.current[i].velocity.x * -ny +
          ObjectData.current[i].velocity.y * nx;
        // Swap normal components for elastic collision (equal masses)
        // New velocities: normal component swapped, tangential unchanged
        data.velocity.x = v2n * nx - v1t * ny;
        data.velocity.y = v2n * ny + v1t * nx;
        ObjectData.current[i].velocity.x = v1n * nx - v2t * ny;
        ObjectData.current[i].velocity.y = v1n * ny + v2t * nx;
        // Damping effect to reduce speed after collision
        data.velocity.x *= 0.7;
        data.velocity.y *= 0.7;
        ObjectData.current[i].velocity.x *= 0.7;
        ObjectData.current[i].velocity.y *= 0.7;
      }
    }
  }

  //
  // Shadow related code
  //

  function HandleMouse(e) {
    if (ObjectData.current == null) return;
    const rect = Playground.current?.getBoundingClientRect();
    if (rect) {
      Mouse.current.x = e.clientX - rect.left;
      Mouse.current.y = e.clientY - rect.top;
    }
    for (let i = 0; i < ObjectData.current.length; i++) {
      mouseDis.current[`Dis${i + 1}`] = Math.sqrt(
        (Mouse.current.x - ObjectData.current[i].x) ** 2 +
          (Mouse.current.y - ObjectData.current[i].y) ** 2
      );
    }
  }

  //
  // Main loop for both shadow and main circles
  //
  function RenderFrame() {
    if (ctx && ObjectData.current && Playground.current) {
      CursorChange("grab", Playground, ObjectData, Mouse, Radius);
      Drag();
      ctx.clearRect(
        0,
        0,
        document.documentElement.scrollWidth,
        document.documentElement.scrollHeight
      );
      for (const data of ObjectData.current) {
        if (data.Active == false) {
          data.x += data.velocity.x * TimeStep;
          data.y += data.velocity.y * TimeStep;
          data.velocity.x *= 0.97;
          data.velocity.y *= 0.97;
        }
        // Friction
        Collision(data);
        DrawTextBlurb(
          data.Header,
          data.MainText,
          data.x,
          data.y,
          Radius.current,
          ctx,
          colorRef.current
        );
      }
      // Shadow
      RowGradient(3, ObjectData, shadowCtx, Mouse, Radius);
    }
  }
  //Called on mouse down setting important vars for main
  function Down() {
    if (OnMouseDown && ObjectData.current) {
      let index = WhichOne(ObjectData, Mouse, Radius);
      Which.current = index;
      if (index == null) return;
      ObjectData.current[index].Active = true;
      OffsetSetter();
    } else {
      if (Which.current != null && ObjectData.current) {
        ObjectData.current[Which.current].Active = false;
      }
      Which.current = null;
    }
  }
  //Applys trackers and save parent
  useEffect(() => {
    function handleMouseMove(e) {
      MouseTracker(e);
      HandleMouse(e);
    }
    function docSize() {
      const rect = Playground.current?.getBoundingClientRect();
      setDocSize({
        width: rect.width,
        height: rect.height,
      });
    }
    docSize();
    window.addEventListener("resize", docSize);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", () => MouseDown());
    document.addEventListener("mouseup", () => MouseUp());
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", () => MouseDown());
      document.removeEventListener("mouseup", () => MouseUp());
      window.removeEventListener("resize", docSize);
    };
  }, []);

  //Checks and sets data on mouse down
  useEffect(() => {
    Down();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [OnMouseDown]);
  // Initializes data
  useEffect(() => {
    if (ctx == null) return;
    InitData();
    colorRef.current = colors;
  }, [ctx, colors]);
  // Renders the frame
  useEffect(() => {
    if (ObjectData.current && !isCalled && Playground.current) {
      function UpdateMembers() {
        RenderFrame();
      }
      AddMember(UpdateMembers);
      setIsCalled(true);
      return () => {
        RemoveMember(UpdateMembers);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx]);

  useEffect(() => {
    const cleanup1 = setupCanvasBall(Playground, setCtx, Radius, 5, false);
    const cleanup2 = defaultCanvas(shadowRef, setShadowCtx, "abs");
    return () => {
      cleanup1();
      cleanup2();
    };
  }, []);

  return (
    <>
      <canvas
        ref={Playground}
        className="play-ground"
        width={docSize.width}
        height={docSize.height}
      ></canvas>
      <canvas
        ref={shadowRef}
        className="shadow"
        width={docSize.width}
        height={docSize.height}
      ></canvas>
    </>
  );
}

export default PlayGround;
