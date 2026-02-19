"use client";
import { AddMember, RemoveMember } from "../../utils/aniFrame.jsx";
import { useState, useEffect, useRef } from "react";
import { setupCanvasBall, WhichOne, CursorChange } from "../../utils/shared.js";
function InteractiveBG() {
  const Mouse = useRef({ x: 0, y: 0 });
  const TimeStep = 0.16;
  const Clicked = useRef(false);
  const [ctx, setCtx] = useState(null);
  const [gitImage, setGitImage] = useState(null);
  const Radius = useRef(0);
  const Contact = useRef(null);
  const colorRef = useRef("");
  const ObjectData = useRef([]);
  const fontRef = useRef("");

  function getImage() {
    if (typeof window !== "undefined") {
      // Load SVG as text, modify colors, then create data URL
      fetch("/Github.svg")
        .then((response) => response.text())
        .then((svgText) => {
          // Replace original colors with desired color (e.g., white)
          const svgColor = getComputedStyle(document.documentElement)
            .getPropertyValue("--color-1")
            .trim();
          const modifiedSvg = svgText
            .replace(/fill="[^"]*"/g, 'fill="' + svgColor + '"')
            .replace(/stroke="[^"]*"/g, 'stroke="' + svgColor + '"');
          const svgBlob = new Blob([modifiedSvg], { type: "image/svg+xml" });
          const url = URL.createObjectURL(svgBlob);
          const image = new window.Image();
          image.src = url;
          setGitImage(image);
        });
    }
  }

  function drawCircle(color, x, y, radius, ctx, Type) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    function drawImage() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(gitImage, x - radius, y - radius, radius * 2, radius * 2);
      ctx.restore();
    }

    function drawLi() {
      ctx.fillStyle = "white";
      ctx.font = `${radius}px ${fontRef.current}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("in", x, y);
    }

    if (Type === "Github") {
      if (gitImage && gitImage.complete) {
        // Added null check
        drawImage();
      } else if (gitImage) {
        // Added null check
        gitImage.onload = drawImage;
      }
      // If gitImage is still null (fetch not done), do nothing - it will draw on next call
    } else {
      drawLi();
    }
  }

  function Click() {
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
    let amount = 12;
    if (window.innerHeight < 750) {
      amount = 8;
    }
    for (let i = 0; i < amount; i++) {
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
  function MouseTracker(e) {
    Mouse.current.x = e.clientX;
    Mouse.current.y = e.clientY;
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
          Math.pow(data.y - ObjectData.current[i].y, 2),
      );

      if (Distance < Radius.current * 2 && Distance > 0) {
        let angle = Math.atan2(
          data.y - ObjectData.current[i].y,
          data.x - ObjectData.current[i].x,
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
        drawCircle(
          colorRef.current,
          data.x,
          data.y,
          Radius.current,
          ctx,
          data.GitOrLi,
        );
        return data;
      });
      ObjectData.current = newData;
    }
  }

  useEffect(() => {
    //Event listeners
    const currentContact = Contact.current;
    currentContact.addEventListener("mousemove", MouseTracker);
    currentContact.addEventListener("click", Click);
    return () => {
      if (currentContact == null) return;
      currentContact.removeEventListener("mousemove", MouseTracker);
      currentContact.removeEventListener("click", Click);
    };
  }, []);
  //Setup canvas
  useEffect(() => {
    const cleanup = setupCanvasBall(Contact, setCtx, Radius, 15, true);
    colorRef.current = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-2")
      .trim();

    return () => {
      cleanup();
    };
  }, []);
  //Intialize
  useEffect(() => {
    if (ctx == null) return;
    InitData();
    getImage();
    fontRef.current = getComputedStyle(document.documentElement)
      .getPropertyValue("--font-display")
      .trim();
  }, [ctx]);

  useEffect(() => {
    if (ObjectData.current && Contact.current && ctx && getImage) {
      function Update() {
        Main();
      }
      AddMember(Update);
      return () => {
        RemoveMember(Update);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx, gitImage]);

  return <canvas id="contact-canvas" ref={Contact}></canvas>;
}

export default InteractiveBG;
