"use client";
import PolyR from "../../../components/svg/polyR.jsx";
import "./gallery.css";
import "../main/skill.css";
import { useRouter } from "next/navigation";
import Masonry from "react-masonry-css";

function Gallery() {
  const router = useRouter();

  return (
    <div className="main-gallery-container">
      <div
        className="separator"
        id="galSep"
        onClick={() => router.push("/skills")}
      >
        <div className="gallery-link reverse">
          <PolyR className="gallery-svg" />
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
        <img src="/gallery/Project2.webp" alt="Project 2" />
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/nryWMrf9SaI?autoplay=1&controls=0&loop=1&playlist=nryWMrf9SaI"
          title="YouTube video"
          allowFullScreen
        />
        <img src="/gallery/Untitled.webp" alt="Test Image" />
        <img src="/gallery/Mywebsite2.webp" alt="Original Website" />
        <img src="/gallery/Project.webp" alt="Project 1" />
        <img src="/gallery/client.webp" alt="Client Website" />
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
