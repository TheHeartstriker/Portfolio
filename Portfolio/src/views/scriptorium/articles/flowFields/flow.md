# Flow Fields, Painting with Math

This article is going to go over flow fields! A really fun and intresting concept used in computer graphics, genrative art and fluid mechanics. Flow fields can be used in so many creative way's a webiste background, for a card or maybe for Ilistrating a simple image?
By the end you will(hopfully) have your own flow field to work with while also understanding how it works and how to dive deeper if you want. And of course all with diagrams cool imagary and a live example at the end.

## Flow fields the idea

But what is a flow field? Well young padawan it's is a method for drawing lines using vector's more spefically a field of vector's. As our line move's through the field each vector bellow it pushes it around forming a shape. Like a pen over a piece of paper that's being pushed around before it reaches it's destination. That is then repeated over and over
until we have drawn the shape of the vector feild bellow with the curved lines. The result can be something like the image shown bellow.

![Image description](/scriptorium/flowArticle/flow1.webp)

This uses a smooth water like vector feild. The entire idea is switching out the program that form's the vector fields or the curve coloring to create a image. You can even form proper shape's like animales or face's.

## Step's to build

First let's define the stage's in building a flow field. First building a grid like graphing paper, assigning vector's to every cell in the grid and finally actually drawing a curved line. Each stage's is equaly important in creating the final result.

### Grid

We first start by creating a grid again imagine something like graphing paper. And each cell in this grid hold's three value's a x and y location along with a vector. Think of the vector like a arrow pointing in a direction while the x and y are the cell's center.
This grid act's as a map for our curve's so we can find the vector at any point to guide our curve.

### Grid vector's and perlin noise

The next is filling the grid we just created with the vector's. Now there are many way's to do this but here we are going to use [perlin noise](https://en.wikipedia.org/wiki/Perlin_noise). This allow's us to get random number's or in our case vector's that are less well... random. The idea is the number's that are generated are more gradual no huge jump which will create very cohesive and smooth wave like patern's.

### Curve's

And that last step is drawing the line's accross the grid. The idea behind this is the line curve's according to the vector of the cell beneath it. We can then control how long the lines are and how they are colored. For example making shorter line's darker while longer line's are lighter adding depth. This step bring's the field we made in the second step to life. Like the image above!

## Creating our grid

Ok now for the fun stuff. To make our grid we need to divide our window into row's and column. But! Before that we need to define our resolution otherwise known as the width and height of each cell in our grid. Then after defining that we divide it by the legnth and height of our window.
This will get how many cell's we need based on our window demmensions. Now here is the function I am using for getting the row and collumn count.

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

Now let's walk through this first why am I not just using `winow.innerHeight` and width? That's because when we draw the curves we want some to start off screen so some curve's can flow into the viewable space.
So of course we need cell's for this extra space and here every side get's a 25% increase from the natural window size.
Now considering the height to get the amount of columns we need it would be screen height divded by our cell's width to get the amount of collumns we need and we repeat that for the row's.

Now we have the amount of grid's and columns we need for our grid but now let's actual create it. To this we should create a 2D array to store each cell's location and angular data. We do this in `create2DArray();`. Which looks like so.

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

Before we go into the code remember each cell's x and y represent's it location otherwise it's just a 2D array!

Ok now lets dive into the code before showing the result. First we create a empty array full of unintalized slot's each slot represent's each row and it's children the collumn's. Now considering the i loop we index into the row here `arr[i] = new Array(Cols);` and fill it with empty slot's representing the amount of columns we need. Then in j we fill those columns using `arr[i][j]` now so we can visualize say `arr[i][j] = 0` and Col and Row's are both 3 the data structure would look like so.

```javascript
let arr = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
```

But in the final product we actually push a object so in reality imagine each 0 be a object like so `{x: 0, y: 0, angle: 0} ` with the proper x, y and a actual angle present. But we will add in the angle later for now consider the x axis of a cell specfically `x: leftX + i * Pix_size` we get the proper x location by adding the left most point then multiplying it by the index and `Pix_size` pushing it to the right by the amount of cell's that already exist. Now for a little visualzation I made a simple draw function loops over arr and draw a rectangle around the center it's width and height are of course still the `Pix_size` but I did increase `Pix_size` temperally to 25px so its more obvious.

![Image description](/scriptorium/flowArticle/Grid.png)

## Grid Vector's

Now let's consider how we fill our grid with angle's which is as mentiond using perlin noise. Now I could go into how perlin noise actually work's and how we can implemnt it from scratch but the truth is... I have no clue how it works! But luckly you don't really need to now how it work's just the general idea.

Which is gernating smooth random number but what do I mean by smooth? I mean there no jump's in the randomness to visualize consider a moutain in array form with a max of 100 and a min of 1. Like so [0,4,8,10,15] now let's say our next number is randomized it could very well just be 80. No moutain or natural formation just suddenly gets a 5x increase in size. Perlin noise make's sure the randomness is within reason small jumps either up or down considering the moutain. But going back to code there is multiple npm package's and implmentation's online here is the one I am using. //Add link future me!

Now moving past perlin noise lets visualize the angle's themself's. For this I am going to draw a point in the center of each rectangle and a line a fourth the size of the Pix_size in the direction of each cell's angle. Further more I am going to remove the perlin noise so you don't need it to to go further and to simplfiy the following visulzation. I also increased Pix_size to 40 so it's easier to see.

![Image description](/scriptorium/flowArticle/GridAngle.png)

Here is the new loop inside `create2DArray` with the angle's actually added this time. I am also using the simplfied angluar math instead of perlin noise here.

```javascript
//Inside the create2DArray function!
for (let i = 0; i < arr.length; i++) {
  //Index into row and create empty columns
  arr[i] = new Array(Cols);
  //Iterate over the empty columns in the row
  for (let j = 0; j < arr[i].length; j++) {
    const angle = (i / Rows) * Math.PI * 2; //Simplfited angle
    arr[i][j] = {
      angle: angle,
      x: leftX + i * Pix_size,
      y: topY + j * Pix_size,
    };
  }
}
```

## Drawing the curve's

Before we get into the code for our curve's it's good to know how people even draw curve's in computer graphic's. And that is drawing series of very short line's to form a line shape. As for the next part the coloring I will be using length to deterimn color. Just keep this in mind!

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
  //Line length and diffintion
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
    // Draw vertex (line to current position)
    ctx.lineTo(x, y);

    // Calculate grid indices allowing us to get the GridEl of the current position
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

Now let's walk through this first we pick our starting point in relation to the modifed canvas. We then define the length and amount of lines which form the curve which is `num_steps` the number of stright lines that make up a single curve. Then `step_length` how far each straight line will travel.
Depending on how these two varables are set you can get more blocky or gemotric lines here they end up pretty smooth we also set the `step_length` as any number between 1 and 5 giving us different curve length's. After this we pick our color ignore `lengthColorPick` I will cover that shortly.
The next portion is moving our x and y to draw the curve.

In the loop we draw a line to x and y then the real bread and butter we find the index's so we can slice into our grid and get the location of the cell under the current lines x and y position. Store that in `colum_index` and `row_index` and then create a if check to be sure it's in bounds we do this because mathmatically we want space outside the visable space but we can't actually draw of screen. After we have the index's where set we can get the angle of the cell under the x and y location. Then we can just use cos and sin multiplyed by or step_length to get the x and y velocity and apply that change to our curves current line. This pushes the curve in that spefic angular direction creating the
entire flow effect.

Now let's quickly go over how we actually color the line. The `lengthColorPick` I glossed over looks like so.

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

This return's the color we set a single time for each curve. The idea is we give it a orginal color value inside `colorValues` like pure red then give it the max possible and min possilbe range. And have it normalize the distance compared to the max. For example between 0 and 1000 our normal
would be 0.4 at 400. Using that normal we can decrease orginal lightnightness which is `adjustedLightness`. For some extra control I also added `intensity` which decrease our normal value say we use the default 0.5 for `intensity` and our normal is again equal to 0.4 we preform 0.4 \* 0.5 halfing
our normal which in turn decrease our lightness.

## Variations

Now before this get's any longer I want to show you some variation's! Bellow I gave every cell a color based on it possition collumn wise spliting it into 5 section so each color change's from left to right. Then in curve I would alter each stroke ocording to what the cell's color bellow it is.
Which causes something like this.

![Image description](/scriptorium/flowArticle/ColoredFlow.png)

And here is a live look. Here I went back to using `lengthColorPick` but made it a loop so we slowly see our curve's being drawn.
