import PolySvg from "../../assets/polyR.svg?react";
import "./gallery.css";
import "./skill.css";
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";

import orginalSite from "../../assets/gallery/Mywebsite2.webp";
import project2 from "../../assets/gallery/Project2.webp";
import project1 from "../../assets/gallery/Project.webp";
import test from "../../assets/gallery/Untitled.webp";
import client from "../../assets/gallery/client.webp";

function Gallery() {
  const navigate = useNavigate();

  return (
    <div className="main-gallery-container">
      <div
        className="separator"
        id="galSep"
        onClick={() => navigate("/skills")}
      >
        <div className="gallery-link reverse">
          <PolySvg className="gallery-svg" />
        </div>
        <hr></hr>
        <h1>Gallery</h1>
        <h2>.04</h2>
      </div>
      <div className="gallery-description">
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
        className="gallery-container"
        columnClassName="gallery-column"
      >
        <img src={project2} alt="Project 2" />
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/nryWMrf9SaI?autoplay=1&controls=0&loop=1&playlist=nryWMrf9SaI"
          title="YouTube video"
          allowFullScreen
        />
        <img src={test} alt="Test Image" />
        <img src={orginalSite} alt="Original Website" />
        <img src={project1} alt="Project 1" />
        <img src={client} alt="Client Website" />
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/RpBYimzejoA?autoplay=1&controls=0&loop=1&playlist=RpBYimzejoA"
          title="YouTube video"
          allowFullScreen
        />
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/YjaAdnZ9sJ0?autoplay=1&controls=0&loop=1&playlist=YjaAdnZ9sJ0"
          title="YouTube video"
          allowFullScreen
        />
      </Masonry>
    </div>
  );
}

export default Gallery;
