import PolySvg from "../../assets/polyR.svg?react";
import "./gallery.css";
import "./skill.css";
import { useNavigate } from "react-router-dom";
import { galleryContentBlock } from "../../components/skillPage/gallery";

import fitShot from "../../assets/skill/FitShot.webp";
import todoShot from "../../assets/skill/todoShot.png";
import client1 from "../../assets/skill/client1.png";

const galleryContent = [
  {
    type: "image",
    src: fitShot,
  },
  {
    type: "image",
    src: todoShot,
  },
  {
    type: "image",
    src: client1,
  },
];

function Gallery() {
  const navigate = useNavigate();

  return (
    <div className="mainGalleryContainer">
      <div className="Seperator" id="Sep1" onClick={() => navigate("/skills")}>
        <div className="GalleryLink reverse">
          <PolySvg className="GallerySvg" />
        </div>
        <hr></hr>
        <h1>Gallery</h1>
        <h2>.04</h2>
      </div>
      <div className="galleryContainer">
        {galleryContentBlock({
          form: "threeEven",
          content: galleryContent,
        })}
      </div>
    </div>
  );
}

export default Gallery;
