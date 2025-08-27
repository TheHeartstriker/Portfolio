import { useState } from "react";

export function galleryContentBlock({ form, content }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={`${form}`}>
      {content.map((item, index) => (
        <div
          key={index}
          className="galleryItem"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="galleryGradient"></div>
          {item.type === "image" && <img src={item.src} alt="" />}
          {item.type === "video" && (
            <video
              src={item.src}
              autoPlay
              loop
              muted
              width="100%"
              playsInline
              style={{ pointerEvents: "none" }}
            />
          )}
          <h2
            className={`galleryText ${
              hoveredIndex === index ? "fade-in" : "fade-out"
            }`}
          >
            {item.content}
          </h2>
        </div>
      ))}
    </div>
  );
}
