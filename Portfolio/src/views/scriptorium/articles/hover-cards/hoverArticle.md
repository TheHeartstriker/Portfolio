# Modern Card Hover Animations, CSS and JavaScript

A great hover effect can make user interfaces feel alive it's a small detail that adds visual polish and depth. This article will cover hover effects on cards, walking through three custom-made variations for a card's background. The main idea? Adding unique twists to the classic subtle glow where your mouse hovers. As usual with my articles, expect imagery, code examples, and a live demo at the end!

## Overview the effects!

For this, I'll be using HTML Canvas, CSS, JavaScript, and React. But you can follow along with the ideas regardless of your tooling if you prefer GSAP or no React at all, that's fine too. The first is the classic: When the mouse hovers over a card, add a glow beneath the cursor. Simple, no?

The second, is quite a bit more interesting, it will use HTML Canvas and `:before` to apply a blur over the canvas. But what will the canvas do? Well, the idea is to make a pixelated, almost dithered hover effect. If you are curious about dithering, here is a cool dithered shadow on [CodePen](https://codepen.io/shubniggurath/pen/zYOayGL) similar to what I am imagining here. How will this be done? Well, the idea is we will color 'pixels' around the mouse randomly in a circle. The coloring will happen more often in the center and less often at the edges of the circle. And every frame, the mouse chooses new pixels to color around the mouse, leading to a blurry dithered shadow.

The third effect will use the scaffolding of the first while visually being less chaotic. We will use a canvas again and create a grid over the card and on hover the grid fills with color and slowly fades when the mouse leaves the cell. But this is too intense for a card, so using `:before` we can add a gradient the same color as the card's background, then have it fade to transparent. Positioning this gradient allows us to cut off large sections of the effect, allowing us to make it visible in only a corner.

## Effect one

Now starting off simple, let's go over the classic glow on mouse hover for a card. This one, unlike the following, is nearly pure CSS in essence. The following is our CSS code for this effect.

```css
.card::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  //Notice --mouse-x and --mouse-y for possitioning
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(181, 26, 43, 0.6),
    transparent 40%
  );
  opacity: var(--glow-opacity, 0);
  filter: blur(100px);
  transition: opacity 0.4s ease-out;
  pointer-events: none;
  z-index: 1;
}
```

Now this acts as our 'glow' that happens on hover. It is just a radial gradient that fades to transparent. We use `--mouse-x` and `--mouse-y` to position the radial gradient around the card, then use `--glow-opacity` to fade the effect out. So, if we want to make the radial gradient follow the mouse, we just update `--mouse-x` and `--mouse-y` if the mouse is inside the card. Then to have it fade out as it moves away from the card, we just change `--glow-opacity`. To create this we attach a mouse move function to the card that looks like so.

```javascript
export function basicHandleMouseMove(e, cardRef) {
  //Store card so we can use the shorthand
  const card = cardRef.current;
  if (!card) return;
  //Cards height and width
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Calculate distance from card edges
  const distanceX = Math.max(0, Math.max(-x, x - rect.width));
  const distanceY = Math.max(0, Math.max(-y, y - rect.height));
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  // Calculate opacity based on distance (fade out over 100px)
  const maxDistance = 100;
  //The 3 bellow is used to lower the entire opacity further :)
  const opacity = Math.max(0, 1 - distance / maxDistance) / 3;

  card.style.setProperty("--mouse-x", `${x}px`);
  card.style.setProperty("--mouse-y", `${y}px`);
  card.style.setProperty("--glow-opacity", opacity.toString());
}
```

Here is the JSX for the card. This will remain generally the same, minus some additions such as canvas and new classes, for the whole project.

```javascript
<div className="card-container" ref={containerRef}>
  {/* Card 1 */}
  <section className="card" ref={cardRef}>
    <h2></h2>
    <p></p>
  </section>
</div>
```

Now here in React, we would attach our mouse move to a parent element, then pass it our cardRef and our effect works! Something to note is we attach to a parent element because we need the mouse's location even when it's outside the card to simulate the smooth fade. You could attach the mouse to a window instead and to affect multiple cards, feed an array of refs to the `basicHandleMouseMove` function. Here is an image of the effect in action!

![Basic glow card](/scriptorium/cardHover/basicGlow.webp)

I recommend lower opacities and perhaps a blur effect to make the glow even more subtle. It pairs well with a gradient!

## Effect Two

And now onto effect two, the dithered effect. Here is an example of what it looks like without the blur.

![Basic glow card](/scriptorium/cardHover/pixel.webp)

The idea behind how this works is putting a canvas in our card space. Then creating a grid and 'coloring' the grid's cells randomly in a circular area on mouse hover. The logic is based on a common programming pattern sometimes referred to as a 'pixel array'. I have even covered this before in my article about [flow fields](https://www.kadenwildauer.com/scriptorium/flow-fields) if you are interested. But before we walk through how this works, I wanted to note that this section will have the most code! The third effect is a slight alteration to the following code and therefore less dense.

### Creating the pixel array

First we need to set the canvas up with a width and height of the parent, aka the card. If you need help or want the code, here I will link the repository at the end! After that we need to create the 'pixel array', which is just a mathematical representation of the grid. We do this so we can store the x and y location of every cell, allowing us to represent the cell logically one after the other and therefore color them in according to their locations. To do this we first create a function called `impose();`. Its job is, when given the size for every cell, it defines how many columns and rows we need to fill the canvas. As you can imagine, the lower the cell size, the more cells we get and the more defined our output will appear, but this will also take up more compute. The cell size being `pixSize` here. This is the code.

```javascript
function impose() {
  const canvas = canvasRef.current;
  if (!canvas) return;
  //pixSize = width and height of every cell
  const rows = Math.floor(canvas.height / pixSize);
  const cols = Math.floor(canvas.width / pixSize);
  //Saving our rows and cols
  rowRef.current = rows;
  colRef.current = cols;
  // Passing them into 2D array function
  let initialGrid = create2DArray(rows, cols, 0, 0);
  gridRef.current = initialGrid;
}
```

We now have the size of the grid in the form of how many rows and columns we need. But as mentioned, we need to mathematically represent each cell. We do this by creating a 2D array and storing locations and the unique individual cell data inside of it. But let's visualize this a bit. Here is a 2D array.

```javascript
let arr = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
```

It is just a nested array, but imagine this is a grid. Each child array is a row and its children, the 0's, are columns. But in practice the 0's are objects containing the cell's values like location, color, and opacity.

But how do we get the x and y value to store in the cell? Well, conceptually it is rather simple math. We use `pixSize` and multiply, that's it! So say for the x value, we just multiply by whatever column we are on. If it is the second column, it is 2 \* pixSize to get its x value. This accounts for the space its predecessor cells take up. Here is the code implementing this idea while creating the 2D array.

```typescript
function create2DArray(Rows, Cols, leftX, topY) {
  let arr = new Array(Rows); //Create array of empty rows

  for (let i = 0; i < arr.length; i++) {
    //Index into row and create empty columns
    arr[i] = new Array(Cols);
    //Iterate over the empty columns in the row
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = {
        x: leftX + j * pixSize,
        y: topY + i * pixSize,
        opacity: 0.0,
        color: "#b51a2b",
      };
    }
  }

  return arr;
}
```

Now after creating this, you should be able to color pixels in. If you want to, you can just index into your grid, get a cell's x and y location, and then pass it to a draw function using the canvas API. Now the most important part is storing the x and y location. But this also stores the opacity and color, but why? Well, as for opacity, it is for compatibility with the third effect and to make the entire thing smoother. We fill every cell with opacity, and later in the `render();` function, we will decrease it every frame so colored elements fade away rather than instantly disappearing when we clear the frame. And as for color? Well, I did that to show that if you want, you can make the cells different colors if you want to make a rainbow or reds and oranges, anything really.

### Creating the mouse effect

So now onto the actual effect. We have created the grid mathematically, but what is next? Well, for this effect, we have three main functions. First, one that iterates over the grid we made and draws all the cells every frame: the 'render', our mouse tracker, and our MouseEffect. To start lets consider the mouse tracker. We need to track our mouse according to its position inside the canvas so we can use it in `MouseEffect` to find the cell it is under and fill in cells surrounding. So to do that, we grab our canvas's rect size and subtract it against our mouse like so.

```javascript
function mouseTracker(e) {
  const canvas = canvasRef.current;
  if (!canvas) return;

  // Get canvas position directly
  const canvasRect = canvas.getBoundingClientRect();

  // Get mouse position relative to canvas
  const mouseX = e.clientX - canvasRect.left;
  const mouseY = e.clientY - canvasRect.top;

  mousePosRef.current.x = mouseX;
  mousePosRef.current.y = mouseY;
}
```

We can now track its location inside our card. We will then provide this data to our `MouseEffect` so it can apply effects around the mouse. So how does this function work? Well, it is pretty simple conceptually. And has three main stages, which are the following.

- We transfer the x and y of the mouse into a row and column location
- We define our variables like effect radius and fall-off points
- Iterate over the effect-radius cells and apply our effects

So we find what column and row is under our mouse. Define how large an area we want our mouse to randomly pick cells from, along with defining the minimum and maximum value we want to increase said cell's opacity, which is based on distance. This will make far-off cells fade faster when the render decreases every cell's opacity. Then in the third part, iterate over the space we defined and calculate how much we increase its opacity, see if it is in the radius, and see if it has been chosen. This has about a 50% chance, and it is what adds the dithered look because we are going to be constantly changing and increasing different cells' opacity. Now how many times did I say 'cells'... here is the code.

```javascript
function MouseEffect() {
  const canvas = canvasRef.current;
  if (!ctx || !canvas) {
    return;
  }

  // Get column and row location of the mouse's x and y
  let cenCol = Math.floor(mousePosRef.current.x / pixSize);
  let cenRow = Math.floor(mousePosRef.current.y / pixSize);

  // Defining our var's
  let radius = 30; //How large the effect circle is in cells
  const minChange = 0.05; // How little we can increase opacity
  const maxChange = 0.1; // How much we can increase opacity

  //Iterate over effect our and apply effects
  for (let i = -radius; i <= radius; i++) {
    for (let j = -radius; j <= radius; j++) {
      //Distance of center cell to the current cell
      const distance = Math.sqrt(i * i + j * j);
      //If not outside radius and chosen 50% chance
      if (distance <= radius && Math.random() < 0.5) {
        //Current iterated cell location
        const curCol = cenCol + i;
        const curRow = cenRow + j;
        //Make sure the cell is one screen/exists if so continue
        //This is important for edges and of screen checking
        if (
          curCol >= 0 &&
          curCol < colRef.current &&
          curRow >= 0 &&
          curRow < rowRef.current
        ) {
          // 1 at center -> 0 at edge
          const normDis = 1 - distance / radius;
          // Map to [minChange..maxChange]
          const change = minChange + (maxChange - minChange) * normDis;

          gridRef.current[curRow][curCol].opacity = Math.min(
            1.0,
            gridRef.current[curRow][curCol].opacity + change
          );
        }
      }
    }
  }
}
```

And that is truly it. That is the main function for the effect. All we have to do now is put the entire effect under a `requestAnimationFrame`, which also has the render function, which is super simple. I have practically alluded to it and already explained it, but for clarity, here is how it works. The render function clears the previous frame. Then it iterates over the cells and decreases the opacity unless it is too close to 0. If it is, we ignore it. Which looks like so.

```javascript
function render() {
  const canvas = canvasRef.current;
  if (!ctx || !canvas || !gridRef.current || !gridRef.current.length) return;
  //Clear our frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //Iterate over our cells
  for (let i = 0; i < gridRef.current.length; i++) {
    for (let j = 0; j < gridRef.current[i].length; j++) {
      //If we are geater then 0 opacity decrease opacity
      if (gridRef.current[i][j].opacity > 0)
        gridRef.current[i][j].opacity -= 0.05;
      //If we are greater than 0 opacity draw the cell
      //Otherwise ignore it
      if (gridRef.current[i][j].opacity > 0) {
        drawSquare(
          gridRef.current[i][j].x,
          gridRef.current[i][j].y,
          gridRef.current[i][j].color,
          gridRef.current[i][j].opacity
        );
      }
    }
  }
}
```

We need this to update every cell visually as `MouseEffect` changes its opacity but does no actual drawing of anything. And also a convenient place to slowly decrease every cell's opacity as we draw them all. Now all we do now is apply a `:before` at a higher z-index than the canvas with a blur for a more subtle effect, which is the image I showed. This is also most of the code since we are just altering what we already have for the next effect!

## Third Effect

And here is the final one. Here is what it looks like for reference!

![Basic glow card](/scriptorium/cardHover/grid.webp)

Thankfully, this effect is heavily based on the fundamentals of the previous one, so not much more code is needed! But first, to make this, we increase `pixSize` from whatever you chose previously to a larger number like 40px. Now we have a larger grid, but! There is a problem. We have larger cells now, and if the container is not a perfect multiple of our `pixSize`, we have leftover space at the edges where there is not enough room for a new cell, causing large visible gaps. This existed before but is made more apparent at larger sizes.

So... How can we fix this? Well, if we simply increase the canvas size so it is 110% in CSS and when we update its resolution on resize, we add something like.

```javascript
canvas.width = parentRect.width * 1.1;
canvas.height = parentRect.height * 1.1;
```

Now the grid's edges or gaps are simply not visible to us anymore because we have in essence zoomed in by increasing its size while that size is just cut off by the `overflow: hidden` in our CSS parent card. The issue still exists. It is just on an area of the canvas that is no longer visible.

All we need to change is `render();` and `MouseEffect`. Everything else stays the same. And unlike before, all we want to do is increase the opacity of a single cell under our mouse and have it fade out when the user navigates elsewhere. So here I just turned `MouseEffect` into a function that simply updates an overhead on what column and row the mouse is under. Then using that data in the render, I updated that cell by increasing its opacity like so.

```javascript
function render() {
  if (!ctx || !gridRef.current.length) return;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //Collect the current hover cell position'updated via MouseEffect
  let hovCol = rowRef.current;
  let hovRow = colRef.current;
  //If on screen
  if (hovCol !== undefined && hovRow !== undefined) {
    //Increase opacity dont pass 1
    gridRef.current[hovRow][hovCol].opacity = clamp(
      gridRef.current[hovRow][hovCol].opacity + 0.05,
      0,
      1
    );
  }
  //Iterate over all cells
  for (let i = 0; i < rowColRef.current.row; i++) {
    for (let j = 0; j < rowColRef.current.col; j++) {
      //If cell is not being hovered over decrease it opacity
      //Clamp just makes sure it can't go above or bellow 0 and 1
      if (i !== hovRow || j !== hovCol) {
        gridRef.current[i][j].opacity = clamp(
          gridRef.current[i][j].opacity - 0.01,
          0,
          1
        );
      }
      //Draw cell
      drawSquare(
        gridRef.current[i][j].x,
        gridRef.current[i][j].y,
        gridRef.current[i][j].color,
        gridRef.current[i][j].opacity
      );
    }
  }
}
```

And that is it, pretty much it. I also put a `:before` over it using the card's background color that fades to transparent so the grid is only visible on the edge. In my opinion, it makes it more realistic for actual use by adding subtlety.

## Live

If you want to see these effects live and in practice, then here :)
