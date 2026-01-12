import PropTypes from "prop-types";
import Folder from "@/components/svg/Folder";

function CreateFolder({ Header, Para, Link }) {
  return (
    <div className="folder">
      <a
        href={Link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Links to the github repo of ${Header}`}
      />
      <div className="folder-svg-container">
        <Folder />
      </div>
      <h6>{Header}</h6>
      <p>{Para}</p>
    </div>
  );
}

CreateFolder.propTypes = {
  Header: PropTypes.string.isRequired,
  Para: PropTypes.string.isRequired,
  Link: PropTypes.string.isRequired,
};

export default CreateFolder;
