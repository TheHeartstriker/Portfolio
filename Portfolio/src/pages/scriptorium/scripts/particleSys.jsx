import React, { useEffect, useRef } from "react";

import { defaultCanvas } from "../../../utils/canvas";

function particleSys() {
  //
  //
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);

  const radius = 5;
  const gravConstant = 0.98;
  const gravMass = 100;

  class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    add(v) {
      return new Vector(this.x + v.x, this.y + v.y);
    }
    sub(v) {
      return new Vector(this.x - v.x, this.y - v.y);
    }
    mult(scalar) {
      return new Vector(this.x * scalar, this.y * scalar);
    }
    div(scalar) {
      return new Vector(this.x / scalar, this.y / scalar);
    }
    mag() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
      const mag = this.mag();
      if (mag > 0) {
        return this.div(mag);
      }
      return new Vector(0, 0);
    }
  }

  class Particle {
    constructor(x, y, mass) {
      this.position = new Vector(x, y);
      this.velocity = new Vector(0, 0);
      this.mass = mass;
      this.radius = radius;
    }

    applyForce(force) {
      force = force.div(this.mass);
      this.acceleration.add(force);
    }

    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();
    }

    gravity() {
      force = gravConstant * (this.mass / gravMass);
    }
  }

  useEffect(() => {
    const cleanup = defaultCanvas(canvasRef, setCtx);
    return () => {
      cleanup();
    };
  }, [ctx]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default particleSys;
