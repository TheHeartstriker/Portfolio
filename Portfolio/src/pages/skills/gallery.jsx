import PolySvg from "../../assets/polyR.svg?react";
import "./gallery.css";
import "./skill.css";
import { useNavigate } from "react-router-dom";
import { galleryContentBlock } from "../../components/skillPage/gallery";

import design from "../../assets/gallery/design1.png";
import orginalSite from "../../assets/gallery/Mywebsite2.png";
import video from "../../assets/gallery/Atoms.mp4";

const galleryContent2 = [
  {
    type: "image",
    src: design,
    content:
      "A figma design created for a client. More a mockup than a final product.",
  },
  {
    type: "video",
    src: video,
    content:
      "One of the earliest iterations of this website. Completely different looking from how it is now right!",
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
        {/* {galleryContentBlock({
          form: "galleryThreeEven",
          content: galleryContent1,
        })} */}
        {galleryContentBlock({
          form: "galleryTwoEven",
          content: galleryContent2,
        })}
      </div>
    </div>
  );
}

export default Gallery;
