import PolySvg from "../../assets/polyR.svg?react";
import "./gallery.css";
import "./skill.css";
import { useNavigate } from "react-router-dom";

function Gallery() {
  const navigate = useNavigate();

  return (
    <div className="MainGalleryContainer">
      <div className="Seperator" id="Sep1" onClick={() => navigate("/skills")}>
        <div className="GalleryLink reverse">
          <PolySvg className="GallerySvg" />
        </div>
        <hr></hr>
        <h1>Gallery</h1>
        <h2>.04</h2>
      </div>
      <div className="GalleryContainer"></div>
    </div>
  );
}

export default Gallery;
