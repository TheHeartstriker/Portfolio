import React from "react";
function handleLink(Link) {
  window.open(Link, "_blank", "noopener,noreferrer");
}

function CreateFeatured({ Header, Para, Skills, Mirror, Id, Link1, Link2 }) {
  return (
    <>
      {/* Main app split into two container one for image and other for text */}
      <div className={`AppF ${Mirror ? "mirror" : ""}`}>
        <div className="AppImage" id={Id}>
          <div className="TransparentFill"></div>
          {Link1 && (
            <div
              className="Logocontainer ImgBackLogo1"
              onClick={() => {
                handleLink(Link1);
              }}
            ></div>
          )}
          {Link2 && (
            <div
              className="Logocontainer ImgBackLogo2"
              onClick={() => {
                handleLink(Link2);
              }}
            ></div>
          )}
        </div>
        <div className={`AppText ${Mirror ? "mirror" : ""}`}>
          <div className="AppHeader">
            <h1>Featured project</h1>
            <h3>{Header}</h3>
          </div>
          <div className="AppPara">
            <p>{Para}</p>
          </div>

          <div className={`AppSkills ${Mirror ? "mirror" : ""}`}>
            {Skills.map((tech, index) => (
              <div className="BluePill2" key={index}>
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
