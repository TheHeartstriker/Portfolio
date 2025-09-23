# Flow Fields, Painting with Math

This article is going to go over flow fields! A really fun and intresting concept used in computer graphics, genrative art and fluid mechanics. Flow fields can be used in so many creative way's a webiste background, for a card or maybe for Ilistrating a simple image?
By the end you will(hopfully) have your own flow field to work with while also understanding how it works and how to dive deeper if you want. And of course all with diagrams cool imagary and a live example at the end.

## Flow fields the idea

But what is a flow field? Well young padawan it's is a method for drawing lines using vector's more spefically a field of vector's. As our line move's through the field each vector bellow it pushes it around forming a shape. Like a pen over a piece of paper that's being pushed around before it reaches it's destination. That is then repeated over and over
until we have drawn the shape of the vector feild bellow with the curved lines. The result can be something like the image shown bellow.

![Image description](/scriptorium/flowArticle/flow1.webp)

This uses a smooth water like vector feild. The entire idea is switching out the program that form's the vector fields or the curve coloring to create a image. You can even form proper shape's like animales or face's.

## Step's to build

First let's define the stage's in building a flow field. First building a grid that represent's each cell, assigning vector's to our grid and finally actually drawing a curved line. Each stage's is equaly important in creating the final image.

### Grid

We first start by creating a grid think of graphing paper. And each cell in this grid hold's three value's a x, y location and a vector. Think of the vector like a arrow pointing in a direction while the x and y are the cell's center. This grid act's as a map for our curve's so we can find the vector at any point to guide our curve.

### Grid vector's and perlin noise

The next is filling the grid we just create with the vector's. Now there are many way's to do this but here we are going to use [perlin noise](https://en.wikipedia.org/wiki/Perlin_noise). This allow's us to get random number's or in our case vector's that are less well... random. The idea is the number's that are generate are more gradual no huge jump which will create very cohesive and smooth wave like patern's.

### Curve's

And that last step is drawing the line's accross the grid. The idea behind this is the line curve's according to the vector of the cell its over using the grid we made. We can then control how long the lines are and how they are colored. For example making shorter line's darker while longer line's are lighter adding depth. This step bring's the field we made in the second step to life. Like the image above!

## Creating our grid

Ok now to fun stuff. Now to make our graphing paper we need to divide our window into row's and column. But before that we need to define our resolution or how big each cell's is then divide that by the legnth and height of our window. This will get how many cell's we need based on our cell size.
Here is the function I am using for getting the row and collumn count.

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
const Pix_size = 15;

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

Now let's walk through this first why am I not just using `winow.innerHeight` and width? That because when we draw the curves we want some to start off screen so some curve's can flow into the viewable space. That mean's we need cell's for this extra space here every side get's a 25% increase from the window size.
Now considering the height the cols we get our extended screen height divded that by our cell's width to get the amount of collumns we need same for the row's. We then pass that over to `create2DArray();`. Which looks like so.

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
      const angle = perlin2D(i * scale, j * scale) * Math.PI * 2;
      arr[i][j] = {
        angle: angle,
        x: leftX + i * Pix_size,
        y: topY + j * Pix_size,
      };
    }
  }
  return arr;
}
```

Let's disect this a bit before showing the result. First we create a empty array full of intalized slot according to amount of row's we need. Now considering the i loop we index into the row fill it with empty slot representing the amount of columns we need.
Then in j we fill those columns using `arr[i][j]` now so we can visualize say `arr[i][j] = 0` and Col and Row's are both 3 the data structure would look like so.

```javascript
let arr = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
```

But we actually push a angle and x and y value's. Ignoring angle for now consider x axis we get its center by adding the left most point then multiplying it by the index and pix_size pushing it to the right by the amount of cell's that already exist. Now for a little visualzation I made a simple draw
function loops over arr and draw a rectangle around the center it's width and height are of course still pix_size but I did increase pix_size temperally to 25px so its more obvious.

![Image description](/scriptorium/flowArticle/Grid.png)
