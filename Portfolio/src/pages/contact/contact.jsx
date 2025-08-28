import { useState, useEffect, useRef } from "react";
import { DrawCircle } from "./canvasH.jsx";
import { AddMember, RemoveMember } from "../../utils/aniFrame.jsx";
import { TextScramble } from "../../utils/scramble.jsx";
import "./contact.css";
import {
  setupCanvasBall,
  WhichOne,
  CursorChange,
} from "../../utils/shared.jsx";
function Contact() {
  //Github
  //LinkedIn
  //Email
  const [ctx, setCtx] = useState(null);
  const Radius = useRef(0);
  const Contact = useRef(null);

  const ObjectData = useRef([]);
  //Used to render on load
  const [isCalled, setIsCalled] = useState(false);
  const [Text, setText] = useState("SerKadenWildauer@gmail.com");
  const Orginal = "SerKadenWildauer@gmail.com";
  const Alphabet = "abcdefghijklmnopqrstuvwxyz";
  const Mouse = useRef({ x: 0, y: 0 });
  const TimeStep = 0.16;
  const Clicked = useRef(false);

  function MouseTracker(e) {
    Mouse.current.x = e.clientX;
    Mouse.current.y = e.clientY;
  }

  function ChangeText() {
    TextScramble("Copied to Clipboard", Text, Alphabet, setText, 0.8);
    navigator.clipboard.writeText(Text);
    setTimeout(() => {
      TextScramble(Orginal, Text, Alphabet, setText, 0.8);
    }, 3000);
  }

  function Click(e) {
    Clicked.current = true;
    let index = WhichOne(ObjectData, Mouse, Radius);
    if (index != null) {
      if (ObjectData.current[index].GitOrLi === "Github") {
        window.open("https://github.com/TheHeartstriker");
      } else {
        window.open("https://www.linkedin.com/in/kaden-wildauer/");
      }
    }
  }

  function InitData() {
    for (let i = 0; i < 15; i++) {
      ObjectData.current.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        velocity: {
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
        },
        Active: false,
        GitOrLi: Math.random() > 0.5 ? "Github" : "LinkedIn",
      });
    }
  }

  //Handles collision between objects and the window
  function Collision(data) {
    // Window collision's
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

    // Object collision's
    for (let i = 0; i < ObjectData.current.length; i++) {
      if (data === ObjectData.current[i]) continue;

      let Distance = Math.sqrt(
        Math.pow(data.x - ObjectData.current[i].x, 2) +
          Math.pow(data.y - ObjectData.current[i].y, 2)
      );

      if (Distance < Radius.current * 2 && Distance > 0) {
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

        // Only resolve if moving toward each other
        let nx = Math.cos(angle);
        let ny = Math.sin(angle);
        let dvx = data.velocity.x - ObjectData.current[i].velocity.x;
        let dvy = data.velocity.y - ObjectData.current[i].velocity.y;
        let relVel = dvx * nx + dvy * ny;
        if (relVel < 0) {
          // Elastic collision
          let v1n = data.velocity.x * nx + data.velocity.y * ny;
          let v2n =
            ObjectData.current[i].velocity.x * nx +
            ObjectData.current[i].velocity.y * ny;
          let v1t = data.velocity.x * -ny + data.velocity.y * nx;
          let v2t =
            ObjectData.current[i].velocity.x * -ny +
            ObjectData.current[i].velocity.y * nx;
          data.velocity.x = v2n * nx - v1t * ny;
          data.velocity.y = v2n * ny + v1t * nx;
          ObjectData.current[i].velocity.x = v1n * nx - v2t * ny;
          ObjectData.current[i].velocity.y = v1n * ny + v2t * nx;
          // Damping
          data.velocity.x *= 0.9;
          data.velocity.y *= 0.9;
          ObjectData.current[i].velocity.x *= 0.9;
          ObjectData.current[i].velocity.y *= 0.9;
        }
      }
    }
  }
  //Main loop
  function Main() {
    if (ctx && ObjectData.current && Contact.current) {
      CursorChange("pointer", Contact, ObjectData, Mouse, Radius);
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
        //64ffdb
        DrawCircle(
          "#64ffdb",
          data.x,
          data.y,
          Radius.current,
          ctx,
          data.GitOrLi
        );
        return data;
      });
      ObjectData.current = newData;
    }
  }

  //Changes the cursor to a grab when hovering over an object

  useEffect(() => {
    //Event listeners
    Contact.current.addEventListener("mousemove", MouseTracker);
    Contact.current.addEventListener("click", Click);
    return () => {
      if (Contact.current == null) return;
      Contact.current.removeEventListener("mousemove", MouseTracker);
      Contact.current.removeEventListener("click", Click);
    };
  }, []);

  useEffect(() => {
    const cleanup = setupCanvasBall(Contact, setCtx, Radius, 15);
    return () => {
      cleanup();
    };
  }, []);
  useEffect(() => {
    if (ctx == null) return;
    InitData();
  }, [ctx]);

  useEffect(() => {
    if (ObjectData.current && !isCalled && Contact.current && ctx) {
      function Update() {
        Main();
      }
      AddMember(Update);
      return () => {
        RemoveMember(Update);
      };
    }
  }, [ctx]);

  return (
    <>
      <canvas id="contact-canvas" ref={Contact}></canvas>
      <div className="contact-container">
        <div className="contact">
          <h1>Contact me :)</h1>
          <button
            onClick={() => {
              ChangeText();
            }}
          >
            {Text}
          </button>
        </div>
      </div>
    </>
  );
}

export default Contact;
