function morgottRune({ diameter, strokeWidth, lineMult, strokeColor }) {
  const lineLength = diameter * lineMult;
  const size = Math.max(diameter, lineLength) + strokeWidth;
  const center = size / 2;
  const lineX = center - diameter * 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={center}
        cy={center}
        r={diameter / 2}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <line
        x1={lineX}
        x2={lineX}
        y1={center - lineLength / 2}
        y2={center + lineLength / 2}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

export default morgottRune;
