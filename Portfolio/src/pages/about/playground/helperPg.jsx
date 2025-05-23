//
//Object drawing functions
//
const headerFontSize = "2.5rem";
const mainTextFontSize = "1.3rem";
export function DrawTextBlurb(Header, MainT, x, y, Radius, ctx) {
  if (ctx) {
    //Shape
    ctx.beginPath();
    ctx.arc(x, y, Radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(14, 34, 80, 0.95)";
    ctx.fill();

    //Glow and Border
    ctx.save();
    ctx.shadowColor = "rgba(5, 120, 250, 0.8)";
    ctx.shadowBlur = 50;
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(5, 120, 250)";
    ctx.stroke();
    ctx.restore();

    //Header
    ctx.font = `${headerFontSize} Protest Guerrilla`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    TextBreaker(Header, x, y - 100, 30, ctx);

    //Main Text
    ctx.font = `${mainTextFontSize} Protest Guerrilla`;
    TextBreaker(MainT, x, y - 25, 20, ctx);
  }
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
    const LengthMet = ctx.measureText(testLine);
    const testWidth = LengthMet.width;
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
