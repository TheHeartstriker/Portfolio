"use client";
import Masonry from "react-masonry-css";
import Image from "next/image";

function Masson() {
  return (
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
      <Image
        src="/gallery/Project2.webp"
        alt="Project 2"
        width={400}
        height={300}
      />
      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/nryWMrf9SaI?autoplay=1&controls=0&loop=1&playlist=nryWMrf9SaI"
        title="YouTube video"
        allowFullScreen
      />
      <Image
        src="/gallery/Untitled.webp"
        alt="Test Image"
        width={400}
        height={300}
      />
      <Image
        src="/gallery/Mywebsite2.webp"
        alt="Original Website"
        width={400}
        height={300}
      />
      <Image
        src="/gallery/Project.webp"
        alt="Project 1"
        width={400}
        height={300}
      />
      <Image
        src="/gallery/client.webp"
        alt="Client Website"
        width={400}
        height={300}
      />
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
  );
}

export default Masson;
