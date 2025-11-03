# Modern Card Hover Animations, Css and Javascript

A great hover effect can make UI's feel alive a small detail that improves visual polish and depth! And this article will cover hover effect's on cards. It's going to cover three custom made hover effects for a card background's. The main idea is adding unique variations to a classic effect of a card glowing subtlery over where your mouse is hovering. But! As per usual with my article's there will be imagery, code examples and a live demo at the end!

## Overview of our effects!

This article will go over three different effects. I will be using html canvas, css, js and react but you can also following along with the idea's regardless of tooling if you want to follow along with something like gsap or no react that is also probably fine. The first as mentiond a classic effect where if the mouse is hovering over a card add a glow beneath the cursor simple no?

The second quite a bit more intresting it will use html canvas and `:before` to apply a blur over the canvas. But what will the canvas do? Well the idea is to make a pixelated almost dithered hover effect. If your curious about dithering here is a cool ditherd shadow on [codepen](https://codepen.io/shubniggurath/pen/zYOayGL) similar to what I am imagining here. How will this be done? Well the idea is we will color 'pixels' around the mouse randomly in a circle the coloring will happen more often in the center and less often at the edges of the circle. And every frame the mouse choses new pixels to color around the mouse leading to a blurry dithered shadow.

The third effect will use the scafolding of the first while visually being less chaotic. We will use a canvas again and create a grid over the card and on hover the grid fills with color and slowly fades when the mouse leaves the cell. But this is to intense for a card so using `:before` we can add a gradient the same color as the card's background then have it fade to transparent. Possitioning this gradient alows us to cut of large sections of the effect alowing us to make it visuble in only a corner.

## Effect one

Now starting off simple let's go over the clasic glow on mouse hover for card. This one unlike the following is nearly pure css in esence. The following is our css code for this effect.

```css
.card::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
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

Now this act's as our 'glow' that happens on hover it just a radial gradient that fade's to transparent. We use `--mouse-x` and `--mouse-y` to position the radial gradient around the card then use `--glow-opacity` to fade the effect out. So here if we want to make the radial gradinet follow the mouse we just update `--mouse-x` and `--mouse-y` if the mouse is inside the card. Then to fade it out as it moves away from the card we just change `--glow-opacity`. So we attach a mouse move function to the card that looks like so.

```javascript
export function basicHandleMouseMove(
  e: React.MouseEvent<HTMLDivElement>,
  cardRef: React.RefObject<HTMLElement | null>
) {
  //Store card so we can use the quick hand
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

Here is the HTML for the card this will remain generally the same minus some additions such as canvas and new classes for the whole project.

```javascript
<div className="card-container" ref={containerRef}>
  {/* Card 1 */}
  <section className="card" ref={cardRef}>
    <h2></h2>
    <p></p>
  </section>
</div>
```

Now here in react we would attach or mouse move to a parent element then pass it our cardRef and our effect works! Something to note is we attach to a parent element because we need the mouse's location even when it's outside the card to similate the smooth fade. You could attach the mouse to a window instead and to effect mulitple cards feed a array of ref's to the `basicHandleMouseMove` function. Here is a image of the effect in action!

![Basic glow card](/scriptorium/cardHover/basicGlow.webp)

I recomend recomend lower opacity's and perhaps a blur effect to make the glow even more subtle it pair's well with a gradient!

## Effect Two

Andddd now onto effect two the dithered effect. Here is a example of what it looks like without the blur.

![Basic glow card](/scriptorium/cardHover/pixel.webp)

So the idea behind how this works is puting a canvas in our card space. Then creating a grid and 'coloring' the grid's cells randomly in a circular area on mouse hover. The logic is based on a common programing patern sometime's refered to as a 'pixel array' I have even covered this before in my article about [flow fields](https://www.kadenwildauer.com/scriptorium/flow-fields) if you intrested. But before we walk through how this works I wanted to note that this section will have the most code! The third effect is slight alteration to the following code and therefore less desnse.

### Creating the pixel array

First we need to set the canvas up with a width and height of the parent aka the card if you need help or want the code here I will link the repository at the end! After that we need to create the 'pixelArray' which is just a mathmatical representation of the grid we do this so we can store the x and y location of every cell allowing us to represent the cell logicaly one after the other and therefore color them in orcording to there locations. To do this we first create a function called `impose();` its job is when given the size for every cell it defines how many columns and rows we need to fill the canvas. As you can imagine the lower the cell size the more cells we get an the more defined our output will appear, but this will also take up more compute. The cell size being `pixSize` size here this is the code.

```javascript
function Impose() {
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

So we now have the size of the grid in the from of how many rows and columns we need. But as mentioned we need to mathmatically represent each cell we do this by creating a 2D array and storing locations and the unique indivdual cell data inside of it. But lets visualize this a bit here is a 2D array.

```javascript
let arr = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
```

Its just a nested array but imagine this is a grid each child array is a row and its children the 0's are columns. Now in practice the 0's are object's containing the cell's values like location, color and opacity.

But how we do we get the x and y value to store in the cell? Well conceptually its rather simple math we use `pixSize` and multiply thats it! So say we the x value we just multiple by what ever column we are on if its the second column its 2 \* pixSize to get its x value this accounts for the space its predocesor cells take up. Here is the code implementing this idea while creating the 2D array.

```typescript
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

Now after creating this you should be able to color pixel's in if you want to you can just index into your grid get a cells x and y location and then pass it to a draw function using the canvas API. Now the most important part is storing the x and y location. But this also stores the opacity and color but why? Well as for opacity its for compatiblity with the third effect and to make the entire thing smoother we fill every cell with opacity, and later in the `render` function will decrease it every frame so colored elments fade away rather then instantly disapearing when we clear the frame. And as for color? Well I did that to show that if you want you can make the cells different color's if you want to make a rainbow or red's and orange's anything really.

### Creating the mouse effect

So now onto the actual effect we have created the grid mathmatically but whats next? Well for this effect we have three main function's. First one that iterates over the grid we made and draw's all the cells every frame the 'render', our mouse tracker, and our MouseEffect. First lets consider the mouse tracker we need to track our mouse acoding to its position inside the canvas so we can us it in `MouseEffect` to find the cell its under and fill in cells sourunding. So to do that we grab our canvas's rect size and subtract it against our mouse like so.

```javascript
function mouseTracker(e: MouseEvent) {
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

And thats the first one we can now track its location inside our card we will then provide this data to our `MouseEffect` so it can apply effects around the mouse. So how does this function work? Well its pretty simple conceptually. And has three main stages which is the following.

- [We transfer the x and y of the mouse into a row and collumn location]()
- [We define are var's like effect radius and fall of points]()
- [Iterate over the effect radius cells and apply or effects]()

So we find what column and row is under our mouse. Define how large a area we want our mouse to randomly pick cells from along with defining the minimum and maximum value we want to increase said cells opacity which is based on distance. This will make far of cells fade faster when the render decrease every cells opacity. Then in the third part iterate over the space we defined and caculate how much we increase its opacity see if its in the radius and see if its been chosen this has a about 50% chance at is what adds the dithered look because we are going to be constantly changing and increasing different cells opacity. Now how many times did I say 'cells'... here is the code.

```javascript
function MouseEffect() {
  const canvas = canvasRef.current;
  if (!ctx || !canvas) {
    return;
  }

  // Get collumn and row location of the mouse's x and y
  let cenCol = Math.floor(mousePosRef.current.x / pixSize);
  let cenRow = Math.floor(mousePosRef.current.y / pixSize);

  // Defining are var's
  let radius = 30; //How large the effect circle is in cells
  const minChange = 0.05; // How little we can increase opacity
  const maxChange = 0.1; // How much we can increase opacity

  //Iterate over effect are and apply effects
  for (let i = -radius; i <= radius; i++) {
    for (let j = -radius; j <= radius; j++) {
      //Distance of center cell to the current cell
      const distance = Math.sqrt(i * i + j * j);
      //If not outside radius and chosen 50% chance
      if (distance <= radius && Math.random() < 0.5) {
        //Current interated cell location
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

And thats truly it thats the main function for the effect all we have to do now is put the entire effect under a `requestAnimationFrame` which also has the render function which is super simple I have practically eluded to it and already explaned it but for clarity here is how it works. The render function clear the previous frame. Then it iterates over the cells and decrease the opacity unless its to close to 0 if it we ignore it. Which looks like so.

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
      //If we are greater then 0 opacity draw the cell
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

We need this to update every cell visually as `MouseEffect` changes it's opacity but does no actual draw anything. And also a convient place to slowly decrease every cells opacity as we draw them all. Now all we do now is apply a :before at a higher z index then the canvas with a blur for a more subtle effect which is the image I showed. This is also most of the code since we are just altering what we already have for the next effect!

## Third Effect

And the final one :) here is what it looks like for refrence!

![Basic glow card](/scriptorium/cardHover/grid.webp)

Thankfully this effect is heavily based on the fundementals of the previous one so, not much more code is needed! But first up to make this we increase `pixSize` from whatever you chose previously to a larger number like 40px. Now have have a larger grid but! There is a problem we have larger cells now and if the container isn't a perfect mutiple of our `pixSize` we have leftover space at the edges where there is not enough room for a new cell causing large visable gaps. This existed before but is made more aprent at larger sizes.

So... How can we fix this? Well if we simply increase the canvas size so its 110% in css and when we update its resolution on resize we add something like.

```javascript
canvas.width = parentRect.width * 1.1;
canvas.height = parentRect.height * 1.1;
```

Now the grids edge's or gaps are simply not visable to us anymore because we have in essence zoomed in by increasing its size while that size is just cutoff by the `overflow: hidden` in our css parent card. The issue still exists it just on a area of the canvas thats no longer visable.

All we need to change is `render();` and `MouseEffect` everything else stays the same. And unlike before all we want to do is increase the opacity of a single cell under our mouse and have it fade out when the user navigates elsewhere. So here I just turned `MouseEffect` into a function that simply updates a overhead on what collumn and row the mouse is under. Then using that data in the `render` I updated that cell by increasing its opacity like so.

```javascript
function render() {
  if (!ctx || !gridRef.current.length) return;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //Collect the current hover cell position'updated via MouseEffect
  let hovCol = hoveredCellRef.current?.col;
  let hovRow = hoveredCellRef.current?.row;
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

And thats it pretty much it. I also put a before over it using the cards background color that fades to transparent so the grid is only visable on the edge. In my opion it makes it more relastic for actual use by adding subtlte.

## Live

If you want to see these effects live and in practice then here :)
