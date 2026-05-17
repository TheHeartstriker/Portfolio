# Building a Mouse-Responsive SVG Polygon Background with JavaScript and CSS

This article will go over how to transform a static SVG image into a cool mouse responsive background! It can be used as a cool add on for a hero for portfolios, interactive websites, or even in more professional settings if you're feeling like creating something interesting. More specifically, this article is about manipulating a polygon background generated from Haikei, a free SVG pattern and effect generation resource.

## The Idea

The goal is to have a Haikei polygon background change colors on mouse hover. When a user hovers their mouse over the SVG image, the triangles below subtly change color, with a lesser effect on the immediately surrounding triangles. We can implement a few different interesting effects, such as darkening the surrounding triangles, lightening them, or adding glow effects. There is a Showcase at the end if you just want to see the result! Or just want to see any code I gloss over here.

## Getting our background ready

Ok, let's go over where to go if you want to follow along. Here is the resource: https://app.haikei.app. Below is the image I will be using.

![Image description](/scriptorium/polySvgArticle/BasicPolyBG.webp)

First, we need to import the image into Figma. Because Haikei exports are typically smaller than what we want for a PC screen (1920, 1080), and we can change this easily there. If you want maximum compatibility, you can also generate another smaller image for phones.

Now comes the hard part. Do you know how many polygons are in that image? 108... We need unique IDs for every polygon, so you can either edit the SVG in Figma and give each path/vector a name and then click Export as ID, or you can manually edit the SVG code in your project. For flexibility, give them an iterable name like Vector1, Vector2, etc. Have fun! You could make a script for this but it's only a one time thing so why not just suffer a bit?

Now for the last bit of the basic setup, we should give the SVG tag more flexible sizing options, something like so.

```javascript
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1980 1080"
      fill="none"
      // This allows the SVG to stretch without preserving aspect ratio
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
```

We also should put it inside a div that looks like so.

```css
.poly-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
```

Then we are good that's all the setup. Now it is the more complex stuff.

## Manipulating the polygons

There are multiple ways to go about this. To change a single polygon, we only need to add a `:hover` effect to the CSS for the SVG paths with a transition. But that's not the goal; we want to affect multiple. Now I had a few ideas the first was creating a grid of points around the mouse in a circle and changing the colors based on distance. But that runs into a few issues first, it's unnecessarily complicated, and we would need to constantly check the element below a point with `elementFromPoint`. Which is a little much considering we want a lightweight background. But good news! I landed on a different solution shown below.

### Initialize poly data

My idea was we iterate over the SVG internals once at the start and collect 4 values. First the distance, then the color, ID name, and finally the center of the polygon. We can then store all 108 elements in an array. The type/object structure is shown below.

```typescript
type IdValue = {
  id: string;
  distanceToMouse: number;
  color: number[];
  elCenter: DOMRect;
};
```

Now, why do we need to store these things? First, we need the ID for the reference and location, the distance as a placeholder, and the color as the initial value. For color, we of course need to change it, and if we want to return to the original, we need it in memory. As for `elCenter`, we only want to store each polygon's center point once on initialization or on resize. Otherwise, if we don't store it, we run `getBoundingClientRect();` every frame, which is intense and unneeded.

### Mouse loop

Now we have initialized our values, we can now consider the main loop. Now I put my functions into an on mousemove event listener. We only need to consider changes when the controller aka the mouse moves. Here is what it looks like.

```typescript
// mouseRef is a react ref its a obj like so { x: 0, y: 0 }
// otherPolyRef is also a react ref but it contains all the IdValues
function mouseMove(e: MouseEvent) {
  //Storing mouse pos
  mouseRef.current.x = e.clientX;
  mouseRef.current.y = e.clientY;
  // Looping over the array of IdValue the initialized values
  for (const i of otherPolyRef.current) {
    updateDistances(i);
    darkenDistance(i);
  }
}
```

Now we store the mouse position for use inside `updateDistances`, the bread and butter of the entire effect. Now `updateDistances` is as it sounds; we pass it every `IdValue`, it calculates the Euclidean distance from the center of the polygon to the mouse, and stores the new value inside the `IdValue`.

### Applying color based on distance

Now from this point, every `IdValue` has the updated distance value. Now we can look at what creates our effect `darkenDistance`, which to simplify for now is just a black and white color change. The elements closer to the mouse are darker those further to a point are just white. The code and what we expand upon for the colored version is like so.

```typescript
export function darkenDistance(
  i: IdValue,
  distanceMax = 1000,
  intensity = [0.01, 0.99]
) {
  //Collect needed elements and values
  const el = document.getElementById(i.id);
  if (!el) return;
  const distance = Math.min(i.distanceToMouse, distanceMax);
  const originalLightness = 100;
  // Normalize: 0.01 (close) to 0.99 (far)
  const norm = intensity[0] + intensity[1] * (distance / distanceMax);
  const lightness = Math.round(originalLightness * norm);
  // Apply new color
  el.style.fill = `hsl(0, 0%, ${lightness}%)`;
  el.style.stroke = `hsl(0, 0%, ${lightness}%)`;
  el.style.transition = "fill 0.3s linear, stroke 0.3s linear";
}
```

Ok, let's walk through this. First, we collect our important values from IdValue: the ref, the colors, and the 'originalLightness'. Again, this is set to 100, and hue and saturation are set to 0; it shows a more professional-looking version of the effect.

Now, the most important thing is the math. Here, it's super simple and linear, but in essence, say we are far from the mouse but still in range. Our normalized distance comes to 0.99 we multiply that by our lightness, it slightly decreases, but if we are close or the closest, our original lightness is multiplied by 0.01, shrinking drastically. Our intensity acts as a range if we don't want such drastic darkening, we make 0.01 something like 0.1 or more. As such, when moving our mouse, we will get something like so.

![Image description](/scriptorium/polySvgArticle/BlackWhitePoly.webp)

Now for color, we just extract and store the proper original inside i.color instead of just using pre-made values. And when inputting our new lightness, we add the original hue and saturation.

```javascript
el.style.fill = `hsl(${i.color[0]}, ${i.color[1]}%, ${lightness}%)`;
el.style.stroke = `hsl(${i.color[0]}, ${i.color[1]}%, ${lightness}%)`;
```

Now this is where it gets fun; you can add glows to it as well. Reverse the effect, make it appear lighter the closer it is to the mouse. Or just decrease the effect in general, make it less noticeable so it works in a proper design instead of a fun animation.

## Variations

Here I am going to show off some images of a few variations I made before linking the showcase of my favorite effect. All of these can by altering the `darkenDistance` function or altering the SVG coloring on initialization. Before that, a side note if you don't want to regenerate a new SVG from Haikei to change the colors to something new, you can just stick something in the initialization stage that alters the colors to a range you desire! And here is my favorite, the simplified black and white with solid black strokes. Still using the purple poly svg.

![Image description](/scriptorium/polySvgArticle/PolyWhiteBlackBlack.webp)

Here is the original idea. A little disappointing, to be honest, but I am pretty sure that's because of the colors here.

![Image description](/scriptorium/polySvgArticle/PolyGridOrginal.webp)

Here is a fun one. I added a glow along with darkening the color. Furthermore, at a distance, I also added a lightening effect.

![Image description](/scriptorium/polySvgArticle/PolyGridGlow.webp)

And finally, here is a Component of it so you can mess around with it yourself.
