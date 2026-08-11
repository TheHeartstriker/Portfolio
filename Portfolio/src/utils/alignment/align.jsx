function LayoutGuide({
  count = 12,
  gutter = 1.5,
  margin = 1.5,
  color = "rgba(255, 0, 0, 0.15)",
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        display: "flex",
        gap: `${gutter}rem`,
        paddingInline: `${margin}rem`,
        boxSizing: "border-box",
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            background: color,
          }}
        />
      ))}
    </div>
  );
}

export default LayoutGuide;
