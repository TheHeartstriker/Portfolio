//
//Object drawing functions
//
const headerFontSize = "2.8rem";
const mainTextFontSize = "1.5rem";
export function DrawTextBlurb(Header, MainT, x, y, Radius, ctx) {
  //Shape
  ctx.beginPath();
  ctx.arc(x, y, Radius, 0, Math.PI * 2);
  ctx.fillStyle = "rgb(14, 34, 80)";
  ctx.fill();

  //Glow and Border
  ctx.lineWidth = 5;
  ctx.strokeStyle = "rgb(5, 120, 250)";
  ctx.stroke();

  //Text settings
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "white";

  //Header
  ctx.font = `${headerFontSize} Protest Guerrilla`;
  TextBreaker(Header, x, y - 100, 30, ctx);

  //Main Text
  ctx.font = `${mainTextFontSize} Inter`;
  TextBreaker(MainT, x, y - 25, 25, ctx);
}

function TextBreaker(text, x, y, lengthWisSpace, ctx) {
  const words = text.split(" ");
  let line = "";
  const lines = [];
  let maxWidth = 550;
  if (window.innerWidth < 1350) {
    y -= 50;
    maxWidth = 375;
  } else if (window.innerWidth > 2000) {
    maxWidth = 700;
    lengthWisSpace = 30;
  }
  //Builds the individual lines
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";
    const testWidth = ctx.measureText(testLine).width;
    if (testWidth > maxWidth && i > 0) {
      lines.push(line);
      line = words[i] + " ";
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  for (let j = 0; j < lines.length; j++) {
    ctx.fillText(lines[j], x, y + 20 + j * lengthWisSpace);
  }
}

export function RadialGradient(x, y, radius, ctx) {
  if (!ctx) return;
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, "rgba(0, 0, 0, 0.35)");
  gradient.addColorStop(1, "transparent");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

export function RowGradient(Range, ObjectData, shadowCtx, Mouse, Radius) {
  if (!shadowCtx || !ObjectData) return;

  shadowCtx.clearRect(
    0,
    0,
    document.documentElement.scrollWidth,
    document.documentElement.scrollHeight
  );

  for (let i = 0; i < ObjectData.current.length; i++) {
    // Calculate direction vec
    let directionX = Mouse.current.x - ObjectData.current[i].x;
    let directionY = Mouse.current.y - ObjectData.current[i].y;
    // Normalize the direction vector
    let length = Math.sqrt(directionX * directionX + directionY * directionY);
    if (length === 0) continue;
    let normalizedDirectionX = directionX / length;
    let normalizedDirectionY = directionY / length;
    // Invert the direction vector to get the opposite direction
    let oppositeDirectionX = -normalizedDirectionX;
    let oppositeDirectionY = -normalizedDirectionY;
    // Scale the offset based on the distance
    let scaleFactor = length / 10; // Adjust scale if desired
    // Adjust the position of the gradients using the opposite direction vector and scale factor
    for (let j = 0; j < Range; j++) {
      let offsetX = oppositeDirectionX * j * scaleFactor;
      let offsetY = oppositeDirectionY * j * scaleFactor;
      RadialGradient(
        ObjectData.current[i].x + offsetX,
        ObjectData.current[i].y + offsetY,
        Radius.current + j * 60,
        shadowCtx
      );
    }
  }
}
