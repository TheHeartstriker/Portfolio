export function drawLine(ctx, colorRef, x1, y1, x2, y2, lineWidth) {
  if (!ctx || !colorRef.current) return;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = colorRef.current.lineColor;
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.stroke();
}

export function drawLineAnimated(
  ctx,
  colorRef,
  x1,
  y1,
  x2,
  y2,
  lineWidth,
  duration
) {
  if (!ctx || !colorRef.current) return;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const startTime = performance.now();

  const minX = Math.min(x1, x2) - lineWidth;
  const minY = Math.min(y1, y2) - lineWidth;
  const maxX = Math.max(x1, x2) + lineWidth;
  const maxY = Math.max(y1, y2) + lineWidth;

  function animate(time) {
    const progress = Math.min((time - startTime) / duration, 1);

    // Clear only this line's area
    ctx.clearRect(minX, minY, maxX - minX, maxY - minY);

    // Draw growing segment
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 + dx * progress, y1 + dy * progress);

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = colorRef.current.lineColor;
    ctx.lineCap = "round";
    ctx.stroke();

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

export function drawRadial(ctx, colorRef, x, y) {
  if (!ctx || !colorRef.current) return;
  const radius = 600;
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, colorRef.current.cursorColor);
  gradient.addColorStop(1, "transparent");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}
