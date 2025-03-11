const gitImage = new Image();
gitImage.src = "./src/Images/Github.svg";

export function DrawCircle(hexColor, x, y, radius, ctx, Type) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = "rgb(5, 120, 250)";
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
