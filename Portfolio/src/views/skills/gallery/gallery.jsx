import PolyR from "../../../components/svg/polyR.jsx";
import "./gallery.css";
import "../main/skill.css";
import Masson from "./Masson.jsx"; //client island
import Link from "next/link";

function Gallery() {
  return (
    <div className="main-gallery-container">
      <div className="separator" id="galSep">
        <Link id="gallery-link" href="/skills/"></Link>
        <div className="gallery-link reverse">
          <PolyR className="gallery-svg" />
        </div>
        <hr></hr>
        <h2>Gallery</h2>
        <h3>04.</h3>
      </div>
      <div className="gallery-description">
        <p>
          A random collection of my work, showcasing various projects, designs,
          and videos. Many are just fun animations that I created to explore
          different ideas and concepts in physics, math, motion and geometry. A
          few design ones that I created outside my main projects as well!
        </p>
      </div>
      <Masson />
    </div>
  );
}

export default Gallery;
