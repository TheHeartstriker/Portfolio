"use client";
import { useEffect, useRef, useState } from "react";

import { defaultCanvas } from "../../../utils/canvas";
import { AddMember, RemoveMember } from "../../../utils/aniFrame";

function ParticleSys() {
  //
  //
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const particlesRef = useRef([]);

  const radius = 25;
  const frictionCoefficient = 0.1;
  const amount = 25;

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

    //Lets you apply force from and direction and speed to a particle
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
      let width = canvasRef.current.width;

      // Bottom edge
      if (this.position.y > height - this.radius) {
        this.position.y = height - this.radius;
        this.velocity.y *= bounce;
      }
      // Top edge
      if (this.position.y < this.radius) {
        this.position.y = this.radius;
        this.velocity.y *= bounce;
      }
      // Right edge
      if (this.position.x > width - this.radius) {
        this.position.x = width - this.radius;
        this.velocity.x *= bounce;
      }
      // Left edge
      if (this.position.x < this.radius) {
        this.position.x = this.radius;
        this.velocity.x *= bounce;
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
          //Get the distance
          const diff = new Vector(this.position.x, this.position.y).sub(
            other.position
          );
          const distance = diff.mag();
          //Check if close enough to collide
          if (distance < this.radius + other.radius) {
            const energyLoss = 0.4;
            const normal = diff.normalize();

            // Relative velocity where we are moving relative to the other particle
            const relVel = new Vector(this.velocity.x, this.velocity.y).sub(
              other.velocity
            );
            // Velocity along normal aka are we moving towards each other also known as the dot product
            const vn = relVel.x * normal.x + relVel.y * normal.y;
            // Only separate and apply impulse if moving towards each other
            if (vn < 0) {
              // Impulse scalar considers how fast we are moving and how much energy we want to lose
              const impulse =
                (-(1 + energyLoss) * vn) / (1 / this.mass + 1 / other.mass);

              // Apply impulse
              const impulseVec = new Vector(normal.x, normal.y).mult(impulse);
              this.velocity.add(
                new Vector(impulseVec.x, impulseVec.y).div(this.mass)
              );
              other.velocity.sub(
                new Vector(impulseVec.x, impulseVec.y).div(other.mass)
              );
            }

            // Separate overlapping particles
            // We do this to avoid sticking and other issues
            const overlap = this.radius + other.radius - distance;
            const totalMass = this.mass + other.mass;
            const separation = new Vector(normal.x, normal.y).mult(overlap);
            this.position.add(
              new Vector(separation.x, separation.y).mult(
                other.mass / totalMass
              )
            );
            other.position.sub(
              new Vector(separation.x, separation.y).mult(this.mass / totalMass)
            );
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

  function mouseAura(particle, mousePosRef) {
    const mousePos = mousePosRef.current;
    const diff = new Vector(particle.position.x, particle.position.y).sub(
      mousePos
    );
    const distance = diff.mag();
    if (distance < 250) {
      const force = new Vector(particle.position.x, particle.position.y).sub(
        mousePos
      );
      force.normalize();
      force.mult(0.3);
      particle.applyForce(force);
    }
  }

  function createParticles() {
    const particles = [];
    for (let i = 0; i < amount; i++) {
      const x = Math.random() * canvasRef.current.width;
      const y = Math.random() * canvasRef.current.height;
      const mass = Math.random() * 10 + 1;
      particles.push(new Particle(x, y, mass));
    }
    particlesRef.current = particles;
  }

  function mainLoop() {
    if (!ctx || !canvasRef.current) return;
    if (particlesRef.current.length === 0) {
      createParticles();
    }
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    particlesRef.current.forEach((particle) => {
      particle.draw(ctx); // Draw particle
      mouseAura(particle, mousePosRef); // Apply mouse aura
      particle.applyGravity(); // Apply gravity
      particle.checkEdges(); // Check for edges
      particle.applyFriction(); // Apply friction
      particle.collision(); // Check for collisions
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx]);

  const mousePosRef = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const cleanup = defaultCanvas(canvasRef, setCtx, "default");
    // Set up mouse position tracking
    function handleMouseMove(event) {
      const rect = canvasRef.current.getBoundingClientRect();
      const scaleX = canvasRef.current.width / rect.width;
      const scaleY = canvasRef.current.height / rect.height;
      mousePosRef.current.x = (event.clientX - rect.left) * scaleX;
      mousePosRef.current.y = (event.clientY - rect.top) * scaleY;
    }
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cleanup();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [ctx]);

  return <canvas ref={canvasRef} />;
}

export default ParticleSys;
