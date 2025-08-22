export function galleryContentBlock({ form, content }) {
  return (
    <>
      {/* Gallery for threeEven layout */}
      {form === "threeEven" && (
        <div className="galleryThreeEven">
          {content.map((item, index) => (
            <div key={index} className="galleryItem">
              {item.type === "image" && <img src={item.src} />}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
