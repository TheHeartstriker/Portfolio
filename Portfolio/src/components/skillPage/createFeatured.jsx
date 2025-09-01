import PropTypes from "prop-types";
import Image from "next/image";

function handleLink(Link) {
  window.open(Link, "_blank", "noopener,noreferrer");
}

function CreateFeatured({
  Header,
  Para,
  Skills,
  Mirror,
  ImageSrc,
  Link1,
  Link2,
  End,
}) {
  return (
    <>
      {/* Main app split into two container one for image and other for text */}
      <div
        className={`app-f ${Mirror ? "mirror" : ""}`}
        id={End ? "end-featured" : undefined}
      >
        <div className="app-image">
          <Image
            src={ImageSrc}
            alt="Project image"
            fill
            sizes="(max-width: 600px) 100vw"
            style={{ objectFit: "cover" }}
          />
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
            <h4>Featured project</h4>
            <h5>{Header}</h5>
          </div>
          <div className="app-para">
            <p>{Para}</p>
          </div>

          <div className={`app-skills ${Mirror ? "mirror" : ""}`}>
            {Skills.map((tech, index) => (
              <div className="blue-pill2" key={index}>
                <h5>{tech}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

CreateFeatured.propTypes = {
  Header: PropTypes.string.isRequired,
  Para: PropTypes.string.isRequired,
  Skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  Mirror: PropTypes.bool,
  Image: PropTypes.string.isRequired,
  Link1: PropTypes.string,
  Link2: PropTypes.string,
  End: PropTypes.bool,
};

export default CreateFeatured;
