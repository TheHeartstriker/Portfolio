export const markdown = `
# Particle systems
The goal of this article is to introduce creative coding. The focus will be on a particle system and how to use logic, math, and programming to create something from nature.
It's a great way to practice fundamentals and improve problem-solving skills because you see the results of your work in real time. Although this is just an example/baseline,
hopefully, after this, you will have the tools to create anything you want—things such as lightning, fire, wind—the possibilities are endless.

## Creating a particle system
First, let’s define the most fundamental part of a physics system: the vector and functions for common math operations we are going to need.
If you want to use formulas and model real forces, you need to understand vectors. I will not go into much detail about vectors, but I will provide a link to resources at the end of this article.
Here is a vector class that I created to start with. For simplicity, I will not be using a compiled language, so here I am using JS.

\`\`\`js
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
\`\`\`
Now, the most important part of a particle system: the particle itself. Once we create this class, we can start applying forces to create the effect we want.
It will also define how far mathematically we want to go—how far we want to model. Here, we are defining the important components like position, velocity, mass, acceleration, and radius,
along with some fundamental methods like applyForce, update, and draw.
Of course, we are missing things that could further the simulation, but this is a good start.
\`\`\` js
  class Particle {
    constructor(x, y, mass) {
      this.position = new Vector(x, y);
      this.velocity = new Vector(0, 0);
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

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();
    }
  }
\`\`\`
Now, using applyForce, we can apply forces to any particle—this is what we are going to build around. The next part is going to be fairly commonplace, using simplified physics formulas.
For example, the universal gravitation formula is: F = G(m₁m₂)/r². We simply don’t need that here; it describes the force of attraction between two objects. We just want a constant downward force—we don’t need to model the entire thing.
So, we will incorporate mass and a constant for the downward pull.

Next is friction: f = μN. The μ, also known as the friction coefficient, is constant—we are not simulating a surface or other object like ice or rubber.
It’s just an imaginary circle for the sake of simplicity. The normal force is something we can easily calculate, and it keeps this example simple. The normal force is equal to the mass of the object times gravity, so we can use this to calculate the friction force.

Here is the code for both of these implementations.
\`\`\`js
    applyGravity() {
      const g = 0.01;
      const gravityForce = new Vector(0, this.mass * g);
      this.applyForce(gravityForce);
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
\`\`\`
Next, to complete this system, are collisions—and a small mouse tracker feature for you to play with and test. Here, I am going to use a brute-force check to focus on physics and math.
Now, if you look up any implementations of this, you will see a lot of different ways to do it. What I am doing here is a semi-realistic but simplified version of an inelastic collision.
We are ignoring certain things like friction, spin, proper angles, and momentum.

Here, we are creating an impulse force instead, to show different ways to use these basic original principles—aka applying force.
The goal is: if an object collides with another object, we apply force to both objects in the opposite direction of the collision.

Read this carefully, and look up any terms if needed. I will also showcase the collision for the edge of the canvas.
\`\`\` js
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
            // Only separate if moving towards each other
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



\`\`\`
Now, I know this is a lot of math in general, so I would definitely recommend studying it a bit more. But this is a good place to start.
If you want a more in-depth collision system, I would recommend googling "inelastic collision" and moving forward from there.
But at the core, we are just applying force to two objects that are colliding—the rest is just details.


## Web Performance
### Collision
Analyzing what we made, we can see the biggest tanks in performance are the O(n²) collision check and the rendering of the canvas. So, let’s address these.
First, the collision check is a brute-force but, at face value, necessary check. But let’s improve that. My first idea is separating the space into a grid—let’s say a 4x4 grid.
Each particle will be assigned the grid cell it is in, and unless on or close to the edge of the cell, it will not check for collisions in nearby cells. Here are the names for some of these techniques:
Spatial partitioning (what I just described); more complex implementations are quadtrees and octrees. BVH, filtering, and sweep and prune are other techniques. These all reduce the number of checks needed to be done, considering only the collision logic.
### Rendering
The rendering is a bit less straightforward. This entire project that I described is running on HTML canvas. This is a great way to start, but most everything is done on the CPU, so we are limited. Can this alone still be fast enough?
Yes, in most cases it will be. The background of this site? The front-page particle system with the text blurbs? All run with HTML canvas. But what if you want to do something more complex or render a lot of particles? To do that,
you need to improve your CPU usage or move to the GPU. What I suggest is simply using WebGL. You are given access to the GPU, shaders, batched rendering, and more. This is a great way to improve performance, especially if you are hitting a wall.
Now, considering improved CPU usage, the main thing to do is improve your method or move to WebAssembly. This requires a lot of learning and is not straightforward. But if you want to build something that the GPU won’t take care of or something really, really complex,
using WebAssembly and/or OpenGL is your best bet. If you want to see where some of this can be taken, I built a project that uses all of this—you can check it out in the projects section :)
## Conclusion
Think about what this went over it was a basic system and I glossed over tons of stuff but think how far this can be taken!
You are naturally thinking of time complexity, space complexity, spatial reasoning, optimizations, and algorithms. I mentioned quadtrees, octrees, sweep and prune, and matrix data. This is the stuff you will be tested on in interviews and college.
Yet it’s usually boring and dry. But here you can practice this stuff, learn and implement it in a fun and creative way. Lightning? Fire? Wind? Math? Physics? Want to recreate something? Research the math and physics behind it, and then try to recreate it.
## Resources
For resources, I would recommend reading The Nature of Code. It’s a free book that goes more in-depth about this stuff and was an inspiration for this article. There is also The Coding Train website and YouTube channel. Although I recommend the book and checking out
the website and coding examples for learning.

- [Book](https://natureofcode.com)

- [Code](https://thecodingtrain.com)

- [YouTube](https://www.youtube.com/@TheCodingTrain)


### Example / application
Move the cursor around :)

`;
