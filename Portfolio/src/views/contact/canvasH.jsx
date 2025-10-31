let gitImage;
if (typeof window !== "undefined") {
  // Load SVG as text, modify colors, then create data URL
  fetch("/Github.svg")
    .then((response) => response.text())
    .then((svgText) => {
      // Replace original colors with desired color (e.g., white)
      const svgColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-1")
        .trim();
      const modifiedSvg = svgText
        .replace(/fill="[^"]*"/g, 'fill="' + svgColor + '"')
        .replace(/stroke="[^"]*"/g, 'stroke="' + svgColor + '"');
      const svgBlob = new Blob([modifiedSvg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svgBlob);
      gitImage = new window.Image();
      gitImage.src = url;
    });
}

export function DrawCircle(color, x, y, radius, ctx, Type) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  function drawImage() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(gitImage, x - radius, y - radius, radius * 2, radius * 2);
    ctx.restore();
  }

  function DrawLi() {
    ctx.fillStyle = "white";
    ctx.font = `${radius}px Protest Guerrilla`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("in", x, y);
  }

  if (Type === "Github") {
    if (gitImage.complete) {
      drawImage();
    } else {
      gitImage.onload = drawImage;
    }
  } else {
    DrawLi();
  }
}
