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
Now using applyForce we can apply forces to any particle. This next part I will showcase making different funtions for the particle class. And at the end display the end result.
Gravity a great first start the formula for gravity is F = G(m1 * m2) / r^2. So lets make it!
\`\`\`
gravity(particleVec)

`;
