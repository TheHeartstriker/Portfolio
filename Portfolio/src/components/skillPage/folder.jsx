function handleLink(Link) {
  window.open(Link, "_blank", "noopener,noreferrer");
}

function CreateFolder({ Header, Para, Link }) {
  return (
    <div className="folder" onClick={() => handleLink(Link)}>
      <div className="folder-svg-container"></div>
      <h1>{Header}</h1>
      <p>{Para}</p>
    </div>
  );
}

export default CreateFolder;
