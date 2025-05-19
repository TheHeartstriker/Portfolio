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
  const frictionCoefficient = 0.1;

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

    applyGravity() {
      const g = 0.01;
      const gravityForce = new Vector(0, this.mass * g);
      this.applyForce(gravityForce);
    }

    checkEdges() {
      let bounce = -0.9;
      let height = canvasRef.current.height;
      if (this.position.y > height - this.radius) {
        this.position.y = height - this.radius;
        this.velocity.y *= bounce;
      }
    }

    applyFriction() {
      if (this.position.y > canvasRef.current.height - this.radius - 1) {
        let frictionMag = frictionCoefficient * this.mass * 0.01;
        let frictionCopy = new Vector(this.velocity.x, this.velocity.y);
        frictionCopy.mult(-1);
        frictionCopy.normalize();
        frictionCopy.mult(frictionMag);
        this.applyForce(frictionCopy);
      }
    }

    collision() {
      for (let i = 0; i < particlesRef.current.length; i++) {
        const other = particlesRef.current[i];
        if (other !== this) {
          const dx = this.position.x - other.position.x;
          const dy = this.position.y - other.position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.radius + other.radius) {
            const energyLoss = 0.4;

            // Normal vector
            const nx = dx / distance;
            const ny = dy / distance;

            // Relative velocity
            const dvx = this.velocity.x - other.velocity.x;
            const dvy = this.velocity.y - other.velocity.y;

            // Velocity along normal
            const vn = dvx * nx + dvy * ny;

            // Only separate if moving towards each other
            if (vn < 0) {
              // Impulse scalar
              const impulse =
                (-(1 + energyLoss) * vn) / (1 / this.mass + 1 / other.mass);

              // Apply impulse
              this.velocity.x += (impulse / this.mass) * nx;
              this.velocity.y += (impulse / this.mass) * ny;
              other.velocity.x -= (impulse / other.mass) * nx;
              other.velocity.y -= (impulse / other.mass) * ny;
            }

            // Separate overlapping particles
            const overlap = this.radius + other.radius - distance;
            const totalMass = this.mass + other.mass;
            this.position.x += nx * (overlap * (other.mass / totalMass));
            this.position.y += ny * (overlap * (other.mass / totalMass));
            other.position.x -= nx * (overlap * (this.mass / totalMass));
            other.position.y -= ny * (overlap * (this.mass / totalMass));
          }
        }
      }
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
      particle.draw(ctx); // Draw particle
      particle.applyGravity(); // Apply gravity
      particle.checkEdges(); // Check for edges
      particle.applyFriction(); // Apply friction
      //particle.collision(); // Check for collisions
      particle.update(); // Update velocity and position
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
    const cleanup = defaultCanvas(canvasRef, setCtx, "default");
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
