function handleLink(Link) {
  window.open(Link, "_blank", "noopener,noreferrer");
}

function CreateFolder({ Header, Para, Link }) {
  return (
    <div className="Folder" onClick={() => handleLink(Link)}>
      <div className="FolderSvgContainer"></div>
      <h1>{Header}</h1>
      <p>{Para}</p>
    </div>
  );
}

export default CreateFolder;
