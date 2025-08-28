function handleLink(Link) {
  window.open(Link, "_blank", "noopener,noreferrer");
}

function CreateFeatured({ Header, Para, Skills, Mirror, Image, Link1, Link2 }) {
  return (
    <>
      {/* Main app split into two container one for image and other for text */}
      <div className={`app-f ${Mirror ? "mirror" : ""}`}>
        <div className="app-image">
          <img src={Image} alt="Project image" />
          <div className="transparent-fill"></div>
          {Link1 && (
            <div
              className="logo-container img-back-logo1"
              onClick={() => {
                handleLink(Link1);
              }}
            ></div>
          )}
          {Link2 && (
            <div
              className="logo-container img-back-logo2"
              onClick={() => {
                handleLink(Link2);
              }}
            ></div>
          )}
        </div>
        <div className={`app-text ${Mirror ? "mirror" : ""}`}>
          <div className="app-header">
            <h1>Featured project</h1>
            <h3>{Header}</h3>
          </div>
          <div className="app-para">
            <p>{Para}</p>
          </div>

          <div className={`app-skills ${Mirror ? "mirror" : ""}`}>
            {Skills.map((tech, index) => (
              <div className="blue-pill2" key={index}>
                <h2>{tech}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateFeatured;
