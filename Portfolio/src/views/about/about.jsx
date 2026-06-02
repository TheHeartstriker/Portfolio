import AboutMe from "./aboutMe/aboutMe";
import Hero from "./hero/hero";
import "./about.css";

function About() {
  return (
    <div className="about-container">
      <Hero />
      <AboutMe />
    </div>
  );
}

export default About;
