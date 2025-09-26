# Flow Fields, Painting with Math

This article is going to go over flow fields! A really fun and interesting concept used in computer graphics, generative art and fluid mechanics. Flow fields can be used in so many creative ways a website background, for a card or maybe for illustrating a simple image?
By the end you will (hopefully) have your own flow field to work with while also understanding how it works and how to dive deeper if you want. And of course all with diagrams, cool imagery and a live example at the end.

## Flow fields the idea

But what is a flow field? Well young padawan, it is a method for drawing lines using vectors, more specifically a field of vectors. When we draw lines through the field, each vector below it pushes it around, forming a shape. Like a pen over a piece of paper that's being pushed around before it reaches its destination. That is then repeated over and over
until we have drawn the shape of the vector field with the curved lines. The result can be something like the image shown below.

![Image description](/scriptorium/flowArticle/flow1.webp)

This uses a smooth water-like vector field. The entire idea is switching out the program that forms the vector fields, the curve or the coloring to create an image. You can even form proper shapes like animals or faces.

## Step's to build

First let's define the stages we will use to build a flow field. First we will build a grid think of something like graphing paper, we provide each cell a vector and finally actually drawing a curved line. Each stage is equally important in creating the final result. And as a side
note, I will be using React and TypeScript and will have to gloss over some of the setup, i.e., canvas, for the sake of time so keep that in mind! But there is a link to the code at the end for you to peek at. Most of what's taught here is the less language-specific knowledge so don't worry.

### Grid

Here we first start by creating a grid again, again imagine something like graphing paper. And each cell in this grid holds three values: an x and y location along with a vector. You can think of the vector like an arrow pointing in a direction while the x and y are the cell's center.
This grid acts as a map when we draw our curves so we can find the vector below any point.

### Grid vector's and perlin noise

The next step is filling the grid we just created with the vectors. Now there are many ways to do this, but here we are going to use [perlin noise](https://en.wikipedia.org/wiki/Perlin_noise). This allows us to get random numbers, or in our case vectors, that are less... well, random. The idea is the numbers that are generated are more gradual no huge jumps which will create very cohesive and smooth wave like patterns.

### Curve's

And the last step is drawing the lines across the grid. The idea behind this is the line curves according to the vector of the cell beneath it. We can then control how long the lines are and how they are colored. For example, making shorter lines darker while longer lines are lighter, adding depth. This step brings the field we made in the second step to life like the image above!

## Creating our grid

Ok, now for the fun stuff. To make our grid we need to divide our window into rows and columns. But! Before that we need to define our resolution, otherwise known as the width and height of each cell in our grid. Then, after defining that, we divide it by the length and height of our window.
This will give us how many cells we need based on our window dimensions. Here is the function I am using for getting the row and column count.

```javascript
//What
const leftRight = useRef({
  leftX: window.innerWidth * -0.25,
  rightX: window.innerWidth * 1.25,
});
const topBottom = useRef({
  topY: window.innerHeight * -0.25,
  bottomY: window.innerHeight * 1.25,
});
const rowRef = useRef(0);
const colRef = useRef(0);
const Pix_size = 15; //Act's like a resolution

function Impose() {
  const rows = Math.floor(
    (leftRight.current.rightX - leftRight.current.leftX) / Pix_size
  );
  const cols = Math.floor(
    (topBottom.current.bottomY - topBottom.current.topY) / Pix_size
  );
  rowRef.current = rows;
  colRef.current = cols;
  // Creates the grid based on the number of rows and columns
  let initialGrid = create2DArray(
    rows,
    cols,
    leftRight.current.leftX,
    topBottom.current.topY
  );
  gridRef.current = initialGrid;
}
```

Let's walk through this first. Why am I not just using `window.innerHeight` and `window.innerWidth`? That's because when we draw the curves we want some to start off-screen so some curves can flow into the viewable space.
That means we need cells for this extra space, and here every side gets a 25% increase from the natural window size.
Now considering the height, to get the amount of columns we need, it would be screen height divided by our cell's width to get the number of columns we need, and width divided by cell width for rows.

We now have the amount of rows and columns we need for our grid, but now let's actually create it. To do this we should create a 2D array to store each cell's location and angular data. We do this in `create2DArray();`, which looks like so.

```javascript
function create2DArray(
  Rows: number,
  Cols: number,
  leftX: number,
  topY: number
): GridEl[][] {
  let arr = new Array(Rows); //Create array of empty rows

  for (let i = 0; i < arr.length; i++) {
    //Index into row and create empty columns
    arr[i] = new Array(Cols);
    //Iterate over the empty columns in the row
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = {
        x: leftX + i * Pix_size,
        y: topY + j * Pix_size,
      };
    }
  }
  return arr;
}
```

Before we go into the code, remember each cell's x and y represents its location; otherwise, it's just a 2D array!

So let's just dive into the code before showing the result. First we create an empty array full of uninitialized slots, each slot representing each row and its children, the columns. Now, considering the i loop, we index into the row here `arr[i] = new Array(Cols);` and fill it with empty slots representing the number of columns we need. Then in j we fill those columns using `arr[i][j]` so we can visualize, say `arr[i][j] = 0`, and Cols and Rows are both 3, the data structure would look like so.

```javascript
let arr = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
```

But in the final product we actually push an object, so in reality imagine each 0 being an object like `so {x: 0, y: 0, angle: 0}` with the proper x, y, and an actual angle present. But we will add in the angle later; for now, consider the x-axis of a cell specifically: `x: leftX + i * Pix_size`. We get the proper x location of each cell by adding the leftmost point, then multiplying it by the index and `Pix_size`, pushing it to the right by the number of cells that already exist.

Now, for a little visualization, I made a simple draw function that loops over arr and draws a rectangle around the center. Its width and height are, of course, still the `Pix_size`, but I did increase `Pix_size` temporarily to 25px so it’s more obvious.

![Image description](/scriptorium/flowArticle/Grid.png)

## Grid Vector's

Now let's consider how we fill our grid with angles, which is, as mentioned, using Perlin noise. Now I could go into how Perlin noise actually works and how we can implement it from scratch, but the truth is... I have no clue how it works! But luckily you don't really need to know how it works, just the general idea.

Which is generating smooth random numbers. But what do I mean by smooth? I mean there are no jumps in the randomness. To visualize, consider a mountain in array form with a max of 100 and a min of 1, like so [0,4,8,10,15]. Now let's say our next number is randomized it could very well just be 80. No mountain or natural formation, just suddenly gets a 5x increase in size. Perlin noise makes sure the randomness is within reason: small jumps either up or down, considering the mountain. But going back to code, there are multiple npm packages and implementations online. Here is the one I am [using](https://github.com/TheHeartstriker/Myriad/blob/main/Myriad/src/flowFields/angleMath.ts).

But moving past Perlin noise, let's visualize the angles themselves. For this, I am going to draw a point in the center of each rectangle and a line a fourth the size of the `Pix_size` in the direction of each cell's angle. Furthermore, I am going to remove the Perlin noise so you don't need it to go further and to simplify the following visualization. I also increased `Pix_size` to 40 so it's easier to see.

![Image description](/scriptorium/flowArticle/GridAngle.png)

Here is the new loop inside `create2DArray` with the angles actually added this time. I am also using the simplified angular math instead of Perlin noise here.

```javascript
//Inside the create2DArray function!
for (let i = 0; i < arr.length; i++) {
  //Index into row and create empty columns
  arr[i] = new Array(Cols);
  //Iterate over the empty columns in the row
  for (let j = 0; j < arr[i].length; j++) {
    const angle = (i / Rows) * Math.PI * 2; //Simplfied angle
    arr[i][j] = {
      angle: angle,
      x: leftX + i * Pix_size,
      y: topY + j * Pix_size,
    };
  }
}
```

## Drawing the curve's

Before we get into the code for our curves, it's good to know how people even draw curves in computer graphics. And that is drawing a series of very short lines to form a curved shape. As for the next part, the coloring, I will be using length to determine color. Just keep this in mind!

```typescript
function drawCurve(
  ctx: CanvasRenderingContext2D | null,
  gridRef: React.RefObject<GridEl[][]>, //Array of cells
  //Our modifyed window
  leftRight: React.RefObject<{ leftX: number; rightX: number }>,
  topBottom: React.RefObject<{ topY: number; bottomY: number }>,
  colorValues: { h: number; s: number; l: number }, //Orginal color
  Pix_size: number //Passing over current cell size
) {
  if (!ctx || !gridRef.current.length) return;

  // Random start point
  let x =
    leftRight.current.leftX +
    Math.random() * (leftRight.current.rightX - leftRight.current.leftX);
  let y =
    topBottom.current.topY +
    Math.random() * (topBottom.current.bottomY - topBottom.current.topY);
  //Line length
  const num_steps = 100;
  const max_step_length = 5;
  const step_length = Math.floor(Math.random() * max_step_length);
  const grid = gridRef.current;
  //Color pick
  let Lencolor = lengthColorPick(
    num_steps,
    max_step_length * num_steps,
    step_length * num_steps,
    colorValues
  );

  // Begin curve
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = Lencolor;
  ctx.moveTo(x, y);

  for (let i = 0; i < num_steps; i++) {
    // This updates the line by using the new x and y
    ctx.lineTo(x, y);

    // Calculate grid indices allowing us to get the cell data under our current x and y
    const column_index = Math.floor((x - leftRight.current.leftX) / Pix_size);
    const row_index = Math.floor((y - topBottom.current.topY) / Pix_size);

    // Check bounds
    if (
      column_index < 0 ||
      column_index >= grid.length ||
      row_index < 0 ||
      row_index >= grid[0].length
    ) {
      break;
    }

    // Get angle from grid
    // Calculate step based on angle and apply to its current position
    const grid_angle = grid[column_index][row_index].angle;
    const x_step = step_length * Math.cos(grid_angle);
    const y_step = step_length * Math.sin(grid_angle);
    //Update position
    x = x + x_step;
    y = y + y_step;
  }

  // End curve
  ctx.stroke();
}
```

Now let's walk through this. First, we pick our starting point in relation to the modified canvas the random x and y. We then define the length and amount of lines which form the curve, which is `num_steps`, the number of straight lines that make up a single curve.
Then `step_length` determines how far each straight line will travel. Depending on how these two variables are set, you can get more blocky or geometric lines; here they end up pretty smooth. We also set the `step_length` as any number between 1 and 5, giving us different curve lengths.
After this, we pick our color ignore `lengthColorPick`, I will cover that shortly. The next portion is moving our x and y continually to draw the curve.

In the loop, we draw a line to x and y, then the real bread and butter: we find the indices so we can slice into our grid and get the location of the cell under the current line's x and y position. Store that in `column_index` and `row_index`, and then create an if check to be sure it's in bounds. We do this because mathematically we want space outside the visible space, but we can't actually draw off screen.
After we have the indices set, we can get the angle of the cell under the x and y location. Then we can just use cos and sin multiplied by our `step_length` to get the x and y velocity and apply that change to our curve's current line. This pushes the curve in that specific angular direction, creating the entire flow effect.

So next, let's quickly go over how we actually color the line. The `lengthColorPick` I glossed over looks like this.

```typescript
export function lengthColorPick(
  min_length: number,
  max_length: number,
  current_length: number,
  colorValues: { h: number; s: number; l: number },
  intensity: number = 0.5
) {
  // Normalize current_length to a value between 0 and 1
  const normalized =
    Math.max(
      0,
      Math.min(1, (current_length - min_length) / (max_length - min_length))
    ) * intensity;

  // Use normalized value to adjust the original lightness
  const adjustedLightness = colorValues.l * normalized;

  return `hsl(${colorValues.h}, ${colorValues.s}%, ${adjustedLightness}%)`;
}
```

This returns the color we set a single time for each curve. The idea is we give it an original color value inside `colorValues`, like pure red, then give it the max possible and min possible range, and have it normalize the distance compared to the max. For example, between 0 and 1000, our normal would be 0.4 at 400. Using that normal, we can decrease the original lightness, which is `adjustedLightness`.
For some extra control, I also added `intensity`, which decreases our normal value. Say we use the default 0.5 for `intensity` and our normal is again equal to 0.4; we perform 0.4 \* 0.5, halving our normal, which in turn decreases our lightness.

## Variations

Now before this gets any longer, I want to show you some variations! Below, I gave every cell a color based on its position, column wise, splitting it into 5 sections, each holding a different color in the cell. Then in `drawCurve`, I would slowly alter each stroke according to what the cell's color below it is.
Which, if given gold and reds, looks like so.

![Image description](/scriptorium/flowArticle/ColoredFlow.png)

And here is a live look. Here I went back to using `lengthColorPick` but put the logic into a render loop so we slowly see the image being created.
