import { useState, useRef, useEffect } from "react";
import { DrawTextBlurb } from "./HelperPg.jsx";
import { AddMember, RemoveMember } from "../../../utils/AniFrame.jsx";
import {
  setupCanvasBall,
  WhichOne,
  CursorChange,
} from "../../../utils/shared.jsx";
import {
  Header1,
  MainText1,
  Header2,
  MainText2,
  Header3,
  MainText3,
} from "../Text.js";

function PlayGround() {
  const [ctx, setCtx] = useState(null);
  const ObjectData = useRef(null);
  const [OnMouseDown, setOnMouseDown] = useState(false);
  //Used to render on load
  const [isCalled, setIsCalled] = useState(false);
  const Playground = useRef(null);
  const MouseDownStartTime = useRef(null);
  const Radius = useRef(0);
  const Mouse = useRef({ x: 0, y: 0 });

  const InitalMouse = useRef({ x: 0, y: 0 });
  const EndMouse = useRef({ x: 0, y: 0 });
  const Offset = useRef({ x: 0, y: 0 });
  const Which = useRef(null);
  const shadowRef = useRef(null);
  const TimeStep = 0.016;

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
    Mouse.current.x = e.pageX;
    Mouse.current.y = e.pageY;
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
        let tempVelocityX = data.velocity.x;
        let tempVelocityY = data.velocity.y;
        // Move both objects away from each other
        data.x += moveX;
        data.y += moveY;
        ObjectData.current[i].x -= moveX;
        ObjectData.current[i].y -= moveY;
        // Swap velocities
        data.velocity.x = ObjectData.current[i].velocity.x;
        data.velocity.y = ObjectData.current[i].velocity.y;
        ObjectData.current[i].velocity.x = tempVelocityX;
        ObjectData.current[i].velocity.y = tempVelocityY;
        //Decrement the velocity
        data.velocity.x *= 0.85;
        data.velocity.y *= 0.85;
        ObjectData.current[i].velocity.x *= 0.85;
        ObjectData.current[i].velocity.y *= 0.85;
      }
    }
  }
  //Main loop
  function Main() {
    if (ctx && ObjectData.current && Playground.current) {
      CursorChange("grab", Playground, ObjectData, Mouse, Radius);
      Drag();
      ctx.clearRect(
        0,
        0,
        document.documentElement.scrollHeight,
        document.documentElement.scrollHeight
      );
      const newData = ObjectData.current.map((data) => {
        if (data.Active == false) {
          data.x += data.velocity.x * TimeStep;
          data.y += data.velocity.y * TimeStep;
          data.velocity.x *= 0.97;
          data.velocity.y *= 0.97;
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
      ObjectData.current = newData;
      // Draw the shadow
      shadowRef.current?.updateShadow();
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

  useEffect(() => {
    Down();
  }, [OnMouseDown]);

  useEffect(() => {
    if (ctx == null) return;
    InitData();
  }, [ctx]);
  useEffect(() => {
    if (ObjectData.current && !isCalled && Playground.current) {
      function UpdateMembers() {
        Main();
      }
      AddMember(UpdateMembers);
      setIsCalled(true);
      return () => {
        RemoveMember(UpdateMembers);
      };
    }
  }, [ctx]);

  useEffect(() => {
    const cleanup = setupCanvasBall(Playground, setCtx, Radius, 5);
    return () => {
      cleanup();
    };
  }, []);

  return (
    <>
      <canvas
        ref={Playground}
        className="PlayGround"
        width={document.documentElement.scrollWidthX}
        height={document.documentElement.scrollHeightY}
      ></canvas>
    </>
  );
}

export default PlayGround;
