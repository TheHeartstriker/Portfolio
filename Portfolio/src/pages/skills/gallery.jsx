import PolySvg from "../../assets/polyR.svg?react";
import "./gallery.css";
import "./skill.css";
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";

import orginalSite from "../../assets/gallery/Mywebsite2.webp";
import video from "../../assets/gallery/Atoms.mp4";
import video2 from "../../assets/gallery/FallingSand.mp4";
import project2 from "../../assets/gallery/Project2.webp";
import project1 from "../../assets/gallery/Project.webp";
import test from "../../assets/gallery/Untitled.webp";
import client from "../../assets/gallery/client.webp";
import multCircle from "../../assets/gallery/MultCircle.mp4";

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
        breakpointCols={{
          default: 3,
          1100: 2,
          700: 2,
          500: 1,
        }}
        className="galleryContainer"
        columnClassName="galleryColumn"
      >
        <img src={project2} alt="Project 2" />
        <video src={video} loop autoPlay muted />
        <img src={test} alt="Test Image" />
        <img src={orginalSite} alt="Original Website" />
        <img src={project1} alt="Project 1" />
        <img src={client} alt="Client Website" />
        <video src={video2} loop autoPlay muted />
        <video src={multCircle} loop autoPlay muted />
      </Masonry>
    </div>
  );
}

export default Gallery;
