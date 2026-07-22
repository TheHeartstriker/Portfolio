import About from "./about/about.jsx";
import Hero from "./hero/hero";
import "./home.css";

function Home() {
  return (
    <div className="home-container">
      <Hero />
      <About />
    </div>
  );
}

export default Home;
