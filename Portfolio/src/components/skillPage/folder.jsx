import PropTypes from "prop-types";

function handleLink(Link) {
  window.open(Link, "_blank", "noopener,noreferrer");
}

function CreateFolder({ Header, Para, Link }) {
  return (
    <div className="folder">
      <a href={Link} target="_blank" rel="noopener noreferrer" />
      <div className="folder-svg-container"></div>
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
