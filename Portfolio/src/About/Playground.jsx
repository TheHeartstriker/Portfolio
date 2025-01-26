import { use } from "react";
import { useState, useRef, useEffect } from "react";

function Playground({ Ball1Ref, Ball2Ref, Ball3Ref }) {
  const [Mouse, setMouse] = useState({ x: 0, y: 0 });
  const [Ball1, setBall1] = useState({ x: 0, y: 0 });
  const [Ball2, setBall2] = useState({ x: 0, y: 0 });
  const [Ball3, setBall3] = useState({ x: 0, y: 0 });
  const [MouseDownBool, setMouseDownBool] = useState(false);
  const [circleRadius, setCircleRadius] = useState(0);

  //Keeps track of the mouse position
  function MouseTracker(e) {
    const newMousePosition = { x: e.clientX, y: e.clientY };
    // Ball1Ref.current.style.left = newMousePosition.x + "px";
    // Ball1Ref.current.style.top = newMousePosition.y + "px";
    setMouse(newMousePosition);
    console.log(Mouse, "Mouse");
    console.log(Ball1, "Ball1");
    console.log(
      Ball1Ref.current.style.left,
      Ball1Ref.current.style.top,
      "Left and Top"
    );
  }
  function MouseDown(Down) {
    setMouseDownBool(Down);
  }
  useEffect(() => {}, [MouseDownBool]);
  //Keeps track of the clicked ball
  function Which() {
    let ball = WhichBall();
    if (ball === 1) {
      return 1;
    } else if (ball === 2) {
      return 2;
    } else if (ball === 3) {
      return 3;
    } else {
      return 0;
    }
  }
  //Returns the ball that was clicked
  function WhichBall() {
    let distance1 = Math.sqrt(
      Math.pow(Mouse.x - Ball1.x, 2) + Math.pow(Mouse.y - Ball1.y, 2)
    );
    let distance2 = Math.sqrt(
      Math.pow(Mouse.x - Ball2.x, 2) + Math.pow(Mouse.y - Ball2.y, 2)
    );
    let distance3 = Math.sqrt(
      Math.pow(Mouse.x - Ball3.x, 2) + Math.pow(Mouse.y - Ball3.y, 2)
    );
    if (distance1 < circleRadius) {
      return 1;
    } else if (distance2 < circleRadius) {
      return 2;
    } else if (distance3 < circleRadius) {
      return 3;
    } else {
      return 0;
    }
  }
  //Sets the center of the balls relative to the window
  function setCenter() {
    if (Ball1Ref.current && Ball2Ref.current && Ball3Ref.current) {
      let refs = [Ball1Ref.current, Ball2Ref.current, Ball3Ref.current];
      let sets = [setBall1, setBall2, setBall3];
      for (let i = 0; i < 3; i++) {
        const rect = refs[i].getBoundingClientRect();
        sets[i]({
          x: rect.x + rect.width / 2,
          y: rect.y + rect.height / 2,
        });
      }
    }
  }
  function MoveBall(ball) {
    if (ball === 1) {
      Ball1Ref.current.style.left = Mouse.x + "px";
      Ball1Ref.current.style.top = Mouse.y + "px";
    }
    // console.log(
    //   Ball1Ref.current.style.left,
    //   Ball1Ref.current.style.top,
    //   "Left and Top"
    // );
    // console.log(Ball1, "Our saved x and y");
    // console.log(Mouse, "Mouse");
  }

  useEffect(() => {
    window.addEventListener("mousemove", MouseTracker);
    window.addEventListener("mousedown", () => MouseDown(true));
    window.addEventListener("mouseup", () => MouseDown(false));
    return () => {
      window.removeEventListener("mousemove", () => MouseTracker);
      window.removeEventListener("mousedown", () => MouseDown(true));
      window.removeEventListener("mouseup", () => MouseDown(false));
    };
  }, [Mouse]);
  //Set the circle radius
  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    let radius = rootStyles.getPropertyValue("--circle-radius");
    radius = parseFloat(radius.slice(0, -2));
    let toPx = (radius / 100) * window.innerHeight;
    setCircleRadius(toPx);
  }, []);
  //Updates the center of the balls
  useEffect(() => {
    setCenter();
  }, [Mouse]);

  useEffect(() => {
    if (MouseDownBool) {
      let ball = Which();
      MoveBall(ball);
    }
  }, [MouseDownBool, Mouse]);
}

export default Playground;
