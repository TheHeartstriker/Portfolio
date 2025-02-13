export function DrawTextBlurb(Header, MainT, x, y, Radius, ctx) {
  if (ctx) {
    //Shape
    ctx.beginPath();
    ctx.arc(x, y, Radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 0, 0, 0.95)";
    ctx.fill();
    //Glow
    ctx.shadowColor = "rgba(5, 120, 250, 0.8)";
    ctx.shadowBlur = 50;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    //Border
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(5, 120, 250)";
    ctx.stroke();
    //Reset Shadow
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    //Slight helpe
    let screenWidth = window.innerWidth;
    let headerFontSize;
    let mainTextFontSize;
    if (screenWidth < 800) {
      headerFontSize = "0.9rem";
      mainTextFontSize = "0.6rem";
    } else if (screenWidth < 1200) {
      headerFontSize = "1.2rem";
      mainTextFontSize = "0.8rem";
    } else {
      headerFontSize = "2.5rem";
      mainTextFontSize = "1.3rem";
    }
    //Header
    ctx.font = `${headerFontSize} Protest Guerrilla`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    TextBreaker(Header, x, y - 100, 30, ctx);
    //Main Text
    ctx.font = `${mainTextFontSize} Protest Guerrilla`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    TextBreaker(MainT, x, y - 25, 20, ctx);
  }
}
function TextBreaker(text, x, y, lengthWisSpace, ctx) {
  const words = text.split(" ");
  let line = "";
  const lines = [];
  let maxWidth = 550;
  if (window.innerWidth < 1200) {
    lengthWisSpace = 15;
    maxWidth = 300;
  } else if (window.innerWidth < 800) {
    lengthWisSpace = 10;
    maxWidth = 150;
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
