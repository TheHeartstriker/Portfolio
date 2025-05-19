import React, { useEffect, useRef, useState } from "react";

import { defaultCanvas } from "../../../utils/canvas";
import { AddMember, RemoveMember } from "../../../utils/aniFrame";

function particleSys() {
  //
  //
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const particlesRef = useRef([]);

  const radius = 5;
  const gravConstant = 0.5;
  const gravMass = 300;
  const frictionCoeff = 0.3;

  class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    add(v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    }
    sub(v) {
      this.x -= v.x;
      this.y -= v.y;
      return this;
    }
    mult(scalar) {
      this.x *= scalar;
      this.y *= scalar;
      return this;
    }
    div(scalar) {
      this.x /= scalar;
      this.y /= scalar;
      return this;
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
      this.acceleration = new Vector(0, 0);
      this.mass = mass;
      this.radius = radius;
    }

    applyForce(force) {
      let temp = new Vector(force.x, force.y);
      temp.div(this.mass);
      this.acceleration.add(temp);
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
  }

  function createParticles() {
    const particles = [];
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvasRef.current.width;
      const y = Math.random() * canvasRef.current.height;
      const mass = Math.random() * 10 + 1;
      particles.push(new Particle(x, y, mass));
    }
    particlesRef.current = particles;
  }

  function mainLoop() {
    if (!ctx) return;
    if (particlesRef.current.length === 0) {
      createParticles();
    }
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    particlesRef.current.forEach((particle) => {
      particle.update(); // Update velocity and position

      particle.draw(ctx); // Draw particle
    });
  }

  useEffect(() => {
    if (ctx) {
      const animationId = AddMember(mainLoop);
      return () => {
        RemoveMember(animationId);
      };
    }
  }, [ctx]);

  useEffect(() => {
    const cleanup = defaultCanvas(canvasRef, setCtx);
    return () => {
      cleanup();
    };
  }, [ctx]);

  return (
    <div className="componentContainer">
      <canvas ref={canvasRef} className="canvasScript" />
    </div>
  );
}

export default particleSys;
