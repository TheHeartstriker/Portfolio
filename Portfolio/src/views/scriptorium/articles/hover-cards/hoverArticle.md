# Intresting card hover effects, css & Javascript

A great hover effect can make UI's feel alive a small detail that improves visual polish and depth! And this article will cover hover effect's on cards! It's going to cover three custom made hover effects for a card background's. The main idea is adding unique variations to a classic effect of a card glowing subtlery over where your mouse is hovering. But! As per usual with my article's there will be imagery, code examples and a live demo at the end!

## Overview of our effects!

This article will go over three different effects. I will be using html canvas, css, js and react but you can also following along with the idea's regardless of tooling if you want to follow along with something like gsap or no react that is also fine! The first as mentiond a classic effect where if mouse is hovering over a card add a glow beneath the cursor simple!

The second quite a bit more intresting it will use html canvas and `:before` to apply a blur over the canvas. But what will the canvas do? Well the idea is to make a pixelated almost dithered hover effect. If your curious about dithering here is a cool ditherd shadow on [codepen](https://codepen.io/shubniggurath/pen/zYOayGL) similar to what's done here! How will this be done? Well the idea is we will color 'pixels' around the mouse randomly in a circle the coloring will happen more often in the center and less often at the edges of the circle. And every frame after the mouse choses new pixel leading to a blurry dithered shadow!

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

Here is the HTML for the card this will be the same for the entire project!

```javascript
<div className="card-container" ref={containerRef}>
  {/* Card 1 */}
  <section className="card" ref={cardRef}>
    <h2></h2>
    <p></p>
  </section>
</div>
```

Now here in react we would attach or mouse move to a parent element then pass it our cardRef and our effect works! Something to note is we attach to a parent element because we need the mouse's location even when it's outside the card to similate the smooth fade. You could attach the mouse to a window instead and to effect mulitple cards feed a array of ref's to the `basicHandleMouseMove` function. Here is a image of the effect

PUT IMAGE

I recomend recomend lower opacity's and perhaps a blur effect to make the glow even more subtle it pair's well with a gradient! Here I used a high opacity so its easy to visualize!
