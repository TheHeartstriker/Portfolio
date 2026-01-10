import AboutMobile from "./aboutMobile";

import {
  Header1,
  Header2,
  Header3,
  MainText1,
  MainText2,
  MainText3,
} from "./text";
import AnimatedAbout from "./animatedAbout";

function About() {
  return (
    <div className="main-about-container">
      <AnimatedAbout />
      {/* Hero Section */}
      <div className="about-hero-section">
        <div className="i-am-container">
          <h1 className="text-1">Hi, my name is</h1>
          <h2 className="text-2">Kaden Wildauer.</h2>
          <p className="text-4">
            I&apos;m a software engineer specializing in building websites and
            web applications. I create efficient, scalable, and visually
            appealing digital experiences. All of which can be found here!
          </p>
          <button>See More</button>
        </div>
      </div>
      {/* Playground / content section */}
      <AboutMobile
        Header1={Header1}
        Header2={Header2}
        Header3={Header3}
        MainText1={MainText1}
        MainText2={MainText2}
        MainText3={MainText3}
      />
    </div>
  );
}

export default About;
