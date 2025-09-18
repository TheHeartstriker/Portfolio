import PropTypes from "prop-types";
import Image from "next/image";
import "./createFeatured.css";

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
            <a
              className="logo-container img-back-logo1"
              href={Link1}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open project"
            ></a>
          )}
          {Link2 && (
            <a
              className="logo-container img-back-logo2"
              href={Link2}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open project"
            ></a>
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
              <div className="blue-pill-2" key={index}>
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
  ImageSrc: PropTypes.string.isRequired,
  Link1: PropTypes.string,
  Link2: PropTypes.string,
  End: PropTypes.bool,
};

export default CreateFeatured;
