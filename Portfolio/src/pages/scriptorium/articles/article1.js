export const markdown = `
# Subject
The goal of this article is to introduce creative coding. The focus will be on a particle system and how to use logic, math and programming to create something in nature.
It's a great way to practice fundamentals and improve problem solving skills because you see the results of your work in real time. Although this is just an example / baseline with this
after this hopefully you will have the tools to create anything you want things such as lightning, fire, wind the possibilities are endless.

## Creating a particle system
Here we are creating a particle we are going to model gravity, friction, force and more. First lets define the most fundamental part of a pysics system, the vector. 
If you want to use formulas and model real forces you need to understand vectors. I will not go into much detail about vectors but I will provide a link to reasources at the end of this article.
Here is a vector class that I created to start with. For simplicity I will not be using a compiled language so here JS.

\`\`\`
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
\`\`\`
Now the most important part of a particle system the particle itself. Once we create this class we can start applying forces to create the effect we want.
Here is the model I created for a particle.
\`\`\`
  class Particle {
    constructor(x, y, mass) {
      this.position = new Vector(x, y);
      this.velocity = new Vector(0, 0);
      this.mass = mass;
      this.radius = radius;
    }

    applyForce(force) {
      forceCopy = force;
      forceCopy = forceCopy.div(this.mass);
      this.acceleration.add(forceCopy);
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
Now using applyForce we can apply forces to any particle. Now the next part is going to be prett common place simplyfing these formulas to make them easier to use.
For example the universal gravitation formula is: F = G(m1m2)/r². We simply dont need that here it talks about the force of attraction between two objects. We just want a downward force.
So we will incorporate mass and constant for gravity. Now the next is friction. f = uN the u aka the friction coefficient is constant we are not simulating a surface or other object like ice or rubber.
Its just a imgainary circle. Now the normal force is something we can easily calculate and keeps this example simple the normal force is equal to the mass of the object times gravity. So we can use this to calculate the friction force.
Here is the code for both of these implementations.
\`\`\`
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
\`\`\`
Next to complete this system is collision's. And a small mouse tracker feature for you to play and test with. Here I am going to be using a brute force check to focus on pysics and math. Now if you look up any implmentations of this you will see a lot of
different ways to do this. What I am doing here is a semi realistic but simplified version of a collision. We are ignoring certain things friction for example and creating a impulse force instead to show different ways to use these basic orginal principles aka
applying force.
\`\`\`

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


\`\`\`
Now I know in general this is a lot of math mainly so I would definitely recommend studying this a bit more. But this is a good place to start. If you want a more in depth collision system I would recommend googleing inelastic collision and move forward from there.



## Web Performance
### Collision
Anaylzing what we made we can see the biggest tanks in performance which is the 0(n²) collision check. And the rendering of the canvas. So lets address these.
First the collision check is a brute force but at face value neccesary check. But lets improve that my first idea is seperating the space into a grid. Lets say a 4x4 grid.
Each particle will be assigned the grid cell it is in. And unless on or close to the edge of the cell it will not check for collisions in nearby cells. Here is the names for some of these techniques. 
Spatial partitioning what I just described more complex implementations are quadtrees and octrees. BHV, filtering, and sweep and prune. These are all techniques to reduce the number of checks needed to be done.
Considering only the collision logic
### Rendering
The rendering is a bit less straight forward. This entire project that I described is running on html canvas. This is a great way to start but most everything is done on the CPU. So we are limited can this alone still be fast enough?
Yes in most cases it will be the background of this site? The front page particle system with the text blurbs? All runs with html canvas. But what if you want to do something more complex or render a lot of particles? To do that 
you need to improve your CPU usage or move to the GPU. What I suggest is simply using webGL. You are given access to the GPU, shaders, batched rendering, and more. This is a great way to improve performance especially if you are hitting a wall.
Now considering improve CPU usage the main thing to do is improve your method or move to Web Assembly. This requires a lot of learning and is not straight forward. But if you want to build something that GPU wont take care of or something really, really complex
using Web Assembly and or openGl is your best bet. If you want to see where some of this can be taken I built a project that uses all of this you can check it out in the projects section :)
## Conclusion
Think of what this went over that learning value here. You are naturally thinking of time complexity, space complexity and algorithms, I mentioned quadtrees, octrees, sweep and prune and matrix data. This is the stuff you will be tested on in interviews and college.
Yet its ussualy boring and dry. But here you can practice this stuff and learn and implement it in a fun and creative way. Lightning? Fire? Wind? Math? Physics? What to recreate something google the formula and start from there.


### Rendering

`;
