function parseRem(value) {
  return typeof value === "string" ? parseFloat(value) : value;
}

function MorgottRune({
  diameter = 0.5,
  strokeWidth = 1,
  lineMult = 1.5,
  strokeColor = "var(--light-3)",
}) {
  const diameterRem = parseRem(diameter);

  const lineLength = diameterRem * lineMult;
  const size = Math.max(diameterRem, lineLength);
  const center = size / 2;
  const lineX = center;

  return (
    <svg
      width={`${size}rem`}
      height={`${size}rem`}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={center}
        cy={center}
        r={diameterRem / 2}
        stroke={strokeColor}
        strokeWidth={`${strokeWidth}px`}
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1={lineX}
        x2={lineX}
        y1={center - lineLength / 2}
        y2={center + lineLength / 2}
        stroke={strokeColor}
        strokeWidth={`${strokeWidth}px`}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default MorgottRune;
