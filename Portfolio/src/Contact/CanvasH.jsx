const gitImage = import("../images/Github.svg");

export function DrawCircle(hexColor, x, y, radius, ctx) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = hexColor;
  ctx.fill();

  // Draw the image inside the circle
  //   if (gitImage.complete) {
  //     ctx.save();
  //     ctx.clip();
  //     ctx.drawImage(gitImage, x - radius, y - radius, radius * 2, radius * 2);
  //     ctx.restore();
  //   } else {
  //     gitImage.onload = () => {
  //       ctx.save();
  //       ctx.clip();
  //       ctx.drawImage(gitImage, x - radius, y - radius, radius * 2, radius * 2);
  //       ctx.restore();
  //     };
  //   }
}
