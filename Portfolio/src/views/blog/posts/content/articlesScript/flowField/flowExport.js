export function drawCurve(
  ctx,
  gridRef,
  leftRight,
  topBottom,
  colorValues,
  Pix_size,
  lenColor
) {
  if (!ctx || !gridRef.current.length) return;

  // Starting point
  let x =
    leftRight.current.leftX +
    Math.random() * (leftRight.current.rightX - leftRight.current.leftX);
  let y =
    topBottom.current.topY +
    Math.random() * (topBottom.current.bottomY - topBottom.current.topY);

  const num_steps = 100;
  const max_step_length = 5;
  const step_length = Math.floor(Math.random() * max_step_length);
  const grid = gridRef.current;

  if (lenColor) {
    let Lencolor = lengthColorPick(
      num_steps,
      max_step_length * num_steps,
      step_length * num_steps,
      colorValues,
      0.8
    );
    ctx.strokeStyle = `hsl(${Lencolor.h}, ${Lencolor.s}%, ${Lencolor.l}%)`;
  }

  // Begin curve
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.moveTo(x, y);
  let previousColor = { h: 0, s: 0, l: 0 };

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
    if (!lenColor) {
      previousColor = interpolateColor(
        previousColor,
        grid[column_index][row_index].color,
        3
      );
      let color = `hsl(${previousColor.h}, ${previousColor.s}%, ${previousColor.l}%)`;
      ctx.strokeStyle = color;
    }
    //Update position
    x = x + x_step;
    y = y + y_step;
  }

  // End curve
  ctx.stroke();
}

function lengthColorPick(
  min_length,
  max_length,
  current_length,
  colorValues,
  intensity
) {
  // Normalize current_length to a value between 0 and 1
  const normalized =
    Math.max(
      0,
      Math.min(1, (current_length - min_length) / (max_length - min_length))
    ) * intensity;

  // Use normalized value to adjust the original lightness
  const adjustedLightness = colorValues.l * normalized;

  return {
    h: colorValues.h,
    s: colorValues.s,
    l: adjustedLightness,
  };
}

function interpolateColor(currentColor, targetColor, step) {
  // Helper to move a value toward a target by at most 'step'
  function approach(current, target, step) {
    if (current < target) return Math.min(current + step, target);
    if (current > target) return Math.max(current - step, target);
    return current;
  }

  return {
    h: approach(currentColor.h, targetColor.h, step),
    s: approach(currentColor.s, targetColor.s, step),
    l: approach(currentColor.l, targetColor.l, step),
  };
}

//
// Math
//

let permutation = Array.from({ length: 256 }, (_, i) => i);
for (let i = 255; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
}
permutation = permutation.concat(permutation);

function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}
function lerp(a, b, t) {
  return a + t * (b - a);
}

function grad2d(hash, x, y) {
  // 8 possible directions
  const h = hash & 7;
  const u = h < 4 ? x : y;
  const v = h < 4 ? y : x;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

export function perlin2D(x, y) {
  const xi = Math.floor(x) & 255;
  const yi = Math.floor(y) & 255;
  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);

  const u = fade(xf);
  const v = fade(yf);

  const aa = permutation[xi + permutation[yi]];
  const ab = permutation[xi + permutation[yi + 1]];
  const ba = permutation[xi + 1 + permutation[yi]];
  const bb = permutation[xi + 1 + permutation[yi + 1]];

  const x1 = lerp(grad2d(aa, xf, yf), grad2d(ba, xf - 1, yf), u);
  const x2 = lerp(grad2d(ab, xf, yf - 1), grad2d(bb, xf - 1, yf - 1), u);

  return lerp(x1, x2, v); // Output is in [-1, 1]
}
