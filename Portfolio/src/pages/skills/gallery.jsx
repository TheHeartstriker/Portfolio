import PolySvg from "../../assets/polyR.svg?react";
import "./gallery.css";
import "./skill.css";
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";

import design from "../../assets/gallery/design1.png";
import orginalSite from "../../assets/gallery/Mywebsite2.png";
import video from "../../assets/gallery/Atoms.mp4";
import project2 from "../../assets/gallery/Project2.png";
import project1 from "../../assets/gallery/Project.webp";
import test from "../../assets/gallery/Untitled.png";

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
      <div className="Seperator" id="Sep2" onClick={() => navigate("/skills")}>
        <div className="GalleryLink reverse">
          <PolySvg className="GallerySvg" />
        </div>
        <hr></hr>
        <h1>Gallery</h1>
        <h2>.04</h2>
      </div>
      <div className="galleryDes">
        <p>
          A random collection of my work, showcasing various projects, designs,
          and videos. Many are just fun animations that I created to explore
          different ideas and concepts in physics, math, motion and geometry. A
          few design ones that I created outside my main projects as well!
        </p>
      </div>
      <Masonry
        breakpointCols={3}
        className="galleryContainer"
        columnClassName="galleryColumn"
      >
        <img src={project2} alt="Project 2" />
        <video src={video} loop autoPlay muted />
        <img src={test} alt="Test Image" />
        <img src={orginalSite} alt="Original Website" />
        <img src={project1} alt="Project 1" />
      </Masonry>
    </div>
  );
}

export default Gallery;
